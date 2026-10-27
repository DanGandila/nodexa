import type { ReactNode } from 'react';
import Reveal from './Reveal';

const EDGE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
};

const NODE_IN = 'fill-mist stroke-ink/30';
const NODE_OUT = 'fill-ink';

type Service = {
  title: string;
  description: string;
  figure: ReactNode;
};

/**
 * Each service carries a wordless flow figure on a shared 228×64 grid, drawn
 * in the same nodes-and-edges vocabulary as the mark. One grammar across all
 * three: hollow nodes are inputs that arrive from outside, the single
 * signal-colored node is the system we build, solid ink nodes are outcomes.
 *
 * The figures are what tell the three services apart at a glance — a
 * convergence, a queue with an escape hatch, a fan-out.
 */
const services: Service[] = [
  {
    title: 'Aplicații custom',
    description:
      'Aplicații web și CRM-uri construite pe fluxul tău real de lucru: un singur loc pentru clienți, oferte și vânzări, nu un șablon la care să îți adaptezi echipa.',
    // Scattered tools collapse into one system, and one place to look.
    figure: (
      <>
        <path d="M24 12 L136 32" {...EDGE} />
        <path d="M24 32 H136" {...EDGE} />
        <path d="M24 52 L136 32" {...EDGE} />
        <path d="M136 32 H204" {...EDGE} />
        <circle cx="24" cy="12" r="4.6" strokeWidth="1.6" className={NODE_IN} />
        <circle cx="24" cy="32" r="4.6" strokeWidth="1.6" className={NODE_IN} />
        <circle cx="24" cy="52" r="4.6" strokeWidth="1.6" className={NODE_IN} />
        <circle cx="136" cy="32" r="7.5" className="fill-signal" />
        <circle cx="204" cy="32" r="5" className={NODE_OUT} />
      </>
    ),
  },
  {
    title: 'Agenți AI',
    description:
      'Agenți care preiau cererile repetitive, procesează documente și răspund clienților non-stop, fără să crești echipa.',
    // A queue of requests meets the agent; most resolve straight through, the
    // hard ones leave on the dashed exception path.
    figure: (
      <>
        <path d="M24 8 L108 32" {...EDGE} />
        <path d="M24 24 L108 32" {...EDGE} />
        <path d="M24 40 L108 32" {...EDGE} />
        <path d="M24 56 L108 32" {...EDGE} />
        <path d="M108 32 H204" {...EDGE} />
        <path d="M108 32 L197 11" {...EDGE} strokeDasharray="3 4" />
        <circle cx="24" cy="8" r="4" strokeWidth="1.6" className={NODE_IN} />
        <circle cx="24" cy="24" r="4" strokeWidth="1.6" className={NODE_IN} />
        <circle cx="24" cy="40" r="4" strokeWidth="1.6" className={NODE_IN} />
        <circle cx="24" cy="56" r="4" strokeWidth="1.6" className={NODE_IN} />
        <circle cx="108" cy="32" r="8" className="fill-signal" />
        <circle
          cx="204"
          cy="10"
          r="4.6"
          strokeWidth="1.6"
          className={NODE_IN}
        />
        <circle cx="204" cy="32" r="5" className={NODE_OUT} />
      </>
    ),
  },
  {
    title: 'Automatizări',
    description:
      'Conectăm uneltele pe care le ai deja și eliminăm pașii manuali care se multiplică odată cu volumul.',
    // One incoming trigger, no manual step between, three parallel results.
    figure: (
      <>
        <path d="M24 32 H92" {...EDGE} />
        <path d="M92 32 L204 12" {...EDGE} />
        <path d="M92 32 H204" {...EDGE} />
        <path d="M92 32 L204 52" {...EDGE} />
        <circle cx="24" cy="32" r="4.6" strokeWidth="1.6" className={NODE_IN} />
        <circle cx="92" cy="32" r="7.5" className="fill-signal" />
        <circle cx="204" cy="12" r="5" className={NODE_OUT} />
        <circle cx="204" cy="32" r="5" className={NODE_OUT} />
        <circle cx="204" cy="52" r="5" className={NODE_OUT} />
      </>
    ),
  },
];

export default function Services() {
  return (
    <section id="servicii" className="py-bay-sm md:py-bay">
      <div className="mx-auto max-w-shell px-6">
        <Reveal className="flex max-w-[38rem] flex-col gap-3">
          <p className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite">
            Servicii
          </p>
          <h2 className="text-balance text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.12] tracking-heading text-ink">
            Trei servicii, un singur obiectiv
          </h2>
          <p className="max-w-[34rem] text-lg text-graphite">
            Să poți servi mai mulți clienți fără să adaugi proporțional mai
            mulți oameni.
          </p>
        </Reveal>

        <ul className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {services.map((service, index) => (
            // The reveal wrapper owns the entrance transform; the card inside
            // owns the hover one. Sharing an element would make the hover
            // inherit the reveal's long duration and stagger delay.
            <Reveal as="li" key={service.title} delay={120 + index * 80}>
              <div className="group flex h-full flex-col gap-3.5 rounded-[18px] border border-hairline bg-white p-[1.875rem] transition duration-200 hover:-translate-y-1 hover:border-hairline-strong hover:shadow-[0_18px_40px_-24px_rgba(16,20,28,0.35)]">
                <div className="mb-1 overflow-hidden rounded-[12px] bg-mist px-4 py-3.5">
                  <svg
                    viewBox="0 0 228 64"
                    aria-hidden="true"
                    className="h-auto w-full text-ink/20 transition-[color,transform] duration-500 ease-out group-hover:scale-[1.03] group-hover:text-ink/30"
                  >
                    {service.figure}
                  </svg>
                </div>
                <h3 className="text-[1.1875rem] font-semibold tracking-title text-ink">
                  {service.title}
                </h3>
                <p className="text-[0.9375rem] leading-[1.58] text-graphite">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
