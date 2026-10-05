import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Compass, Search, UtensilsCrossed } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCarousel from "@/components/CategoryCarousel";
import SubscribeBanner from "@/components/SubscribeBanner";
import { categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "404 - Recipe Not Found | Scrumptious",
  description:
    "The page or recipe you are looking for doesn't exist or has moved. Explore our authentic Sri Lankan recipes.",
};

export default function NotFound() {
  const quickLinks = [
    { label: "Breakfast Dishes", href: "/category/breakfast" },
    { label: "Curries & Dinners", href: "/category/dinner" },
    { label: "Sweets & Treats", href: "/category/desserts" },
    { label: "Short Eats & Appetizers", href: "/category/appetizers" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 bg-linen/30 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">404 Page Not Found</span>
          </div>
        </div>

        {/* 404 Hero Section */}
        <section className="bg-cream py-16 md:py-24 text-center border-b border-ink/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            {/* Visual Icon Badge */}
            <div className="mx-auto mb-6 flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white border-2 border-sage/40 text-sage shadow-xs">
              <UtensilsCrossed className="h-9 w-9 sm:h-11 sm:w-11" />
            </div>

            <p className="font-ui text-[11px] font-bold uppercase tracking-[0.18em] text-muted mb-3">
              Error 404 &bull; Missing Dish
            </p>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-ink leading-tight">
              This Recipe Slipped Off the Table
            </h1>

            <p className="mt-4 font-display text-base sm:text-lg text-ink/80 max-w-xl mx-auto leading-relaxed">
              We couldn&apos;t find the recipe, story, or category you were looking for. Perhaps it
              was moved to another shelf in our pantry, or the link has changed.
            </p>

            {/* Direct Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 bg-sage px-6 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage/90 transition-colors shadow-xs"
              >
                <Compass className="h-4 w-4" />
                <span>Browse All Recipes</span>
              </Link>

              <Link
                href="/"
                className="inline-flex items-center gap-2 border border-ink/20 bg-white px-6 py-3 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-ink hover:bg-cream hover:border-ink/40 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Homepage</span>
              </Link>
            </div>

            {/* Popular Categories Shortcut */}
            <div className="mt-12 pt-8 border-t border-ink/10 max-w-xl mx-auto">
              <p className="font-ui text-[11px] font-bold uppercase tracking-[0.12em] text-muted mb-4">
                Popular Categories to Explore
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2.5">
                {quickLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="rounded-full bg-white border border-ink/10 px-4 py-1.5 font-ui text-[11px] font-semibold text-ink hover:border-sage hover:text-sage hover:bg-cream/40 transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Explore Categories Carousel */}
        <div className="border-t border-ink/10 bg-linen/20">
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
