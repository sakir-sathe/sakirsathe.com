import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Container, Tag } from "@/components/ui";
import { getPublishedWork } from "@/data/work";
import { getDictionary } from "@/lib/i18n/dictionary";
import { localizePath, type Locale } from "@/lib/i18n/locales";
import type { WorkRecord } from "@/types";

export function WorkDetailPage({ locale, work }: { locale: Locale; work: WorkRecord }) {
  const content = work.content[locale];
  const labels = getDictionary(locale).workDetail;
  const published = getPublishedWork();
  const index = published.findIndex((record) => record.id === work.id);
  const next = published.length > 1 ? published[(index + 1) % published.length] : undefined;

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div className="bg-grid mask-fade-b absolute inset-0" aria-hidden="true" />
        <Container className="relative pt-10 pb-14 md:pt-14 md:pb-20">
          <Link href={localizePath("/work", locale)} className="group inline-flex items-center gap-2 font-mono text-[12px] text-muted hover:text-fg">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" /> {labels.backToWork}
          </Link>
          <p className="meta rise mt-12 flex items-center gap-2"><span className="text-accent">{work.index}</span><span className="h-px w-4 bg-line-strong" aria-hidden="true" />{labels.caseStudy} · {content.domain}</p>
          <h1 className="rise mt-5 max-w-3xl text-[clamp(2.1rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.035em] text-balance" style={{ ["--d" as string]: 1 }}>{content.title}</h1>
          <p className="rise mt-6 max-w-2xl text-[17px] leading-relaxed text-muted" style={{ ["--d" as string]: 2 }}>{content.summary}</p>
        </Container>
      </header>

      <Container className="grid gap-14 py-16 md:py-20 lg:grid-cols-[260px_1fr] lg:gap-20">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <dl className="space-y-7">
            <div><dt className="meta">{labels.systemType}</dt><dd className="mt-2 text-[14.5px]">{content.systemType}</dd></div>
            <div><dt className="meta">{labels.technologies}</dt><dd className="mt-3 flex flex-wrap gap-1.5">{work.technologies.map((technology) => <Tag key={technology}>{technology}</Tag>)}</dd></div>
            <div><dt className="meta">{labels.themes}</dt><dd className="mt-2 space-y-1 text-[14px] text-muted">{content.themes.map((theme) => <p key={theme}>{theme}</p>)}</dd></div>
            <div><dt className="meta">{labels.disclosure}</dt><dd className="mt-2 text-[13px] leading-relaxed text-subtle">{labels.disclosureText}</dd></div>
          </dl>
        </aside>

        <div className="max-w-2xl">
          {work.narrativeStatus === "pending" && (
            <div role="note" className="ticks mb-12 border border-dashed border-line-strong bg-raised/60 p-5">
              <p className="meta flex items-center gap-2"><span className="pulse-dot inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />{labels.pendingLabel}</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">{labels.pendingBody}</p>
            </div>
          )}
          <ol className="space-y-0">
            {content.sections.map((section, sectionIndex) => (
              <li key={section.heading} className="grid grid-cols-[40px_1fr] border-t border-line py-7">
                <span className="font-mono text-[11px] text-subtle pt-1.5">{String(sectionIndex + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-[19px] font-medium tracking-tight">{section.heading}</h2>
                  <p className={`mt-2 text-[15px] leading-relaxed ${work.narrativeStatus === "pending" ? "text-subtle italic" : "text-muted"}`}>{section.body}</p>
                  {section.flow && (
                    <figure className="mt-5 border border-line bg-raised/60 p-4">
                      <figcaption className="meta mb-3">{labels.genericFlow}</figcaption>
                      <ol className="space-y-2 text-[13px] leading-relaxed text-muted">
                        {section.flow.map((step, stepIndex) => (
                          <li key={step} className="flex gap-3"><span className="shrink-0 font-mono text-accent" aria-hidden="true">{stepIndex === 0 ? "01" : "↓"}</span><span className="min-w-0 break-words">{step}</span></li>
                        ))}
                      </ol>
                    </figure>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>

      {next && (
        <Container className="pb-24">
          <Link href={localizePath(`/work/${next.slug}`, locale)} className="group flex items-center justify-between border-y border-line py-7">
            <span><span className="meta">{labels.nextCaseStudy}</span><span className="mt-2 block text-[20px] font-medium tracking-tight group-hover:text-accent">{next.content[locale].title}</span></span>
            <ArrowRight className="size-5 text-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
          </Link>
        </Container>
      )}
    </article>
  );
}
