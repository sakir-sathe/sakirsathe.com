import { Mail } from "lucide-react";
import { SocialAnchor } from "@/components/social-anchor";
import { site, social, socialHref, socialTitle } from "@/data/site";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { Container } from "@/components/ui";

export function Contact() {
  const links = [
    { label: "GitHub", sub: social.github.url ? "Profile" : "", href: socialHref(social.github), title: socialTitle(social.github), Icon: GitHubIcon, external: true },
    { label: "LinkedIn", sub: social.linkedin.url ? "Profile" : "", href: socialHref(social.linkedin), title: socialTitle(social.linkedin), Icon: LinkedInIcon, external: true },
    { label: "Email", sub: site.email, href: `mailto:${site.email}`, title: `Email ${site.email}`, Icon: Mail, external: false },
  ];
  return (
    <section aria-labelledby="contact-heading" className="py-20 md:py-28">
      <Container>
        <div className="grid gap-10 border-t border-line pt-6 md:grid-cols-[180px_1fr] md:gap-10">
          <p className="meta flex items-center gap-2"><span className="text-accent">§</span><span className="h-px w-4 bg-line-strong" aria-hidden="true" />Contact</p>
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <h2 id="contact-heading" className="text-[clamp(1.8rem,3.6vw,2.6rem)] font-medium leading-[1.08] tracking-[-0.03em]">Let&rsquo;s connect</h2>
              <p className="mt-4 max-w-md text-[15.5px] leading-relaxed text-muted">I&rsquo;m always interested in thoughtful conversations about software engineering, open source, architecture and developer tooling.</p>
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
