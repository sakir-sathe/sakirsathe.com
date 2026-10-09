import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import type { Metadata } from "next";
import { getAdjacentPosts, getArticleHeadings, getRelatedPosts } from "@/lib/writing";
import { site } from "@/data/site";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizePath, type Locale } from "@/lib/i18n/locales";
import { getAlternateOpenGraphLocales, localeSeoConfig } from "@/lib/i18n/seo";
import type { Post } from "@/types";
import { Container, Tag } from "@/components/ui";
import { CopyLink } from "@/components/copy-link";
import { ArticleComments } from "@/components/article-comments";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { PostRow } from "@/components/cards";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl, cn, formatDate, pageMetadata } from "@/lib/utils";

export function articleMetadata(post: Post): Metadata {
  const image = post.image ? (post.image.startsWith("/") ? absoluteUrl(post.image) : post.image) : undefined;
  const path = post.locale === "en" ? `/writing/${post.slug}` : `/${post.locale}/writing/${post.slug}`;
  return {
    ...pageMetadata({ title: post.title, description: post.description, path, type: "article", locale: post.locale }),
    openGraph: {
      title: post.title,
      description: post.description,
      url: post.canonicalUrl,
      siteName: site.name,
      type: "article",
      locale: localeSeoConfig[post.locale].openGraphLocale,
      alternateLocale: getAlternateOpenGraphLocales(path, post.locale),
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [site.name],
      tags: post.tags,
      ...(image ? { images: [{ url: image, alt: post.imageAlt }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export async function ArticlePage({ post, locale }: { post: Post; locale: Locale }) {
  if (post.locale !== locale) notFound();
  const dictionary = getDictionary(locale);
  const labels = dictionary.articlePage;
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
  const { previous, next } = getAdjacentPosts(post.slug, locale);
  const related = getRelatedPosts(post.slug, locale);
  const articleImage = post.image ? (post.image.startsWith("/") ? absoluteUrl(post.image) : post.image) : undefined;

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          inLanguage: localeSeoConfig[locale].htmlLang,
          datePublished: post.date,
          dateModified: post.updated ?? post.date,
          author: { "@type": "Person", name: site.name, url: site.url },
          url: post.canonicalUrl,
          mainEntityOfPage: post.canonicalUrl,
          keywords: post.tags.join(", "),
          ...(articleImage ? { image: { "@type": "ImageObject", url: articleImage, caption: post.imageAlt } } : {}),
        }}
      />
      <Container className="max-w-3xl pt-10 pb-24 md:pt-14">
        <Link href={localizePath("/writing", locale)} className="group inline-flex items-center gap-2 font-mono text-[12px] text-muted hover:text-fg">
          <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" /> {labels.backToWriting}
        </Link>
        <header className="mt-12 border-b border-line pb-10">
          <p className="meta flex flex-wrap gap-x-3">
            <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
            {post.updated && <span>{labels.updated} {formatDate(post.updated, locale)}</span>}
            <span>{labels.minutesRead.replace("{count}", String(post.readingTime))}</span>
          </p>
          <h1 className="mt-5 text-[clamp(2rem,4.6vw,3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-balance">{post.title}</h1>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">{post.description}</p>
          <div className="mt-6 flex flex-wrap gap-1.5">{post.tags.map((tag) => <Tag key={tag}>{tag}</Tag>)}</div>
          <div className="mt-5"><CopyLink url={post.canonicalUrl} labels={{ copy: labels.copyLink, copyAriaLabel: labels.copyAriaLabel, copied: labels.copied, copiedAnnouncement: labels.articleLinkCopied, failedAnnouncement: labels.unableToCopy }} /></div>
        </header>
        {tableOfContents.length > 0 && (
          <nav aria-label={dictionary.common.tableOfContents} className="mt-10 border-l-2 border-line pl-5">
            <p className="meta">{labels.onThisPage}</p>
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
          <nav aria-label={labels.articleNavigation} className="mt-16 grid gap-6 border-t border-line pt-6 sm:grid-cols-2">
            {previous ? (
              <Link href={localizePath(`/writing/${previous.slug}`, locale)} className="group block">
                <span className="meta inline-flex items-center gap-2"><ArrowLeft className="size-3" aria-hidden="true" />{labels.previousArticle}</span>
                <span className="mt-2 block text-[15px] font-medium group-hover:text-accent">{previous.title}</span>
              </Link>
            ) : <span />}
            {next && (
              <Link href={localizePath(`/writing/${next.slug}`, locale)} className="group block sm:text-right">
                <span className="meta inline-flex items-center gap-2 sm:flex-row-reverse"><ArrowRight className="size-3" aria-hidden="true" />{labels.nextArticle}</span>
                <span className="mt-2 block text-[15px] font-medium group-hover:text-accent">{next.title}</span>
              </Link>
            )}
          </nav>
        )}
        {related.length > 0 && (
          <section aria-labelledby="related-articles" className="mt-16 border-t border-line pt-6">
            <h2 id="related-articles" className="text-[17px] font-medium tracking-tight">{labels.relatedArticles}</h2>
            <div className="mt-2 border-t border-line">{related.map((relatedPost) => <PostRow key={relatedPost.slug} p={relatedPost} locale={locale} />)}</div>
          </section>
        )}
        <NewsletterSignup compact heading={labels.newsletterHeading} description={labels.newsletterDescription} className="mt-16" />
        <ArticleComments locale={locale} heading={labels.discussion} />
      </Container>
    </article>
  );
}
