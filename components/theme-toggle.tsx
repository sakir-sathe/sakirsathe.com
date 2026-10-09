"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function subscribe(callback: () => void) {
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
  const onChange = () => {
    let saved: string | null = null;
    try { saved = localStorage.getItem("theme"); } catch { /* Storage is optional. */ }
    const dark = saved === "dark" || (saved !== "light" && mq.matches);
    document.documentElement.classList.toggle("dark", dark);
    callback();
  };
  onChange();
  mq.addEventListener("change", onChange);
  window.addEventListener("storage", onChange);
  return () => {
    observer.disconnect();
    mq.removeEventListener("change", onChange);
    window.removeEventListener("storage", onChange);
  };
}
const getSnapshot = (): Theme => document.documentElement.classList.contains("dark") ? "dark" : "light";
const getServerSnapshot = (): Theme => "light";

export function ThemeToggle({ labels = { dark: "Switch to dark theme", light: "Switch to light theme" } }: { labels?: { dark: string; light: string } }) {
  const theme = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = () => {
    const next: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try { localStorage.setItem("theme", next); } catch { /* storage unavailable */ }
  };

  const label = theme === "dark" ? labels.light : labels.dark;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="inline-flex size-11 items-center justify-center rounded-sm border border-transparent text-muted transition-colors hover:border-line hover:text-fg"
    >
      <Sun className="hidden size-[15px] dark:block" strokeWidth={1.6} aria-hidden="true" />
      <Moon className="block size-[15px] dark:hidden" strokeWidth={1.6} aria-hidden="true" />
    </button>
  );
}
