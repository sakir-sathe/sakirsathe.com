import { caseStudies } from "@/data/work";
import { CaseStudyRow } from "@/components/cards";
import { Container, PageHeader } from "@/components/ui";
import { pageMetadata } from "@/lib/utils";

const intro = "A selection of complex systems and engineering problems I've worked on across enterprise software, cloud platforms, data and AI.";
export const metadata = pageMetadata({ title: "Selected Engineering Work", description: intro, path: "/work" });

export default function WorkPage() {
  return (
    <>
      <PageHeader index="02" label="Work" title="Selected Engineering Work" intro={intro}>
        <div className="rise mt-10 flex max-w-2xl gap-4 border-l-2 border-accent bg-accent-soft px-4 py-3 text-[13.5px] leading-relaxed text-muted" style={{ ["--d" as string]: 3 }}>
          <span className="meta shrink-0 pt-0.5 text-accent">Note</span>
          <span>Case studies are anonymized. They describe the type of system, the engineering problem and the technology involved — never employers, clients, products, dates or internal designs.</span>
        </div>
      </PageHeader>
      <section className="py-16 md:py-20">
        <Container>
          <h2 className="sr-only">Case studies</h2>
          <div className="hidden grid-cols-[110px_1fr_1fr_24px] gap-8 pb-3 md:grid">
            <span className="meta">Ref</span><span className="meta">System</span><span className="meta">Technology</span><span />
          </div>
          <div className="border-t border-line">
            {caseStudies.map((c) => <CaseStudyRow key={c.slug} c={c} />)}
          </div>
          <aside className="mt-12 grid gap-3 border-t border-line pt-6 md:grid-cols-[110px_1fr] md:gap-8">
            <p className="meta">Earlier systems</p>
            <p className="max-w-3xl text-[14px] leading-relaxed text-muted">Earlier enterprise work included workforce, attendance, leave and reimbursement workflows; employee administration; project and resource management; timesheets; work allocation; and audit/document systems. These applications brought together business workflows, role-based access, reporting and web functionality across the Microsoft stack.</p>
          </aside>
        </Container>
      </section>
    </>
  );
}
