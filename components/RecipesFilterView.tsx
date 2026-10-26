"use client";

import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import RecipeCard from "@/components/RecipeCard";
import type { Recipe, Category } from "@/lib/data";
import { useLanguage } from "./LanguageProvider";
import { localizeRecipes, localizeCategories } from "@/lib/i18n/dynamicContent";

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
  const { language, t } = useLanguage();

  const filterTabs = useMemo(() => {
    const localizedCats = localizeCategories(categories, language);
    return [
      { slug: "all", label: t.nav.allRecipes },
      ...localizedCats.map((c) => ({ slug: c.slug, label: c.displayName })),
    ];
  }, [categories, language, t.nav.allRecipes]);

  const localizedList = useMemo(() => {
    return localizeRecipes(allRecipes, language);
  }, [allRecipes, language]);

  const filteredRecipes = useMemo(() => {
    return localizedList.filter((recipe, idx) => {
      const rawRecipe = allRecipes[idx] || recipe;

      // Category match
      let matchesCat = true;
      if (selectedCategory !== "all") {
        const target = selectedCategory.toLowerCase();
        const rCat = (rawRecipe.category || recipe.category).toLowerCase();
        if (target === "dinner" || target === "curries" || target === "chicken-curries") {
          matchesCat =
            rCat === "dinner" ||
            rCat === "entrees" ||
            rCat === "seafood" ||
            rCat === "meat" ||
            rCat.includes("curry") ||
            rCat.includes("curries");
        } else if (target === "desserts") {
          matchesCat = rCat === "desserts" || rCat === "sweets";
        } else if (target === "entrees") {
          matchesCat =
            rCat === "entrees" || rCat === "dinner" || rCat === "seafood" || rCat === "meat" || rCat.includes("curry");
        } else if (target === "lunch") {
          matchesCat = rCat === "lunch" || rCat === "entrees";
        } else {
          matchesCat = rCat === target;
        }
      }

      // Search match (matches localized content or raw English content)
      let matchesSearch = true;
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase().trim();
        const inTitle =
          recipe.title.toLowerCase().includes(q) ||
          rawRecipe.title.toLowerCase().includes(q);
        const inExcerpt =
          recipe.excerpt.toLowerCase().includes(q) ||
          rawRecipe.excerpt.toLowerCase().includes(q);
        const inCategory =
          recipe.category.toLowerCase().includes(q) ||
          rawRecipe.category.toLowerCase().includes(q);
        const inTags =
          (recipe.tags?.some((t) => t.toLowerCase().includes(q)) ?? false) ||
          (rawRecipe.tags?.some((t) => t.toLowerCase().includes(q)) ?? false);
        const inIngredients =
          (recipe.ingredients?.some((i) => i.name.toLowerCase().includes(q)) ?? false) ||
          (rawRecipe.ingredients?.some((i) => i.name.toLowerCase().includes(q)) ?? false);

        matchesSearch = inTitle || inExcerpt || inCategory || inTags || inIngredients;
      }

      return matchesCat && matchesSearch;
    });
  }, [localizedList, allRecipes, selectedCategory, searchQuery]);

  return (
    <div>
      {/* Search and Filters Bar */}
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between border-b border-ink/10 dark:border-hairline pb-8">
        {/* Search input */}
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted dark:text-slate-muted pointer-events-none" />
          <input
            type="search"
            placeholder={t.search.filterPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full min-h-[44px] rounded-none border border-ink/20 dark:border-hairline bg-linen/20 dark:bg-panel py-2.5 pl-10 pr-12 font-ui text-xs text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label={t.search.clear}
              className="absolute right-1 top-1/2 -translate-y-1/2 min-h-[44px] min-w-[44px] flex items-center justify-center text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results Counter */}
        <div className="flex items-center gap-2 font-ui text-xs text-muted dark:text-slate-muted">
          <SlidersHorizontal className="h-3.5 w-3.5 text-sage dark:text-amber-text" />
          <span>
            {t.search.showing} <strong className="text-ink dark:text-ice">{filteredRecipes.length}</strong> /{" "}
            {allRecipes.length} {t.search.recipesFound}
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
              className={`shrink-0 min-h-[44px] flex items-center px-4 py-2 font-ui text-[11px] font-bold uppercase tracking-[0.08em] transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
                isSelected
                  ? "bg-sage text-white shadow-xs"
                  : "bg-linen/40 dark:bg-panel text-ink/80 dark:text-slate-muted hover:bg-cream dark:hover:bg-surface hover:text-ink dark:hover:text-ice border border-ink/10 dark:border-hairline"
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
              translations={recipe.translations}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-linen/20 dark:bg-panel border border-ink/10 dark:border-hairline p-8 max-w-lg mx-auto">
          <p className="font-display text-2xl text-ink dark:text-ice mb-2">{t.search.noMatchTitle}</p>
          <p className="font-display text-sm text-muted dark:text-slate-muted mb-6">
            {t.search.noMatchDesc}
          </p>
          <button
            onClick={() => {
              setSelectedCategory("all");
              setSearchQuery("");
            }}
            className="inline-flex min-h-[44px] items-center gap-2 bg-sage dark:bg-amber-primary px-6 py-2.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage-dark dark:hover:bg-amber-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
          >
            {t.search.resetFilters}
          </button>
        </div>
      )}
    </div>
  );
}
