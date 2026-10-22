"use client";

import { useActionState, useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Lock, Mail, User, Eye, EyeOff, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import { signup } from "@/lib/actions/auth";
import { useToast } from "@/components/ToastProvider";

export default function SignUpForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("from") || "/admin";
  const [showPassword, setShowPassword] = useState(false);
  const [state, action, pending] = useActionState(signup, undefined);
  const { error: toastError } = useToast();

  useEffect(() => {
    if (state?.message) {
      toastError(state.message);
    }
  }, [state?.message, toastError]);

  return (
    <form action={action} className="space-y-4">
      {/* General Error Alert */}
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

      {/* Name Field */}
      <div>
        <label
          htmlFor="name"
          className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
        >
          Full Name
        </label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Chef Kumara Perera"
            disabled={pending}
            className="w-full min-h-[44px] rounded-md border border-ink/20 bg-white pl-10 pr-4 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
          />
        </div>
        {state?.errors?.name && (
          <p className="mt-1 text-xs text-red-600 font-ui font-medium">
            {state.errors.name[0]}
          </p>
        )}
      </div>

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
        <label
          htmlFor="password"
          className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
        >
          Password (min 6 characters)
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="Choose a secure password"
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

      {/* Confirm Password Field */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5"
        >
          Confirm Password
        </label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="Confirm your password"
            disabled={pending}
            className="w-full min-h-[44px] rounded-md border border-ink/20 bg-white pl-10 pr-4 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
          />
        </div>
        {state?.errors?.confirmPassword && (
          <p className="mt-1 text-xs text-red-600 font-ui font-medium">
            {state.errors.confirmPassword[0]}
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
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <span>Create Admin Account</span>
            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      {/* Switch to Sign In */}
      <div className="pt-4 border-t border-ink/10 text-center font-ui text-xs text-muted">
        <span>Already have an account? </span>
        <Link
          href={`/login${redirectTo !== "/admin" ? `?from=${encodeURIComponent(redirectTo)}` : ""}`}
          className="font-bold text-sage hover:text-sage-dark underline focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
