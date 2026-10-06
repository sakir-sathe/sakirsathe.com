import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { caseStudies, getCaseStudy } from "@/data/work";
import { Container, Tag } from "@/components/ui";
import { pageMetadata } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return pageMetadata({ title: c.title, description: c.summary, path: `/work/${c.slug}` });
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();
  const i = caseStudies.findIndex((x) => x.slug === c.slug);
  const next = caseStudies[(i + 1) % caseStudies.length];

  return (
    <article>
      <header className="relative overflow-hidden border-b border-line">
        <div className="bg-grid mask-fade-b absolute inset-0" aria-hidden="true" />
        <Container className="relative pt-10 pb-14 md:pt-14 md:pb-20">
          <Link href="/work" className="group inline-flex items-center gap-2 font-mono text-[12px] text-muted hover:text-fg">
            <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" aria-hidden="true" /> Work
          </Link>
          <p className="meta rise mt-12 flex items-center gap-2"><span className="text-accent">{c.index}</span><span className="h-px w-4 bg-line-strong" aria-hidden="true" />Case study · {c.domain}</p>
          <h1 className="rise mt-5 max-w-3xl text-[clamp(2.1rem,5vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.035em] text-balance" style={{ ["--d" as string]: 1 }}>{c.title}</h1>
          <p className="rise mt-6 max-w-2xl text-[17px] leading-relaxed text-muted" style={{ ["--d" as string]: 2 }}>{c.summary}</p>
        </Container>
      </header>

      <Container className="grid gap-14 py-16 md:py-20 lg:grid-cols-[260px_1fr] lg:gap-20">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <dl className="space-y-7">
            <div><dt className="meta">System type</dt><dd className="mt-2 text-[14.5px]">{c.systemType}</dd></div>
            <div><dt className="meta">Technology</dt><dd className="mt-3 flex flex-wrap gap-1.5">{c.technologies.map((t) => <Tag key={t}>{t}</Tag>)}</dd></div>
            <div><dt className="meta">Themes</dt><dd className="mt-2 space-y-1 text-[14px] text-muted">{c.themes.map((t) => <p key={t}>{t}</p>)}</dd></div>
            <div><dt className="meta">Disclosure</dt><dd className="mt-2 text-[13px] leading-relaxed text-subtle">Anonymized. No organization, product, date or internal design is identified.</dd></div>
          </dl>
        </aside>

        <div className="max-w-2xl">
          {c.narrativeStatus === "pending" && (
            <div role="note" className="ticks mb-12 border border-dashed border-line-strong bg-raised/60 p-5">
              <p className="meta flex items-center gap-2"><span className="pulse-dot inline-block size-1.5 rounded-full bg-accent" aria-hidden="true" />Pending editorial expansion</p>
              <p className="mt-3 text-[14.5px] leading-relaxed text-muted">The detailed narrative for this case study is still being written and reviewed for confidentiality. The outline below shows what each section will cover; nothing here describes specific outcomes yet.</p>
            </div>
          )}
          <ol className="space-y-0">
            {c.sections.map((s, n) => (
              <li key={s.heading} className="grid grid-cols-[40px_1fr] border-t border-line py-7">
                <span className="font-mono text-[11px] text-subtle pt-1.5">{String(n + 1).padStart(2, "0")}</span>
                <div>
                  <h2 className="text-[19px] font-medium tracking-tight">{s.heading}</h2>
                  <p className={`mt-2 text-[15px] leading-relaxed ${c.narrativeStatus === "pending" ? "text-subtle italic" : "text-muted"}`}>{s.body}</p>
                  {s.flow && (
                    <figure className="mt-5 border border-line bg-raised/60 p-4">
                      <figcaption className="meta mb-3">Generic flow · illustrative only</figcaption>
                      <ol className="space-y-2 text-[13px] leading-relaxed text-muted">
                        {s.flow.map((step, stepIndex) => (
                          <li key={step} className="flex gap-3">
                            <span className="shrink-0 font-mono text-accent" aria-hidden="true">{stepIndex === 0 ? "01" : "↓"}</span>
                            <span className="min-w-0 break-words">{step}</span>
                          </li>
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
          <Link href={`/work/${next.slug}`} className="group flex items-center justify-between border-y border-line py-7">
            <span>
              <span className="meta">Next case study</span>
              <span className="mt-2 block text-[20px] font-medium tracking-tight group-hover:text-accent">{next.title}</span>
            </span>
            <ArrowRight className="size-5 text-subtle transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" aria-hidden="true" />
          </Link>
        </Container>
      )}
    </article>
  );
}
