import { Fragment } from 'react';
import Reveal from './Reveal';

/**
 * The motto, set as a node chain rather than a sentence: three words, each on
 * a node, joined by edges — the same grammar as the mark and the flow figures.
 *
 * Words and edges reveal in sequence, so the line draws itself left to right
 * the way the work it describes actually runs. Sized to close the dark band
 * quietly, below the steps it summarises.
 */
const words = ['Gândim', 'Construim', 'Scalăm'];

/** Word, then the edge that follows it: 130ms apart, alternating. */
const stepDelay = (index: number) => index * 130;

export default function Motto() {
  return (
    <div
      aria-label="Gândim, construim, scalăm"
      className="mt-16 flex flex-col items-center gap-5 md:flex-row md:justify-between md:gap-6"
    >
      {words.map((word, index) => (
        <Fragment key={word}>
          {index > 0 && (
            // Edges only once the words sit side by side; stacked on mobile
            // they would point nowhere.
            <Reveal
              variant="line"
              delay={stepDelay(index * 2 - 1)}
              className="hidden h-px flex-1 bg-white/15 md:block"
            />
          )}
          <Reveal
            delay={stepDelay(index * 2)}
            className="flex items-center gap-2.5"
          >
            <span
              aria-hidden="true"
              className={`h-[0.4375rem] w-[0.4375rem] shrink-0 rounded-full ${
                index === 0 ? 'bg-signal-lift' : 'bg-white/50'
              }`}
            />
            <span className="text-[clamp(1.0625rem,2vw,1.25rem)] font-medium tracking-title text-white">
              {word}
            </span>
          </Reveal>
        </Fragment>
      ))}
    </div>
  );
}
