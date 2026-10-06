"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, social, socialHref, socialTitle } from "@/data/site";
import { GitHubIcon, LinkedInIcon, Monogram } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { SocialAnchor } from "@/components/social-anchor";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const savedScroll = useRef(0);

  useEffect(() => {
    const element = dialog.current;
    const opener = trigger.current;
    if (!element || !open) return;
    const previousOverflow = document.body.style.overflow;
    const scrollY = savedScroll.current;
    const previousPosition = document.body.style.position;
    const previousTop = document.body.style.top;
    const previousWidth = document.body.style.width;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";
    element.showModal();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const items = Array.from(element.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]')).filter((item) => item.getClientRects().length > 0);
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || !element.contains(document.activeElement))) {
        event.preventDefault();
        last?.focus({ preventScroll: true });
      } else if (!event.shiftKey && (document.activeElement === last || !element.contains(document.activeElement))) {
        event.preventDefault();
        first?.focus({ preventScroll: true });
      }
    };
    element.addEventListener("keydown", onKeyDown);
    const breakpoint = window.matchMedia("(min-width: 768px)");
    const onResize = () => { if (breakpoint.matches) setOpen(false); };
    breakpoint.addEventListener("change", onResize);
    return () => {
      element.close();
      document.body.style.overflow = previousOverflow;
      document.body.style.position = previousPosition;
      document.body.style.top = previousTop;
      document.body.style.width = previousWidth;
      element.removeEventListener("keydown", onKeyDown);
      breakpoint.removeEventListener("change", onResize);
      opener?.focus({ preventScroll: true });
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [open]);

  const active = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5 text-fg" aria-label="Sakir Sathe, home">
          <Monogram className="size-7 transition-transform duration-300 group-hover:-rotate-3" />
          <span className="text-[15px] font-medium tracking-tight">Sakir Sathe</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active(item.href) ? "page" : undefined}
                  className={cn(
                    "relative rounded-sm px-3 py-2 text-[13.5px] transition-colors",
                    active(item.href) ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {item.label}
                  {active(item.href) && <span className="absolute inset-x-3 -bottom-[17px] h-px bg-accent" aria-hidden="true" />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-0.5">
          <SocialAnchor href={socialHref(social.github)} target="_blank" rel="noopener noreferrer" title={socialTitle(social.github)} aria-label={socialTitle(social.github)} className="hidden size-11 items-center justify-center text-muted transition-colors hover:text-fg lg:inline-flex">
            <GitHubIcon className="size-[15px]" />
          </SocialAnchor>
          <SocialAnchor href={socialHref(social.linkedin)} target="_blank" rel="noopener noreferrer" title={socialTitle(social.linkedin)} aria-label={socialTitle(social.linkedin)} className="hidden size-11 items-center justify-center text-muted transition-colors hover:text-fg lg:inline-flex">
            <LinkedInIcon className="size-[14px]" />
          </SocialAnchor>
          <span className="mx-1.5 hidden h-4 w-px bg-line sm:block" aria-hidden="true" />
          <ThemeToggle />
          <button
            type="button"
            ref={trigger}
            className="ml-1 inline-flex size-11 items-center justify-center text-fg md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-haspopup="dialog"
            onPointerDown={() => { savedScroll.current = window.scrollY; }}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") savedScroll.current = window.scrollY;
            }}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-[18px]" strokeWidth={1.5} /> : <Menu className="size-[18px]" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <dialog
        ref={dialog}
        id="mobile-nav"
        aria-labelledby="mobile-menu-title"
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const bounds = event.currentTarget.getBoundingClientRect();
          if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setOpen(false);
        }}
        className="mobile-menu"
      >
        <div className="bg-grid pointer-events-none absolute inset-0 mask-fade-b" aria-hidden="true" />
        <div className="relative flex h-16 items-center justify-between border-b border-line px-5">
          <h2 id="mobile-menu-title" className="text-sm font-medium">Navigation</h2>
          <button type="button" onClick={() => setOpen(false)} aria-label="Close menu" className="inline-flex size-11 items-center justify-center"><X className="size-5" aria-hidden="true" /></button>
        </div>
        <nav aria-label="Mobile" className="relative px-5 pt-6 pb-10">
          <p className="meta mb-4">Index</p>
          <ul className="border-t border-line">
            {nav.map((item, i) => (
              <li key={item.href} className="rise border-b border-line" style={{ ["--d" as string]: i }}>
                <Link href={item.href} onClick={() => setOpen(false)} aria-current={active(item.href) ? "page" : undefined} className="flex items-baseline justify-between py-4">
                  <span className={cn("text-2xl tracking-tight", active(item.href) ? "text-accent" : "text-fg")}>{item.label}</span>
                  <span className="font-mono text-[11px] text-subtle">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3 text-sm text-muted">
            <SocialAnchor href={socialHref(social.github)} onClick={() => setOpen(false)} target="_blank" rel="noopener noreferrer" title={socialTitle(social.github)} className="flex min-h-11 items-center gap-2"><GitHubIcon className="size-4" /> GitHub</SocialAnchor>
            <SocialAnchor href={socialHref(social.linkedin)} onClick={() => setOpen(false)} target="_blank" rel="noopener noreferrer" title={socialTitle(social.linkedin)} className="flex min-h-11 items-center gap-2"><LinkedInIcon className="size-4" /> LinkedIn</SocialAnchor>
          </div>
        </nav>
      </dialog>
    </header>
  );
}
