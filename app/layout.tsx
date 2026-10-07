import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { site, social } from "@/data/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { themeScript } from "@/lib/theme";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s — ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  robots: { index: true, follow: true },
  alternates: { canonical: site.url, types: { "application/rss+xml": `${site.url}/rss.xml` } },
  openGraph: { type: "website", url: site.url, siteName: site.name, title: site.title, description: site.description, locale: site.locale },
  twitter: { card: "summary_large_image", title: site.title, description: site.description },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f6f2" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e17" },
  ],
};

const sameAs = [social.github.url, social.linkedin.url].filter((u): u is string => Boolean(u));

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-[100dvh] flex-col font-sans">
        <Script id="theme-initialization" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeScript }} />
        <Script
          id="cloudflare-web-analytics"
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"91f13764172f47c8b3277a3c23e57e4c"}'
          strategy="afterInteractive"
        />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-raised focus:px-3 focus:py-2 focus:text-sm">Skip to content</a>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            url: site.url,
            email: `mailto:${site.email}`,
            jobTitle: site.jobTitle,
            address: { "@type": "PostalAddress", addressCountry: site.countryCode },
            knowsAbout: ["C#", ".NET", "ASP.NET Core", "Azure", "Software architecture", "RAG", "AI search"],
            ...(sameAs.length ? { sameAs } : {}),
          }}
        />
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
