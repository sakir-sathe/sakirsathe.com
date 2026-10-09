import { site } from "@/data/site";
import type { Locale } from "@/lib/i18n/locales";
import { defaultLocale, localizePath, supportedLocales, translatedTopLevelPaths } from "@/lib/i18n/locales";
import { localeContentTargets } from "@/lib/i18n/content-targets";
import { resolveLocaleTarget } from "@/lib/i18n/resolve-locale-target";
import { localeSeoConfig } from "@/lib/i18n/seo-config";

export { localeSeoConfig } from "@/lib/i18n/seo-config";

export function getLanguageAlternates(pathname: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of supportedLocales) {
    const target = resolveLocaleTarget({
      pathname,
      targetLocale: locale,
      catalog: localeContentTargets,
      supportedLocales,
      defaultLocale,
      topLevelPaths: translatedTopLevelPaths,
      localizePath,
    });
    if (target) languages[localeSeoConfig[locale].hreflang] = `${site.url}${target === "/" ? "" : target}`;
  }
  if (languages.en) languages["x-default"] = languages.en;
  return languages;
}

export function getAlternateOpenGraphLocales(pathname: string, locale: Locale): string[] {
  const languages = getLanguageAlternates(pathname);
  return supportedLocales
    .filter((alternate) => alternate !== locale && languages[alternateSeoKey(alternate)] !== undefined)
    .map((alternate) => localeSeoConfig[alternate].openGraphLocale);
}

function alternateSeoKey(locale: Locale): string {
  return localeSeoConfig[locale].hreflang;
}
