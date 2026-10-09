import { load } from "js-yaml";
import type { Locale } from "@/lib/i18n/locales";
import type { PostFrontmatter } from "@/types";

const FRONTMATTER = /^---[ \t]*\r?\n([\s\S]*?)\r?\n---[ \t]*(?:\r?\n|$)/;

export function parseMdxFrontmatter(source: string, filename: string) {
  const match = FRONTMATTER.exec(source);
  if (!match) {
    throw new Error(`${filename}: expected YAML frontmatter delimited by --- at the start of the file.`);
  }

  let data: unknown;
  try {
    data = load(match[1] ?? "");
  } catch (error) {
    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`${filename}: invalid YAML frontmatter: ${detail}`);
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    throw new Error(`${filename}: frontmatter must be a YAML mapping.`);
  }

  return {
    data: data as Record<string, unknown>,
    content: source.slice(match[0].length),
  };
}

export function validatePostFrontmatter(data: Record<string, unknown>, filename: string, expectedLocale: Locale): PostFrontmatter {
  const allowed = new Set(["title", "description", "date", "locale", "translationKey", "translationSourceHash", "updated", "tags", "published", "featured", "image", "imageAlt"]);
  const unknown = Object.keys(data).filter((key) => !allowed.has(key));
  if (unknown.length) throw new Error(`${filename}: unsupported frontmatter field(s): ${unknown.join(", ")}.`);

  const requiredString = (field: "title" | "description"): string => {
    const value = data[field];
    if (typeof value !== "string" || !value.trim()) throw new Error(`${filename}: "${field}" must be a non-empty string.`);
    return value.trim();
  };

  if (typeof data.locale !== "string" || !["en", "es", "hi"].includes(data.locale)) {
    throw new Error(`${filename}: "locale" must be one of en, es, or hi.`);
  }
  if (data.locale !== expectedLocale) throw new Error(`${filename}: frontmatter locale "${data.locale}" does not match folder locale "${expectedLocale}".`);
  if (typeof data.translationKey !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(data.translationKey)) {
    throw new Error(`${filename}: "translationKey" must be a non-empty lowercase slug.`);
  }
  if (expectedLocale === "en" && data.translationSourceHash !== undefined) {
    throw new Error(`${filename}: English source articles must not define "translationSourceHash".`);
  }
  if (expectedLocale !== "en" && (typeof data.translationSourceHash !== "string" || !/^[a-f0-9]{64}$/.test(data.translationSourceHash))) {
    throw new Error(`${filename}: translated articles require a SHA-256 "translationSourceHash".`);
  }

  const validDate = (field: "date" | "updated"): string => {
    const value = data[field];
    let date: string;
    if (value instanceof Date) {
      if (Number.isNaN(value.getTime())) throw new Error(`${filename}: "${field}" must be a valid date in YYYY-MM-DD format.`);
      date = value.toISOString().slice(0, 10);
    } else if (typeof value === "string") {
      date = value.trim();
    } else {
      throw new Error(`${filename}: "${field}" must be a valid date in YYYY-MM-DD format.`);
    }
    const parsedDate = /^\d{4}-\d{2}-\d{2}$/.test(date) ? new Date(`${date}T00:00:00.000Z`) : undefined;
    if (!parsedDate || Number.isNaN(parsedDate.getTime()) || parsedDate.toISOString().slice(0, 10) !== date) {
      throw new Error(`${filename}: "${field}" must be a valid date in YYYY-MM-DD format.`);
    }
    return date;
  };

  if (!Array.isArray(data.tags) || data.tags.some((tag) => typeof tag !== "string" || !tag.trim())) {
    throw new Error(`${filename}: "tags" must be an array of non-empty strings.`);
  }
  if (typeof data.published !== "boolean") throw new Error(`${filename}: "published" must be a boolean.`);
  if (typeof data.featured !== "boolean") throw new Error(`${filename}: "featured" must be a boolean.`);

  const frontmatter: PostFrontmatter = {
    title: requiredString("title"),
    description: requiredString("description"),
    date: validDate("date"),
    locale: data.locale as Locale,
    translationKey: data.translationKey,
    tags: data.tags.map((tag) => (tag as string).trim()),
    published: data.published,
    featured: data.featured,
  };

  if (data.translationSourceHash !== undefined) frontmatter.translationSourceHash = data.translationSourceHash as string;

  if (data.updated !== undefined) frontmatter.updated = validDate("updated");
  if (data.image !== undefined) {
    if (typeof data.image !== "string" || !data.image.trim()) throw new Error(`${filename}: "image" must be a non-empty URL or site-relative path.`);
    const image = data.image.trim();
    if (image.startsWith("/")) {
      if (image.startsWith("//")) throw new Error(`${filename}: "image" must be a secure URL or site-relative path.`);
    } else {
      try {
        if (new URL(image).protocol !== "https:") throw new Error();
      } catch {
        throw new Error(`${filename}: "image" must be a secure URL or site-relative path.`);
      }
    }
    frontmatter.image = image;
  }
  if (data.imageAlt !== undefined) {
    if (typeof data.imageAlt !== "string" || !data.imageAlt.trim()) throw new Error(`${filename}: "imageAlt" must be a non-empty string.`);
    frontmatter.imageAlt = data.imageAlt.trim();
  }
  if (frontmatter.image && !frontmatter.imageAlt) throw new Error(`${filename}: "imageAlt" is required when "image" is provided.`);

  return frontmatter;
}