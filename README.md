# sakirsathe.com

A personal engineering website and reference implementation for a static, content-focused site.

## About

This repository is the source for [sakirsathe.com](https://sakirsathe.com). It presents engineering work, technical writing, open-source projects, and experiments across .NET, Azure, AI, and software architecture.

The repository is intentionally static. Content changes relatively infrequently, and a static site is a good fit for publishing articles and portfolio material without maintaining application infrastructure.

## Architecture

The publishing flow is:

```text
MDX → Git → static build → Azure Static Web Apps
```

MDX keeps technical writing close to source control, and Git provides content version history. A CMS, application database, and persistent application server are not required. Static hosting keeps the runtime attack surface smaller, is inexpensive, and makes the site easy to move between hosts. Backend services can be added later if concrete requirements justify them.

## Technology

- Next.js App Router with static export
- TypeScript
- Tailwind CSS
- MDX with validated YAML frontmatter
- Azure Static Web Apps-compatible output
- Giscus with GitHub Discussions for optional article comments

## Project Structure

```text
app/                 Pages, static metadata, RSS, and sitemap
components/          Shared presentation and client-side components
content/writing/     Public article sources
content/drafts/      Private, gitignored draft workspace
data/                Site identity, case studies, projects, and lab content
lib/                 MDX parsing, writing queries, theme, and utilities
public/              Static assets and Azure Static Web Apps configuration
scripts/             Static build cleanup
types/               Shared TypeScript models
```

## Local Development

Use a current Node.js LTS release and npm from the repository root:

```bash
npm ci
npm run dev
```

The development site is available at `http://localhost:3000` unless that port is already in use.

## Validation

Run the project checks from the repository root:

```bash
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
```

The production build writes the static site to `out/`.

## Writing / Publishing

Write and review an article locally before moving its finished source from `content/drafts/article-name.mdx` to `content/writing/article-name.mdx`. Set `published: true` only when it is ready to appear on the site. The static build includes published articles in the Writing index, article routes, RSS, and sitemap.

Supported public frontmatter:

```yaml
---
title: "MCP vs REST for Enterprise AI"
description: "Where MCP fits and where a normal API is still the better choice."
date: "2026-10-05"
updated: "2026-10-05"
tags:
  - MCP
  - .NET
  - AI Engineering
published: true
featured: false
---
```

`title`, `description`, `date`, `tags`, `published`, and `featured` are required. Dates must use `YYYY-MM-DD`. `updated` is optional. `image` and `imageAlt` are also optional; `imageAlt` is required whenever `image` is provided. Invalid or unknown fields fail the build with the article filename.

Publishing is a manual source-control workflow:

```text
write locally → review → move into content/writing → commit manually → push manually → static site rebuild
```

Articles are authored in MDX; no CMS is involved.

## Private Drafts

Keep private or unfinished material in `content/drafts/`. This directory is gitignored and must never be committed. Only move reviewed content into `content/writing/` when it is ready to be part of the repository and set its `published` value deliberately.

## Adding an Engineering Case Study

Add or update an entry in `data/work.ts`. Keep organizations, clients, customers, private product names, dates, internal architecture, confidential metrics, and private URLs out of public case studies. Describe the system and engineering work at an anonymized, general level.

## Adding an Open Source Project

Add or update an entry in `data/projects.ts`. Keep projects unpublished until their public repository and initial usable release are ready. Only use real repository URLs and verifiable project details; do not invent usage metrics.

## Labs

Update `data/labs.ts` with areas of exploration. Publish experiment results only when they are ready to be documented and linked from the site.

## Site Configuration

The `site` object in `data/site.ts` is the central place to update the name, headline, role summary, job title, location and country code, email, and domain. The canonical URL is derived from the domain. Exact GitHub and LinkedIn profile URLs are configured in the `social` object; they are intentionally unset until known values are available. Giscus settings are in the same file and remain disabled by default.

## Comments

Optional article comments use Giscus and GitHub Discussions. Comments remain disabled unless `giscus.enabled` is `true` and all four public values are configured in `data/site.ts`: `repo`, `repoId`, `category`, and `categoryId`.

The GitHub repository must be public for live Giscus comments to work normally, and GitHub Discussions must be enabled with an appropriate category. The Giscus GitHub App may need authorization. Never commit a GitHub token, OAuth credential, or other secret for comments; the Giscus repository and category identifiers are public configuration.

## Static Export

Next.js is configured with `output: "export"`. `npm run build` creates the deployable static site in `out/`; the site does not require a runtime Node.js server, application API, or database. Empty dynamic collections use build-time sentinel paths that are removed from the export after the build.

## Azure Static Web Apps

The project is compatible with Azure Static Web Apps. The existing static deployment settings use the repository root as the app location and `out` as the output location, with `npm run build` as the build command. The static web app configuration is in `public/staticwebapp.config.json`.

## Using This Repository as a Reference

This repository is the source for sakirsathe.com. Developers are welcome to fork or adapt its structure, but should replace personal content, identity, and configuration before publishing a fork. It is a personal website, not a general-purpose framework, and contributions may not be actively accepted.

## License

This project is available under the MIT License. See [LICENSE](LICENSE).