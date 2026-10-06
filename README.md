# sakirsathe.com

Personal engineering site for Sakir Sathe. Next.js (App Router), strict TypeScript, Tailwind CSS v4, MDX, fully static (`output: "export"`). No backend, database, auth or runtime dependencies.

## Commands

```bash
npm install
npm run dev      # next dev on 0.0.0.0, port $PORT (default 3000)
npm run build    # static export to ./out (postbuild removes empty-collection sentinels)
npm run start    # serve ./out locally
npm run typecheck
```

## Structure

```
app/               routes, sitemap.ts, robots.ts, rss.xml/route.ts
components/        presentation
content/writing/   MDX articles (frontmatter: title, description, date, updated, tags, published, featured)
data/              site.ts, engineering.ts, work.ts, projects.ts, labs.ts
lib/               writing loader, utilities, metadata helpers
types/             shared types
public/            favicon, staticwebapp.config.json
```

## Content rules

- **Writing**: only `published: true` posts are listed, rendered, exported, or included in RSS/sitemap. Current samples are drafts.
- **Open source**: only `published: true` projects appear. All planned projects are unpublished. Never add invented stars or downloads.
- **Work**: case studies are anonymized. `narrativeStatus: "pending"` shows a "pending editorial expansion" notice. Do not add employers, clients, products, dates, metrics or internal diagrams.
- **Social links**: replace the `null` placeholders in `data/site.ts` at `social.github.url` and `social.linkedin.url` with exact profile URLs. Until configured, the UI shows non-interactive “Not configured” labels, never generic searches, and excludes these profiles from Person schema `sameAs`. Email and canonical domain are in the same file (`site.email`, `site.url`).

## Deploy (Azure Static Web Apps)

Use app location `/`, output location `out`, build command `npm run build`. `public/staticwebapp.config.json` maps 404s to `/404.html`.
