import { getPublishedPosts } from "@/lib/writing";
import { PostRow } from "@/components/cards";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { Container, EmptyState, PageHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/utils";

const intro = "Essays and notes on software engineering, AI, architecture, open source, career, building products, travel, and things I learn along the way.";
export const metadata = pageMetadata({ title: "Writing", description: intro, path: "/writing" });

const topics = ["Engineering", "AI", "Architecture", "Open Source", "Career", "Building", "Travel", "Personal"];

export default function WritingPage() {
  const posts = getPublishedPosts();
  return (
    <>
      <PageHeader index="04" label="Writing" title="Writing" intro={intro} />
      <section className="py-16 md:py-20">
        <Container className="grid gap-14 lg:grid-cols-[1fr_240px] lg:gap-20">
          <div>
            <NewsletterSignup
              heading="Get new posts by email"
              description="Subscribe to receive new essays and notes when I publish them."
              className="mb-12"
            />
            <h2 className="sr-only">Published articles</h2>
            {posts.length > 0 ? (
              <div className="border-t border-line">{posts.map((p) => <PostRow key={p.slug} p={p} />)}</div>
            ) : (
              <EmptyState code="Index · 0 published" title="No articles published yet" body="Published engineering articles appear here when they are ready. Follow the RSS feed for new writing.">
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
