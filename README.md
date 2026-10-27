# Nodexa — website

Presentation website for Nodexa, a Romania-based studio building custom apps,
CRMs, AI agents, and workflow automation.

Stack: Next.js (static export) + React + Tailwind CSS. UI copy is in
Romanian; code, comments, and identifiers are in English.

## Development

```bash
npm install

npm run dev      # Next dev server — fast, but no Pages Functions
npm run preview  # wrangler pages dev on :8788 — serves the real build + Functions
npm run start    # build, then preview
```

Use `npm run preview` (or `start`) when you need the contact form to work
locally, since the form depends on a Pages Function that `next dev` does
not run.

`next start` does **not** work here — a static export has no server.

## Build

```bash
npm run build
```

This produces a static export in `out/` (configured via `output: 'export'`
in `next.config.js`).

## Deploying to Cloudflare Pages

Build settings live in `wrangler.toml`, so Cloudflare does not have to guess
them:

```toml
name = "nodexa"
pages_build_output_dir = "out"
```

`pages_build_output_dir` is the key line — it marks this as a Pages project
and stops Cloudflare auto-detecting Next.js and assuming a `next-on-pages`
Workers build, which would look for `.next` instead of `out`.

1. **`name` must match the Pages project name** in your Cloudflare dashboard.
   If the project is called something else, change it here or
   `wrangler pages deploy` will target the wrong project (or create a new one).
2. Deploy with `npm run deploy`, or connect the repo for Git-triggered builds.
   For a Git-connected project set the build command to `npm run build`; the
   output directory is read from `wrangler.toml`.
3. The contact form posts to `/api/contact`, handled by the Pages Function in
   `functions/api/contact.ts`. Cloudflare picks up the root `functions/`
   directory automatically.
4. To actually deliver contact form emails, set these environment
   variables in the Pages project settings (Settings → Environment
   variables):
   - `RESEND_API_KEY` — API key from [Resend](https://resend.com)
   - `CONTACT_TO_EMAIL` — inbox that should receive submissions (optional;
     defaults to `danioangandila@gmail.com`)
   - `CONTACT_FROM_EMAIL` — verified sender address (optional; defaults to
     `onboarding@resend.dev`)
   Only `RESEND_API_KEY` is required. Until it is set, the form still accepts
   submissions and returns success, it just doesn't forward them anywhere.

   Note: with the default `onboarding@resend.dev` sender, Resend only
   delivers to the account owner's own address. To send to any other inbox,
   verify a domain at resend.com/domains and set `CONTACT_FROM_EMAIL` to an
   address on it.

   For local testing, put the same keys in a `.dev.vars` file at the repo
   root (gitignored) and `wrangler pages dev` will pick them up.
