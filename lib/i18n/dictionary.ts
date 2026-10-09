import { dictionary as en } from "../../i18n/en";
import { dictionary as es } from "../../i18n/es";
import { dictionary as hi } from "../../i18n/hi";
import { isLocale, type Locale } from "./locales";

type Widen<T> =
  T extends string ? string
    : T extends number | boolean ? T
      : T extends readonly unknown[] ? { readonly [Key in keyof T]: Widen<T[Key]> }
        : T extends object ? { readonly [Key in keyof T]: Widen<T[Key]> }
          : T;

export type Dictionary = Widen<typeof en>;

const dictionaries = { en, es, hi } satisfies Record<Locale, Dictionary>;

export function getDictionary(locale: Locale): Dictionary {
  if (!isLocale(locale)) throw new RangeError(`Unsupported locale: ${String(locale)}`);
  return dictionaries[locale];
}