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
      <body className="flex min-h-screen flex-col items-center justify-center bg-[#FDFBF7] text-[#1A1A1A] p-6 text-center antialiased">
        <div className="max-w-md w-full border border-black/10 bg-white p-8 sm:p-10 shadow-sm">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#E5ECE5] text-[#556B2F]">
            <span className="text-2xl font-bold">!</span>
          </div>

          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#666666] mb-2 font-mono">
            Critical System Disturbance
          </p>

          <h1 className="text-3xl font-serif text-[#1A1A1A] leading-tight mb-3">
            Kitchen Temporarily Closed
          </h1>

          <p className="text-sm text-[#4A4A4A] leading-relaxed mb-6">
            A critical error occurred while preparing the application foundation. Please refresh
            or try again in a few moments.
          </p>

          {error.digest && (
            <p className="text-xs font-mono text-[#888888] mb-6">
              Digest: {error.digest}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#556B2F] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-[#485B27] transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Retry</span>
            </button>

            <a
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-black/20 bg-white px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-[#1A1A1A] hover:bg-[#FDFBF7] transition-colors"
            >
              Reload App
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
