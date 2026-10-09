import type { ReactNode } from "react";
import Script from "next/script";
import { site, social } from "@/data/site";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { SkipLink } from "@/components/skip-link";
import { JsonLd } from "@/components/json-ld";

const sameAs = [social.github.url, social.linkedin.url].filter((url): url is string => Boolean(url));

export function SiteDocument({ children }: { children: ReactNode }) {
  return (
    <>
      {process.env.NODE_ENV === "production" && (
        <Script
          id="cloudflare-web-analytics"
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"91f13764172f47c8b3277a3c23e57e4c"}'
          strategy="afterInteractive"
        />
      )}
      <SkipLink />
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
    </>
  );
}
