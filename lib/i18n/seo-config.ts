import type { Locale } from "@/lib/i18n/locales";

export const localeSeoConfig: Record<Locale, { htmlLang: string; hreflang: string; openGraphLocale: string }> = {
  en: { htmlLang: "en", hreflang: "en", openGraphLocale: "en_US" },
  es: { htmlLang: "es", hreflang: "es", openGraphLocale: "es_CR" },
  hi: { htmlLang: "hi", hreflang: "hi", openGraphLocale: "hi_IN" },
};
