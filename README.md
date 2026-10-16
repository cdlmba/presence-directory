# The Presence Directory

A curated public directory of home AI systems for executive dads. Static Astro site, hosted on Vercel at [presence.thesystemsdad.com](https://presence.thesystemsdad.com).

## Local development

```sh
npm install
npm run dev
```

Build the static site to `dist/`:

```sh
npm run build
```

Preview the production build:

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

`/audit` is a client-side scored quiz. Questions, options, scoring, bands, and result copy live in `src/lib/audit.ts` and follow Christopher's approved spec.

Submit collects first name, email, optional phone, and a Substack opt-in. There is no backend yet, so the result screen also opens a prefilled mailto to `chris@christopherlynnsystems.com`. `postAuditToGoogleSheet` in `src/lib/audit.ts` is the TODO hook for a later Google Sheet.

Routing:

- DIY leads to `/checklist`
- GUIDED leads to Presence Build, Guided ($97): https://buy.stripe.com/cNiaEXbVc1zUaC6ewUdnW0k
- DFY and Band 3 (per the spec rules) lead to the discovery call: https://calendar.app.google/av21uA54RnvWJbSs7

Done-for-you pricing is not shown.

`/checklist` is The Presence Checklist, with interactive checkboxes that also print. Copy and links match Christopher's approved spec.

## Vercel setup

1. Import this GitHub repository in Vercel.
2. Use the **Astro** preset.
3. Confirm the build command is `npm run build`.
4. Confirm the output directory is `dist`.
5. Deploy.

## DNS

1. In the Vercel project, add the domain `presence.thesystemsdad.com`.
2. At the DNS host for `thesystemsdad.com`, add a CNAME record named `presence` pointing to `cname.vercel-dns.com`.
