import { createHash } from "node:crypto";
import type { Post } from "@/types";

/** Hash meaningful article frontmatter and body; normalize EOLs and omit locale/translation identity metadata. */
export function calculateArticleSourceHash(source: string): string {
  const normalized = source.replace(/\r\n?/g, "\n");
  const match = /^---[ \t]*\n([\s\S]*?)\n---[ \t]*(?:\n|$)/.exec(normalized);
  if (!match) throw new Error("Cannot fingerprint an article without YAML frontmatter.");
  const contentFields = (match[1] ?? "")
    .split("\n")
    .filter((line) => !/^\s*(?:locale|translationKey|translationSourceHash)\s*:/i.test(line))
    .join("\n");
  const body = normalized.slice(match[0].length);
  const fingerprint = `${contentFields}\n---\n${body}`;
  return createHash("sha256").update(fingerprint, "utf8").digest("hex");
}

export type TranslationStatus = "current" | "stale" | "missing";

export function getTranslationStatus(
  translation: Pick<Post, "translationSourceHash"> | undefined,
  englishSource: Pick<Post, "sourceHash"> | undefined,
): TranslationStatus {
  if (!translation) return "missing";
  if (!englishSource || translation.translationSourceHash !== englishSource.sourceHash) return "stale";
  return "current";
}