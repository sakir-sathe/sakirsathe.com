import fs from "node:fs";
import path from "node:path";
import type { Post, PostFrontmatter } from "@/types";
import { parseMdxFrontmatter } from "@/lib/mdx-frontmatter";

const DIR = path.join(process.cwd(), "content", "writing");

function toFrontmatter(data: Record<string, unknown>, slug: string): PostFrontmatter {
  const str = (v: unknown, k: string): string => {
    if (typeof v === "string") return v;
    if (v instanceof Date) return v.toISOString().slice(0, 10);
    throw new Error(`content/writing/${slug}.mdx: missing "${k}"`);
  };
  return {
    title: str(data.title, "title"),
    description: str(data.description, "description"),
    date: str(data.date, "date"),
    updated: data.updated ? str(data.updated, "updated") : undefined,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    published: data.published === true,
    featured: data.featured === true,
  };
}

function readAll(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(DIR, file), "utf8");
      const { data, content } = parseMdxFrontmatter(raw, `content/writing/${file}`);
      const words = content.split(/\s+/).filter(Boolean).length;
      return { ...toFrontmatter(data, slug), slug, content, readingMinutes: Math.max(1, Math.round(words / 230)) };
    });
}

/** Only published posts. Drafts are never listed, rendered or exported. */
export function getPublishedPosts(): Post[] {
  return readAll()
    .filter((p) => p.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPublishedPost(slug: string): Post | undefined {
  return getPublishedPosts().find((p) => p.slug === slug);
}

export function getDraftCount(): number {
  return readAll().filter((p) => !p.published).length;
}
