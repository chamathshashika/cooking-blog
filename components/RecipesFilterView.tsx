"use client";

import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe, Category } from "@/lib/data";

type Props = {
  allRecipes: Recipe[];
  categories: Category[];
  initialCategory?: string;
  initialSearch?: string;
};

export default function RecipesFilterView({
  allRecipes,
  categories,
  initialCategory = "all",
  initialSearch = "",
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);

  const filterTabs = [
    { slug: "all", label: "All Recipes" },
    ...categories.map((c) => ({ slug: c.slug, label: c.displayName })),
  ];

  const filteredRecipes = useMemo(() => {
    return allRecipes.filter((recipe) => {
      // Category match
      let matchesCat = true;
      if (selectedCategory !== "all") {
        const target = selectedCategory.toLowerCase();
        const rCat = recipe.category.toLowerCase();
        if (target === "dinner" || target === "curries" || target === "chicken-curries") {
          matchesCat =
            rCat === "dinner" ||
            rCat === "entrees" ||
            rCat.includes("curry") ||
            rCat.includes("curries");
        } else if (target === "desserts") {
          matchesCat = rCat === "desserts" || rCat === "sweets";
        } else if (target === "entrees") {
          matchesCat =
            rCat === "entrees" || rCat === "dinner" || rCat.includes("curry");
        } else if (target === "lunch") {
          matchesCat = rCat === "lunch" || rCat === "entrees";
        } else {
          matchesCat = rCat === target;
        }
      }

      // Search match
      let matchesSearch = true;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const inTitle = recipe.title.toLowerCase().includes(q);
        const inExcerpt = recipe.excerpt.toLowerCase().includes(q);
        const inCategory = recipe.category.toLowerCase().includes(q);
        const inTags = recipe.tags?.some((t) => t.toLowerCase().includes(q)) ?? false;
        const inIngredients =
          recipe.ingredients?.some((i) => i.name.toLowerCase().includes(q)) ?? false;

        matchesSearch = inTitle || inExcerpt || inCategory || inTags || inIngredients;
      }

      return matchesCat && matchesSearch;
    });
  }, [allRecipes, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-ink/10 pb-8">
        {/* Search input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
          <input
            type="search"
            placeholder="Search recipes, spices, ingredients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-none border border-ink/20 bg-linen/20 py-2.5 pl-10 pr-9 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center gap-2 font-ui text-xs text-muted">
          <SlidersHorizontal className="h-3.5 w-3.5 text-sage" />
          <span>
            Showing <strong className="text-ink">{filteredRecipes.length}</strong> of{" "}
            {allRecipes.length} recipes
          </span>
        </div>
      </div>

      {/* Category Pills Slider / Buttons */}
      <div
        className="mb-10 flex items-center gap-2 overflow-x-auto no-scrollbar pb-2"
        role="tablist"
        aria-label="Filter recipes by category"
      >
        {filterTabs.map((tab) => {
          const isSelected = selectedCategory === tab.slug;
          return (
            <button
              key={tab.slug}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setSelectedCategory(tab.slug)}
              className={`shrink-0 px-4 py-2 font-ui text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-sage ${
                isSelected
                  ? "bg-sage text-white shadow-xs"
                  : "bg-linen/40 text-ink/80 hover:bg-cream hover:text-ink border border-ink/10"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Recipes Grid */}
      {filteredRecipes.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
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
      ) : (
        <div className="text-center py-20 bg-linen/20 border border-ink/10 p-8 max-w-lg mx-auto">
          <p className="font-display text-2xl text-ink mb-2">No matching recipes found</p>
          <p className="font-display text-sm text-muted mb-6">
            We couldn&apos;t find any recipes matching your current filter. Try adjusting your
            search terms or selecting &quot;All Recipes&quot;.
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="inline-flex items-center gap-2 bg-sage px-5 py-2.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage/90 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
