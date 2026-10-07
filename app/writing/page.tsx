import { getPublishedPosts } from "@/lib/writing";
import { PostRow } from "@/components/cards";
import { Container, EmptyState, PageHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/utils";

const intro = "Notes on software engineering, .NET, Azure, architecture, AI, developer tooling and lessons learned while building systems.";
export const metadata = pageMetadata({ title: "Writing", description: intro, path: "/writing" });

const topics = [".NET", "ASP.NET Core", "Azure", "Architecture", "Retrieval", "AI agents", "Developer tooling", "Production"];

export default function WritingPage() {
  const posts = getPublishedPosts();
  return (
    <>
      <PageHeader index="04" label="Writing" title="Writing" intro={intro} />
      <section className="py-16 md:py-20">
        <Container className="grid gap-14 lg:grid-cols-[1fr_240px] lg:gap-20">
          <div>
            <h2 className="sr-only">Published articles</h2>
            {posts.length > 0 ? (
              <div className="border-t border-line">{posts.map((p) => <PostRow key={p.slug} p={p} />)}</div>
            ) : (
              <EmptyState code="Index · 0 published" title="The first notes are in draft" body="Articles are published when they are finished and reviewed. There is no fixed schedule. Subscribe to the RSS feed to be notified when the first one arrives.">
                <a href="/rss.xml" className="mt-5 inline-block font-mono text-[12px] text-accent link-underline">Subscribe via /rss.xml</a>
              </EmptyState>
            )}
          </div>
          <aside>
            <p className="meta">Topics</p>
            <ul className="mt-4 flex flex-wrap gap-1.5 lg:flex-col lg:gap-2.5">
              {topics.map((t) => <li key={t} className="text-[14px] text-muted max-lg:rounded-full max-lg:border max-lg:border-line max-lg:px-3 max-lg:py-1">{t}</li>)}
            </ul>
          </aside>
        </Container>
      </section>
    </>
  );
}
