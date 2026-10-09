import type { Locale } from "@/lib/i18n/locales";

type NewsletterConfig = { endpoint: string; locale: Locale };

export const newsletterConfig = {
  en: {
    endpoint: "https://7d60b2a9.sibforms.com/serve/MUIFAElqzY43XvSm7ZLB9IwzzAiIwfes-oVJ3x8WYRbo9-Dr-1NpRRNCtzfYk7XgYwgrVC_lJXuEvjfuHypg2jaa29moLIimaaEaf0Cy9Jm5UARuASt1a4vl5_-gpNFvcHPvxQy34vXqm9sAeVAB0KOVXFBb3Hg3Oir_uA9-kNBlCz-TdXKx0ZXP0yAuaeOaqMCQUKPPv1zZ56Ki",
    locale: "en",
  },
  es: {
    endpoint: "https://7d60b2a9.sibforms.com/serve/MUIFAEUlzFot7LFVfy7QikWcXZeBVZvSV7oRyUhx22pJmAZWD1z90EFF5FCihbSOGulCpCNVzNdSqEoXwsl1Fd9isF-UoId0oxQXUlk7KC_dZtzUqFkqeeJqZCzVBr0Uyejb4i-Fp02C3MUhFIOYypQ2l-87kSQguKYup1StrkXUAXgGO_XjuKPZuIFVAoxoj6zHKcsTSRzgyY9P",
    locale: "es",
  },
  hi: {
    endpoint: "https://7d60b2a9.sibforms.com/serve/MUIFAM8xklC9HZB52-PsfJzMdmoHp8hq_-s8YAUNp9nRhL7J79TX4V87SWItcxIX6rCqmzOkWNYe6iuW_NhGpitQHiYUg_piuC9b1JVekaw7XYGPS78_u6DIhTMbycxqAAE9FxQ9TRaejEGkz5DQtrYF1n_qSTdBVr3uskQOntMSCCHEJNKoiiBxhIxXFF-eLF3eNOp82cad0WT0",
    locale: "hi",
  },
} as const satisfies Record<Locale, NewsletterConfig>;

export function getNewsletterConfig(locale: Locale): NewsletterConfig {
  if (!Object.prototype.hasOwnProperty.call(newsletterConfig, locale)) {
    throw new RangeError(`Unsupported newsletter locale: ${String(locale)}`);
  }
  return newsletterConfig[locale];
}