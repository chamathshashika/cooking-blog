"use client";

import { useLanguage } from "./LanguageProvider";

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <section className="bg-cream dark:bg-surface pt-6 pb-12 sm:pb-16 text-center border-b border-transparent dark:border-hairline transition-colors duration-200">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <p className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-muted dark:text-amber-text mb-2">
          {t.hero.badge}
        </p>
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink dark:text-ice max-w-2xl mx-auto leading-tight">
          {t.hero.title}
        </h1>
        <p className="mt-3 font-display text-base sm:text-lg text-ink/80 dark:text-slate-muted max-w-xl mx-auto">
          {t.hero.subtitle}
        </p>
      </div>
    </section>
  );
}
