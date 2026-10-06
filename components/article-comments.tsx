"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { giscus } from "@/data/site";

const GiscusWidget = lazy(() => import("@giscus/react"));

const [repoOwner, repoName, ...extraRepoParts] = giscus.repo.split("/");
const configured = giscus.enabled && Boolean(
  repoOwner?.trim() &&
  repoName?.trim() &&
  extraRepoParts.length === 0 &&
  giscus.repoId.trim() &&
  giscus.category.trim() &&
  giscus.categoryId.trim(),
);

export function ArticleComments() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [nearViewport, setNearViewport] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    updateTheme();

    const themeObserver = new MutationObserver(updateTheme);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const section = sectionRef.current;
    if (!section || !("IntersectionObserver" in window)) {
      setNearViewport(true);
      return () => themeObserver.disconnect();
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNearViewport(true);
          visibilityObserver.disconnect();
        }
      },
      { rootMargin: "320px" },
    );
    visibilityObserver.observe(section);

    return () => {
      themeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  if (!configured) return null;

  return (
    <section ref={sectionRef} aria-labelledby="article-comments-heading" className="mt-16 border-t border-line pt-8">
      <h2 id="article-comments-heading" className="text-[17px] font-medium tracking-tight">Discussion</h2>
      <div className="mt-5 min-h-36">
        {nearViewport && (
          <Suspense fallback={<div aria-hidden="true" className="min-h-36" />}>
            <GiscusWidget
              repo={giscus.repo as `${string}/${string}`}
              repoId={giscus.repoId}
              category={giscus.category}
              categoryId={giscus.categoryId}
              mapping="pathname"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme={theme}
              lang="en"
              loading="lazy"
            />
          </Suspense>
        )}
      </div>
    </section>
  );
}