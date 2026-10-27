'use client';

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from 'react';

type RevealProps = {
  /** Element to render — `li` inside lists, `div` by default. */
  as?: ElementType;
  /** Stagger within a group, in ms. */
  delay?: number;
  /** `rise` slides up, `scale` grows in, `line` draws a rule from the left. */
  variant?: 'rise' | 'scale' | 'line';
  className?: string;
  children?: ReactNode;
};

const variantClass = {
  rise: '',
  scale: 'reveal-scale',
  line: 'reveal-line',
} as const;

/**
 * Reveals its children once they scroll into view, then stops observing —
 * these animations are a first-impression detail, not a toggle that should
 * replay every time the visitor scrolls back up.
 *
 * The hidden-until-seen state lives in CSS (`.reveal`, scoped to browsers
 * reporting scripting support) so nothing can get stranded invisible.
 */
export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  variant = 'rise',
  className = '',
  children,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Older browsers and the reduced-motion path skip straight to visible.
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      // Fires a touch after the top edge enters, so the motion reads as a
      // response to scrolling rather than something already half finished.
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
      className={[
        'reveal',
        variantClass[variant],
        visible && 'is-visible',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}
