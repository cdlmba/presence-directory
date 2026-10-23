# The Presence Directory

A curated public directory of home AI systems for executive dads. Static Astro site, served at [thesystemsdad.com/presence/](https://thesystemsdad.com/presence/).

## Local development

```sh
npm install
npm run dev
```

The dev server serves the site under `/presence/` (for example `http://localhost:4321/presence/`).

Build the static site to `dist/`:

```sh
npm run build
```

Built HTML and assets land in `dist/presence/` (the build re-stages Astro output so paths match `https://thesystemsdad.com/presence/`). Preview the production build:

```sh
npm run preview
```

## Listings

Each published listing is one markdown file in `src/content/listings/`. Frontmatter is validated in `src/content.config.ts`:

- `name`
- `url`
- `category`
- `price`
- `auditResults` (an array of `{ item, result }`)

Filenames that start with `_` are templates. They are not published as listing pages. Copy `src/content/listings/_example.md`, drop the underscore, and fill in real values. Do not invent metrics, testimonials, or tool claims.

There are no published listings in this repository.

## The Presence Audit

`/presence/audit` is a client-side scored quiz. Questions, options, scoring, bands, and result copy live in `src/lib/audit.ts` and follow Christopher's approved spec.

Submit collects first name, email, optional phone, and a Substack opt-in. There is no backend yet, so the result screen also opens a prefilled mailto to `chris@christopherlynnsystems.com`. `postAuditToGoogleSheet` in `src/lib/audit.ts` is the TODO hook for a later Google Sheet.

Routing:

- DIY leads to `/presence/checklist`
- GUIDED leads to Presence Build, Guided ($97): https://buy.stripe.com/cNiaEXbVc1zUaC6ewUdnW0k
- DFY and Band 3 (per the spec rules) lead to the discovery call: https://calendar.app.google/av21uA54RnvWJbSs7

Done-for-you pricing is not shown.

`/presence/checklist` is The Presence Checklist, with interactive checkboxes that also print. Copy and links match Christopher's approved spec.

## Vercel setup

This app uses Astro `base: '/presence'` and `site: 'https://thesystemsdad.com'`. You do not need a `presence` subdomain or CNAME.

1. Import this GitHub repository in Vercel (or add it to your existing `thesystemsdad.com` project).
2. Use the **Astro** preset.
3. Confirm the build command is `npm run build`.
4. Confirm the output directory is `dist`.
5. Deploy so files under `dist/presence/` are served at `https://thesystemsdad.com/presence/`.

How you wire that depends on how the main site is hosted:

- **Single Vercel project for thesystemsdad.com:** Copy or sync the contents of `dist/presence/` into the main site's static output under `presence/`, or use a monorepo build that produces one combined `dist`.
- **Separate Vercel project for this repo:** On the **thesystemsdad.com** project, add a rewrite so `/presence` and `/presence/:path*` proxy to this deployment's `/presence` paths (this deployment must keep `base: '/presence'`).

No DNS change is required for a `/presence` path. Do not add `presence.thesystemsdad.com` unless you want a subdomain in addition to the path.
