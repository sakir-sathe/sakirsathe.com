import { cn } from "@/lib/utils";
import { getDictionary } from "@/lib/i18n/dictionary";
import { resolveLocaleTarget } from "@/lib/i18n/resolve-locale-target";
import { defaultLocale, localizePath, supportedLocales, translatedTopLevelPaths, type Locale } from "@/lib/i18n/locales";
import { localeContentTargets } from "@/lib/i18n/content-targets";

const languages: Array<{ locale: Locale; code: string; name: string }> = [
  { locale: "en", code: "EN", name: "English" },
  { locale: "es", code: "ES", name: "Español" },
  { locale: "hi", code: "HI", name: "हिन्दी" },
];

export function LanguageSwitcher({ pathname, locale, className, onNavigate }: { pathname: string; locale: Locale; className?: string; onNavigate?: () => void }) {
  const labels = getDictionary(locale).common;
  return (
    <nav aria-label={labels.languageSelection} className={cn("flex items-center", className)}>
      <ul className="flex items-center gap-0.5 font-mono text-[11px]">
        {languages.map((language) => {
          const current = language.locale === locale;
          const target = current ? undefined : resolveLocaleTarget({
            pathname,
            targetLocale: language.locale,
            catalog: localeContentTargets,
            supportedLocales,
            defaultLocale,
            topLevelPaths: translatedTopLevelPaths,
            localizePath,
          });
          const classes = cn(
            "inline-flex min-h-9 min-w-9 items-center justify-center rounded-sm px-2 transition-colors",
            current ? "text-accent" : target ? "text-muted hover:text-fg" : "cursor-not-allowed text-subtle/60",
          );
          return (
            <li key={language.locale}>
              {current ? (
                <span aria-current="page" aria-label={`${language.name}, ${labels.currentLanguage.toLocaleLowerCase()}`} className={classes}>{language.code}</span>
              ) : target ? (
                <a href={target} onClick={onNavigate} aria-label={`${labels.switchLanguageTo} ${language.name}`} title={language.name} className={classes}>{language.code}</a>
              ) : (
                <span aria-disabled="true" aria-label={`${language.name}, ${labels.translationUnavailable.toLocaleLowerCase()}`} title={labels.translationUnavailable} className={classes}>{language.code}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
