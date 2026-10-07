"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw, Home, Compass } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: Props) {
  useEffect(() => {
    // Log the error to an error reporting service or console
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 bg-linen/30 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">500 Server Error</span>
          </div>
        </div>

        {/* 500 Error Hero Section */}
        <section className="bg-cream py-16 md:py-24 text-center border-b border-ink/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            {/* Visual Icon Badge */}
            <div className="mx-auto mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white border-2 border-red-300 text-red-700 shadow-xs">
              <AlertCircle className="h-9 w-9 sm:h-11 sm:w-11" />
            </div>

            <p className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-muted mb-3">
              Error 500 &bull; Kitchen Disturbance
            </p>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-tight">
              Something Spilled in the Kitchen
            </h1>

            <p className="mt-4 font-display text-base sm:text-lg text-ink/80 max-w-xl mx-auto leading-relaxed">
              A culinary hiccup occurred while preparing this page. Don&apos;t worry—our chefs have
              been alerted and are inspecting the clay pots.
            </p>

            {error.digest && (
              <p className="mt-3 font-mono text-xs text-muted/70">
                Reference ID: <code className="bg-white/80 px-2 py-0.5 rounded border border-ink/10">{error.digest}</code>
              </p>
            )}

            {/* Direct Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => reset()}
                className="inline-flex items-center gap-2 bg-sage px-6 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage/90 transition-colors shadow-xs focus:outline-none focus:ring-2 focus:ring-sage"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Try Again</span>
              </button>

              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-ink/20 bg-white px-6 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink hover:bg-cream hover:border-ink/40 transition-colors"
              >
                <Home className="h-4 w-4" />
                <span>Return to Home</span>
              </Link>

              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 border border-ink/20 bg-white px-6 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink hover:bg-cream hover:border-ink/40 transition-colors"
              >
                <Compass className="h-4 w-4" />
                <span>Browse Recipes</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Helpful Assistance Section */}
        <section className="mx-auto max-w-2xl px-4 sm:px-6 py-12 text-center">
          <h2 className="font-display text-xl text-ink mb-2">Need Help Finding a Dish?</h2>
          <p className="font-display text-sm text-muted mb-6 leading-relaxed">
            If the problem persists, feel free to navigate directly to one of our primary collections:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/category/breakfast"
              className="rounded-full bg-linen/40 border border-ink/10 px-4 py-2 font-ui text-xs font-semibold text-ink hover:border-sage hover:text-sage transition-colors"
            >
              Breakfast Recipes
            </Link>
            <Link
              href="/category/dinner"
              className="rounded-full bg-linen/40 border border-ink/10 px-4 py-2 font-ui text-xs font-semibold text-ink hover:border-sage hover:text-sage transition-colors"
            >
              Curries & Dinners
            </Link>
            <Link
              href="/category/desserts"
              className="rounded-full bg-linen/40 border border-ink/10 px-4 py-2 font-ui text-xs font-semibold text-ink hover:border-sage hover:text-sage transition-colors"
            >
              Sweets & Treats
            </Link>
            <Link
              href="/category"
              className="rounded-full bg-linen/40 border border-ink/10 px-4 py-2 font-ui text-xs font-semibold text-ink hover:border-sage hover:text-sage transition-colors"
            >
              All Categories
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
