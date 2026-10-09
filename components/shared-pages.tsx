import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { capabilities, principles } from "@/data/engineering";
import { getPublishedWork } from "@/data/work";
import { getPublishedProjects } from "@/data/projects";
import { labAreas } from "@/data/labs";
import { site, social, socialHref, socialTitle } from "@/data/site";
import { SocialAnchor } from "@/components/social-anchor";
import { getPublishedPosts } from "@/lib/writing";
import { Container, EmptyState, PageHeader, SectionHeading, TextLink } from "@/components/ui";
import { CapabilityCard, CaseStudyRow, LabCard, PostRow, ProjectCard } from "@/components/cards";
import { SystemFigure } from "@/components/system-figure";
import { Contact } from "@/components/contact";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { getDictionary, type Dictionary } from "@/lib/i18n/dictionary";
import { localizePath, type Locale } from "@/lib/i18n/locales";
import { pageMetadata } from "@/lib/utils";
import { NewsletterSignup } from "@/components/newsletter-signup";

type LocalizedPageProps = { locale: Locale };
type PageKey = keyof Dictionary["metadata"];

const pagePaths: Record<PageKey, string> = {
  home: "/",
  engineering: "/engineering",
  work: "/work",
  openSource: "/open-source",
  writing: "/writing",
  labs: "/labs",
  about: "/about",
};

export function localizedPageMetadata(locale: Locale, key: PageKey) {
  const page = getDictionary(locale).metadata[key];
  return pageMetadata({ title: page.title, description: page.description, path: localizePath(pagePaths[key], locale) });
}

function translatedProjects(locale: Locale) {
  if (locale === "en") return getPublishedProjects();
  const dictionary = getDictionary(locale);
  return getPublishedProjects().map((project) => {
    const translated = dictionary.openSourcePage.projects[project.slug as keyof typeof dictionary.openSourcePage.projects];
    return translated ? { ...project, description: translated.description, githubCtaLabel: translated.cta } : project;
  });
}

export function HomePage({ locale }: LocalizedPageProps) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.home;
  const english = locale === "en";
  const projects = translatedProjects(locale).filter((project) => project.featured);
  const posts = getPublishedPosts(locale).slice(0, 4);
  const localized = (path: string) => localizePath(path, locale);

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="bg-grid mask-fade-b absolute inset-0" aria-hidden="true" />
        <Container className="relative grid gap-14 pt-16 pb-20 md:pt-24 md:pb-28 lg:grid-cols-[1.25fr_1fr] lg:items-center lg:gap-10">
          <div>
            <p className="meta rise">{copy.eyebrow}</p>
            <h1 className="rise mt-7 text-[15px] font-medium text-muted" style={{ ["--d" as string]: 1 }}>
              <span className="text-fg">{site.name}</span><span className="mx-2 text-line-strong" aria-hidden="true">/</span><span className="font-mono text-[12.5px]">{site.location}</span>
            </h1>
            <p className="rise mt-5 text-[clamp(2.3rem,5.8vw,4.1rem)] font-medium leading-[1.02] tracking-[-0.04em] text-balance" style={{ ["--d" as string]: 2 }}>
              {copy.headlinePrefix}<span className="text-accent">{copy.headlineAccent}</span>
            </p>
            <div className="rise mt-8 max-w-xl space-y-4 text-[16.5px] leading-relaxed text-muted text-pretty" style={{ ["--d" as string]: 3 }}>
              {copy.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
            <div className="rise mt-10 flex flex-wrap items-center gap-3" style={{ ["--d" as string]: 4 }}>
              <Link href={localized("/engineering")} className="group inline-flex items-center gap-2 rounded-sm bg-fg px-4 py-2.5 text-sm text-bg transition-opacity hover:opacity-90">{copy.engineeringAction}<ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" /></Link>
              <Link href={localized("/writing")} className="inline-flex items-center gap-2 rounded-sm border border-line-strong px-4 py-2.5 text-sm text-fg transition-colors hover:border-accent hover:text-accent">{copy.writingAction}</Link>
              <span className="mx-2 hidden h-5 w-px bg-line sm:block" aria-hidden="true" />
              <SocialAnchor href={socialHref(social.github)} title={socialTitle(social.github)} aria-label={socialTitle(social.github)} target="_blank" rel="noopener noreferrer" className="inline-flex size-11 items-center justify-center text-subtle transition-colors hover:text-fg"><GitHubIcon className="size-4" /></SocialAnchor>
              <SocialAnchor href={socialHref(social.linkedin)} title={socialTitle(social.linkedin)} aria-label={socialTitle(social.linkedin)} target="_blank" rel="noopener noreferrer" className="inline-flex size-11 items-center justify-center text-subtle transition-colors hover:text-fg"><LinkedInIcon className="size-[15px]" /></SocialAnchor>
            </div>
          </div>
          <div className="ticks hidden border border-line bg-bg/70 p-5 sm:block lg:p-7">
            <div className="mb-4 flex items-center justify-between font-mono text-[10.5px] text-subtle"><span>{copy.figure.fileName}</span><span>{copy.figure.stack}</span></div>
            <SystemFigure labels={copy.figure} />
          </div>
        </Container>
        <Container className="relative">
          <dl className="grid grid-cols-2 gap-px border-t border-line bg-line font-mono text-[11.5px] md:grid-cols-4">
            {[[copy.stats.experience, copy.stats.experienceValue], [copy.stats.primary, copy.stats.primaryValue], [copy.stats.focus, copy.stats.focusValue], [copy.stats.location, site.location]].map(([label, value]) => (
              <div key={label} className="bg-bg py-4 pr-4 [&:nth-child(even)]:pl-4 md:[&:not(:first-child)]:pl-4"><dt className="text-[10.5px] uppercase tracking-[0.08em] text-subtle">{label}</dt><dd className="mt-1 text-fg">{value}</dd></div>
            ))}
          </dl>
        </Container>
      </section>

      <section aria-labelledby="eng" className="py-20 md:py-28">
        <Container>
          <SectionHeading index="01" label={copy.engineering.label} title={copy.engineering.title} intro={copy.engineering.intro} action={{ href: localized("/engineering"), label: copy.engineering.action }} />
          <h2 id="eng" className="sr-only">{copy.engineering.capabilities}</h2>
          <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => {
              const translated = locale === "en" ? undefined : dictionary.capabilities[capability.id as keyof typeof dictionary.capabilities];
              return <CapabilityCard key={capability.id} c={translated ? { ...capability, ...translated } : capability} />;
            })}
          </div>
          <div className="mt-14 md:pl-[220px]"><h3 className="text-[19px] font-medium tracking-tight">{copy.engineering.problems}</h3>
            <dl className="mt-6 grid gap-x-12 gap-y-7 md:grid-cols-2">{copy.problems.map((problem) => <div key={problem.title} className="border-l border-line pl-5"><dt className="text-[15px] font-medium">{problem.title}</dt><dd className="mt-2 text-[14px] leading-relaxed text-muted">{problem.description}</dd></div>)}</dl>
          </div>
        </Container>
      </section>

      <section aria-label={copy.work.title} className="pb-20 md:pb-28"><Container>
        <SectionHeading index="02" label={copy.work.label} title={copy.work.title} intro={copy.work.intro} action={{ href: localized("/work"), label: copy.work.action }} />
        <div className="mt-10 border-t border-line">{getPublishedWork().map((study) => <CaseStudyRow key={study.id} c={study} localizedContent={study.content[locale]} href={localizePath(`/work/${study.slug}`, locale)} viewLabel={dictionary.workDetail.openCaseStudy} />)}</div>
        <p className="mt-4 font-mono text-[11px] text-subtle">{english ? "Anonymized. No employers, clients, products or dates are identified." : copy.work.note}</p>
      </Container></section>

      <section className="border-y border-line bg-sunken/60 py-20 md:py-28"><Container className="grid gap-20 lg:grid-cols-2 lg:gap-16">
        <div><CompactHeading index="03" label={copy.openSource.label} title={copy.openSource.title} intro={copy.openSource.intro} href={localized("/open-source")} viewAll={dictionary.common.viewAll} />
          <div className="mt-8 grid gap-4">{projects.length ? projects.map((project) => <ProjectCard key={project.slug} p={project} externalGithub publicLabel={dictionary.common.projectPublic} />) : <EmptyState code={dictionary.openSourcePage.emptyCode} title={dictionary.openSourcePage.emptyTitle} body={dictionary.openSourcePage.emptyBody} />}</div>
        </div>
        <div><CompactHeading index="04" label={copy.writing.label} title={copy.writing.title} intro={copy.writing.intro} href={localized("/writing")} viewAll={dictionary.common.viewAll} />
          <div className="mt-8">{posts.length ? <div className="border-t border-line">{posts.map((post) => <PostRow key={post.slug} p={post} locale={locale} />)}</div> : english ? <EmptyState code="Writing · 0 published" title="No articles published yet" body="Published engineering notes appear here when they are ready. Follow the RSS feed for new writing."><a href="/rss.xml" className="mt-5 inline-block font-mono text-[12px] text-accent link-underline">/rss.xml</a></EmptyState> : <EmptyState code={dictionary.writingPage.emptyCode} title={dictionary.writingPage.emptyTitle} body={copy.writing.translationsPending} />}</div>
        </div>
      </Container></section>

      <section className="py-20 md:py-28"><Container>
        <SectionHeading index="05" label={copy.labs.label} title={copy.labs.title} intro={copy.labs.intro} action={{ href: localized("/labs"), label: copy.labs.action }} />
        <ul className="mt-10 flex flex-wrap gap-2 md:pl-[220px]">{labAreas.map((area) => <li key={area.id} className="rounded-full border border-line px-3.5 py-1.5 text-[13px] text-muted transition-colors hover:border-accent hover:text-fg">{dictionary.labsPage.areas[area.id as keyof typeof dictionary.labsPage.areas].title}</li>)}</ul>
      </Container></section>
      <Contact locale={locale} />
    </>
  );
}

export function EngineeringPage({ locale }: LocalizedPageProps) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.engineeringPage;
  return <>
    <PageHeader index="01" label={dictionary.nav.engineering} title={dictionary.home.engineering.title} intro={copy.intro} />
    <section className="py-20"><Container><h2 className="sr-only">{copy.capabilitiesHeading}</h2><div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">{capabilities.map((capability) => { const translated = locale === "en" ? undefined : dictionary.capabilities[capability.id as keyof typeof dictionary.capabilities]; return <CapabilityCard key={capability.id} c={translated ? { ...capability, ...translated } : capability} />; })}</div></Container></section>
    <section className="pb-24"><Container><SectionHeading index="01.1" label={copy.principlesLabel} title={copy.principlesTitle} />
      <dl className="mt-10 grid gap-x-12 gap-y-10 md:ml-[220px] md:grid-cols-2">{principles.map((principle, index) => { const translated = copy.principles[index]; return <div key={principle.k} className="border-l border-line pl-5"><dt className="flex items-baseline gap-3 text-[16px] font-medium tracking-tight"><span className="font-mono text-[11px] text-accent">P{index + 1}</span>{translated?.title ?? principle.k}</dt><dd className="mt-2 text-[15px] leading-relaxed text-muted">{translated?.description ?? principle.v}</dd></div>; })}</dl>
      <div className="mt-16 flex flex-wrap gap-6 md:ml-[220px]"><TextLink href={localizePath("/work", locale)}>{copy.workLink}</TextLink><TextLink href={localizePath("/labs", locale)}>{copy.labsLink}</TextLink></div>
    </Container></section>
  </>;
}

export function WorkPage({ locale }: LocalizedPageProps) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.workPage;
  const english = locale === "en";
  return <>
    <PageHeader index="02" label={dictionary.nav.work} title={dictionary.home.work.title} intro={copy.intro}>
      <div className="rise mt-10 flex max-w-2xl gap-4 border-l-2 border-accent bg-accent-soft px-4 py-3 text-[13.5px] leading-relaxed text-muted" style={{ ["--d" as string]: 3 }}><span className="meta shrink-0 pt-0.5 text-accent">{copy.noteLabel}</span><span>{copy.note}</span></div>
    </PageHeader>
    <section className="py-16 md:py-20"><Container><h2 className="sr-only">{english ? "Case studies" : copy.columns[1]}</h2>
      <div className="hidden grid-cols-[110px_1fr_1fr_24px] gap-8 pb-3 md:grid"><span className="meta">{copy.columns[0]}</span><span className="meta">{copy.columns[1]}</span><span className="meta">{copy.columns[2]}</span><span /></div>
      <div className="border-t border-line">{getPublishedWork().map((study) => <CaseStudyRow key={study.id} c={study} localizedContent={study.content[locale]} href={localizePath(`/work/${study.slug}`, locale)} viewLabel={dictionary.workDetail.openCaseStudy} />)}</div>
      <aside className="mt-12 grid gap-3 border-t border-line pt-6 md:grid-cols-[110px_1fr] md:gap-8"><p className="meta">{copy.earlierLabel}</p><p className="max-w-3xl text-[14px] leading-relaxed text-muted">{copy.earlier}</p></aside>
    </Container></section>
  </>;
}

export function OpenSourcePage({ locale }: LocalizedPageProps) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.openSourcePage;
  const projects = translatedProjects(locale);
  return <>
    <PageHeader index="03" label={dictionary.nav.openSource} title={dictionary.nav.openSource} intro={copy.intro} />
    <section className="py-16 md:py-20"><Container><h2 className="sr-only">{dictionary.metadata.openSource.title}</h2>
      {projects.length ? <div className="grid gap-4 md:grid-cols-2">{projects.map((project) => <ProjectCard key={project.slug} p={project} externalGithub publicLabel={dictionary.common.projectPublic} />)}</div> : <EmptyState code={copy.emptyCode} title={copy.emptyTitle} body={copy.emptyBody}><div className="mt-6 flex flex-wrap gap-6"><TextLink href={localizePath("/labs", locale)}>{dictionary.nav.labs}</TextLink><TextLink href={localizePath("/writing", locale)}>{dictionary.nav.writing}</TextLink></div></EmptyState>}
      <dl className="mt-14 grid gap-6 font-mono text-[12px] text-muted sm:grid-cols-3"><div className="border-t border-line pt-4"><dt className="meta">{dictionary.common.criteria}</dt><dd className="mt-2 leading-relaxed">{dictionary.common.criteriaDescription}</dd></div><div className="border-t border-line pt-4"><dt className="meta">{dictionary.common.metrics}</dt><dd className="mt-2 leading-relaxed">{dictionary.common.metricsDescription}</dd></div><div className="border-t border-line pt-4"><dt className="meta">{dictionary.common.focus}</dt><dd className="mt-2 leading-relaxed">{dictionary.common.focusDescription}</dd></div></dl>
    </Container></section>
  </>;
}

export function WritingPage({ locale }: LocalizedPageProps) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.writingPage;
  const english = locale === "en";
  const posts = getPublishedPosts(locale);
  return <>
    <PageHeader index="04" label={dictionary.nav.writing} title={dictionary.nav.writing} intro={copy.intro} />
    <section className="py-16 md:py-20"><Container className="grid gap-14 lg:grid-cols-[1fr_240px] lg:gap-20"><div>
      {english && <NewsletterSignup heading={copy.newsletterHeading} description={copy.newsletterDescription} className="mb-12" />}
      <h2 className="sr-only">{english ? "Published articles" : copy.emptyTitle}</h2>
      {posts.length > 0 ? <div className="border-t border-line">{posts.map((post) => <PostRow key={post.slug} p={post} locale={locale} />)}</div> : english ? <EmptyState code={copy.emptyCode} title={"No articles published yet"} body={"Published engineering articles appear here when they are ready. Follow the RSS feed for new writing."}><a href="/rss.xml" className="mt-5 inline-block font-mono text-[12px] text-accent link-underline">{copy.rssLink}</a></EmptyState> : <EmptyState code={copy.emptyCode} title={copy.emptyTitle} body={copy.emptyBody} />}
    </div><aside><p className="meta">{copy.topicsTitle}</p><ul className="mt-4 flex flex-wrap gap-1.5 lg:flex-col lg:gap-2.5">{copy.topics.map((topic) => <li key={topic} className="text-[14px] text-muted max-lg:rounded-full max-lg:border max-lg:border-line max-lg:px-3 max-lg:py-1">{topic}</li>)}</ul></aside></Container></section>
  </>;
}

export function LabsPage({ locale }: LocalizedPageProps) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.labsPage;
  return <>
    <PageHeader index="05" label={dictionary.nav.labs} title={dictionary.nav.labs} intro={copy.intro} />
    <section className="py-16 md:py-20"><Container><h2 className="sr-only">{copy.areasHeading}</h2><p className="meta mb-5">{copy.areasHeading}</p>
      <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">{labAreas.map((area, index) => <LabCard key={area.id} l={{ ...area, ...copy.areas[area.id as keyof typeof copy.areas] }} i={index} />)}</div>
      <p className="mt-4 font-mono text-[11px] text-subtle">{copy.noExperiments}</p>
    </Container></section>
    <section className="pb-24"><Container><SectionHeading index="05.1" label={copy.methodLabel} title={copy.methodTitle} />
      <ol className="mt-10 grid gap-8 md:ml-[220px] md:grid-cols-3">{["Question", "Measure", "Write down"].map((step, index) => { const translated = copy.methodSteps[index]; return <li key={step} className="border-t border-line pt-4"><p className="font-mono text-[11px] text-accent">STEP {index + 1}</p><p className="mt-3 text-[16px] font-medium tracking-tight">{translated?.title ?? step}</p><p className="mt-2 text-[14.5px] leading-relaxed text-muted">{translated?.description}</p></li>; })}</ol>
    </Container></section>
  </>;
}

export function AboutPage({ locale }: LocalizedPageProps) {
  const dictionary = getDictionary(locale);
  const copy = dictionary.aboutPage;
  const primary = ["C#", ".NET", "ASP.NET Core", "Azure"];
  const additional = ["Blazor", "React", "Angular", "TypeScript", "SQL Server", "Azure Functions", "Azure DevOps", "Azure AI Search", "RAG", "MCP"];
  return <>
    <PageHeader index="06" label={dictionary.nav.about} title={copy.title} />
    <section className="py-16 md:py-24"><Container className="grid gap-14 lg:grid-cols-[1fr_300px] lg:gap-24"><div className="max-w-2xl space-y-6 text-[17px] leading-[1.75] text-muted text-pretty">
      {copy.paragraphs.map((paragraph, index) => <p key={paragraph} className={index === 0 ? "text-[20px] leading-relaxed text-fg" : undefined}>{paragraph}</p>)}
    </div><aside className="lg:sticky lg:top-24 lg:self-start"><dl className="ticks space-y-7 border border-line bg-raised p-6">
      <div><dt className="meta">{copy.labels.location}</dt><dd className="mt-2 text-[15px]">{site.location}</dd></div>
      <div><dt className="meta">{copy.labels.roles}</dt><dd className="mt-2 space-y-1 text-[14px] text-muted">{copy.roles.map((role) => <p key={role}>{role}</p>)}</dd></div>
      <div><dt className="meta">{copy.labels.primary}</dt><dd className="mt-3 flex flex-wrap gap-1.5">{primary.map((tag) => <span key={tag} className="inline-flex items-center rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[11px] leading-4 text-muted">{tag}</span>)}</dd></div>
      <div><dt className="meta">{copy.labels.additional}</dt><dd className="mt-3 flex flex-wrap gap-1.5">{additional.map((tag) => <span key={tag} className="inline-flex items-center rounded-[3px] border border-line px-1.5 py-0.5 font-mono text-[11px] leading-4 text-muted">{tag}</span>)}</dd></div>
    </dl></aside></Container></section>
    <Contact locale={locale} />
  </>;
}

function CompactHeading({ index, label, title, intro, href, viewAll }: { index: string; label: string; title: string; intro: string; href: string; viewAll: string }) {
  return <div className="border-t border-line pt-6"><div className="flex items-center justify-between"><p className="meta flex items-center gap-2"><span className="text-accent">{index}</span><span className="h-px w-4 bg-line-strong" aria-hidden="true" />{label}</p><Link href={href} className="font-mono text-[11.5px] text-muted link-underline hover:text-fg">{viewAll}</Link></div><h2 className="mt-6 text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-[-0.025em]">{title}</h2><p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{intro}</p></div>;
}