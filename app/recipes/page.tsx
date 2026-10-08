import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCarousel from "@/components/CategoryCarousel";
import SubscribeBanner from "@/components/SubscribeBanner";
import RecipesFilterView from "@/components/RecipesFilterView";
import { getAllRecipes, categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Recipes | Authentic Sri Lankan Cooking | CeylonSpicer",
  description:
    "Explore our complete Sri Lankan recipe collection: breakfast hoppers, Jaffna crab curry, dark black pork curry, watalappam, and street food kottu.",
  openGraph: {
    title: "All Sri Lankan Recipes | CeylonSpicer",
    description:
      "Explore our complete Sri Lankan recipe collection: breakfast hoppers, Jaffna crab curry, dark black pork curry, watalappam, and street food kottu.",
  },
};

type Props = {
  searchParams?: Promise<{ category?: string; search?: string }>;
};

export default async function RecipesPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const initialCategory = resolvedSearchParams?.category || "all";
  const initialSearch = resolvedSearchParams?.search || "";
  const allRecipes = getAllRecipes();

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
            <span className="text-ink font-semibold">Recipes</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="bg-cream py-12 md:py-16 text-center border-b border-ink/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <p className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-muted mb-2">
              Island Culinary Heritage
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
              All Sri Lankan Recipes
            </h1>
            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 max-w-xl mx-auto leading-relaxed">
              Explore our complete library of authentic island dishes, fragrant
              slow-simmered curries, vibrant street foods, and festive holiday
              desserts.
            </p>
          </div>
        </section>

        {/* Interactive Filter and Recipe Grid */}
        <section
          className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 md:py-16"
          aria-label="All Recipes Collection"
        >
          <RecipesFilterView
            allRecipes={allRecipes}
            categories={categories}
            initialCategory={initialCategory}
            initialSearch={initialSearch}
          />
        </section>

        {/* Explore Categories Visual Carousel */}
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
