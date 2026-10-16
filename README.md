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

## Vercel setup

1. Import this GitHub repository in Vercel.
2. Use the **Astro** preset.
3. Confirm the build command is `npm run build`.
4. Confirm the output directory is `dist`.
5. Deploy.

## DNS

1. In the Vercel project, add the domain `presence.thesystemsdad.com`.
2. At the DNS host for `thesystemsdad.com`, add a CNAME record named `presence` pointing to `cname.vercel-dns.com`.
