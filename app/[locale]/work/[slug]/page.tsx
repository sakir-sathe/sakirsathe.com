import { notFound } from "next/navigation";
import { WorkDetailPage } from "@/components/work-detail-page";
import { getPublishedWork, getWorkRecord } from "@/data/work";
import { isTranslatedLocale } from "@/lib/i18n/locales";
import { pageMetadata } from "@/lib/utils";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams({ params }: { params: { locale: string } }) {
  const locale = params.locale;
  if (!isTranslatedLocale(locale)) return [];
  return getPublishedWork()
    .filter((work) => Boolean(work.content[locale]))
    .map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isTranslatedLocale(localeParam)) return {};
  const work = getWorkRecord(slug);
  if (!work || work.narrativeStatus !== "published") return {};
  const content = work.content[localeParam];
  return pageMetadata({ title: content.title, description: content.summary, path: `/${localeParam}/work/${work.slug}` });
}

export default async function Page({ params }: Props) {
  const { locale: localeParam, slug } = await params;
  if (!isTranslatedLocale(localeParam)) notFound();
  const work = getWorkRecord(slug);
  if (!work || work.narrativeStatus !== "published" || !work.content[localeParam]) notFound();
  return <WorkDetailPage locale={localeParam} work={work} />;
}
