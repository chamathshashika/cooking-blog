"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { login } from "@/lib/actions/auth";

export default function SignInForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin";
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="space-y-4">
      {/* General Error Message */}
      {state?.message && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-2.5 rounded-md border border-red-200 bg-red-50/90 p-3 text-red-900 animate-in fade-in"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          <span className="font-ui text-xs font-medium leading-relaxed">
            {state.message}
          </span>
        </div>
      )}

      {/* Hidden redirect field */}
      <input type="hidden" name="redirectTo" value={redirectTo} />

      {/* Email Field */}
      <div>
        <label
          htmlFor="email"
          className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
        >
          Email Address
        </label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder="chef@ceylonspicer.com"
            disabled={pending}
            className="w-full min-h-[44px] rounded-md border border-ink/20 bg-white pl-10 pr-4 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
          />
        </div>
        {state?.errors?.email && (
          <p className="mt-1 text-xs text-red-600 font-ui font-medium">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label
            htmlFor="password"
            className="block font-ui text-xs font-bold uppercase tracking-wider text-ink"
          >
            Password
          </label>
        </div>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            placeholder="Enter your password"
            disabled={pending}
            className="w-full min-h-[44px] rounded-md border border-ink/20 bg-white pl-10 pr-11 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {state?.errors?.password && (
          <p className="mt-1 text-xs text-red-600 font-ui font-medium">
            {state.errors.password[0]}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={pending}
        className="w-full min-h-[44px] inline-flex items-center justify-center gap-2 rounded-md bg-sage px-5 py-2.5 font-ui text-xs font-bold uppercase tracking-[0.12em] text-white shadow-xs transition-all hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:opacity-60 mt-2 cursor-pointer"
      >
        {pending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign In to Studio</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {/* Switch to Sign Up */}
      <div className="pt-4 border-t border-ink/10 text-center font-ui text-xs text-muted">
        <span>Don&apos;t have an account? </span>
        <Link
          href={`/signup${redirectTo !== "/admin" ? `?from=${encodeURIComponent(redirectTo)}` : ""}`}
          className="font-bold text-sage hover:text-sage-dark underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          Create admin account
        </Link>
      </div>
    </form>
  );
}
