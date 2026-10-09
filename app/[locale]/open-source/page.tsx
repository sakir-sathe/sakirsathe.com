import { notFound } from "next/navigation";
import { OpenSourcePage, localizedPageMetadata } from "@/components/shared-pages";
import { isTranslatedLocale } from "@/lib/i18n/locales";

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) return {};
  return localizedPageMetadata(locale, "openSource");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return <OpenSourcePage locale={locale} />;
}