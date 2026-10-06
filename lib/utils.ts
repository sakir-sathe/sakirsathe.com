import type { Metadata } from "next";
import { site } from "@/data/site";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

export function absoluteUrl(p: string): string {
  return `${site.url}${p === "/" ? "" : p}`;
}

/** Sentinel param used so static export succeeds when a collection has no published entries. */
export const EMPTY_PARAM = "__none";

export function pageMetadata(opts: { title?: string; description?: string; path: string; type?: "website" | "article" }): Metadata {
  const title = opts.title ? `${opts.title} — ${site.name}` : site.title;
  const description = opts.description ?? site.description;
  return {
    title: opts.title ? opts.title : { absolute: site.title },
    description,
    alternates: { canonical: absoluteUrl(opts.path) },
    openGraph: { title, description, url: absoluteUrl(opts.path), siteName: site.name, type: opts.type ?? "website", locale: site.locale },
    twitter: { card: "summary_large_image", title, description },
  };
}
