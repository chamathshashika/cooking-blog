import Link from "next/link";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="w-full bg-cream border-t border-ink/10 mt-auto">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl md:text-3xl text-ink tracking-tight"
            >
              CeylonSpicer
            </Link>
            <p className="mt-3 max-w-sm font-display text-sm md:text-base text-ink/80 leading-relaxed">
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
            <h4 className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-ink mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 font-ui text-xs uppercase tracking-wider text-muted">
              <li>
                <Link href="/" className="hover:text-ink transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/recipes"
                  className="hover:text-ink transition-colors"
                >
                  All Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/category/breakfast"
                  className="hover:text-ink transition-colors"
                >
                  Breakfast Favorites
                </Link>
              </li>
              <li>
                <Link
                  href="/category/dinner"
                  className="hover:text-ink transition-colors"
                >
                  Curry & Rice
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-ink mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 font-ui text-xs uppercase tracking-wider text-muted">
              <li>
                <Link
                  href="/category/appetizers"
                  className="hover:text-ink transition-colors"
                >
                  Appetizers & Short Eats
                </Link>
              </li>
              <li>
                <Link
                  href="/category/entrees"
                  className="hover:text-ink transition-colors"
                >
                  Main Entrees
                </Link>
              </li>
              <li>
                <Link
                  href="/category/sides"
                  className="hover:text-ink transition-colors"
                >
                  Sambols & Sides
                </Link>
              </li>
              <li>
                <Link
                  href="/category/desserts"
                  className="hover:text-ink transition-colors"
                >
                  Sweets & Desserts
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-ink/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-ui text-[11px] uppercase tracking-wider text-muted">
            &copy;{" "}
            <span suppressHydrationWarning>{new Date().getFullYear()}</span>{" "}
            CeylonSpicer. Crafted with love for Sri Lankan cuisine.
          </p>
          <div className="flex items-center gap-6 font-ui text-[11px] uppercase tracking-wider text-muted">
            <Link href="/privacy" className="hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-ink">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
