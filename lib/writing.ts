import fs from "node:fs";
import path from "node:path";
import type { Post } from "@/types";
import { defaultLocale, isLocale, type Locale } from "@/lib/i18n/locales";
import { parseMdxFrontmatter, validatePostFrontmatter } from "@/lib/mdx-frontmatter";
import { absoluteUrl } from "@/lib/utils";
import { calculateArticleSourceHash, getTranslationStatus, type TranslationStatus } from "@/lib/writing-source";

const ROOT = path.join(process.cwd(), "content", "writing");
const allPostsByLocale = new Map<Locale, Post[]>();
const publishedPostsByLocale = new Map<Locale, Post[]>();

export function getAllPosts(locale: Locale = defaultLocale): Post[] {
  if (!isLocale(locale)) throw new RangeError(`Unsupported Writing locale: ${String(locale)}`);
  const cached = allPostsByLocale.get(locale);
  if (cached) return cached;
  const directory = path.join(ROOT, locale);
  if (!fs.existsSync(directory)) {
    allPostsByLocale.set(locale, []);
    return [];
  }
  const posts = fs
    .readdirSync(directory)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const filename = `content/writing/${locale}/${file}`;
      const raw = fs.readFileSync(path.join(directory, file), "utf8");
      const { data, content } = parseMdxFrontmatter(raw, filename);
      const frontmatter = validatePostFrontmatter(data, filename, locale);
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        ...frontmatter,
        slug,
        content,
        readingTime: Math.max(1, Math.round(words / 230)),
        canonicalUrl: absoluteUrl(locale === "en" ? `/writing/${slug}` : `/${locale}/writing/${slug}`),
        sourceHash: calculateArticleSourceHash(raw),
      };
    });
  allPostsByLocale.set(locale, posts);
  return posts;
}

/** Only published sources in the requested locale; translations never fall back to English. */
export function getPublishedPosts(locale: Locale = defaultLocale): Post[] {
  if (!isLocale(locale)) throw new RangeError(`Unsupported Writing locale: ${String(locale)}`);
  const cached = publishedPostsByLocale.get(locale);
  if (cached) return cached;
  const posts = getAllPosts(locale)
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
  publishedPostsByLocale.set(locale, posts);
  return posts;
}

export function getPost(slug: string, locale: Locale = defaultLocale): Post | undefined {
  return getPublishedPosts(locale).find((p) => p.slug === slug);
}

export const getPublishedPost = getPost;

export function getAdjacentPosts(slug: string, locale: Locale = defaultLocale): { previous?: Post; next?: Post } {
  const posts = getPublishedPosts(locale);
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return {};
  return {
    ...(posts[index + 1] ? { previous: posts[index + 1] } : {}),
    ...(posts[index - 1] ? { next: posts[index - 1] } : {}),
  };
}

export function getRelatedPosts(slug: string, locale: Locale = defaultLocale, limit = 3): Post[] {
  const posts = getPublishedPosts(locale);
  const current = posts.find((post) => post.slug === slug);
  if (!current || current.tags.length === 0) return [];
  const tags = new Set(current.tags.map((tag) => tag.toLocaleLowerCase()));
  return posts
    .filter((post) => post.slug !== slug && post.tags.some((tag) => tags.has(tag.toLocaleLowerCase())))
    .sort((a, b) => {
      const sharedA = a.tags.filter((tag) => tags.has(tag.toLocaleLowerCase())).length;
      const sharedB = b.tags.filter((tag) => tags.has(tag.toLocaleLowerCase())).length;
      return sharedB - sharedA || b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug);
    })
    .slice(0, limit);
}

export { calculateArticleSourceHash, getTranslationStatus };
export type { TranslationStatus };

export interface ArticleHeading {
  depth: 2 | 3;
  text: string;
  id: string;
}

function headingText(markdown: string): string {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/[*_~]/g, "")
    .trim();
}

function headingId(text: string): string {
  return text
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{M}\p{N}\s-]/gu, "")
    .trim()
    .replace(/[\s-]+/g, "-");
}

export function getArticleHeadings(source: string): ArticleHeading[] {
  const headings: ArticleHeading[] = [];
  const idCounts = new Map<string, number>();
  let fence: { marker: string; length: number } | undefined;

  for (const line of source.split(/\r?\n/)) {
    const fenceMatch = /^\s{0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (fence) {
      if (fenceMatch?.[0] === fence.marker && fenceMatch.length >= fence.length) fence = undefined;
      continue;
    }
    if (fenceMatch) {
      fence = { marker: fenceMatch[0] ?? "`", length: fenceMatch.length };
      continue;
    }

    const match = /^\s{0,3}(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;
    const text = headingText(match[2] ?? "");
    const base = headingId(text);
    if (!text || !base) continue;
    const occurrence = idCounts.get(base) ?? 0;
    idCounts.set(base, occurrence + 1);
    headings.push({ depth: (match[1]?.length ?? 2) as 2 | 3, text, id: occurrence ? `${base}-${occurrence}` : base });
  }
  return headings;
}
