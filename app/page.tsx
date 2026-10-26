import Header from "@/components/Header";
import FeaturedRow from "@/components/FeaturedRow";
import SubscribeBanner from "@/components/SubscribeBanner";
import CategoryCarousel from "@/components/CategoryCarousel";
import HomeHero from "@/components/HomeHero";
import HomeRecentHeading from "@/components/HomeRecentHeading";
import RecipeCard from "@/components/RecipeCard";
import Footer from "@/components/Footer";
import { getRecipes } from "@/lib/actions/recipe";
import { getCategories } from "@/lib/actions/category";
import { cookies } from "next/headers";
import { localizeRecipes, localizeCategories } from "@/lib/i18n/dynamicContent";
import type { Language } from "@/lib/i18n/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const cookieStore = await cookies();
  const lang = (cookieStore.get("ceylonspicer_language")?.value as Language) || "en";

  const [rawRecipes, rawCategories] = await Promise.all([
    getRecipes(),
    getCategories(),
  ]);

  const recipes = localizeRecipes(rawRecipes, lang);
  const categories = localizeCategories(rawCategories, lang);

  const explicitFeatured = recipes.filter((r) => r.isFeatured);
  const featuredRecipes =
    explicitFeatured.length >= 4
      ? explicitFeatured.slice(0, 4)
      : [...explicitFeatured, ...recipes.filter((r) => !r.isFeatured)].slice(0, 4);
  const recentRecipes = recipes.slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-obsidian transition-colors duration-200">
      {/* 1. Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Banner with H1 on Cream/Surface Background */}
        <HomeHero />

        {/* 2. Featured Row (Overlaps the cream backdrop into white) */}
        {featuredRecipes.length > 0 && (
          <div className="-mt-8 sm:-mt-10 mb-16 md:mb-24">
            <FeaturedRow recipes={featuredRecipes} />
          </div>
        )}

        {/* 3. Subscribe Banner */}
        <div className="my-12 md:my-16">
          <SubscribeBanner />
        </div>

        {/* 4. Explore by Category */}
        <CategoryCarousel categories={categories} />

        {/* 5. Recent Recipes */}
        <section
          className="mx-auto max-w-[1200px] px-4 sm:px-6 py-8 md:py-16"
          aria-label="Recent Recipes"
        >
          <HomeRecentHeading />

          {recentRecipes.length > 0 ? (
            <div
              className={`grid gap-8 ${
                recentRecipes.length === 1
                  ? "max-w-md mx-auto grid-cols-1"
                  : recentRecipes.length === 2
                  ? "max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              }`}
            >
              {recentRecipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  category={recipe.category}
                  image={recipe.image}
                  slug={recipe.slug}
                  rating={recipe.rating}
                  aspectRatio="4/3"
                  prepTime={recipe.prepTime}
                  cookTime={recipe.cookTime}
                  translations={recipe.translations}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-linen/20 dark:bg-panel border border-ink/10 dark:border-hairline max-w-lg mx-auto">
              <p className="font-display text-xl text-ink dark:text-ice mb-2">No recipes published yet</p>
              <p className="font-display text-sm text-muted dark:text-slate-muted">
                Our kitchen is busy simmering authentic dishes. Check back soon for new recipes!
              </p>
            </div>
          )}
        </section>
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
