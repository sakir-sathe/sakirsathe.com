"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SocialAnchor } from "@/components/social-anchor";
import { nav, site, social, socialHref, socialTitle } from "@/data/site";
import { getDictionary } from "@/lib/i18n/dictionary";
import { getLocaleFromPath, localizePath } from "@/lib/i18n/locales";

export function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname ?? "/");
  const dictionary = getDictionary(locale);
  const labels = [dictionary.nav.engineering, dictionary.nav.work, dictionary.nav.openSource, dictionary.nav.writing, dictionary.nav.labs, dictionary.nav.about];
  return (
    <footer className="border-t border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="text-[15px] font-medium tracking-tight">{site.name}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">{dictionary.site.footerDescription.replace("{location}", site.location)}</p>
        </div>
        <nav aria-label="Footer">
          <p className="meta mb-3">{dictionary.common.siteSection}</p>
          <ul className="grid grid-cols-2 gap-y-2 text-sm text-muted">
            {nav.map((n, index) => (
              <li key={n.href}><Link href={localizePath(n.href, locale)} className="link-underline hover:text-fg">{labels[index]}</Link></li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="meta mb-3">{dictionary.common.elsewhere}</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><SocialAnchor href={socialHref(social.github)} title={socialTitle(social.github)} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">GitHub</SocialAnchor></li>
            <li><SocialAnchor href={socialHref(social.linkedin)} title={socialTitle(social.linkedin)} target="_blank" rel="noopener noreferrer" className="link-underline hover:text-fg">LinkedIn</SocialAnchor></li>
            <li><a href={`mailto:${site.email}`} className="link-underline hover:text-fg">{dictionary.common.email}</a></li>
            <li><a href={localizePath("/rss.xml", locale)} className="link-underline hover:text-fg">{dictionary.common.rss}</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 font-mono text-[11px] text-subtle sm:flex-row sm:justify-between sm:px-8">
          <span>{site.domain}</span>
          <span>Static build · Next.js · Azure Static Web Apps</span>
        </div>
      </div>
    </footer>
  );
}
