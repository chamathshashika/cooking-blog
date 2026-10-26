"use client";

import { useActionState } from "react";
import { subscribeNewsletter, type SubscribeResponse } from "@/lib/actions/newsletter";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

export default function SubscribeBanner() {
  const { t } = useLanguage();
  const [state, formAction, isPending] = useActionState<SubscribeResponse | null, FormData>(
    subscribeNewsletter,
    null
  );

  return (
    <section
      aria-label={t.subscribe.badge}
      className="w-full bg-sunshine dark:bg-panel dark:border-y dark:border-hairline py-12 md:py-16 text-center transition-colors duration-200"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <p className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-ink dark:text-amber-text">
          {t.subscribe.badge}
        </p>
        <h2 className="mt-2 font-display text-3xl md:text-4xl text-ink dark:text-ice">
          {t.subscribe.title}
        </h2>
        <p className="mt-1 text-sm md:text-base font-display text-ink/80 dark:text-slate-muted max-w-lg mx-auto">
          {t.subscribe.subtitle}
        </p>

        {state?.success ? (
          <div className="mt-6 inline-flex items-center gap-2.5 bg-white/95 dark:bg-surface px-6 py-3.5 font-ui text-sm font-semibold tracking-wide text-ink dark:text-ice border border-sage/40 dark:border-success/40 shadow-xs">
            <CheckCircle2 className="h-5 w-5 text-sage dark:text-success shrink-0" />
            <span>{state.message}</span>
          </div>
        ) : (
          <form
            action={formAction}
            className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row max-w-xl mx-auto"
          >
            <input
              type="text"
              name="name"
              placeholder={t.subscribe.namePlaceholder}
              required
              disabled={isPending}
              aria-label={t.subscribe.namePlaceholder}
              className="min-h-[44px] h-11 w-full sm:w-48 bg-white dark:bg-surface px-3.5 font-ui text-xs text-ink dark:text-ice placeholder:text-muted/70 dark:placeholder:text-slate-muted/70 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-wider border border-transparent dark:border-hairline focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary disabled:opacity-60"
            />
            <input
              type="email"
              name="email"
              placeholder={t.subscribe.emailPlaceholder}
              required
              disabled={isPending}
              aria-label={t.subscribe.emailPlaceholder}
              className="min-h-[44px] h-11 w-full sm:w-64 bg-white dark:bg-surface px-3.5 font-ui text-xs text-ink dark:text-ice placeholder:text-muted/70 dark:placeholder:text-slate-muted/70 placeholder:uppercase placeholder:text-[10px] placeholder:tracking-wider border border-transparent dark:border-hairline focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={isPending}
              className="min-h-[44px] h-11 w-full sm:w-auto bg-sage dark:bg-amber-primary px-7 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white transition-colors duration-150 hover:bg-sage-dark dark:hover:bg-amber-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-ink disabled:opacity-75 inline-flex items-center justify-center gap-2"
            >
              {isPending && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              <span>{isPending ? t.subscribe.subscribing : t.subscribe.button}</span>
            </button>
          </form>
        )}

        {state?.success === false && (
          <p
            className="mt-3 font-ui text-xs font-medium text-red-700 dark:text-red-400 bg-red-50/80 dark:bg-red-950/40 inline-block px-3 py-1 border border-red-200 dark:border-red-900/50"
            role="alert"
          >
            {state.message}
          </p>
        )}
      </div>
    </section>
  );
}
