import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
import { getPublishedPost, getPublishedPosts } from "@/lib/writing";
import { site } from "@/data/site";
import { Container, Tag } from "@/components/ui";
import { JsonLd } from "@/components/json-ld";
import { EMPTY_PARAM, absoluteUrl, formatDate, pageMetadata } from "@/lib/utils";

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
  return pageMetadata({ title: p.title, description: p.description, path: `/writing/${p.slug}`, type: "article" });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPublishedPost(slug);
  if (!post) notFound();
  const { content } = await compileMDX({ source: post.content });

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
          mainEntityOfPage: absoluteUrl(`/writing/${post.slug}`),
          keywords: post.tags.join(", "),
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
            <span>{post.readingMinutes} min read</span>
          </p>
          <h1 className="mt-5 text-[clamp(2rem,4.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-balance">{post.title}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">{post.tags.map((t) => <Tag key={t}>{t}</Tag>)}</div>
        </header>
        <div className="prose prose-site mt-10 max-w-none prose-headings:font-medium prose-headings:tracking-tight prose-code:before:content-none prose-code:after:content-none">{content}</div>
      </Container>
    </article>
  );
}
