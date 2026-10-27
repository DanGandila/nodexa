import Constellation from './Constellation';

export default function Hero() {
  return (
    <section id="acasa" className="relative overflow-hidden pb-28 pt-[6.5rem] text-center">
      <Constellation />

      <div className="relative z-10 mx-auto flex max-w-shell flex-col items-center gap-6 px-6">
        <p className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite">
          Studio de software · România
        </p>

        <h1 className="max-w-[22ch] text-balance text-[clamp(2.5rem,6.4vw,4.25rem)] font-semibold leading-[1.04] tracking-display text-ink">
          Aplicații, CRM-uri și agenți AI. Construite pe măsură.
        </h1>

        <p className="max-w-[44ch] text-[clamp(1.0625rem,2vw,1.3125rem)] leading-relaxed text-graphite">
          Transformăm procesele manuale în software la cheie — aplicații web
          custom, sisteme CRM și agenți AI care preiau munca repetitivă.
        </p>

        <div className="mt-3 flex flex-wrap justify-center gap-3">
          <a
            href="#contact"
            className="inline-flex rounded-full bg-signal px-[1.625rem] py-[0.8125rem] text-[0.9375rem] font-medium text-white transition-colors hover:bg-signal-deep"
          >
            Programează o discuție
          </a>
          <a
            href="#servicii"
            className="inline-flex rounded-full border border-hairline-strong px-[1.625rem] py-[0.8125rem] text-[0.9375rem] font-medium text-ink transition-colors hover:border-ink/30 hover:bg-white/60"
          >
            Vezi serviciile
          </a>
        </div>
      </div>
    </section>
  );
}
