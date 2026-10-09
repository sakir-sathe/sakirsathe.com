import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { SiteDocument } from "@/components/site-document";
import { isTranslatedLocale, translatedLocales } from "@/lib/i18n/locales";
import { localeSeoConfig } from "@/lib/i18n/seo";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import { themeScript } from "@/lib/theme";

export const metadata = siteMetadata;
export const viewport = siteViewport;
export const dynamicParams = false;

export function generateStaticParams() {
  return translatedLocales.map((locale) => ({ locale }));
}

type Props = { children: ReactNode; params: Promise<{ locale: string }> };

export default async function LocaleRootLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return (
    <html lang={localeSeoConfig[locale].htmlLang} suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script id="theme-initialization" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-[100dvh] flex-col font-sans">
        <SiteDocument>{children}</SiteDocument>
      </body>
    </html>
  );
}
