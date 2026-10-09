import { Mail } from "lucide-react";
import { SocialAnchor } from "@/components/social-anchor";
import { site, social, socialHref, socialTitle } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Container } from "@/components/ui";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/locales";

export function Contact({ locale = "en" }: { locale?: Locale }) {
  const dictionary = getDictionary(locale).contact;
  const links = [
    { label: "GitHub", sub: social.github.url ? dictionary.profile : "", href: socialHref(social.github), title: socialTitle(social.github), Icon: GitHubIcon, external: true },
    { label: "LinkedIn", sub: social.linkedin.url ? dictionary.profile : "", href: socialHref(social.linkedin), title: socialTitle(social.linkedin), Icon: LinkedInIcon, external: true },
    { label: getDictionary(locale).common.email, sub: site.email, href: `mailto:${site.email}`, title: `${getDictionary(locale).common.email} ${site.email}`, Icon: Mail, external: false },
  ];
  return (
    <section aria-labelledby="contact-heading" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 border-t border-line pt-6 md:grid-cols-[180px_1fr] md:gap-10">
          <p className="meta flex items-center gap-2"><span className="text-accent">§</span><span className="h-px w-4 bg-line-strong" aria-hidden="true" />{dictionary.label}</p>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 id="contact-heading" className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">{dictionary.title}</h2>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-muted">{dictionary.description}</p>
            </div>
            <ul className="border-t border-line">
              {links.map(({ label, sub, href, title, Icon, external }) => (
                <li key={label} className="border-b border-line">
                  <SocialAnchor href={href} title={title} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="group flex items-center justify-between py-4">
                    <span className="flex items-center gap-3 text-[15px]"><Icon className="size-4 text-subtle transition-colors group-hover:text-accent" />{label}</span>
                    <span className="font-mono text-[12px] text-subtle transition-transform duration-300 group-hover:-translate-x-1">{sub}</span>
                  </SocialAnchor>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
