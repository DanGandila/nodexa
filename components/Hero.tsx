import Constellation from './Constellation';

/**
 * On arrival the hero plays a single bottom-up sequence — eyebrow, headline,
 * body, actions — at 90ms intervals. Short enough that the page still feels
 * immediate, ordered so the eye is led down to the call to action.
 */
const RISE_DELAY = ['0ms', '90ms', '180ms', '270ms'];

export default function Hero() {
  return (
    <section
      id="acasa"
      className="relative overflow-hidden pb-28 pt-9 text-center sm:pt-[6.5rem]"
    >
      <Constellation />

      <div className="relative z-10 mx-auto flex max-w-shell flex-col items-center gap-6 px-6">
        <p
          style={{ animationDelay: RISE_DELAY[0] }}
          className="animate-rise font-mono text-[0.6875rem] uppercase tracking-label text-graphite"
        >
          Software pentru companii în creștere · România
        </p>

        <h1
          style={{ animationDelay: RISE_DELAY[1] }}
          className="animate-rise max-w-[22ch] text-balance text-[clamp(2.5rem,6.4vw,4.25rem)] font-semibold leading-[1.04] tracking-display text-ink"
        >
          Procesele tale nu ar trebui să-ți limiteze creșterea.
        </h1>

        <p
          style={{ animationDelay: RISE_DELAY[2] }}
          className="animate-rise max-w-[44ch] text-[clamp(1.0625rem,2vw,1.3125rem)] leading-relaxed text-graphite"
        >
          Creșterea se oprește unde încep procesele manuale. Construim
          software pe măsură care le preia — ca echipa să nu mai mute date
          dintr-un tab în altul și să poți servi mai mulți clienți, fără mai
          mulți oameni.
        </p>

        <div
          style={{ animationDelay: RISE_DELAY[3] }}
          className="animate-rise mt-3 flex flex-wrap justify-center gap-3"
        >
          <a
            href="#contact"
            className="inline-flex rounded-full bg-signal px-[1.625rem] py-[0.8125rem] text-[0.9375rem] font-medium text-white shadow-[0_1px_2px_rgba(47,91,234,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-signal-deep hover:shadow-[0_8px_20px_-6px_rgba(47,91,234,0.5)] active:translate-y-0 active:scale-[0.98]"
          >
            Programează o discuție
          </a>
          <a
            href="#servicii"
            className="inline-flex rounded-full border border-hairline-strong px-[1.625rem] py-[0.8125rem] text-[0.9375rem] font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:border-ink/30 hover:bg-white/60 hover:shadow-[0_8px_20px_-10px_rgba(16,20,28,0.25)] active:translate-y-0 active:scale-[0.98]"
          >
            Vezi serviciile
          </a>
        </div>
      </div>
    </section>
  );
}
