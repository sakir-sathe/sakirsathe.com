import type { Locale } from "@/lib/i18n/locales";
import type { LocaleContentTargets } from "@/lib/i18n/content-targets";

export type ResolveLocaleTargetOptions = {
  pathname: string;
  targetLocale: Locale;
  catalog: LocaleContentTargets;
  supportedLocales: readonly Locale[];
  defaultLocale: Locale;
  topLevelPaths: readonly string[];
  localizePath: (path: string, locale: Locale) => string;
};

/** Resolve only a known translated page; unknown or unpublished content has no target. */
export function resolveLocaleTarget({ pathname, targetLocale, catalog, supportedLocales, defaultLocale, topLevelPaths, localizePath }: ResolveLocaleTargetOptions): string | undefined {
  if (!supportedLocales.includes(targetLocale)) throw new RangeError(`Unsupported locale: ${String(targetLocale)}`);
  if (typeof pathname !== "string" || !pathname.startsWith("/")) return undefined;

  const pathOnly = pathname.split(/[?#]/, 1)[0] ?? "/";
  const segments = pathOnly.split("/").filter(Boolean);
  if (segments[0] === defaultLocale || (supportedLocales.includes(segments[0] as Locale) && supportedLocales.includes(segments[1] as Locale))) return undefined;

  const hasLocalePrefix = supportedLocales.includes(segments[0] as Locale);
  const sourceLocale = hasLocalePrefix ? segments[0] as Locale : defaultLocale;
  const contentSegments = hasLocalePrefix ? segments.slice(1) : segments;
  const contentPath = contentSegments.length ? `/${contentSegments.join("/")}` : "/";
  if (topLevelPaths.includes(contentPath)) {
    return localizePath(contentPath, targetLocale);
  }

  const workMatch = /^\/work\/([^/]+)$/.exec(contentPath);
  if (workMatch) {
    const sourceSlug = workMatch[1];
    const targets = sourceSlug
      ? (catalog.work as Record<string, Partial<Record<Locale, string>>>)[sourceSlug]
      : undefined;
    const targetSlug = targets?.[sourceLocale] && targets[targetLocale] ? targets[targetLocale] : undefined;
    return targetSlug ? localizePath(`/work/${targetSlug}`, targetLocale) : undefined;
  }

  const writingMatch = /^\/writing\/([^/]+)$/.exec(contentPath);
  if (writingMatch) {
    const sourceSlug = writingMatch[1];
    const translation = Object.values(catalog.writing).find((targets) => targets[sourceLocale] === sourceSlug);
    const targetSlug = translation?.[targetLocale];
    return targetSlug ? localizePath(`/writing/${targetSlug}`, targetLocale) : undefined;
  }

  return undefined;
}
