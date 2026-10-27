import type { ReactNode } from 'react';

const STROKE = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

type Service = {
  title: string;
  description: string;
  glyph: ReactNode;
};

/**
 * Glyphs are drawn from the mark's vocabulary — nodes and edges only — so the
 * icon set reads as part of the identity rather than a borrowed icon library.
 */
const services: Service[] = [
  {
    title: 'Aplicații custom',
    description:
      'Aplicații web construite exact pe fluxul tău de lucru, nu pe un șablon în care trebuie să te îndoi.',
    glyph: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="3.2" {...STROKE} />
        <path d="M3 9 H21" {...STROKE} />
        <circle cx="6.4" cy="6.5" r="1.15" className="fill-signal" />
      </>
    ),
  },
  {
    title: 'CRM-uri',
    description:
      'Sisteme de gestiune a clienților și vânzărilor, integrate cu uneltele pe care echipa ta le folosește deja.',
    glyph: (
      <>
        <circle cx="5" cy="6.5" r="1.9" className="fill-signal" />
        <path d="M9.4 6.5 H20.5" {...STROKE} />
        <circle cx="5" cy="12" r="1.9" fill="currentColor" />
        <path d="M9.4 12 H20.5" {...STROKE} />
        <circle cx="5" cy="17.5" r="1.9" fill="currentColor" />
        <path d="M9.4 17.5 H16" {...STROKE} />
      </>
    ),
  },
  {
    title: 'Agenți AI',
    description:
      'Agenți care răspund clienților, procesează documente și iau decizii pe baza datelor tale — non-stop.',
    glyph: (
      <>
        <circle cx="12" cy="12" r="7.2" {...STROKE} opacity="0.35" />
        <circle cx="12" cy="12" r="2.6" fill="currentColor" />
        <circle cx="12" cy="4.8" r="1.9" className="fill-signal" />
      </>
    ),
  },
  {
    title: 'Automatizări',
    description:
      'Conectăm aplicațiile existente și eliminăm pașii manuali care consumă ore în fiecare săptămână.',
    glyph: (
      <>
        <circle cx="4.6" cy="12" r="1.9" fill="currentColor" />
        <path d="M7 12 H10.5 L14 7.4" {...STROKE} />
        <path d="M10.5 12 L14 16.6" {...STROKE} />
        <circle cx="15.6" cy="6.8" r="1.9" className="fill-signal" />
        <circle cx="15.6" cy="17.2" r="1.9" fill="currentColor" />
      </>
    ),
  },
];

export default function Services() {
  return (
    <section id="servicii" className="py-bay-sm md:py-bay">
      <div className="mx-auto max-w-shell px-6">
        <div className="flex max-w-[38rem] flex-col gap-3">
          <p className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite">
            Servicii
          </p>
          <h2 className="text-balance text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-[1.12] tracking-heading text-ink">
            Patru servicii, un singur obiectiv
          </h2>
          <p className="max-w-[34rem] text-lg text-graphite">
            Software care îți aduce rezultate măsurabile, nu doar un livrabil.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] gap-4">
          {services.map((service) => (
            <li
              key={service.title}
              className="flex flex-col gap-3.5 rounded-[18px] border border-hairline bg-white p-[1.875rem] transition duration-200 hover:-translate-y-0.5 hover:border-hairline-strong"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" aria-hidden="true" className="text-ink">
                {service.glyph}
              </svg>
              <h3 className="text-[1.1875rem] font-semibold tracking-title text-ink">
                {service.title}
              </h3>
              <p className="text-[0.9375rem] leading-[1.58] text-graphite">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
