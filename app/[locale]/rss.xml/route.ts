import { generateRss } from "@/lib/rss";
import { isTranslatedLocale, translatedLocales } from "@/lib/i18n/locales";

type Context = { params: Promise<{ locale: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return translatedLocales.map((locale) => ({ locale }));
}

export async function GET(_request: Request, { params }: Context) {
  const { locale } = await params;
  if (!isTranslatedLocale(locale)) return new Response("Not found", { status: 404 });
  return generateRss(locale);
}
