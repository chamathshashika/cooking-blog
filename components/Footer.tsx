import Link from "next/link";
import SocialIcons from "./SocialIcons";
import ThemeToggle from "./ThemeToggle";

export default function Footer() {
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
              A celebration of vibrant Sri Lankan home cooking. Dedicated to
              sharing time-honored family recipes, island spices, and culinary
              heritage.
            </p>
            <div className="mt-6">
              <SocialIcons size="md" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-ink dark:text-ice mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 font-ui text-xs uppercase tracking-wider text-muted dark:text-slate-muted">
              <li>
                <Link
                  href="/"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  All Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/category/breakfast"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Breakfast Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dinner"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Curry & Rice
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-ink dark:text-ice mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 font-ui text-xs uppercase tracking-wider text-muted dark:text-slate-muted">
              <li>
                <Link
                  href="/category/appetizers"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Appetizers & Short Eats
                </Link>
              </li>
              <li>
                <Link
                  href="/category/entrees"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Main Entrees
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sides"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Sambols & Sides
                </Link>
              </li>
              <li>
                <Link
                  href="/category/desserts"
                  className="hover:text-ink dark:hover:text-amber-text transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Sweets & Desserts
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
            CeylonSpicer. Crafted with love for Sri Lankan cuisine.
          </p>
          <div className="flex flex-wrap items-center gap-5 sm:gap-6 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            <Link
              href="/privacy"
              className="hover:text-ink dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="hover:text-ink dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Terms
            </Link>
            <Link
              href="/contact"
              className="hover:text-ink dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Contact
            </Link>
            <Link
              href="/admin"
              className="hover:text-ink dark:hover:text-amber-text font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Admin
            </Link>
            <div className="border-l border-ink/10 dark:border-hairline pl-4">
              <ThemeToggle variant="minimal" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
