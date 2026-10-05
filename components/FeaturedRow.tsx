import RecipeCard from "./RecipeCard";
import type { Recipe } from "@/lib/data";

type Props = {
  recipes: Recipe[];
};

export default function FeaturedRow({ recipes }: Props) {
  return (
    <section className="relative w-full" aria-label="Featured Recipes">
      {/* Background split: Top cream, bottom white */}
      <div className="absolute inset-0 bg-cream h-32 md:h-44 -z-10" />

      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
