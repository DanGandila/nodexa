'use client';

import { useState, type FormEvent } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

const fieldClass =
  'w-full rounded-[11px] border border-transparent bg-mist px-4 py-[0.8125rem] text-[0.9375rem] text-ink transition placeholder:text-graphite/70 focus:border-signal focus:bg-white focus:outline-none';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const payload = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
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
        <div className="mx-auto flex max-w-[38rem] flex-col gap-3 rounded-[22px] border border-hairline bg-white px-6 py-9 text-center sm:px-10 sm:py-[3.25rem]">
          <p className="font-mono text-[0.6875rem] uppercase tracking-label text-graphite">
            Contact
          </p>
          <h2 className="text-[clamp(1.625rem,3.5vw,2.125rem)] font-semibold tracking-heading text-ink">
            Hai să discutăm
          </h2>
          <p className="mx-auto max-w-[36ch] text-graphite">
            Spune-ne despre proiectul tău și îți răspundem în aceeași zi
            lucrătoare.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3 text-left">
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
              placeholder="Spune-ne despre proiectul tău"
              aria-label="Mesaj"
              className={`${fieldClass} min-h-28 resize-y`}
            />

            <button
              type="submit"
              disabled={status === 'sending'}
              className="mt-2 self-center rounded-full bg-signal px-[1.875rem] py-[0.8125rem] text-[0.9375rem] font-medium text-white transition-colors hover:bg-signal-deep disabled:opacity-60"
            >
              {status === 'sending' ? 'Se trimite...' : 'Trimite mesajul'}
            </button>

            <p
              role="status"
              aria-live="polite"
              className="min-h-5 text-center text-sm"
            >
              {status === 'success' && (
                <span className="text-signal">
                  Mesajul tău a fost trimis. Îți răspundem în curând.
                </span>
              )}
              {status === 'error' && (
                <span className="text-red-600">
                  Mesajul nu a putut fi trimis. Încearcă din nou sau scrie-ne
                  direct pe email.
                </span>
              )}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
