import { getPublishedProjects } from "@/data/projects";
import { ProjectCard } from "@/components/cards";
import { Container, EmptyState, PageHeader, TextLink } from "@/components/ui";
import { pageMetadata } from "@/lib/utils";

const intro = "Developer tools and experiments built around real engineering problems.";
export const metadata = pageMetadata({ title: "Open Source", description: intro, path: "/open-source" });

export default function OpenSourcePage() {
  const projects = getPublishedProjects();
  return (
    <>
      <PageHeader index="03" label="Open Source" title="Open Source" intro={intro} />
      <section className="py-16 md:py-20">
        <Container>
          <h2 className="sr-only">Published projects</h2>
          {projects.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">{projects.map((p) => <ProjectCard key={p.slug} p={p} externalGithub />)}</div>
          ) : (
            <EmptyState code="Registry · 0 published" title="Repositories are being prepared" body="Projects are listed here only once they have a public repository and a first usable release. Until then there is nothing to show, and nothing is presented as released.">
              <div className="mt-6 flex flex-wrap gap-6">
                <TextLink href="/labs">Follow experiments in labs</TextLink>
                <TextLink href="/writing">Read engineering notes</TextLink>
              </div>
            </EmptyState>
          )}
          <dl className="mt-14 grid gap-6 font-mono text-[12px] text-muted sm:grid-cols-3">
            <div className="border-t border-line pt-4"><dt className="meta">Criteria</dt><dd className="mt-2 leading-relaxed">Public repository, documented, usable.</dd></div>
            <div className="border-t border-line pt-4"><dt className="meta">Metrics</dt><dd className="mt-2 leading-relaxed">No stars or downloads displayed unless real.</dd></div>
            <div className="border-t border-line pt-4"><dt className="meta">Focus</dt><dd className="mt-2 leading-relaxed">.NET, devices, agents, retrieval.</dd></div>
          </dl>
        </Container>
      </section>
    </>
  );
}
