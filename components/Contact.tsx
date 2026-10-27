'use client';

import { useState, type FormEvent } from 'react';
import Mark from './Mark';
import Reveal from './Reveal';

type Status = 'idle' | 'sending' | 'success' | 'error';

const fieldClass =
  'w-full rounded-[11px] border border-transparent bg-mist px-4 py-[0.8125rem] text-[0.9375rem] text-ink transition duration-200 placeholder:text-graphite/70 hover:bg-mist/70 focus:border-signal focus:bg-white focus:shadow-[0_0_0_4px_rgba(47,91,234,0.12)] focus:outline-none';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement)
        .value,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="py-bay-sm md:py-bay">
      <div className="mx-auto max-w-shell px-6">
        <Reveal
          variant="scale"
          className="mx-auto flex max-w-[38rem] flex-col gap-3 rounded-[22px] border border-hairline bg-white px-6 py-9 text-center sm:px-10 sm:py-[3.25rem]"
        >
          <Mark size={30} className="mx-auto text-ink" />
          <p className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite">
            Contact
          </p>
          <h2 className="text-[clamp(1.625rem,3.5vw,2.125rem)] font-semibold tracking-heading text-ink">
            Hai să discutăm
          </h2>
          <p className="mx-auto max-w-[36ch] text-graphite">
            Spune-ne ce proces te încetinește și îți răspundem în aceeași zi
            lucrătoare.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 flex flex-col gap-3 text-left"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <input
                name="name"
                type="text"
                required
                placeholder="Nume"
                aria-label="Nume"
                className={fieldClass}
              />
              <input
                name="email"
                type="email"
                required
                placeholder="Email"
                aria-label="Email"
                className={fieldClass}
              />
            </div>
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Ce proces vrei să îmbunătățești?"
              aria-label="Mesaj"
              className={`${fieldClass} min-h-28 resize-y`}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-2 inline-flex items-center gap-2 self-center rounded-full bg-signal px-[1.875rem] py-[0.8125rem] text-[0.9375rem] font-medium text-white shadow-[0_1px_2px_rgba(47,91,234,0.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-signal-deep hover:shadow-[0_8px_20px_-6px_rgba(47,91,234,0.5)] active:translate-y-0 active:scale-[0.98] disabled:translate-y-0 disabled:opacity-60 disabled:shadow-none"
            >
              {status === 'sending' && (
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="animate-spin"
                >
                  <circle
                    cx="8"
                    cy="8"
                    r="6.4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeDasharray="30 10"
                    opacity="0.9"
                  />
                </svg>
              )}
              {status === 'sending' ? 'Se trimite...' : 'Trimite mesajul'}
            </button>

            <p
              role="status"
              aria-live="polite"
              className="min-h-5 text-center text-sm"
            >
              {status === 'success' && (
                <span className="animate-rise inline-block text-signal">
                  Mesajul tău a fost trimis. Îți răspundem în curând.
                </span>
              )}
              {status === 'error' && (
                <span className="animate-rise inline-block text-red-600">
                  Mesajul nu a putut fi trimis. Încearcă din nou sau scrie-ne pe
                  WhatsApp.
                </span>
              )}
            </p>
          </form>

          <div className="mt-7 flex flex-col items-center gap-3 border-t border-hairline pt-7">
            <p className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite">
              Sau direct pe WhatsApp
            </p>
            <a
              href="https://wa.me/40731353292"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-full border border-ink/15 bg-mist px-[1.625rem] py-[0.8125rem] text-[0.9375rem] font-medium text-ink transition duration-200 hover:-translate-y-0.5 hover:border-signal hover:bg-white hover:text-signal hover:shadow-[0_8px_20px_-10px_rgba(16,20,28,0.3)] active:translate-y-0 active:scale-[0.98]"
            >
              <svg
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.46 1.32 4.97L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.02h-.01a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.11.82.83-3.04-.2-.31a8.18 8.18 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.2-8.24 8.2Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.13-1.04-.39-1.99-1.23-.73-.66-1.23-1.46-1.37-1.71-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.12-.14.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.72 2.63 4.17 3.69.58.25 1.04.4 1.39.52.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
              </svg>
              Scrie-ne pe WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
