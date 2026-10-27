const N_PATH = 'M14 36 L14 12 L34 36 L34 12';

type MarkProps = {
  size?: number;
  /**
   * Compact density: thicker strokes, no node circles. Required below ~24px,
   * where the nodes and edges otherwise merge into a blur.
   */
  compact?: boolean;
  className?: string;
};

/**
 * The nodexa mark: the letter N drawn as four nodes joined by three edges.
 * Inherits its color from `currentColor`; the entry node carries the accent.
 */
export default function Mark({ size = 24, compact = false, className }: MarkProps) {
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
          <circle cx="14" cy="12" r="4.25" className="fill-signal" />
          <circle cx="14" cy="36" r="4.25" fill="currentColor" />
          <circle cx="34" cy="36" r="4.25" fill="currentColor" />
          <circle cx="34" cy="12" r="4.25" fill="currentColor" />
        </>
      )}
    </svg>
  );
}
