import { Container, TextLink } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid mask-fade-b absolute inset-0" aria-hidden="true" />
      <Container className="relative py-28 md:py-40">
        <p className="meta"><span className="text-accent">404</span> · Not found</p>
        <h1 className="mt-6 text-[clamp(2rem,5vw,3.25rem)] font-medium tracking-[-0.035em]">This path doesn&rsquo;t resolve.</h1>
        <p className="mt-4 max-w-md text-muted">The page may not be published yet, or it may have moved.</p>
        <div className="mt-10 flex gap-6"><TextLink href="/">Home</TextLink><TextLink href="/writing">Writing</TextLink></div>
      </Container>
    </section>
  );
}
