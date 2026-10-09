export const supportedLocales = ["en", "es", "hi"] as const;
export type Locale = (typeof supportedLocales)[number];

export const defaultLocale: Locale = "en";

export const translatedLocales = ["es", "hi"] as const satisfies readonly Locale[];
export type TranslatedLocale = (typeof translatedLocales)[number];

export const translatedTopLevelPaths = [
  "/",
  "/engineering",
  "/work",
  "/open-source",
  "/writing",
  "/labs",
  "/about",
] as const;

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && supportedLocales.includes(value as Locale);
}

export function isTranslatedLocale(value: unknown): value is TranslatedLocale {
  return typeof value === "string" && translatedLocales.some((locale) => locale === value);
}

function splitPath(path: string): { pathname: string; suffix: string } {
  if (typeof path !== "string") throw new TypeError("Path must be a string.");
  const suffixIndex = path.search(/[?#]/);
  const rawPathname = suffixIndex < 0 ? path : path.slice(0, suffixIndex);
  const suffix = suffixIndex < 0 ? "" : path.slice(suffixIndex);
  const segments = rawPathname.split("/").filter(Boolean);
  return { pathname: segments.length ? `/${segments.join("/")}` : "/", suffix };
}

export function getLocalePrefix(locale: Locale): string {
  if (!isLocale(locale)) throw new RangeError(`Unsupported locale: ${String(locale)}`);
  return locale === defaultLocale ? "" : `/${locale}`;
}

export function getLocaleFromPath(path: string): Locale {
  const { pathname } = splitPath(path);
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return isLocale(firstSegment) ? firstSegment : defaultLocale;
}

export function stripLocalePrefix(path: string): string {
  const { pathname, suffix } = splitPath(path);
  const segments = pathname.split("/").filter(Boolean);
  while (segments.length && isLocale(segments[0])) segments.shift();
  return `${segments.length ? `/${segments.join("/")}` : "/"}${suffix}`;
}

export function localizePath(path: string, locale: Locale): string {
  const prefix = getLocalePrefix(locale);
  const { pathname, suffix } = splitPath(stripLocalePrefix(path));
  return `${prefix}${pathname === "/" ? "" : pathname}${suffix}` || "/";
}