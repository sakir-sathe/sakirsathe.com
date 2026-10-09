import { notFound } from "next/navigation";
import { WorkDetailPage } from "@/components/work-detail-page";
import { getPublishedWork, getWorkRecord } from "@/data/work";
import { pageMetadata } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedWork().map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const work = getWorkRecord(slug);
  if (!work || work.narrativeStatus !== "published") return {};
  const content = work.content.en;
  return pageMetadata({ title: content.title, description: content.summary, path: `/work/${work.slug}` });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const work = getWorkRecord(slug);
  if (!work || work.narrativeStatus !== "published") notFound();
  return <WorkDetailPage locale="en" work={work} />;
}
