import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, UtensilsCrossed } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCarousel from "@/components/CategoryCarousel";
import SubscribeBanner from "@/components/SubscribeBanner";
import { getCategories } from "@/lib/actions/category";

export const metadata: Metadata = {
  title: "404 - Recipe Not Found | CeylonSpicer",
  description:
    "The page or recipe you are looking for doesn't exist or has moved. Explore our authentic Sri Lankan recipes.",
};

export default async function NotFound() {
  const categories = await getCategories();
  const quickLinks = [
    { label: "Breakfast Dishes", href: "/category/breakfast" },
    { label: "Curries & Dinners", href: "/category/dinner" },
    { label: "Sweets & Treats", href: "/category/desserts" },
    { label: "Short Eats & Appetizers", href: "/category/appetizers" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-obsidian transition-colors">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 dark:border-hairline bg-linen/30 dark:bg-surface/50 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            <Link href="/" className="hover:text-ink dark:hover:text-amber-text transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink dark:text-ice font-semibold">404 Page Not Found</span>
          </div>
        </div>

        {/* 404 Hero Section */}
        <section className="bg-cream dark:bg-surface/80 py-16 md:py-24 text-center border-b border-ink/10 dark:border-hairline">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            {/* Visual Icon Badge */}
            <div className="mx-auto mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white dark:bg-surface border-2 border-sage/40 dark:border-amber-primary/40 text-sage dark:text-amber-primary shadow-xs">
              <UtensilsCrossed className="h-9 w-9 sm:h-11 sm:w-11" />
            </div>

            <p className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-muted dark:text-slate-muted mb-3">
              Error 404 &bull; Missing Dish
            </p>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink dark:text-ice leading-tight">
              This Recipe Slipped Off the Table
            </h1>

            <p className="mt-4 font-display text-base sm:text-lg text-ink/80 dark:text-slate-muted max-w-xl mx-auto leading-relaxed">
              We couldn&apos;t find the recipe, story, or category you were
              looking for. Perhaps it was moved to another shelf in our pantry,
              or the link has changed.
            </p>

            {/* Direct Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 bg-sage dark:bg-amber-primary px-6 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white dark:text-obsidian hover:bg-sage/90 dark:hover:bg-amber-primary/90 transition-colors shadow-xs"
              >
                <Compass className="h-4 w-4" />
                <span>Browse All Recipes</span>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-6 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink dark:text-ice hover:bg-cream dark:hover:bg-surface hover:border-ink/40 dark:hover:border-amber-primary/40 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Homepage</span>
              </Link>
            </div>

            {/* Popular Categories Shortcut */}
            <div className="mt-12 pt-8 border-t border-ink/10 dark:border-hairline max-w-xl mx-auto">
              <p className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-muted dark:text-slate-muted mb-4">
                Popular Categories to Explore
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-full bg-white dark:bg-panel border border-ink/10 dark:border-hairline px-4 py-1.5 font-ui text-[11px] font-semibold text-ink dark:text-ice hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text hover:bg-cream/40 dark:hover:bg-surface transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Explore Categories Carousel */}
        <div className="border-t border-ink/10 dark:border-hairline bg-linen/20 dark:bg-surface/30">
          <CategoryCarousel categories={categories} />
        </div>

        {/* Subscribe Banner */}
        <div className="mt-12 md:mt-16">
          <SubscribeBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
