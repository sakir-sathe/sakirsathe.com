import { notFound } from "next/navigation";
import { ArticlePage, articleMetadata } from "@/components/article-page";
import { getPublishedPost, getPublishedPosts } from "@/lib/writing";
import { EMPTY_PARAM } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

/** Drafts (published: false) are never exported. */
export function generateStaticParams() {
  const posts = getPublishedPosts("en");
  return posts.length ? posts.map((post) => ({ slug: post.slug })) : [{ slug: EMPTY_PARAM }];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPublishedPost(slug, "en");
  return post ? articleMetadata(post) : { robots: { index: false } };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getPublishedPost(slug, "en");
  if (!post) notFound();
  return <ArticlePage post={post} locale="en" />;
}
