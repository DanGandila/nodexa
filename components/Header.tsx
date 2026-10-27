'use client';

import { useState } from 'react';
import Mark from './Mark';

const navLinks = [
  { href: '#servicii', label: 'Servicii' },
  { href: '#proces', label: 'Proces' },
  { href: '#portofoliu', label: 'Portofoliu' },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-mist/70 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto flex h-14 max-w-shell items-center justify-between gap-8 px-6">
        <a
          href="#acasa"
          className="inline-flex items-center gap-2 text-[1.0625rem] font-semibold tracking-lockup text-ink"
        >
          <Mark size={22} />
          nodexa
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[0.8125rem] text-graphite transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full bg-signal px-[0.9375rem] py-[0.4375rem] text-[0.8125rem] font-medium text-white transition-colors hover:bg-signal-deep md:inline-flex"
        >
          Discută cu noi
        </a>

        <button
          type="button"
          aria-label={menuOpen ? 'Închide meniul' : 'Deschide meniul'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-hairline-strong text-ink md:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
            {menuOpen ? (
              <path
                d="M3 3 L13 13 M13 3 L3 13"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            ) : (
              <path
                d="M2 5 H14 M2 11 H14"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-hairline px-6 py-5 md:hidden">
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block text-[0.9375rem] text-graphite"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-flex rounded-full bg-signal px-4 py-2 text-[0.8125rem] font-medium text-white"
              >
                Discută cu noi
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
