import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { dictionary as en } from "../i18n/en.ts";
import { dictionary as es } from "../i18n/es.ts";
import { dictionary as hi } from "../i18n/hi.ts";
import { caseStudies, getPublishedWork } from "../data/work.ts";
import { getPublishedProjects } from "../data/projects.ts";
import { localeContentTargets } from "../lib/i18n/content-targets.ts";
import { resolveLocaleTarget } from "../lib/i18n/resolve-locale-target.ts";
import { localeSeoConfig } from "../lib/i18n/seo-config.ts";
import { parseMdxFrontmatter, validatePostFrontmatter } from "../lib/mdx-frontmatter.ts";
import { calculateArticleSourceHash, getTranslationStatus } from "../lib/writing-source.ts";
import { articleUrl, articleUrlsForChange, buildUrlList, isWritingArticlePath, parseNameStatus, parseWritingArticlePath } from "../scripts/notify-indexnow.mjs";
import {
  defaultLocale,
  getLocaleFromPath,
  getLocalePrefix,
  isLocale,
  isTranslatedLocale,
  localizePath,
  stripLocalePrefix,
  supportedLocales,
  translatedLocales,
  translatedTopLevelPaths,
} from "../lib/i18n/locales.ts";

assert.deepEqual(supportedLocales, ["en", "es", "hi"]);
assert.equal(defaultLocale, "en");
assert.deepEqual(translatedLocales, ["es", "hi"]);
assert.deepEqual(supportedLocales.map(isLocale), [true, true, true]);
assert.deepEqual(translatedLocales.map(isTranslatedLocale), [true, true]);
assert.equal(isLocale("fr"), false);
assert.equal(isTranslatedLocale("en"), false);
assert.equal(isTranslatedLocale("fr"), false);
assert.throws(() => getLocalePrefix("fr"), RangeError);
assert.throws(() => localizePath("/", "fr"), RangeError);

function assertSameShape(reference, candidate, path = "dictionary") {
  if (typeof reference === "string") {
    assert.equal(typeof candidate, "string", `${path} must be a string`);
    return;
  }
  if (typeof reference === "number" || typeof reference === "boolean") {
    assert.equal(typeof candidate, typeof reference, `${path} has an incompatible value type`);
    return;
  }
  if (Array.isArray(reference)) {
    assert.ok(Array.isArray(candidate), `${path} must be an array`);
    assert.equal(candidate.length, reference.length, `${path} length differs`);
    for (let index = 0; index < reference.length; index += 1) {
      assertSameShape(reference[index], candidate[index], `${path}[${index}]`);
    }
    return;
  }
  assert.ok(candidate && typeof candidate === "object" && !Array.isArray(candidate), `${path} must be an object`);
  assert.deepEqual(Object.keys(candidate).sort(), Object.keys(reference).sort(), `${path} keys differ`);
  for (const key of Object.keys(reference)) {
    assertSameShape(reference[key], candidate[key], `${path}.${key}`);
  }
}

assertSameShape(en, es, "es");
assertSameShape(en, hi, "hi");

assert.equal(en.site.languageName, "English");
assert.equal(es.site.languageName, "Español");
assert.equal(hi.site.languageName, "हिन्दी");

assert.equal(getLocalePrefix("en"), "");
assert.equal(getLocalePrefix("es"), "/es");
assert.equal(getLocalePrefix("hi"), "/hi");
assert.equal(localizePath("/", "en"), "/");
assert.equal(localizePath("/", "es"), "/es");
assert.equal(localizePath("/", "hi"), "/hi");
assert.equal(localizePath("/writing/test", "en"), "/writing/test");
assert.equal(localizePath("/writing/test", "es"), "/es/writing/test");
assert.equal(localizePath("/writing/test", "hi"), "/hi/writing/test");
assert.equal(localizePath("/es/writing/test", "en"), "/writing/test");
assert.equal(localizePath("/es/es/writing/test", "hi"), "/hi/writing/test");
assert.equal(localizePath("writing//test/?q=1#toc", "es"), "/es/writing/test?q=1#toc");
assert.equal(stripLocalePrefix("/hi/es/writing/test/"), "/writing/test");
assert.equal(getLocaleFromPath("/es/writing/test"), "es");
assert.equal(getLocaleFromPath("/hi"), "hi");
assert.equal(getLocaleFromPath("/writing/test"), "en");
assert.equal(getLocaleFromPath("/fr/writing/test"), "en");

const translatedPaths = translatedLocales.flatMap((locale) => translatedTopLevelPaths.map((path) => localizePath(path, locale)));
assert.equal(translatedPaths.length, 14);
assert.equal(new Set(translatedPaths).size, 14);
assert.ok(translatedPaths.every((path) => path.startsWith("/es/") || path === "/es" || path.startsWith("/hi/") || path === "/hi"));
assert.ok(translatedPaths.every((path) => !path.startsWith("/en")));
assert.ok(!translatedPaths.some((path) => /^\/(es|hi)\/(writing|work)\//.test(path)));

const workIds = caseStudies.map((work) => work.id);
const workSlugs = caseStudies.map((work) => work.slug);
const publishedWork = getPublishedWork();
assert.equal(new Set(workIds).size, caseStudies.length, "Work IDs must be unique");
assert.equal(new Set(workSlugs).size, caseStudies.length, "Work slugs must be unique");
assert.ok(publishedWork.every((work) => work.narrativeStatus === "published"), "unpublished Work records must not be exported");

function assertWorkContent(content, path) {
  assert.ok(content && typeof content === "object", `${path} must be an object`);
  for (const field of ["title", "systemType", "domain", "summary"]) {
    assert.equal(typeof content[field], "string", `${path}.${field} must be a string`);
    assert.ok(content[field].trim(), `${path}.${field} must not be empty`);
  }
  assert.ok(Array.isArray(content.themes), `${path}.themes must be an array`);
  assert.ok(Array.isArray(content.sections) && content.sections.length > 0, `${path}.sections must be a non-empty array`);
  for (const [index, section] of content.sections.entries()) {
    assert.equal(typeof section.heading, "string", `${path}.sections[${index}].heading must be a string`);
    assert.equal(typeof section.body, "string", `${path}.sections[${index}].body must be a string`);
    if (section.flow !== undefined) assert.ok(Array.isArray(section.flow) && section.flow.every((step) => typeof step === "string"), `${path}.sections[${index}].flow must be a string array`);
  }
}

for (const work of caseStudies) {
  assert.equal(work.id, work.slug, `${work.slug} uses its stable ID as the shared route slug`);
  assert.deepEqual(Object.keys(work.content).sort(), [...supportedLocales].sort(), `${work.slug} must not include unsupported locale content`);
  for (const locale of supportedLocales) assertWorkContent(work.content[locale], `${work.slug}.content.${locale}`);
  for (const locale of translatedLocales) {
    const referenceSections = work.content.en.sections;
    const translatedSections = work.content[locale].sections;
    assert.equal(translatedSections.length, referenceSections.length, `${work.slug}.content.${locale} section count differs from en`);
    for (let index = 0; index < referenceSections.length; index += 1) {
      assert.equal(Boolean(translatedSections[index].flow), Boolean(referenceSections[index].flow), `${work.slug}.content.${locale}.sections[${index}] flow presence differs from en`);
      if (referenceSections[index].flow) assert.equal(translatedSections[index].flow.length, referenceSections[index].flow.length, `${work.slug}.content.${locale}.sections[${index}] flow length differs from en`);
    }
  }
  if (work.narrativeStatus === "published") {
    for (const locale of translatedLocales) assert.ok(work.content[locale], `${work.slug} is missing ${locale} content`);
  }
  assert.equal(localizePath(`/work/${work.slug}`, "en"), `/work/${work.slug}`);
  for (const locale of translatedLocales) assert.equal(localizePath(`/work/${work.slug}`, locale), `/${locale}/work/${work.slug}`);
}

const publishedWorkCount = getPublishedWork().length;
const expectedWorkDetailRoutesPerLocale = publishedWorkCount;
assert.equal(expectedWorkDetailRoutesPerLocale * translatedLocales.length, publishedWorkCount * translatedLocales.length);
const publishedProjects = getPublishedProjects();
assert.equal(publishedProjects.length, 2, "only the two currently public projects should be exposed");
assert.ok(publishedProjects.every((project) => project.published && project.status === "public"));

const localeRouteRoot = fileURLToPath(new URL("../app/[locale]/", import.meta.url));
function collectPageFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectPageFiles(path);
    return entry.name === "page.tsx" ? [relative(localeRouteRoot, path).split(sep).join("/")] : [];
  }).sort();
}

const expectedPageFiles = [
  "about/page.tsx",
  "engineering/page.tsx",
  "labs/page.tsx",
  "open-source/page.tsx",
  "page.tsx",
  "work/page.tsx",
  "work/[slug]/page.tsx",
  "writing/page.tsx",
  "writing/[slug]/page.tsx",
].sort();
assert.deepEqual(collectPageFiles(localeRouteRoot), expectedPageFiles, "localized routes must include only the requested top-level pages, Work details, and translated Writing details");
for (const file of expectedPageFiles) {
  const source = readFileSync(join(localeRouteRoot, file), "utf8");
  assert.match(source, /export const dynamicParams = false/);
  if (file === "work/[slug]/page.tsx") {
    assert.match(source, /generateStaticParams\(\{ params \}: \{ params: \{ locale: string \} \}\)/);
    assert.match(source, /getPublishedWork\(\)/);
    assert.match(source, /\.map\(\(work\) => \(\{ slug: work\.slug \}\)\)/);
    assert.match(source, /localizePath|\/\$\{localeParam\}\/work/);
  } else if (file === "writing/[slug]/page.tsx") {
    assert.match(source, /generateStaticParams\(\{ params \}: \{ params: \{ locale: string \} \}\)/);
    assert.match(source, /getPublishedPosts\(params\.locale\)\.map\(\(post\) => \(\{ slug: post\.slug \}\)\)/);
    assert.match(source, /getPublishedPost\(slug, localeParam\)/);
  } else {
    assert.ok(!source.includes("generateStaticParams"), `${file} should inherit the locale static params from the root layout`);
  }
}

const localizedRootLayout = readFileSync(join(localeRouteRoot, "layout.tsx"), "utf8");
assert.match(localizedRootLayout, /generateStaticParams\(\)/);
assert.match(localizedRootLayout, /translatedLocales\.map\(\(locale\) => \(\{ locale \}\)\)/);
assert.match(localizedRootLayout, /<html lang=\{localeSeoConfig\[locale\]\.htmlLang\}/);
const localizedRootMetadata = readFileSync(fileURLToPath(new URL("../app/[locale]/layout.tsx", import.meta.url)), "utf8");
assert.match(localizedRootMetadata, /export const metadata = siteMetadata/);
const siteMetadataSource = readFileSync(fileURLToPath(new URL("../lib/site-metadata.ts", import.meta.url)), "utf8");
assert.match(siteMetadataSource, /getRssDiscoveryMetadata\("en"\)/);
const englishRootLayout = readFileSync(fileURLToPath(new URL("../app/(english)/layout.tsx", import.meta.url)), "utf8");
assert.match(englishRootLayout, /<html lang="en"/);
assert.ok(!existsSync(fileURLToPath(new URL("../app/layout.tsx", import.meta.url))), "the fixed-language root layout must not remain");
assert.deepEqual(localeSeoConfig, {
  en: { htmlLang: "en", hreflang: "en", openGraphLocale: "en_US" },
  es: { htmlLang: "es", hreflang: "es", openGraphLocale: "es_CR" },
  hi: { htmlLang: "hi", hreflang: "hi", openGraphLocale: "hi_IN" },
});
const seoSource = readFileSync(fileURLToPath(new URL("../lib/i18n/seo.ts", import.meta.url)), "utf8");
assert.match(seoSource, /resolveLocaleTarget\(/);
assert.match(seoSource, /languages\["x-default"\] = languages\.en/);
const metadataHelperSource = readFileSync(fileURLToPath(new URL("../lib/utils.ts", import.meta.url)), "utf8");
assert.match(metadataHelperSource, /languages: alternates/);
assert.match(metadataHelperSource, /localeSeoConfig\[locale\]\.openGraphLocale/);
const sharedArticleSource = readFileSync(fileURLToPath(new URL("../components/article-page.tsx", import.meta.url)), "utf8");
assert.match(sharedArticleSource, /inLanguage: localeSeoConfig\[locale\]\.htmlLang/);
assert.match(sharedArticleSource, /locale: localeSeoConfig\[post\.locale\]\.openGraphLocale/);
assert.match(sharedArticleSource, /getAlternateOpenGraphLocales\(path, post\.locale\)/);
assert.match(sharedArticleSource, /url: post\.canonicalUrl/);
assert.match(sharedArticleSource, /mainEntityOfPage: post\.canonicalUrl/);

function expectedLanguageAlternates(pathname) {
  const languages = {};
  for (const locale of supportedLocales) {
    const target = resolveTarget(pathname, locale);
    if (target) languages[localeSeoConfig[locale].hreflang] = `https://sakirsathe.com${target === "/" ? "" : target}`;
  }
  if (languages.en) languages["x-default"] = languages.en;
  return languages;
}

const expectedTranslatedWorkRoutes = publishedWorkCount * translatedLocales.length;
const sharedPagesSource = readFileSync(fileURLToPath(new URL("../components/shared-pages.tsx", import.meta.url)), "utf8");
assert.match(sharedPagesSource, /localizePath\(`\/work\/\$\{study\.slug\}`, locale\)/, "Work index links must localize the stable Work slug");
assert.ok(!translatedLocales.includes("en"), "English Work links must remain unprefixed");

const writingRoot = fileURLToPath(new URL("../content/writing/", import.meta.url));
const writingLocales = new Map();
for (const locale of supportedLocales) {
  const directory = join(writingRoot, locale);
  if (!existsSync(directory)) {
    writingLocales.set(locale, []);
    continue;
  }
  const files = readdirSync(directory, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name)
    .sort();
  const posts = files.map((file) => {
    const slug = file.slice(0, -".mdx".length);
    const filename = join(directory, file);
    const source = readFileSync(filename, "utf8");
    const { data, content } = parseMdxFrontmatter(source, filename);
    const frontmatter = validatePostFrontmatter(data, filename, locale);
    return { ...frontmatter, slug, content, sourceHash: calculateArticleSourceHash(source) };
  });
  writingLocales.set(locale, posts);
}

const publishedWritingByLocale = new Map([...writingLocales].map(([locale, posts]) => [locale, posts.filter((post) => post.published)]));
const englishPosts = publishedWritingByLocale.get("en");
assert.equal(englishPosts.length, 3, "English Writing must contain exactly three published articles");
assert.equal(publishedWritingByLocale.get("es").length, englishPosts.length, "each English article must have a Spanish translation");
assert.equal(publishedWritingByLocale.get("hi").length, englishPosts.length, "each English article must have a Hindi translation");
assert.deepEqual(readdirSync(writingRoot).filter((entry) => entry.endsWith(".mdx")), [], "root-level compatibility article copies must not remain");
for (const locale of supportedLocales) {
  const posts = writingLocales.get(locale);
  assert.equal(new Set(posts.map((post) => post.slug)).size, posts.length, `${locale} slugs must be unique`);
  assert.equal(new Set(posts.map((post) => post.translationKey)).size, posts.length, `${locale} translation keys must be unique`);
  assert.ok(posts.every((post) => post.locale === locale), `${locale} folder and frontmatter locale must match`);
}
assert.ok(englishPosts.every((post) => post.published && post.locale === "en" && post.translationKey));
assert.equal(new Set(englishPosts.map((post) => post.translationKey)).size, englishPosts.length);
assert.ok(englishPosts.every((post) => !post.translationSourceHash));

function headingLevels(body) {
  return [...body.matchAll(/^\s{0,3}(#{1,6})\s+.+?\s*#*\s*$/gm)].map((match) => match[1].length);
}

const resolveTarget = (pathname, targetLocale, catalog = localeContentTargets) => resolveLocaleTarget({
  pathname,
  targetLocale,
  catalog,
  supportedLocales,
  defaultLocale,
  topLevelPaths: translatedTopLevelPaths,
  localizePath,
});
const translationGroupPaths = [
  ...translatedTopLevelPaths,
  ...publishedWork.map((work) => `/work/${work.slug}`),
  ...englishPosts.map((post) => `/writing/${post.slug}`),
];
for (const pathname of translationGroupPaths) {
  const alternates = expectedLanguageAlternates(pathname);
  assert.deepEqual(Object.keys(alternates).sort(), ["en", "es", "hi", "x-default"]);
  assert.equal(alternates["x-default"], alternates.en);
  for (const locale of supportedLocales) {
    const localizedPath = resolveTarget(pathname, locale);
    assert.equal(alternates[localeSeoConfig[locale].hreflang], `https://sakirsathe.com${localizedPath === "/" ? "" : localizedPath}`);
    assert.deepEqual(expectedLanguageAlternates(localizedPath), alternates, `hreflang must be reciprocal for ${localizedPath}`);
  }
}
assert.equal(resolveTarget("/", "es"), "/es");
assert.equal(resolveTarget("/", "hi"), "/hi");
assert.equal(resolveTarget("/es", "en"), "/");
assert.equal(resolveTarget("/hi", "es"), "/es");
assert.equal(resolveTarget("/about", "es"), "/es/about");
assert.equal(resolveTarget("/es/about", "hi"), "/hi/about");
assert.equal(resolveTarget("/hi/about", "en"), "/about");
assert.equal(resolveTarget("/es/about/", "hi"), "/hi/about");
assert.equal(resolveTarget("/es/es/about", "hi"), undefined, "double locale prefixes must be rejected");
assert.equal(resolveTarget("/en/about", "es"), undefined, "English-prefixed routes must not be generated");
assert.equal(resolveTarget("/work/not-published", "es"), undefined, "unknown Work slugs must be unavailable");
assert.equal(resolveTarget("/writing/not-published", "hi"), undefined, "unknown Writing slugs must be unavailable");
assert.equal(resolveTarget("/private/unknown/path", "es"), undefined, "unknown path shapes must not be guessed");
assert.throws(() => resolveTarget("/", "fr"), RangeError, "unsupported target locales must be rejected");

assert.deepEqual(Object.keys(localeContentTargets.work).sort(), publishedWork.map((work) => work.slug).sort(), "Work target catalog must contain only published Work slugs");
for (const work of publishedWork) {
  for (const sourceLocale of supportedLocales) {
    for (const targetLocale of supportedLocales.filter((locale) => locale !== sourceLocale)) {
      const sourcePath = localizePath(`/work/${work.slug}`, sourceLocale);
      const targetPath = resolveTarget(sourcePath, targetLocale);
      assert.equal(targetPath, localizePath(`/work/${work.slug}`, targetLocale), `${sourceLocale} → ${targetLocale} Work target for ${work.slug}`);
    }
  }
}

const translationKeys = englishPosts.map((post) => post.translationKey).sort();
assert.deepEqual(Object.keys(localeContentTargets.writing).sort(), translationKeys, "Writing target catalog must use stable translation keys");
for (const englishPost of englishPosts) {
  const targets = localeContentTargets.writing[englishPost.translationKey];
  for (const locale of supportedLocales) {
    const localizedPost = writingLocales.get(locale).find((post) => post.translationKey === englishPost.translationKey);
    assert.equal(targets[locale], localizedPost?.slug, `${locale} catalog slug for ${englishPost.translationKey}`);
  }
  for (const sourceLocale of supportedLocales) {
    for (const targetLocale of supportedLocales.filter((locale) => locale !== sourceLocale)) {
      const sourcePost = writingLocales.get(sourceLocale).find((post) => post.translationKey === englishPost.translationKey);
      const targetPost = writingLocales.get(targetLocale).find((post) => post.translationKey === englishPost.translationKey);
      assert.equal(resolveTarget(localizePath(`/writing/${sourcePost.slug}`, sourceLocale), targetLocale), localizePath(`/writing/${targetPost.slug}`, targetLocale), `${sourceLocale} → ${targetLocale} Writing target for ${englishPost.translationKey}`);
    }
  }
}
const missingTranslationCatalog = structuredClone(localeContentTargets);
delete missingTranslationCatalog.writing[englishPosts[0].translationKey].hi;
assert.equal(resolveTarget(`/es/writing/${englishPosts[0].slug}`, "hi", missingTranslationCatalog), undefined, "missing translations must not fall back or create a URL");
const missingWorkCatalog = structuredClone(localeContentTargets);
delete missingWorkCatalog.work[publishedWork[0].slug].es;
assert.equal(resolveTarget(`/hi/work/${publishedWork[0].slug}`, "es", missingWorkCatalog), undefined, "missing Work translations must not fall back or create a URL");
const headerSource = readFileSync(fileURLToPath(new URL("../components/header.tsx", import.meta.url)), "utf8");
const switcherSource = readFileSync(fileURLToPath(new URL("../components/language-switcher.tsx", import.meta.url)), "utf8");
assert.equal((headerSource.match(/<LanguageSwitcher\b/g) ?? []).length, 2, "the selector must appear in desktop actions and mobile navigation");
assert.match(switcherSource, /aria-current="page"/, "current language must be announced");
assert.match(switcherSource, /aria-disabled="true"/, "missing translations must be announced as unavailable");
assert.match(switcherSource, /English/);
assert.match(switcherSource, /Español/);
assert.match(switcherSource, /हिन्दी/);


function fencedBlocks(body) {
  return [...body.matchAll(/^(`{3,}|~{3,})[^\n]*\r?\n([\s\S]*?)^\1\s*$/gm)].map((match) => match[2]);
}

function sourceUrls(body) {
  return [...body.matchAll(/(?:href=["']([^"']+)["']|\]\((https?:\/\/[^)\s]+))/g)]
    .map((match) => match[1] ?? match[2])
    .sort();
}

function listHierarchy(body) {
  return [...body.matchAll(/^(\s*)([-*+] |\d+\. )/gm)].map((match) => `${match[1].length}:${match[2].trim()}`);
}

function numericTokens(body) {
  return (body.match(/\d[\d,]*(?:\.\d+)?%?/g) ?? []).map((token) => token.replace(/,+$/, "")).sort();
}

for (const englishPost of englishPosts) {
  assert.equal(getTranslationStatus({ translationSourceHash: englishPost.sourceHash }, englishPost), "current");
  assert.equal(getTranslationStatus({ translationSourceHash: "0".repeat(64) }, englishPost), "stale");
  for (const locale of translatedLocales) {
    const translation = writingLocales.get(locale).find((post) => post.translationKey === englishPost.translationKey);
    assert.ok(translation, `${locale} translation missing for ${englishPost.translationKey}`);
    assert.equal(translation.slug, englishPost.slug, `${locale} route slug differs from English`);
    assert.equal(translation.locale, locale, `${locale} translation folder/frontmatter mismatch`);
    assert.equal(translation.translationKey, englishPost.translationKey, `${locale} translation identity differs from English`);
    assert.equal(translation.translationSourceHash, englishPost.sourceHash, `${locale} translation source revision is stale`);
    assert.equal(getTranslationStatus(translation, englishPost), "current");
    for (const field of ["date", "updated", "tags", "published", "featured", "image", "imageAlt"]) {
      assert.deepEqual(translation[field], englishPost[field], `${locale} ${englishPost.slug} ${field} changed`);
    }
    assert.deepEqual(headingLevels(translation.content), headingLevels(englishPost.content), `${locale} ${englishPost.slug} heading levels differ`);
    assert.deepEqual(fencedBlocks(translation.content), fencedBlocks(englishPost.content), `${locale} ${englishPost.slug} code blocks differ`);
    assert.deepEqual(sourceUrls(translation.content), sourceUrls(englishPost.content), `${locale} ${englishPost.slug} source links differ`);
    assert.equal((translation.content.match(/^\s*\|.*\|\s*$/gm) ?? []).length, (englishPost.content.match(/^\s*\|.*\|\s*$/gm) ?? []).length, `${locale} ${englishPost.slug} table structure differs`);
    assert.equal((translation.content.match(/^\s*>/gm) ?? []).length, (englishPost.content.match(/^\s*>/gm) ?? []).length, `${locale} ${englishPost.slug} blockquote structure differs`);
    assert.deepEqual(listHierarchy(translation.content), listHierarchy(englishPost.content), `${locale} ${englishPost.slug} list hierarchy differs`);
    assert.deepEqual(numericTokens(translation.content), numericTokens(englishPost.content), `${locale} ${englishPost.slug} numeric facts differ`);
    assert.equal((translation.content.match(/\$/g) ?? []).length, (englishPost.content.match(/\$/g) ?? []).length, `${locale} ${englishPost.slug} currency markers differ`);
  }
}

const articleSource = readFileSync(join(writingRoot, "en", `${englishPosts[0].slug}.mdx`), "utf8");
const articleSourceLf = articleSource.replace(/\r\n?/g, "\n");
assert.equal(calculateArticleSourceHash(articleSource), calculateArticleSourceHash(articleSource), "source hash must be deterministic");
assert.equal(calculateArticleSourceHash(articleSource), calculateArticleSourceHash(articleSourceLf.replace(/\n/g, "\r\n")), "source hash must normalize line endings");
assert.notEqual(calculateArticleSourceHash(articleSource), calculateArticleSourceHash(`${articleSource}\n`), "source hash must change when source content changes");

const enSourcePath = "content/writing/en/foo.mdx";
const esSourcePath = "content/writing/es/foo.mdx";
const hiSourcePath = "content/writing/hi/foo.mdx";
assert.deepEqual(parseWritingArticlePath(enSourcePath), { locale: "en", slug: "foo", legacyRoot: false });
assert.deepEqual(parseWritingArticlePath(esSourcePath), { locale: "es", slug: "foo", legacyRoot: false });
assert.deepEqual(parseWritingArticlePath(hiSourcePath), { locale: "hi", slug: "foo", legacyRoot: false });
assert.equal(articleUrl(parseWritingArticlePath(enSourcePath)), "https://sakirsathe.com/writing/foo");
assert.equal(articleUrl(parseWritingArticlePath(esSourcePath)), "https://sakirsathe.com/es/writing/foo");
assert.equal(articleUrl(parseWritingArticlePath(hiSourcePath)), "https://sakirsathe.com/hi/writing/foo");
assert.equal(isWritingArticlePath("content/writing/foo.mdx"), false, "legacy root paths are not normal future paths");
assert.equal(parseWritingArticlePath("content/writing/foo.mdx"), undefined);
assert.deepEqual(parseWritingArticlePath("content/writing/foo.mdx", { allowLegacyRoot: true }), { locale: "en", slug: "foo", legacyRoot: true });
for (const invalidPath of ["content/writing/fr/foo.mdx", "content/drafts/en/foo.mdx", "content/writing/en/foo.txt", "content/writing/en/../foo.mdx", "content/writing/EN/foo.mdx"]) {
  assert.equal(parseWritingArticlePath(invalidPath), undefined, `invalid IndexNow path accepted: ${invalidPath}`);
}
assert.equal(articleUrlsForChange({ newPath: "README.md", newSource: "content" }).length, 0, "unrelated files must not notify");

function indexNowFixture(locale, { published = true, suffix = "", translationKey = "foo" } = {}) {
  return `---\ntitle: "${locale} ${suffix} title"\ndescription: "Description"\ndate: "2026-10-08"\nlocale: ${locale}\ntranslationKey: ${translationKey}\ntags: []\npublished: ${published}\nfeatured: false\n---\nBody${suffix}\n`;
}
for (const locale of ["en", "es", "hi"]) {
  const path = `content/writing/${locale}/foo.mdx`;
  assert.deepEqual(articleUrlsForChange({ newPath: path, newSource: indexNowFixture(locale) }), [articleUrl({ locale, slug: "foo" })]);
  assert.deepEqual(articleUrlsForChange({ newPath: path, newSource: indexNowFixture(locale, { published: false }) }), [], `${locale} unpublished article must not notify`);
  const updated = indexNowFixture(locale, { suffix: " updated" });
  assert.deepEqual(articleUrlsForChange({ oldPath: path, newPath: path, oldSource: indexNowFixture(locale), newSource: updated }), [articleUrl({ locale, slug: "foo" })]);
  assert.deepEqual(articleUrlsForChange({ oldPath: path, newPath: null, oldSource: indexNowFixture(locale) }), [articleUrl({ locale, slug: "foo" })], `${locale} published deletion behavior must remain`);
}
assert.deepEqual(parseNameStatus(`R100\0content/writing/foo.mdx\0content/writing/en/foo.mdx\0`), [{ oldPath: "content/writing/foo.mdx", newPath: "content/writing/en/foo.mdx" }]);
assert.deepEqual(parseNameStatus(`D\0content/writing/foo.mdx\0A\0content/writing/en/foo.mdx\0`), [{ oldPath: "content/writing/foo.mdx", newPath: "content/writing/en/foo.mdx" }], "legacy delete/add must normalize into one English migration");
assert.deepEqual(parseNameStatus(`D\0content/writing/foo.mdx\0`), [], "unmatched legacy root deletion must not be treated as a future source path");
const migrationChanges = [];
for (const slug of ["foo", "bar", "baz"]) {
  const currentEnglishFixture = indexNowFixture("en", { translationKey: slug });
  const oldEnglishFixture = currentEnglishFixture.replace(`locale: en\ntranslationKey: ${slug}\n`, "");
  migrationChanges.push({ oldPath: `content/writing/${slug}.mdx`, newPath: `content/writing/en/${slug}.mdx`, oldSource: oldEnglishFixture, newSource: currentEnglishFixture });
  for (const locale of ["es", "hi"]) migrationChanges.push({ newPath: `content/writing/${locale}/${slug}.mdx`, newSource: indexNowFixture(locale, { translationKey: slug }) });
}
const migrationUrls = buildUrlList(migrationChanges);
assert.equal(new Set(migrationUrls).size, migrationUrls.length, "migration URLs must be deduplicated");
const expectedMigrationUrls = ["https://sakirsathe.com", "https://sakirsathe.com/writing", "https://sakirsathe.com/es/writing", "https://sakirsathe.com/hi/writing"];
for (const slug of ["foo", "bar", "baz"]) expectedMigrationUrls.push(`https://sakirsathe.com/writing/${slug}`, `https://sakirsathe.com/es/writing/${slug}`, `https://sakirsathe.com/hi/writing/${slug}`);
assert.deepEqual([...migrationUrls].sort(), expectedMigrationUrls.sort(), "three-article migration URLs must be complete and deduplicated");
assert.ok(!migrationUrls.some((url) => url.includes("/en/")));
assert.ok(!migrationUrls.some((url) => url.includes("localhost")));
assert.deepEqual(buildUrlList([{ newPath: esSourcePath, newSource: indexNowFixture("es", { suffix: " updated" }), oldPath: esSourcePath, oldSource: indexNowFixture("es") }]), ["https://sakirsathe.com/es/writing/foo", "https://sakirsathe.com/es/writing"]);
assert.deepEqual(buildUrlList([{ newPath: enSourcePath, newSource: indexNowFixture("en", { suffix: " updated" }), oldPath: enSourcePath, oldSource: indexNowFixture("en") }]), ["https://sakirsathe.com/writing/foo", "https://sakirsathe.com/writing", "https://sakirsathe.com"]);
assert.deepEqual(buildUrlList([{ newPath: "README.md", newSource: "not MDX" }]), []);
assert.match(readFileSync(fileURLToPath(new URL("../scripts/notify-indexnow.mjs", import.meta.url)), "utf8"), /INDEXNOW_DRY_RUN/);
assert.match(readFileSync(fileURLToPath(new URL("../.github/workflows/azure-static-web-apps-icy-river-0ce038c10.yml", import.meta.url)), "utf8"), /github\.event_name == 'push' && github\.ref == 'refs\/heads\/main'/);

const writingSource = readFileSync(fileURLToPath(new URL("../lib/writing.ts", import.meta.url)), "utf8");
assert.match(writingSource, /export function getPost\(slug: string, locale: Locale = defaultLocale\): Post \| undefined \{\s*return getPublishedPosts\(locale\)\.find/, "post lookup must query only the requested locale");
assert.match(writingSource, /const allPostsByLocale = new Map<Locale, Post\[]>/);
assert.match(writingSource, /const publishedPostsByLocale = new Map<Locale, Post\[]>/);
assert.ok(!localizePath("/writing/example", "en").startsWith("/en/"));

const localizedWritingRouteRoot = fileURLToPath(new URL("../app/[locale]/writing/", import.meta.url));
const localizedWritingRoute = readFileSync(join(localizedWritingRouteRoot, "[slug]", "page.tsx"), "utf8");
assert.match(localizedWritingRoute, /getPublishedPosts\(params\.locale\)\.map\(\(post\) => \(\{ slug: post\.slug \}\)\)/);
assert.match(localizedWritingRoute, /getPublishedPost\(slug, localeParam\)/);
assert.ok(!localizedWritingRoute.includes("/en/writing"));
const rssSource = readFileSync(fileURLToPath(new URL("../app/(english)/rss.xml/route.ts", import.meta.url)), "utf8");
const sitemapSource = readFileSync(fileURLToPath(new URL("../app/(english)/sitemap.ts", import.meta.url)), "utf8");
assert.match(rssSource, /generateRss\("en"\)/);
assert.match(sitemapSource, /getLanguageAlternates\(path\)/);
assert.match(sitemapSource, /alternates: \{ languages \}/);
assert.match(rssSource, /generateRss\("en"\)/);
const localizedRssRoute = readFileSync(fileURLToPath(new URL("../app/[locale]/rss.xml/route.ts", import.meta.url)), "utf8");
assert.match(localizedRssRoute, /generateRss\(locale\)/);
assert.match(localizedRssRoute, /isTranslatedLocale\(locale\)/);
assert.ok(!localizedRssRoute.includes("/en/rss.xml"));
const rssGeneratorSource = readFileSync(fileURLToPath(new URL("../lib/rss.ts", import.meta.url)), "utf8");
assert.match(rssGeneratorSource, /getPublishedPosts\(locale\)/);
assert.match(rssGeneratorSource, /<language>\$\{locale\}<\/language>/);
assert.match(rssGeneratorSource, /guid isPermaLink="true">\$\{post\.canonicalUrl\}/);
assert.match(rssGeneratorSource, /getDictionary\(locale\)\.feed/);
const rssDiscoverySource = readFileSync(fileURLToPath(new URL("../lib/rss-metadata.ts", import.meta.url)), "utf8");
assert.match(rssDiscoverySource, /localizePath\("\/rss\.xml", locale\)/);
assert.match(rssDiscoverySource, /getDictionary\(locale\)\.feed\.title/);
assert.equal(localizePath("/rss.xml", "en"), "/rss.xml");
assert.equal(localizePath("/rss.xml", "es"), "/es/rss.xml");
assert.equal(localizePath("/rss.xml", "hi"), "/hi/rss.xml");
assert.ok(!localizePath("/rss.xml", "en").startsWith("/en/"));
for (const locale of supportedLocales) {
  const posts = publishedWritingByLocale.get(locale);
  assert.equal(posts.length, 3, `${locale} feed item count`);
  for (const post of posts) {
    const expectedLink = locale === "en" ? `/writing/${post.slug}` : `/${locale}/writing/${post.slug}`;
    assert.equal(localizePath(`/writing/${post.slug}`, locale), expectedLink, `${locale} feed link stays in its locale`);
  }
}
assert.deepEqual(
  [en.feed.title, es.feed.title, hi.feed.title],
  ["Sakir Sathe — Writing", "Sakir Sathe — Artículos", "Sakir Sathe — लेख"],
  "feed channel titles must be localized",
);
assert.match(localizedRssRoute, /translatedLocales\.map\(\(locale\) => \(\{ locale \}\)\)/);
const pageMetadataSource = readFileSync(fileURLToPath(new URL("../lib/utils.ts", import.meta.url)), "utf8");
assert.match(pageMetadataSource, /getRssDiscoveryMetadata\(locale\)/);
const robotsSource = readFileSync(fileURLToPath(new URL("../public/robots.txt", import.meta.url)), "utf8");
assert.ok(robotsSource.includes("Sitemap: https://sakirsathe.com/sitemap.xml"));
const commentsSource = readFileSync(fileURLToPath(new URL("../components/article-comments.tsx", import.meta.url)), "utf8");
assert.match(commentsSource, /mapping="pathname"/);
assert.match(commentsSource, /const giscusLanguageByLocale: Record<Locale, GiscusLanguage>/);
assert.match(commentsSource, /hi: "en"/);
assert.match(commentsSource, /lang=\{giscusLanguageByLocale\[locale\]\}/);

const localizedArticleRoutes = translatedLocales.reduce((count, locale) => count + publishedWritingByLocale.get(locale).length, 0);
console.log(`i18n validated: ${publishedWorkCount} Work records / ${expectedTranslatedWorkRoutes} localized details; Writing en=${publishedWritingByLocale.get("en").length}, es=${publishedWritingByLocale.get("es").length}, hi=${publishedWritingByLocale.get("hi").length}; ${localizedArticleRoutes} translated detail routes`);