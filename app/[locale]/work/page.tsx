import { notFound } from "next/navigation";
import { WorkPage, localizedPageMetadata } from "@/components/shared-pages";
import { isTranslatedLocale } from "@/lib/i18n/locales";

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) return {};
  return localizedPageMetadata(locale, "work");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return <WorkPage locale={locale} />;
}