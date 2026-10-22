"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertTriangle, Clock, Sliders, ExternalLink, X, Eye } from "lucide-react";
import type { SiteMode } from "@/lib/actions/siteStatus";

type Props = {
  mode: SiteMode;
  headline?: string;
};

export default function AdminSiteStatusBanner({ mode, headline }: Props) {
  const [isDismissed, setIsDismissed] = useState(false);

  if (mode === "live" || isDismissed) {
    return null;
  }

  const isComingSoon = mode === "coming_soon";
  const label = isComingSoon ? "Coming Soon Mode" : "Under Construction Mode";
  const previewPath = isComingSoon ? "/coming-soon" : "/under-construction";

  return (
    <div
      role="status"
      aria-live="polite"
      className="sticky top-0 z-50 w-full border-b border-amber-300 dark:border-amber-primary/40 bg-amber-50/95 dark:bg-panel/95 px-4 py-2 text-ink dark:text-ice shadow-sm backdrop-blur-md transition-all"
    >
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-2 text-xs">
        {/* Left: Indicator & Status message */}
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 rounded-full bg-amber-500 dark:bg-amber-primary animate-pulse" />
          <div className="flex items-center gap-1.5 font-ui font-semibold text-amber-950 dark:text-ice">
            {isComingSoon ? (
              <Clock className="h-3.5 w-3.5 text-amber-700 dark:text-amber-primary" />
            ) : (
              <AlertTriangle className="h-3.5 w-3.5 text-amber-700 dark:text-amber-primary" />
            )}
            <span>{label} Active:</span>
          </div>
          <span className="font-ui text-amber-900/90 dark:text-slate-muted hidden sm:inline">
            Only administrators can browse the full site. Regular visitors see the{" "}
            <strong className="font-semibold text-amber-950 dark:text-ice">
              {isComingSoon ? "Coming Soon" : "Under Construction"}
            </strong>{" "}
            page.
          </span>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-2">
          <Link
            href={previewPath}
            target="_blank"
            className="inline-flex items-center gap-1 rounded bg-white dark:bg-surface px-2 py-1 font-ui text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-ice border border-amber-200 dark:border-hairline shadow-2xs hover:bg-amber-100/50 dark:hover:bg-panel hover:text-amber-950 transition-colors"
          >
            <Eye className="h-3 w-3" />
            <span>Preview Page</span>
          </Link>

          <Link
            href="/admin/settings"
            className="inline-flex items-center gap-1 rounded bg-amber-600 dark:bg-amber-primary px-2.5 py-1 font-ui text-[11px] font-bold uppercase tracking-wider text-white dark:text-obsidian shadow-2xs hover:bg-amber-700 dark:hover:bg-amber-primary/90 transition-colors"
          >
            <Sliders className="h-3 w-3" />
            <span>Manage Status</span>
          </Link>

          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            aria-label="Dismiss banner for this session"
            className="inline-flex h-6 w-6 items-center justify-center rounded text-amber-700 dark:text-slate-muted hover:bg-amber-200/50 dark:hover:bg-surface hover:text-amber-950 dark:hover:text-ice transition-colors"
            title="Dismiss notification"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
