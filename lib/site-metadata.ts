import type { Metadata, Viewport } from "next";
import { site } from "@/data/site";
import { getAlternateOpenGraphLocales, getLanguageAlternates, localeSeoConfig } from "@/lib/i18n/seo";
import { getRssDiscoveryMetadata } from "@/lib/rss-metadata";

export const siteMetadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: { index: true, follow: true },
  alternates: {
    canonical: site.url,
    types: getRssDiscoveryMetadata("en").types,
    languages: getLanguageAlternates("/"),
  },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: localeSeoConfig.en.openGraphLocale,
    alternateLocale: getAlternateOpenGraphLocales("/", "en"),
  },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  icons: { icon: "/favicon.svg" },
};

export const siteViewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e17" },
  ],
};
