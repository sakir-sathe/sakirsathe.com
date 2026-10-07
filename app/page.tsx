import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { capabilities, engineeringIntro, problemAreas } from "@/data/engineering";
import { caseStudies } from "@/data/work";
import { getPublishedProjects } from "@/data/projects";
import { labAreas, labsDescription } from "@/data/labs";
import { site, social, socialHref, socialTitle } from "@/data/site";
import { SocialAnchor } from "@/components/social-anchor";
import { getPublishedPosts } from "@/lib/writing";
import { Container, EmptyState, SectionHeading } from "@/components/ui";
import { CapabilityCard, CaseStudyRow, PostRow, ProjectCard } from "@/components/cards";
import { SystemFigure } from "@/components/system-figure";
import { Contact } from "@/components/contact";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

export default function HomePage() {
  const projects = getPublishedProjects().filter((p) => p.featured);
  const posts = getPublishedPosts().slice(0, 4);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid mask-fade-b absolute inset-0" aria-hidden="true" />
        <Container className="relative grid gap-14 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-10">
          <div>
            <p className="meta rise">{site.headline}</p>
            <h1 className="rise mt-7 text-[15px] font-medium text-muted" style={{ ["--d" as string]: 1 }}>
              <span className="text-fg">{site.name}</span>
              <span className="mx-2 text-line-strong" aria-hidden="true">/</span>
              <span className="font-mono text-[12.5px]">{site.location}</span>
            </h1>
            <p className="rise mt-5 text-[clamp(2.3rem,5.8vw,4.1rem)] font-medium leading-[1.02] tracking-[-0.04em] text-balance" style={{ ["--d" as string]: 2 }}>
              Building reliable software across <span className="text-accent">.NET, cloud, data and&nbsp;AI.</span>
            </p>
            <div className="rise mt-8 max-w-xl space-y-4 text-[16.5px] leading-relaxed text-muted text-pretty" style={{ ["--d" as string]: 3 }}>
              <p>I&rsquo;m a {site.roleSummary} who builds, modernizes and operates complex software systems.</p>
              <p>I remain hands-on across architecture, backend engineering, cloud, data and AI. Alongside that work, I develop reusable tools and write about what I learn while building systems.</p>
            </div>
            <div className="rise mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: 4 }}>
              <Link href="/engineering" className="group inline-flex items-center gap-2 rounded-sm bg-fg px-4 py-2.5 text-sm text-bg transition-opacity hover:opacity-90">
                Explore Engineering <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
              <Link href="/writing" className="inline-flex items-center gap-2 rounded-sm border border-line-strong px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent">
                Read Writing
              </Link>
              <span className="mx-2 hidden h-5 w-px bg-line sm:block" aria-hidden="true" />
              <SocialAnchor href={socialHref(social.github)} title={socialTitle(social.github)} aria-label={socialTitle(social.github)} target="_blank" rel="noopener noreferrer" className="inline-flex size-11 items-center justify-center text-subtle transition-colors hover:text-fg"><GitHubIcon className="size-4" /></SocialAnchor>
              <SocialAnchor href={socialHref(social.linkedin)} title={socialTitle(social.linkedin)} aria-label={socialTitle(social.linkedin)} target="_blank" rel="noopener noreferrer" className="inline-flex size-11 items-center justify-center text-subtle transition-colors hover:text-fg"><LinkedInIcon className="size-[15px]" /></SocialAnchor>
            </div>
          </div>
          <div className="ticks hidden border border-line bg-bg/70 p-5 sm:block lg:p-7">
            <div className="mb-4 flex items-center justify-between font-mono text-[10.5px] text-subtle">
              <span>focus.map</span><span>stack: microsoft / cloud / ai</span>
            </div>
            <SystemFigure />
          </div>
        </Container>
        <Container className="relative">
          <dl className="grid grid-cols-2 gap-px border-t border-line bg-line font-mono text-[11.5px] md:grid-cols-4">
            {[
              ["Experience", "10+ years"],
              ["Primary", "C# · .NET · Azure"],
              ["Current focus", "Retrieval · Agents"],
              ["Based in", site.location],
            ].map(([k, v]) => (
              <div key={k} className="bg-bg py-4 pr-4 [&:nth-child(even)]:pl-4 md:[&:not(:first-child)]:pl-4">
                <dt className="text-[10.5px] uppercase tracking-[0.08em] text-subtle">{k}</dt>
                <dd className="mt-1 text-fg">{v}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* ENGINEERING */}
      <section aria-labelledby="eng" className="py-20 md:py-28">
        <Container>
          <SectionHeading index="01" label="Engineering" title="Engineering across the stack" intro={engineeringIntro} action={{ href: "/engineering", label: "Engineering overview" }} />
          <h2 id="eng" className="sr-only">Capabilities</h2>
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => <CapabilityCard key={c.id} c={c} />)}
          </div>
          <div className="mt-14 md:pl-[220px]">
            <h3 className="text-[19px] font-medium tracking-tight">Problems I like working on</h3>
            <dl className="mt-6 grid gap-x-12 gap-y-7 md:grid-cols-2">
              {problemAreas.map((area) => (
                <div key={area.title} className="border-l border-line pl-5">
                  <dt className="text-[15px] font-medium">{area.title}</dt>
                  <dd className="mt-2 text-[14px] leading-relaxed text-muted">{area.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* WORK */}
      <section aria-label="Selected engineering work" className="pb-20 md:pb-28">
        <Container>
          <SectionHeading index="02" label="Work" title="Selected Engineering Work" intro="A selection of complex systems and engineering problems I've worked on across enterprise software, cloud platforms, data and AI." action={{ href: "/work", label: "All case studies" }} />
          <div className="mt-10 border-t border-line">
            {caseStudies.map((c) => <CaseStudyRow key={c.slug} c={c} />)}
          </div>
          <p className="mt-4 font-mono text-[11px] text-subtle">Anonymized. No employers, clients, products or dates are identified.</p>
        </Container>
      </section>

      {/* OPEN SOURCE + WRITING */}
      <section className="border-y border-line bg-sunken/60 py-20 md:py-28">
        <Container className="grid gap-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeadingCompact index="03" label="Open Source" title="Open Source" intro="Developer tools and experiments built around real engineering problems." href="/open-source" />
            <div className="mt-8 grid gap-4">
              {projects.length > 0
                ? projects.map((p) => <ProjectCard key={p.slug} p={p} />)
                : <EmptyState code="Status · In preparation" title="Nothing released yet" body="Projects appear here once they have a public repository and a first usable release. No placeholders, no inflated numbers." />}
            </div>
          </div>
          <div>
            <SectionHeadingCompact index="04" label="Writing" title="Writing" intro="Notes on software engineering, .NET, Azure, architecture, AI, developer tooling and lessons learned while building systems." href="/writing" />
            <div className="mt-8">
              {posts.length > 0
                ? <div className="border-t border-line">{posts.map((p) => <PostRow key={p.slug} p={p} />)}</div>
                : <EmptyState code="Writing · 0 published" title="No articles published yet" body="Published engineering notes appear here when they are ready. Follow the RSS feed for new writing." >
                    <a href="/rss.xml" className="mt-5 inline-block font-mono text-[12px] text-accent link-underline">/rss.xml</a>
                  </EmptyState>}
            </div>
          </div>
        </Container>
      </section>

      {/* LABS */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeading index="05" label="Labs" title="Labs" intro={labsDescription} action={{ href: "/labs", label: "Visit labs" }} />
          <ul className="mt-10 flex flex-wrap gap-2 md:pl-[220px]">
            {labAreas.map((l) => (
              <li key={l.id} className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-muted transition-colors hover:border-accent hover:text-fg">{l.title}</li>
            ))}
          </ul>
        </Container>
      </section>

      <Contact />
    </>
  );
}

function SectionHeadingCompact({ index, label, title, intro, href }: { index: string; label: string; title: string; intro: string; href: string }) {
  return (
    <div className="border-t border-line pt-6">
      <div className="flex items-center justify-between">
        <p className="meta flex items-center gap-2"><span className="text-accent">{index}</span><span className="h-px w-4 bg-line-strong" aria-hidden="true" />{label}</p>
        <Link href={href} className="font-mono text-[11.5px] text-muted link-underline hover:text-fg">View all</Link>
      </div>
      <h2 className="mt-6 text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.025em]">{title}</h2>
      <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{intro}</p>
    </div>
  );
}
