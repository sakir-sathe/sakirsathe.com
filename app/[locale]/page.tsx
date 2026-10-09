import { notFound } from "next/navigation";
import { HomePage, localizedPageMetadata } from "@/components/shared-pages";
import { isTranslatedLocale } from "@/lib/i18n/locales";

type Props = { params: Promise<{ locale: string }> };
export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) return {};
  return localizedPageMetadata(locale, "home");
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) notFound();
  return <HomePage locale={locale} />;
}