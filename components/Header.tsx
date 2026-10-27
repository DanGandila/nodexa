'use client';

import { useEffect, useRef, useState } from 'react';
import Mark from './Mark';

const navLinks = [
  { href: '#servicii', label: 'Servicii' },
  { href: '#proces', label: 'Proces' },
  { href: '#portofoliu', label: 'Portofoliu' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string>('');
  const progressRef = useRef<HTMLDivElement>(null);

  // Read position on every frame the page moves, but write only to a CSS
  // transform — the progress bar must not re-render the header on scroll.
  useEffect(() => {
    let frame = 0;
    let ticking = false;

    function apply() {
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(progress, 1)})`;
      }
      setScrolled(window.scrollY > 6);
      ticking = false;
    }

    function onScroll() {
      if (ticking) return;
      ticking = true;
      frame = requestAnimationFrame(apply);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    apply();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Marks the nav link whose section currently occupies the viewport.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;

    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((node): node is Element => node !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The entry closest to the top of the viewport wins, so passing
        // between two sections can never leave both links lit.
        const top = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
        if (top) setActiveId(`#${top.target.id}`);
      },
      // A band across the middle of the screen: a section is "current" once
      // it dominates the view, not the instant its first pixel appears.
      { rootMargin: '-45% 0px -45% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-mist/70 backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 ${
        scrolled
          ? 'border-hairline-strong bg-mist/85 shadow-[0_6px_24px_-16px_rgba(16,20,28,0.4)]'
          : 'border-transparent'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-shell items-center justify-between gap-8 px-6">
        <a
          href="#acasa"
          className="group inline-flex items-center gap-0 text-[1.0625rem] font-semibold tracking-lockup text-ink"
        >
          <Mark
            size={30}
            className="transition-transform duration-300 ease-out group-hover:-translate-y-px group-hover:scale-105"
          />
          nodexa
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => {
            const active = activeId === link.href;

            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={active ? 'true' : undefined}
                className={`relative py-1 text-[0.8125rem] transition-colors duration-200 ${
                  active ? 'text-ink' : 'text-graphite hover:text-ink'
                }`}
              >
                {link.label}
                {/* Underline grows from the left as its section takes over. */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-px w-full origin-left bg-signal transition-transform duration-300 ease-out ${
                    active ? 'scale-x-100' : 'scale-x-0'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-signal px-[0.9375rem] py-[0.4375rem] text-[0.8125rem] font-medium text-white transition duration-200 hover:-translate-y-px hover:bg-signal-deep hover:shadow-[0_6px_16px_-6px_rgba(47,91,234,0.55)] active:translate-y-0 active:scale-[0.97] md:inline-flex"
        >
          Discută cu noi
        </a>

        <button
          type="button"
          aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline-strong text-ink transition active:scale-95 md:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            {/* Both bars are always present; they rotate into the close icon. */}
            <path
              d="M2 5 H14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="origin-center transition-transform duration-300 ease-out"
              style={
                menuOpen
                  ? { transform: 'translateY(3px) rotate(45deg)' }
                  : undefined
              }
            />
            <path
              d="M2 11 H14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              className="origin-center transition-transform duration-300 ease-out"
              style={
                menuOpen
                  ? { transform: 'translateY(-3px) rotate(-45deg)' }
                  : undefined
              }
            />
          </svg>
        </button>
      </div>

      {/* Reading progress, pinned to the header's own bottom edge. */}
      <div
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-signal"
        style={{ transform: 'scaleX(0)' }}
      />

      {/*
        The menu stays mounted and animates its row from 0fr to 1fr, which
        transitions cleanly without hard-coding a height the content has to
        fit inside.
      */}
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-out md:hidden ${
          menuOpen
            ? 'grid-rows-[1fr] opacity-100'
            : 'pointer-events-none grid-rows-[0fr] opacity-0'
        }`}
      >
        <nav className="min-h-0 overflow-hidden border-t border-hairline px-6 py-5">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                style={{
                  transitionDelay: menuOpen ? `${80 + index * 50}ms` : '0ms',
                }}
                className={`transition-all duration-300 ease-out ${
                  menuOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-2 opacity-0'
                }`}
              >
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-[0.9375rem] text-graphite transition-colors hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li
              style={{
                transitionDelay: menuOpen
                  ? `${80 + navLinks.length * 50}ms`
                  : '0ms',
              }}
              className={`transition-all duration-300 ease-out ${
                menuOpen
                  ? 'translate-x-0 opacity-100'
                  : '-translate-x-2 opacity-0'
              }`}
            >
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex rounded-full bg-signal px-4 py-2 text-[0.8125rem] font-medium text-white transition active:scale-[0.97]"
              >
                Discută cu noi
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
