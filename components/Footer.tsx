import Mark from './Mark';
import Reveal from './Reveal';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline py-10">
      <Reveal className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-5 px-6 text-[0.8125rem] text-graphite">
        <a
          href="#acasa"
          className="group inline-flex items-center gap-0 text-[1.0625rem] font-semibold tracking-lockup text-ink"
        >
          <Mark
            size={24}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-px group-hover:scale-105"
          />
          nodexa
        </a>
        <span>Software personalizat &amp; agenți AI, din România.</span>
        <span>© {year} Nodexa</span>
      </Reveal>
    </footer>
  );
}
