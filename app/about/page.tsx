import { site } from "@/data/site";
import { Container, PageHeader, Tag } from "@/components/ui";
import { Contact } from "@/components/contact";
import { pageMetadata } from "@/lib/utils";

export const metadata = pageMetadata({ title: "About", description: `${site.name} — ${site.roleSummary} based in ${site.location}.`, path: "/about" });

const primary = ["C#", ".NET", "ASP.NET Core", "Azure"];
const additional = ["Blazor", "React", "Angular", "TypeScript", "SQL Server", "Azure Functions", "Azure DevOps", "Azure AI Search", "RAG", "MCP"];

export default function AboutPage() {
  return (
    <>
      <PageHeader index="06" label="About" title="Engineering where systems meet." />
      <section className="py-16 md:py-24">
        <Container className="grid gap-14 lg:grid-cols-[1fr_300px] lg:gap-24">
          <div className="max-w-2xl space-y-6 text-[17px] leading-[1.75] text-muted text-pretty">
            <p className="text-[20px] leading-relaxed text-fg">I&rsquo;m {site.name}, a {site.roleSummary} based in {site.location}.</p>
            <p>I&rsquo;ve spent more than fourteen years building software across the Microsoft ecosystem, from enterprise .NET applications and databases to cloud platforms, distributed integrations and AI-enabled systems.</p>
            <p>My work often sits where multiple parts of a system meet: application architecture, backend engineering, cloud infrastructure, data, search, automation and production reliability.</p>
            <p>I enjoy understanding how systems work beneath the abstractions, solving practical engineering problems and turning useful solutions into reusable tools.</p>
            <p>Much of my recent exploration has focused on AI-assisted software engineering, retrieval systems, coding agents and developer infrastructure.</p>
            <p>This site is where I document what I learn, publish engineering notes and share open-source work.</p>
          </div>
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <dl className="ticks space-y-7 border border-line bg-raised p-6">
              <div><dt className="meta">Location</dt><dd className="mt-2 text-[15px]">{site.location}</dd></div>
              <div><dt className="meta">Roles</dt><dd className="mt-2 space-y-1 text-[14px] text-muted">{site.roles.map((r) => <p key={r}>{r}</p>)}</dd></div>
              <div><dt className="meta">Primary</dt><dd className="mt-3 flex flex-wrap gap-1.5">{primary.map((t) => <Tag key={t}>{t}</Tag>)}</dd></div>
              <div><dt className="meta">Additional</dt><dd className="mt-3 flex flex-wrap gap-1.5">{additional.map((t) => <Tag key={t}>{t}</Tag>)}</dd></div>
            </dl>
          </aside>
        </Container>
      </section>
      <Contact />
    </>
  );
}
