import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SubscribeBanner from "@/components/SubscribeBanner";
import CategoryCarousel from "@/components/CategoryCarousel";
import { getCategories } from "@/lib/actions/category";
import { getRecipes } from "@/lib/actions/recipe";
import { getBlobDisplayUrl, isBlobProxyUrl } from "@/lib/blob-util";
import { cookies } from "next/headers";
import { translations } from "@/lib/i18n/translations";
import { localizeCategories, localizeRecipes } from "@/lib/i18n/dynamicContent";
import type { Language } from "@/lib/i18n/types";

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

export default async function CategoriesPage() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("ceylonspicer_language")?.value as Language) || "en";
  const dict = translations[lang] || translations.en;

  const [rawCategories, rawRecipes] = await Promise.all([
    getCategories(),
    getRecipes(),
  ]);

  const categories = localizeCategories(rawCategories, lang);
  const recipes = localizeRecipes(rawRecipes, lang);

  const getCount = (catSlug: string, catName: string) => {
    const s = catSlug.toLowerCase();
    const n = catName.toLowerCase();
    return recipes.filter((r) => {
      const c = r.category.toLowerCase();
      return (
        c === s ||
        c === n ||
        (s === "dinner" &&
          (c.includes("curry") ||
            c === "entrees" ||
            c === "meat" ||
            c === "seafood"))
      );
    }).length;
  };

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
            <span className="text-ink dark:text-ice font-semibold">{dict.nav.categories}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="bg-cream dark:bg-surface py-12 md:py-16 text-center border-b border-ink/10 dark:border-hairline transition-colors duration-200">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <p className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-muted dark:text-amber-text mb-2">
              {lang === "it" ? "Tradizioni Culinarie dell'Isola" : "Island Culinary Traditions"}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink dark:text-ice leading-tight">
              {lang === "it" ? "Sfoglia per Categoria" : "Browse by Category"}
            </h1>
            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 dark:text-slate-muted max-w-xl mx-auto">
              {lang === "it"
                ? "Dal riso al latte del mattino al kottu street-food della notte e ai dolci festivi—scopri le ricette organizzate per ogni occasione."
                : "From morning milk rice to midnight street-food kottu and festive jaggery watalappam—discover recipes categorized by your appetite."}
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section
          className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 md:py-16"
          aria-label="Recipe Categories Collection"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => {
              const recipeCount = getCount(category.slug, category.name);
              return (
                <Link
                  key={category.slug}
                  href={`/category/${category.slug}`}
                  className="group flex flex-col bg-linen/30 dark:bg-surface border border-ink/10 dark:border-hairline p-6 text-center transition-all duration-200 hover:border-sage dark:hover:border-amber-primary hover:bg-cream/30 dark:hover:bg-panel hover:shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  {/* Circular Category Thumbnail */}
                  <div className="mx-auto relative h-28 w-28 overflow-hidden rounded-full border-2 border-transparent dark:border-hairline transition-transform duration-200 group-hover:scale-105 group-hover:border-sage dark:group-hover:border-amber-primary mb-4">
                    <Image
                      src={getBlobDisplayUrl(category.image)}
                      alt={`${category.displayName} category`}
                      fill
                      sizes="112px"
                      unoptimized={isBlobProxyUrl(category.image)}
                      className="object-cover"
                    />
                  </div>

                  <h2 className="font-display text-xl text-ink dark:text-ice transition-colors group-hover:text-sage dark:group-hover:text-amber-text">
                    {category.displayName}
                  </h2>

                  <p className="mt-2 font-display text-xs text-muted dark:text-slate-muted leading-relaxed flex-1 line-clamp-3">
                    {category.description}
                  </p>

                  <div className="mt-5 pt-3 border-t border-ink/10 dark:border-hairline flex items-center justify-between">
                    <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted">
                      {recipeCount} {recipeCount === 1 ? (lang === "it" ? "Ricetta" : "Recipe") : (lang === "it" ? "Ricette" : "Recipes")}
                    </span>
                    <span className="inline-flex items-center gap-1 font-ui text-[10px] font-bold uppercase tracking-wider text-sage dark:text-amber-text group-hover:translate-x-0.5 transition-transform">
                      <span>{lang === "it" ? "Esplora" : "Explore"}</span>
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Explore Slider */}
        <div className="border-t border-ink/10 dark:border-hairline">
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
