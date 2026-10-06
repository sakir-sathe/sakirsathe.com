import fs from "node:fs";
import path from "node:path";
import type { Post } from "@/types";
import { parseMdxFrontmatter, validatePostFrontmatter } from "@/lib/mdx-frontmatter";
import { absoluteUrl } from "@/lib/utils";

const DIR = path.join(process.cwd(), "content", "writing");

function readAll(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = parseMdxFrontmatter(raw, `content/writing/${file}`);
      const frontmatter = validatePostFrontmatter(data, `content/writing/${file}`);
      const words = content.split(/\s+/).filter(Boolean).length;
      return {
        ...frontmatter,
        slug,
        content,
        readingTime: Math.max(1, Math.round(words / 230)),
        canonicalUrl: absoluteUrl(`/writing/${slug}`),
      };
    });
}

/** Only published posts. Drafts are never listed, rendered or exported. */
export function getPublishedPosts(): Post[] {
  return readAll()
    .filter((p) => p.published)
    .sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function getPublishedPost(slug: string): Post | undefined {
  return getPublishedPosts().find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string): { previous?: Post; next?: Post } {
  const posts = getPublishedPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index < 0) return {};
  return {
    ...(posts[index + 1] ? { previous: posts[index + 1] } : {}),
    ...(posts[index - 1] ? { next: posts[index - 1] } : {}),
  };
}

export function getRelatedPosts(slug: string, limit = 3): Post[] {
  const posts = getPublishedPosts();
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
    .replace(/[^a-z0-9\s-]/g, "")
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
