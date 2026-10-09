# sakirsathe.com

The source for [sakirsathe.com](https://sakirsathe.com), a personal engineering website and static reference implementation. It brings together technical writing, engineering case studies, published open-source projects, and lab topics.

## Architecture

```text
MDX / structured content
  → locale-aware content layer
  → Next.js static export (out/)
  → GitHub Actions
  → Azure Static Web Apps
```

Writing is authored in MDX with validated YAML frontmatter. Pages, case studies, project listings, and lab areas use structured TypeScript data. The locale-aware content layer selects translated content and creates locale-specific metadata, routes, feeds, and alternate links at build time. GitHub Actions builds and deploys the static output. No runtime application server or database is required.

## Locales and URLs

- English (`en`) is the default and has unprefixed URLs, such as `/about` and `/writing/<slug>`.
- Spanish (`es`) uses `/es`, such as `/es/about` and `/es/writing/<slug>`.
- Hindi (`hi`) uses `/hi`, such as `/hi/about` and `/hi/writing/<slug>`.
- There is no `/en` route or `/en/rss.xml` feed.

Readers choose a language explicitly with the `EN | ES | HI` switcher. It preserves the conceptual page when a translation exists; unavailable translations are disabled. It does not invent a destination or fall back to another language. There is no region- or browser-language-based automatic redirect.

## Project Structure

```text
app/
  (english)/             Unprefixed English pages, RSS, and sitemap routes
  [locale]/              Spanish/Hindi pages and RSS routes
  globals.css            Global styles
components/              Shared pages, navigation, articles, and UI
content/
  writing/en/            Published English MDX sources
  writing/es/            Published Spanish MDX translations
  writing/hi/            Published Hindi MDX translations
  drafts/                Local private drafts; gitignored
data/                    Site configuration and structured Work, project, and Labs data
i18n/                    English, Spanish, and Hindi dictionaries
lib/                     Locale routing/SEO, MDX, Writing, RSS, and shared utilities
public/                  Static assets, robots.txt, and SWA configuration
scripts/                 i18n validation, IndexNow notification, and build cleanup
types/                   Shared TypeScript models
.github/workflows/       Azure Static Web Apps CI/CD workflow
```

## Local Development

Use Node.js 22.23 or newer and npm from the repository root. Next.js 16 itself supports Node.js 20.9+, but the repository's i18n validation command uses Node's TypeScript-stripping support.

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`, `http://localhost:3000/es`, or `http://localhost:3000/hi`. The development server binds to `0.0.0.0`; Next.js may choose another port if port 3000 is occupied.

## Validation

Run the repository checks from its root:

```bash
npm run validate:i18n
npm run lint
npm run typecheck
npm run build
npm audit --omit=dev
git diff --check
```

The i18n validator checks locale dictionaries and routes, translation identity and freshness, translated content structure, and IndexNow URL mapping without sending a request. `git diff --check` is useful before committing to catch whitespace errors. A successful build writes the static site to `out/`.

## Writing and Frontmatter

Place published article sources in the matching locale directory:

```text
content/writing/en/<slug>.mdx  → /writing/<slug>
content/writing/es/<slug>.mdx  → /es/writing/<slug>
content/writing/hi/<slug>.mdx  → /hi/writing/<slug>
```

The current schema is:

```yaml
---
title: "Article title"
description: "A concise article description."
date: "2026-10-05"
locale: en
translationKey: article-title
updated: "2026-10-05"
tags:
  - Engineering
published: true
featured: false
image: "/images/article-image.webp"
imageAlt: "Description of the article image"
---
```

Required fields are `title`, `description`, `date`, `locale`, `translationKey`, `tags`, `published`, and `featured`. Titles and descriptions must be non-empty strings. `date` must be a real calendar date in `YYYY-MM-DD` format; `updated` is optional and follows the same rule. `locale` must be `en`, `es`, or `hi`, and must match the directory. `translationKey` is a lowercase hyphenated identifier shared by translations. `tags` must be an array of non-empty strings; `published` and `featured` must be booleans.

`updated`, `image`, and `imageAlt` are optional. An image must be an HTTPS URL or a site-relative path, and `imageAlt` is required when `image` is set. `imageAlt`, when present, must be a non-empty string. Unknown fields are rejected. Translated articles additionally require `translationSourceHash`: a 64-character lowercase SHA-256 hash of the current English source. English sources must not include this field.

For an `es` or `hi` article, set `locale` to that folder's code and add `translationSourceHash` with the calculated hash. Keep the `translationKey` and slug aligned with the English article.

### Translation Workflow and Freshness

Start from an approved, reviewed English article. Create translations under the same slug and use the same `translationKey`. AI may assist with translation, but a human must review the result before publication. Preserve the article's facts, URLs, code blocks, and MDX structure. The validator also checks that dates, tags, publication/featured state, image metadata, heading structure, links, lists, tables, and other structural details remain aligned with the English source.

Calculate the source hash with the repository's current hash implementation, then copy it to `translationSourceHash` in each translated article. For example, replace the sample slug with the English source filename:

```bash
node --no-warnings --experimental-strip-types --input-type=module -e "import { readFileSync } from 'node:fs'; import { calculateArticleSourceHash } from './lib/writing-source.ts'; console.log(calculateArticleSourceHash(readFileSync('content/writing/en/example-article.mdx', 'utf8')))"
```

Run `npm run validate:i18n` before publishing. A translation is **current** when its hash matches the English source, **stale** when the source hash no longer matches (or the English source is unavailable), and **missing** when no translation exists. The validator rejects missing or stale translations for the currently published translation set. Changing English content does not automatically translate or publish anything; translations require human updates and review.

Only sources with `published: true` are included in public Writing pages, RSS, and the sitemap. Publishing is a deliberate content and Git operation; there is no automatic translation or content publishing service.

### Private Drafts

Unfinished or private writing belongs in `content/drafts/`, which is gitignored. Drafts must never be committed and are not read into the published Writing content layer. Move only reviewed material into `content/writing/<locale>/` when it is ready to be part of the repository, and set publication metadata deliberately.

## Work Case Studies

Work entries use a stable identity and slug across locales. Shared technical metadata is stored once, while reader-facing case-study content is provided for `en`, `es`, and `hi`. Update the structured records in `data/work.ts` and run the validator before publishing. Keep narratives anonymized: do not include employer, client, customer, or private product names; proprietary architecture; confidential metrics; private URLs; or other non-public details.

## Open Source and Labs

Open Source entries live in `data/projects.ts`; only entries marked `published: true` are presented as published projects. Planned or unpublished records are not public claims and must not be described as released projects. Lab topic areas are structured in `data/labs.ts`; listing a topic does not imply a separate published product or completed experiment.

## Language and Search Metadata

Each page has a self-referencing canonical URL and emits reciprocal `hreflang` alternatives (`en`, `es`, and `hi`) where corresponding routes exist. English is also the `x-default`. The English and translated root layouts render the matching `html lang`; page titles, descriptions, Open Graph locale values, and article metadata are localized. Article JSON-LD identifies the article language where applicable.

There is one sitemap: [https://sakirsathe.com/sitemap.xml](https://sakirsathe.com/sitemap.xml). It includes published routes for all supported locales with language alternates. `public/robots.txt` references this sitemap. Locale-specific RSS discovery links are included in page metadata.

## RSS

- English: `/rss.xml`
- Spanish: `/es/rss.xml`
- Hindi: `/hi/rss.xml`

Each feed contains only published articles for its locale and uses that locale's canonical article URLs. There is no `/en/rss.xml`; English remains unprefixed.

## Comments and Analytics

Published article pages use Giscus with GitHub Discussions and pathname-based discussion identity. Since translated articles have locale-specific paths, each language path maps to its own pathname-based discussion thread. Giscus settings are in `data/site.ts`; a public repository with Discussions enabled is required for the integration.

Cloudflare Web Analytics is included. When adapting the site, replace or remove the analytics configuration for the fork. No analytics credentials or deployment secrets belong in documentation or source history.

## IndexNow

After a successful production deployment from a push to `main`, the workflow notifies IndexNow about affected, published Writing URLs. Article source paths map to canonical URLs by locale:

```text
content/writing/en/foo.mdx  → https://sakirsathe.com/writing/foo
content/writing/es/foo.mdx  → https://sakirsathe.com/es/writing/foo
content/writing/hi/foo.mdx  → https://sakirsathe.com/hi/writing/foo
```

Unpublished content and unrelated files are ignored; locale-specific Writing indexes are included when relevant. Notification failures are non-blocking and do not fail the deployment. Pull-request previews do not send IndexNow notifications. Keep verification/configuration values out of documentation and never expose sensitive values.

## Static Export and Azure Static Web Apps

Next.js uses `output: "export"`; `npm run build` generates deployable static files in `out/`. Images are configured for static export. The published site needs no runtime application server, API, or database.

The workflow in `.github/workflows/azure-static-web-apps-icy-river-0ce038c10.yml` runs on pushes to `main` and pull requests targeting `main`. It uses the repository root as the app location and `out` as the generated output location, and deploys through the Azure Static Web Apps GitHub Action. Pull-request deployments are previews; closing a pull request closes its preview. Production IndexNow notification runs only after the successful `main` deployment. The Azure deployment credential is supplied through GitHub Secrets and must not be committed. Static hosting behavior and response headers are configured in `public/staticwebapp.config.json`.

## Publishing Workflow

```text
write and review the English source
→ create and human-review translations as needed; update their source hashes
→ run validation, lint, typecheck, and build
→ commit and push manually
→ GitHub Actions builds and deploys to Azure Static Web Apps
→ localized sitemap and RSS output is published
→ IndexNow receives affected published Writing URLs after successful production deployment
```

There is no automatic commit, push, translation, or publishing step. A published content change reaches production only through the repository's normal manual Git workflow and successful deployment.

## Using This Repository as a Reference

This repository is a personal site, not a general-purpose framework. Before publishing a fork, replace the identity and domain, public content, analytics configuration, Giscus repository/category configuration, Azure Static Web Apps workflow and credentials, and IndexNow verification/configuration. Review structured Work, project, and Labs data for privacy and accuracy. Do not carry private drafts or confidential material into a fork.

## License

This project is available under the MIT License. See [LICENSE](LICENSE).