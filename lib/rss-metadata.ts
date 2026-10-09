import { getDictionary } from "@/lib/i18n/dictionary";
import { localizePath, type Locale } from "@/lib/i18n/locales";
import { absoluteUrl } from "@/lib/utils";

export function getRssDiscoveryMetadata(locale: Locale) {
  const feedPath = localizePath("/rss.xml", locale);
  return {
    types: {
      "application/rss+xml": [{
        url: absoluteUrl(feedPath),
        title: getDictionary(locale).feed.title,
      }],
    },
  };
}
