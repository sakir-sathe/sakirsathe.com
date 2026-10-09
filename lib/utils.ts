import type { Metadata } from "next";
import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n/locales";
import { getAlternateOpenGraphLocales, getLanguageAlternates, localeSeoConfig } from "@/lib/i18n/seo";
import { getLocaleFromPath } from "@/lib/i18n/locales";
import { getRssDiscoveryMetadata } from "@/lib/rss-metadata";

export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

export function formatDate(iso: string, locale: Locale = "en"): string {
  const dateLocales: Record<Locale, string> = { en: "en-US", es: "es-CR", hi: "hi-IN" };
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString(dateLocales[locale], { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });
}

export function absoluteUrl(p: string): string {
  return `${site.url}${p === "/" ? "" : p}`;
}

/** Sentinel param used so static export succeeds when a collection has no published entries. */
export const EMPTY_PARAM = "__none";

export function pageMetadata(opts: { title?: string; description?: string; path: string; type?: "website" | "article"; locale?: Locale }): Metadata {
  const title = opts.title ? `${opts.title} — ${site.name}` : site.title;
  const description = opts.description ?? site.description;
  const locale = opts.locale ?? getLocaleFromPath(opts.path);
  const alternates = getLanguageAlternates(opts.path);
  const alternateLocale = getAlternateOpenGraphLocales(opts.path, locale);
  return {
    title: opts.title ? opts.title : { absolute: site.title },
    description,
    alternates: {
      canonical: absoluteUrl(opts.path),
      types: getRssDiscoveryMetadata(locale).types,
      ...(Object.keys(alternates).length ? { languages: alternates } : {}),
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(opts.path),
      siteName: site.name,
      type: opts.type ?? "website",
      locale: localeSeoConfig[locale].openGraphLocale,
      ...(alternateLocale.length ? { alternateLocale } : {}),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}
