import Mark from './Mark';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline py-10">
      <div className="mx-auto flex max-w-shell flex-wrap items-center justify-between gap-5 px-6 text-[0.8125rem] text-graphite">
        <a
          href="#acasa"
          className="inline-flex items-center gap-2 text-[1.0625rem] font-semibold tracking-lockup text-ink"
        >
          <Mark size={20} />
          nodexa
        </a>
        <span>Software personalizat &amp; agenți AI, din România.</span>
        <span>© {year} Nodexa</span>
      </div>
    </footer>
  );
}
