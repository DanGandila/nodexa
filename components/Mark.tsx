const N_PATH = 'M14 36 L14 12 L34 36 L34 12';

type MarkProps = {
  size?: number;
  /**
   * Compact density: thicker strokes, no node circles. Required below ~24px,
   * where the nodes and edges otherwise merge into a blur.
   */
  compact?: boolean;
  /**
   * Render every node in `currentColor` instead of accenting the entry node.
   * For watermarks and tinted grounds, where a single blue dot would fight
   * the surface it sits on.
   */
  mono?: boolean;
  className?: string;
};

/**
 * The nodexa mark: the letter N drawn as four nodes joined by three edges.
 * Inherits its color from `currentColor`; the entry node carries the accent.
 */
export default function Mark({
  size = 24,
  compact = false,
  mono = false,
  className,
}: MarkProps) {
  const entryNode = mono
    ? { fill: 'currentColor' }
    : { className: 'fill-signal' };


  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
      className={className}
    >
      <path
        d={N_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={compact ? 6 : 3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!compact && (
        <>
          <circle cx="14" cy="12" r="4.25" {...entryNode} />
          <circle cx="14" cy="36" r="4.25" fill="currentColor" />
          <circle cx="34" cy="36" r="4.25" fill="currentColor" />
          <circle cx="34" cy="12" r="4.25" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
