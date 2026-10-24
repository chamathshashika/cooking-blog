"use client";

import { useEffect } from "react";
import { RotateCcw } from "lucide-react";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: Props) {
  useEffect(() => {
    console.error("Global application error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col items-center justify-center bg-linen/30 dark:bg-obsidian text-ink dark:text-ice p-6 text-center antialiased transition-colors">
        <div className="max-w-md w-full border border-ink/10 dark:border-hairline bg-white dark:bg-surface p-8 sm:p-10 shadow-sm rounded-lg">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-sage/15 dark:bg-sage/25 text-sage dark:text-amber-primary">
            <span className="text-2xl font-bold">!</span>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted dark:text-slate-muted mb-2 font-ui">
            Critical System Disturbance
          </p>

          <h1 className="text-3xl font-display text-ink dark:text-ice leading-tight mb-3">
            Kitchen Temporarily Closed
          </h1>

          <p className="text-sm text-muted dark:text-slate-muted leading-relaxed mb-6">
            A critical error occurred while preparing the application foundation. Please refresh
            or try again in a few moments.
          </p>

          {error.digest && (
            <p className="text-xs font-mono text-muted dark:text-slate-muted mb-6">
              Digest: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-sage dark:bg-amber-primary px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white dark:text-obsidian hover:bg-sage-dark dark:hover:bg-amber-primary/90 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </button>

            <button
              onClick={() => {
                if (typeof window !== "undefined") {
                  window.location.reload();
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-ink dark:text-ice hover:bg-linen/30 dark:hover:bg-surface transition-colors"
            >
              Reload App
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
