import { notFound } from "next/navigation";
import { ArticlePage, articleMetadata } from "@/components/article-page";
import { getPublishedPost, getPublishedPosts } from "@/lib/writing";
import { isTranslatedLocale } from "@/lib/i18n/locales";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  if (!isTranslatedLocale(params.locale)) return [];
  return getPublishedPosts(params.locale).map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isTranslatedLocale(localeParam)) return { robots: { index: false } };
  const post = getPublishedPost(slug, localeParam);
  return post ? articleMetadata(post) : { robots: { index: false } };
}

export default async function Page({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isTranslatedLocale(localeParam)) notFound();
  const post = getPublishedPost(slug, localeParam);
  if (!post) notFound();
  return <ArticlePage post={post} locale={localeParam} />;
}
