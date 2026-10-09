"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

export function CopyLink({ url, labels = { copy: "Copy link", copyAriaLabel: "Copy article link", copied: "Copied", copiedAnnouncement: "Article link copied", failedAnnouncement: "Unable to copy article link" } }: { url: string; labels?: { copy: string; copyAriaLabel: string; copied: string; copiedAnnouncement: string; failedAnnouncement: string } }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timeout.current) clearTimeout(timeout.current);
  }, []);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    if (timeout.current) clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setStatus("idle"), 1800);
  }

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={copyLink}
        aria-label={status === "copied" ? labels.copiedAnnouncement : labels.copyAriaLabel}
        className="inline-flex min-h-9 items-center gap-2 text-[12px] text-muted transition-colors hover:text-fg"
      >
        {status === "copied" ? <Check className="size-3.5" aria-hidden="true" /> : <Copy className="size-3.5" aria-hidden="true" />}
        {status === "copied" ? labels.copied : labels.copy}
      </button>
      <span className="sr-only" aria-live="polite">
        {status === "copied" ? `${labels.copiedAnnouncement}.` : status === "failed" ? `${labels.failedAnnouncement}.` : ""}
      </span>
    </div>
  );
}