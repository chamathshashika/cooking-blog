import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CategoryCarousel from "@/components/CategoryCarousel";
import SubscribeBanner from "@/components/SubscribeBanner";
import RecipesFilterView from "@/components/RecipesFilterView";
import { getRecipes } from "@/lib/actions/recipe";
import { getCategories } from "@/lib/actions/category";
import { cookies } from "next/headers";
import { translations } from "@/lib/i18n/translations";
import { localizeRecipes, localizeCategories } from "@/lib/i18n/dynamicContent";
import type { Language } from "@/lib/i18n/types";

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

export const dynamic = "force-dynamic";

export default async function RecipesPage({ searchParams }: Props) {
  const resolvedSearchParams = await searchParams;
  const initialCategory = resolvedSearchParams?.category || "all";
  const initialSearch = resolvedSearchParams?.search || "";
  const cookieStore = await cookies();
  const lang = (cookieStore.get("ceylonspicer_language")?.value as Language) || "en";
  const dict = translations[lang] || translations.en;

  const [rawRecipes, rawCategories] = await Promise.all([
    getRecipes(),
    getCategories(),
  ]);

  const allRecipes = localizeRecipes(rawRecipes, lang);
  const categories = localizeCategories(rawCategories, lang);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-obsidian transition-colors duration-200">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 dark:border-hairline bg-linen/30 dark:bg-surface/50 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            <Link
              href="/"
              className="hover:text-ink dark:hover:text-ice transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              {dict.nav.home}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink dark:text-ice font-semibold">{dict.nav.recipes}</span>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="bg-cream dark:bg-surface py-12 md:py-16 text-center border-b border-ink/10 dark:border-hairline transition-colors duration-200">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <p className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-muted dark:text-amber-text mb-2">
              {lang === "it" ? "Patrimonio Culinario dell'Isola" : "Island Culinary Heritage"}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink dark:text-ice leading-tight">
              {lang === "it" ? "Tutte le Ricette dello Sri Lanka" : "All Sri Lankan Recipes"}
            </h1>
            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 dark:text-slate-muted max-w-xl mx-auto leading-relaxed">
              {lang === "it"
                ? "Esplora la nostra collezione completa di autentici piatti dell'isola, ricchi curry sobbolliti lentamente, street food vivaci e dolci tradizionali."
                : "Explore our complete library of authentic island dishes, fragrant slow-simmered curries, vibrant street foods, and festive holiday desserts."}
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
        <div className="border-t border-ink/10 dark:border-hairline bg-linen/20 dark:bg-panel/30">
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
