import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ChefHat, ShieldCheck } from "lucide-react";
import SignInForm from "@/components/auth/SignInForm";
import { getSession } from "@/lib/session";
import { hasAdminAccess } from "@/lib/definitions";

export const metadata: Metadata = {
  title: "Admin Sign In | CeylonSpicer",
  description: "Sign in to the CeylonSpicer Kitchen Studio to manage recipes and culinary stories.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function LoginPage() {
  const session = await getSession();
  if (session) {
    redirect(hasAdminAccess(session.role) ? "/admin" : "/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-linen/20 dark:bg-obsidian text-ink dark:text-ice antialiased transition-colors">
      {/* Top minimal bar */}
      <header className="border-b border-ink/10 dark:border-hairline bg-white/80 dark:bg-surface/80 py-3 px-4 sm:px-6">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel shadow-xs">
              <Image
                src="/favicon.ico"
                alt="CeylonSpicer logo"
                width={28}
                height={28}
                className="h-full w-full object-contain p-0.5"
                priority
              />
            </div>
            <span className="font-display text-xl text-ink dark:text-ice tracking-tight">
              CeylonSpicer
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-ui text-[11px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Public Site</span>
          </Link>
        </div>
      </header>

      {/* Main Form Center */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 py-10 sm:py-16">
        <div className="w-full max-w-md">
          {/* Card Container */}
          <div className="relative overflow-hidden rounded-xl border border-ink/10 dark:border-hairline bg-white dark:bg-surface p-6 sm:p-8 shadow-sm">
            {/* Ambient Background Accent */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sunshine/20 dark:bg-amber-primary/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-sage/10 dark:bg-sage/15 blur-2xl" />

            {/* Header */}
            <div className="relative mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream dark:bg-panel border border-ink/10 dark:border-hairline shadow-2xs">
                <ChefHat className="h-6 w-6 text-sage dark:text-amber-primary" />
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-sunshine/20 dark:bg-amber-primary/15 px-2.5 py-0.5 font-ui text-[9px] font-bold uppercase tracking-widest text-ink dark:text-amber-text border border-sunshine/40 dark:border-amber-primary/30 mb-2">
                <ShieldCheck className="h-3 w-3 text-sage dark:text-amber-primary" />
                <span>Admin Studio Portal</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl text-ink dark:text-ice">
                Sign In to Studio
              </h1>
              <p className="mt-1 font-display text-xs text-muted dark:text-slate-muted max-w-xs mx-auto">
                Enter your chef credentials to manage recipes, categories, and published stories.
              </p>
            </div>

            {/* Form */}
            <div className="relative">
              <Suspense
                fallback={
                  <div className="py-12 text-center font-ui text-xs text-muted dark:text-slate-muted">
                    Loading sign in...
                  </div>
                }
              >
                <SignInForm />
              </Suspense>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            Protected Content Studio • CeylonSpicer © 2026
          </p>
        </div>
      </main>
    </div>
  );
}
