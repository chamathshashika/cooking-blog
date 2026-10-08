import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeBanner from "@/components/SubscribeBanner";
import CategoryCarousel from "@/components/CategoryCarousel";
import { categories, getCategoryCount } from "@/lib/data";

export const metadata: Metadata = {
  title: "Explore Recipe Categories | CeylonSpicer",
  description:
    "Explore our complete Sri Lankan recipe collection organized by category: Breakfast dishes, Curries & Dinners, Sweets & Treats, Short Eats, and more.",
  openGraph: {
    title: "Explore Recipe Categories | CeylonSpicer",
    description:
      "Browse authentic Sri Lankan recipes by category: Breakfast, Curries, Desserts, Short Eats, and Island Drinks.",
  },
};

export default function CategoriesPage() {
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
            <span className="text-ink">Categories</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-cream py-12 md:py-16 text-center border-b border-ink/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <p className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-muted mb-2">
              Island Culinary Traditions
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
              Browse by Category
            </h1>
            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 max-w-xl mx-auto">
              From morning milk rice to midnight street-food kottu and festive
              jaggery watalappam—discover recipes categorized by your appetite.
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section
          className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 md:py-16"
          aria-label="Recipe Categories Collection"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group flex flex-col bg-linen/30 border border-ink/10 p-6 text-center transition-all duration-200 hover:border-sage hover:bg-cream/30 hover:shadow-xs focus:outline-none focus:ring-2 focus:ring-sage"
              >
                {/* Circular Category Thumbnail */}
                <div className="mx-auto relative h-28 w-28 overflow-hidden rounded-full border-2 border-transparent transition-transform duration-200 group-hover:scale-105 group-hover:border-sage mb-4">
                  <Image
                    src={category.image}
                    alt={`${category.displayName} category`}
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </div>

                <h2 className="font-display text-xl text-ink transition-colors group-hover:text-sage">
                  {category.displayName}
                </h2>

                <p className="mt-2 font-display text-xs text-muted leading-relaxed flex-1 line-clamp-3">
                  {category.description}
                </p>

                <div className="mt-5 pt-3 border-t border-ink/10 flex items-center justify-between">
                  <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted">
                    {getCategoryCount(category.slug)}{" "}
                    {getCategoryCount(category.slug) === 1
                      ? "Recipe"
                      : "Recipes"}
                  </span>
                  <span className="inline-flex items-center gap-1 font-ui text-[10px] font-bold uppercase tracking-wider text-sage group-hover:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="h-3 w-3" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Explore Slider */}
        <div className="border-t border-ink/10">
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
