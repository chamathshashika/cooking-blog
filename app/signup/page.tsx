import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, UserPlus, ShieldCheck } from "lucide-react";
import SignUpForm from "@/components/auth/SignUpForm";
import { getSession } from "@/lib/session";
import { hasAdminAccess } from "@/lib/definitions";

export const metadata: Metadata = {
  title: "Admin Sign Up | CeylonSpicer",
  description: "Create an administrator account for the CeylonSpicer Kitchen Content Studio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function SignUpPage() {
  const session = await getSession();
  if (session) {
    redirect(hasAdminAccess(session.role) ? "/admin" : "/");
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#fcfaf6] text-ink antialiased">
      {/* Top minimal bar */}
      <header className="border-b border-ink/10 bg-white/80 py-3 px-4 sm:px-6">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-ink/15 bg-white shadow-xs">
              <Image
                src="/favicon.ico"
                alt="CeylonSpicer logo"
                width={28}
                height={28}
                className="h-full w-full object-contain p-0.5"
                priority
              />
            </div>
            <span className="font-display text-xl text-ink tracking-tight">
              CeylonSpicer
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-ui text-[11px] font-bold uppercase tracking-wider text-muted hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
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
          <div className="relative overflow-hidden rounded-xl border border-ink/10 bg-white p-6 sm:p-8 shadow-sm">
            {/* Ambient Background Accent */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-sunshine/20 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-36 w-36 rounded-full bg-sage/10 blur-2xl" />

            {/* Header */}
            <div className="relative mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-cream border border-ink/10 shadow-2xs">
                <UserPlus className="h-6 w-6 text-sage" />
              </div>
              <div className="inline-flex items-center gap-1 rounded-full bg-sunshine/20 px-2.5 py-0.5 font-ui text-[9px] font-bold uppercase tracking-widest text-ink border border-sunshine/40 mb-2">
                <ShieldCheck className="h-3 w-3 text-sage" />
                <span>Admin Studio Portal</span>
              </div>
              <h1 className="font-display text-2xl sm:text-3xl text-ink">
                Create Admin Account
              </h1>
              <p className="mt-1 font-display text-xs text-muted max-w-xs mx-auto">
                Register as an author or studio administrator to publish and edit recipes.
              </p>
            </div>

            {/* Form */}
            <div className="relative">
              <Suspense
                fallback={
                  <div className="py-12 text-center font-ui text-xs text-muted">
                    Loading registration...
                  </div>
                }
              >
                <SignUpForm />
              </Suspense>
            </div>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center font-ui text-[11px] uppercase tracking-wider text-muted">
            Protected Content Studio • CeylonSpicer © 2026
          </p>
        </div>
      </main>
    </div>
  );
}
