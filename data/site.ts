import type { SocialLink } from "@/types";

export const site = {
  name: "Sakir Sathe",
  url: "https://sakirsathe.com",
  title: "Sakir Sathe — .NET, Azure & AI Engineering",
  description:
    "Software engineering, .NET, Azure, AI, architecture, developer tooling and open-source projects by Sakir Sathe.",
  email: "sakirsathe@gmail.com",
  location: "Costa Rica",
  jobTitle: "Lead Full Stack .NET Engineer",
  roles: ["Lead Full Stack .NET Engineer", "Technical Lead", "Software Architect", "Open-Source Builder", "Technical Writer"],
  locale: "en_US",
} as const;

/**
 * Social profiles. Set `url` to the exact profile URL to configure.
 * PLACEHOLDERS: replace social.github.url and social.linkedin.url with exact
 * profile URLs. null renders non-interactive "Not configured" text, never search.
 */
export const social: { github: SocialLink; linkedin: SocialLink } = {
  github: {
    label: "GitHub",
    url: null,
  },
  linkedin: {
    label: "LinkedIn",
    url: null,
  },
};

export function socialHref(link: SocialLink): string | undefined {
  return link.url ?? undefined;
}

export function socialTitle(link: SocialLink): string {
  return link.url ? `${link.label} profile` : `${link.label} — profile link not configured`;
}

export const nav = [
  { href: "/engineering", label: "Engineering" },
  { href: "/work", label: "Work" },
  { href: "/open-source", label: "Open Source" },
  { href: "/writing", label: "Writing" },
  { href: "/labs", label: "Labs" },
  { href: "/about", label: "About" },
] as const;
