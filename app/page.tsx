import Header from "@/components/Header";
import FeaturedRow from "@/components/FeaturedRow";
import SubscribeBanner from "@/components/SubscribeBanner";
import CategoryCarousel from "@/components/CategoryCarousel";
import SectionHeading from "@/components/SectionHeading";
import RecipeCard from "@/components/RecipeCard";
import Footer from "@/components/Footer";
import { featuredRecipes, recentRecipes, categories } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* 1. Header */}
      <Header />

      <main className="flex-1">
        {/* Hero Banner with H1 on Cream Background */}
        <section className="bg-cream pt-6 pb-12 sm:pb-16 text-center">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            <p className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-muted mb-2">
              Authentic Island Flavors
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink max-w-2xl mx-auto leading-tight">
              Sri Lankan Recipes & Food Stories
            </h1>
            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 max-w-xl mx-auto">
              Time-honored family recipes, vibrant tropical spices, and
              comforting homestyle cooking from the pearl of the Indian Ocean.
            </p>
          </div>
        </section>

        {/* 2. Featured Row (Overlaps the cream backdrop into white) */}
        <div className="-mt-8 sm:-mt-10 mb-16 md:mb-24">
          <FeaturedRow recipes={featuredRecipes} />
        </div>

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
          <SectionHeading
            title="Recent Recipes"
            actionText="Browse all recipes"
            actionHref="/recipes"
          />

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
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
              />
            ))}
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}
