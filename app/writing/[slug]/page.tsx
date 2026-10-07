import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { getAdjacentPosts, getArticleHeadings, getPublishedPost, getPublishedPosts, getRelatedPosts } from "@/lib/writing";
import { site } from "@/data/site";
import { Container, Tag } from "@/components/ui";
import { CopyLink } from "@/components/copy-link";
import { ArticleComments } from "@/components/article-comments";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { PostRow } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { EMPTY_PARAM, absoluteUrl, cn, formatDate, pageMetadata } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Drafts (published: false) are never exported. */
export function generateStaticParams() {
  const posts = getPublishedPosts();
  return posts.length ? posts.map((p) => ({ slug: p.slug })) : [{ slug: EMPTY_PARAM }];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getPublishedPost(slug);
  if (!p) return { robots: { index: false } };
  const image = p.image ? (p.image.startsWith("/") ? absoluteUrl(p.image) : p.image) : undefined;
  return {
    ...pageMetadata({ title: p.title, description: p.description, path: `/writing/${p.slug}`, type: "article" }),
    openGraph: {
      title: p.title,
      description: p.description,
      url: p.canonicalUrl,
      siteName: site.name,
      type: "article" as const,
      locale: site.locale,
      publishedTime: p.date,
      modifiedTime: p.updated ?? p.date,
      authors: [site.name],
      tags: p.tags,
      ...(image ? { images: [{ url: image, alt: p.imageAlt }] } : {}),
    },
    twitter: {
      card: "summary_large_image" as const,
      title: p.title,
      description: p.description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) notFound();
  const headings = getArticleHeadings(post.content);
  let headingIndex = 0;
  const headingComponents = {
    h2: ({ children, ...props }: ComponentProps<"h2">) => {
      const heading = headings[headingIndex++];
      return <h2 {...props} id={heading?.id}>{children}</h2>;
    },
    h3: ({ children, ...props }: ComponentProps<"h3">) => {
      const heading = headings[headingIndex++];
      return <h3 {...props} id={heading?.id}>{children}</h3>;
    },
  };
  const { content } = await compileMDX({
    source: post.content,
    components: headingComponents,
    options: { mdxOptions: { remarkPlugins: [remarkGfm] } },
  });
  const tableOfContents = headings.length >= 3 ? headings : [];
  const { previous, next } = getAdjacentPosts(post.slug);
  const related = getRelatedPosts(post.slug);
  const articleImage = post.image ? (post.image.startsWith("/") ? absoluteUrl(post.image) : post.image) : undefined;

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          author: { "@type": "Person", name: site.name, url: site.url },
          mainEntityOfPage: post.canonicalUrl,
          keywords: post.tags.join(", "),
          ...(articleImage ? { image: { "@type": "ImageObject", url: articleImage, caption: post.imageAlt } } : {}),
        }}
      />
      <Container className="max-w-3xl pt-10 pb-24 md:pt-14">
        <Link href="/writing" className="group inline-flex items-center gap-2 font-mono text-[12px] text-muted hover:text-fg">
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" /> Writing
        </Link>
        <header className="mt-12 border-b border-line pb-10">
          <p className="meta flex flex-wrap gap-x-3">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            {post.updated && <span>Updated {formatDate(post.updated)}</span>}
            <span>{post.readingTime} min read</span>
          </p>
          <h1 className="mt-5 text-[clamp(2rem,4.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-balance">{post.title}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">{post.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
          <div className="mt-5"><CopyLink url={post.canonicalUrl} /></div>
        </header>
        {tableOfContents.length > 0 && (
          <nav aria-label="Table of contents" className="mt-10 border-l-2 border-line pl-5">
            <p className="meta">On this page</p>
            <ul className="mt-3 space-y-2 text-sm">
              {tableOfContents.map((heading) => (
                <li key={heading.id} className={cn(heading.depth === 3 && "ml-4")}>
                  <a href={`#${heading.id}`} className="text-muted transition-colors hover:text-accent">{heading.text}</a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="prose prose-site mt-10 max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-code:before:content-none prose-code:after:content-none prose-table:text-sm prose-th:text-fg prose-td:text-muted">{content}</div>
        {(previous || next) && (
          <nav aria-label="Article navigation" className="mt-16 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
            {previous ? (
              <Link href={`/writing/${previous.slug}`} className="group block">
                <span className="meta inline-flex items-center gap-2"><ArrowLeft className="size-3" aria-hidden="true" />Previous article</span>
                <span className="mt-2 block text-[15px] font-medium group-hover:text-accent">{previous.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={`/writing/${next.slug}`} className="group block sm:text-right">
                <span className="meta inline-flex items-center gap-2 sm:flex-row-reverse"><ArrowRight className="size-3" aria-hidden="true" />Next article</span>
                <span className="mt-2 block text-[15px] font-medium group-hover:text-accent">{next.title}</span>
              </Link>
            )}
          </nav>
        )}
        {related.length > 0 && (
          <section aria-labelledby="related-articles" className="mt-16 border-t border-line pt-6">
            <h2 id="related-articles" className="text-[17px] font-medium tracking-tight">Related articles</h2>
            <div className="mt-2 border-t border-line">{related.map((relatedPost) => <PostRow key={relatedPost.slug} p={relatedPost} />)}</div>
          </section>
        )}
        <NewsletterSignup
          compact
          heading="Enjoyed this article?"
          description="Subscribe to get new posts by email."
          className="mt-16"
        />
        <ArticleComments />
      </Container>
    </article>
  );
}
