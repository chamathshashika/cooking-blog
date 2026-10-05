import RecipeCard from "./RecipeCard";
import type { Recipe } from "@/lib/data";

type Props = {
  recipes: Recipe[];
};

export default function FeaturedRow({ recipes }: Props) {
  if (!recipes || recipes.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full" aria-label="Featured Recipes">
      {/* Background split: Top cream, bottom white */}
      <div className="absolute inset-0 bg-cream h-32 md:h-44 -z-10" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div
          className={`grid gap-6 ${
            recipes.length === 1
              ? "max-w-sm mx-auto grid-cols-1"
              : recipes.length === 2
              ? "max-w-2xl mx-auto grid-cols-1 sm:grid-cols-2"
              : recipes.length === 3
              ? "max-w-4xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {recipes.slice(0, 4).map((recipe, index) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              category={recipe.category}
              image={recipe.image}
              slug={recipe.slug}
              rating={recipe.rating}
              aspectRatio="3/4"
              priority={index < 2}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
