"use client";

import Link from "next/link";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "./LanguageProvider";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-cream dark:bg-surface border-t border-ink/10 dark:border-hairline mt-auto transition-colors duration-200">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl md:text-3xl text-ink dark:text-ice tracking-tight"
            >
              CeylonSpicer
            </Link>
            <p className="mt-3 max-w-sm font-display text-sm md:text-base text-ink/80 dark:text-slate-muted leading-relaxed">
              {t.footer.brandNarrative}
            </p>
            <div className="mt-6">
              <SocialIcons size="md" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-ink dark:text-ice mb-4">
              {t.footer.explore}
            </h4>
            <ul className="space-y-2.5 font-ui text-xs uppercase tracking-wider text-muted dark:text-slate-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  {t.nav.home}
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  {t.nav.allRecipes}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/breakfast"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  {t.footer.breakfastFavorites}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dinner"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  {t.footer.curryRice}
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-ink dark:text-ice mb-4">
              {t.footer.categories}
            </h4>
            <ul className="space-y-2.5 font-ui text-xs uppercase tracking-wider text-muted dark:text-slate-muted">
              <li>
                <Link
                  href="/category/appetizers"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  {t.nav.appetizers}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/entrees"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  {t.nav.entrees}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sides"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  {t.nav.sides}
                </Link>
              </li>
              <li>
                <Link
                  href="/category/desserts"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  {t.nav.desserts}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-ink/10 dark:border-hairline pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            &copy;{" "}
            <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            {t.footer.copyright}
          </p>
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            <Link
              href="/privacy"
              className="hover:text-ink dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms"
              className="hover:text-ink dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              {t.footer.terms}
            </Link>
            <Link
              href="/contact"
              className="hover:text-ink dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              {t.footer.contact}
            </Link>
            <div className="flex items-center gap-2 border-l border-ink/10 dark:border-hairline pl-4">
              <LanguageToggle variant="minimal" />
              <ThemeToggle variant="minimal" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
