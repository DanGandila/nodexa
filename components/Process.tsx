import Mark from './Mark';
import Motto from './Motto';
import Reveal from './Reveal';

const steps = [
  {
    title: 'Analiză',
    description:
      'Mapăm procesul actual și stabilim exact ce se automatizează și ce rămâne o decizie umană.',
  },
  {
    title: 'Construcție',
    description:
      'Livrăm în iterații scurte, cu acces la o versiune funcțională de la primele săptămâni.',
  },
  {
    title: 'Lansare & suport',
    description:
      'Punem soluția în producție, instruim echipa și rămânem disponibili pentru ajustări.',
  },
];

/**
 * The page's one dark band. Breaks up an otherwise uniformly light page and
 * gives the delivery sequence the emphasis it deserves — the numbering is
 * legitimate here because these steps genuinely happen in order.
 */
export default function Process() {
  return (
    <section
      id="proces"
      className="relative overflow-hidden bg-obsidian py-bay-sm text-white md:py-bay"
    >
      {/*
        The mark at poster scale — a graphic element, not a logo placement.
        The wrapper holds the vertical centering so the float animation is
        free to own the transform.
      */}
      <div className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 lg:block">
        <Mark size={420} mono className="animate-float text-white/[0.045]" />
      </div>

      <div className="relative mx-auto max-w-shell px-6">
        <Reveal className="flex max-w-[38rem] flex-col gap-3">
          <p className="font-mono text-[0.6875rem] uppercase tracking-label text-ash">
            Cum lucrăm
          </p>
          <h2 className="max-w-[30ch] text-balance text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.12] tracking-heading">
            De la proces manual la software live, în trei etape
          </h2>
          <p className="max-w-[34rem] text-lg text-ash">
            Fără surprize pe parcurs: știi ce se construiește, când se livrează
            și cine răspunde după lansare.
          </p>
        </Reveal>

        <ol className="mt-14 grid grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-x-8 gap-y-10">
          {steps.map((step, index) => (
            <li key={step.title} className="flex flex-col">
              {/* The rule draws itself left to right, ahead of its copy. */}
              <Reveal
                variant="line"
                delay={index * 110}
                className="h-px w-full bg-white/15"
              />
              <Reveal
                delay={160 + index * 110}
                className="flex flex-col gap-2.5 pt-5"
              >
                <span className="font-mono text-[0.6875rem] tabular-nums tracking-label text-signal-lift">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[1.1875rem] font-semibold tracking-title">
                  {step.title}
                </h3>
                <p className="text-[0.9375rem] leading-[1.58] text-ash">
                  {step.description}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>

        {/* Signs the band off with the same three beats, in miniature. */}
        <Motto />
      </div>
    </section>
  );
}
