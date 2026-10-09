import type { ReactNode } from "react";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "../globals.css";
import { SiteDocument } from "@/components/site-document";
import { siteMetadata, siteViewport } from "@/lib/site-metadata";
import { themeScript } from "@/lib/theme";

export const metadata = siteMetadata;
export const viewport = siteViewport;

export default function EnglishRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <script id="theme-initialization" dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-[100dvh] flex-col font-sans">
        <SiteDocument>{children}</SiteDocument>
      </body>
    </html>
  );
}
