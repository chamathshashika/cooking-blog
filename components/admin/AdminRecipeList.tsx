"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Star,
  Plus,
  Clock,
  Users,
  X,
  AlertCircle,
  LayoutGrid,
  List,
  ChevronDown,
} from "lucide-react";
import type { Recipe, Category } from "@/lib/data";
import { useToast } from "@/components/ToastProvider";
import { deleteRecipe } from "@/lib/actions/recipe";

type Props = {
  initialRecipes: Recipe[];
  categories: Category[];
  initialCategoryFilter?: string;
  initialFeaturedFilter?: boolean;
};

export default function AdminRecipeList({
  initialRecipes,
  categories,
  initialCategoryFilter,
  initialFeaturedFilter,
}: Props) {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    initialCategoryFilter || "all"
  );
  const [featuredFilter, setFeaturedFilter] = useState<string>(
    initialFeaturedFilter ? "featured" : "all"
  );
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"title" | "prep" | "servings">("title");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Common Notification Toast
  const { showToast } = useToast();

  // Toggle Featured Status
  const handleToggleFeatured = (id: string) => {
    setRecipes((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const updated = !r.isFeatured;
          showToast(
            `"${r.title}" is now ${updated ? "featured on homepage" : "standard recipe"}`
          );
          return { ...r, isFeatured: updated };
        }
        return r;
      })
    );
  };

  // Delete Recipe
  const handleDeleteRecipe = async (id: string, title: string, slug?: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"? This will permanently delete the recipe, its ratings, and its uploaded image.`)) {
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      if (slug) {
        try {
          const res = await deleteRecipe(slug);
          if (res.success) {
            showToast(`Recipe "${title}" and associated image deleted successfully.`, "success");
          } else {
            showToast(res.error || "Failed to delete recipe on server.", "error");
          }
        } catch (err) {
          console.error("Failed to delete recipe on server:", err);
          showToast("An error occurred while deleting the recipe.", "error");
        }
      }
    }
  };

  // Filtered & Sorted Recipes
  const filteredRecipes = useMemo(() => {
    return recipes
      .filter((recipe) => {
        // Search Filter
        const query = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !query ||
          recipe.title.toLowerCase().includes(query) ||
          recipe.category.toLowerCase().includes(query) ||
          recipe.excerpt.toLowerCase().includes(query) ||
          (recipe.tags && recipe.tags.some((t) => t.toLowerCase().includes(query)));

        // Category Filter
        const matchesCategory =
          selectedCategory === "all" ||
          recipe.category.toLowerCase() === selectedCategory.toLowerCase() ||
          recipe.category.toLowerCase().includes(selectedCategory.toLowerCase());

        // Featured Filter
        const matchesFeatured =
          featuredFilter === "all" ||
          (featuredFilter === "featured" && recipe.isFeatured) ||
          (featuredFilter === "standard" && !recipe.isFeatured);

        // Status Filter (published vs draft)
        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "published" && (!recipe.status || recipe.status === "published")) ||
          (statusFilter === "draft" && recipe.status === "draft");

        return matchesSearch && matchesCategory && matchesFeatured && matchesStatus;
      })
      .sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        if (sortBy === "servings") return b.servings - a.servings;
        if (sortBy === "prep") {
          const aM = parseInt(a.prepTime.replace(/[^0-9]/g, "")) || 0;
          const bM = parseInt(b.prepTime.replace(/[^0-9]/g, "")) || 0;
          return aM - bM;
        }
        return 0;
      });
  }, [recipes, searchQuery, selectedCategory, featuredFilter, statusFilter, sortBy]);

  return (
    <div className="space-y-5">
      {/* Main Filter & Action Toolbar */}
      <div className="rounded-xl border border-ink/10 dark:border-hairline bg-white dark:bg-surface p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted dark:text-slate-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, excerpt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[42px] rounded-md border border-ink/15 dark:border-hairline bg-linen/30 dark:bg-panel pl-10 pr-10 font-ui text-xs text-ink dark:text-ice placeholder:text-muted dark:placeholder:text-slate-muted focus:border-sage dark:focus:border-amber-primary focus:bg-white dark:focus:bg-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Actions (View Mode Switcher + Add Recipe) */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-md border border-ink/15 dark:border-hairline bg-linen/30 dark:bg-panel p-1">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex h-8 w-8 items-center justify-center rounded transition-all ${
                  viewMode === "table"
                    ? "bg-white dark:bg-surface text-ink dark:text-ice shadow-2xs"
                    : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                }`}
                title="Table View"
                aria-label="Switch to Table View"
              >
                <List className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`flex h-8 w-8 items-center justify-center rounded transition-all ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-surface text-ink dark:text-ice shadow-2xs"
                    : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                }`}
                title="Grid Cards View"
                aria-label="Switch to Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>

            {/* Add New Recipe Button */}
            <Link
              href="/admin/recipes/new"
              className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-sage dark:bg-amber-primary px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest text-white dark:text-obsidian shadow-xs transition-all hover:bg-sage-dark dark:hover:bg-amber-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>New Recipe</span>
            </Link>
          </div>
        </div>

        {/* Filters and Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-ink/5 dark:border-hairline">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel pl-3 pr-8 py-2 font-ui text-xs uppercase tracking-wider text-ink dark:text-ice focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage cursor-pointer"
                aria-label="Filter by category"
              >
                <option value="all">All Categories ({recipes.length})</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.displayName}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted dark:text-slate-muted" />
            </div>

            {/* Featured Filter Segmented Tabs */}
            <div className="flex items-center rounded-md border border-ink/15 dark:border-hairline bg-linen/30 dark:bg-panel p-0.5">
              <button
                onClick={() => setFeaturedFilter("all")}
                className={`px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${
                  featuredFilter === "all"
                    ? "bg-white dark:bg-surface text-ink dark:text-ice shadow-2xs"
                    : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFeaturedFilter("featured")}
                className={`flex items-center gap-1 px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${
                  featuredFilter === "featured"
                    ? "bg-sunshine/40 dark:bg-amber-primary/20 text-ink dark:text-amber-text shadow-2xs font-extrabold"
                    : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                }`}
              >
                <Star className="h-3 w-3 fill-sunshine dark:fill-gold text-ink dark:text-amber-text" />
                <span>Featured</span>
              </button>
              <button
                onClick={() => setFeaturedFilter("standard")}
                className={`px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${
                  featuredFilter === "standard"
                    ? "bg-white dark:bg-surface text-ink dark:text-ice shadow-2xs"
                    : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                }`}
              >
                Standard
              </button>
            </div>

            {/* Status Filter Segmented Tabs */}
            <div className="flex items-center rounded-md border border-ink/15 dark:border-hairline bg-linen/30 dark:bg-panel p-0.5">
              <button
                onClick={() => setStatusFilter("all")}
                className={`px-2.5 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${
                  statusFilter === "all"
                    ? "bg-white dark:bg-surface text-ink dark:text-ice shadow-2xs font-extrabold"
                    : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter("published")}
                className={`px-2.5 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${
                  statusFilter === "published"
                    ? "bg-sage dark:bg-amber-primary text-white dark:text-obsidian shadow-2xs font-extrabold"
                    : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setStatusFilter("draft")}
                className={`px-2.5 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${
                  statusFilter === "draft"
                    ? "bg-amber-600 text-white shadow-2xs font-extrabold"
                    : "text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice"
                }`}
              >
                Drafts
              </button>
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "title" | "prep" | "servings")}
                className="appearance-none rounded-md border border-ink/15 dark:border-hairline bg-white dark:bg-panel pl-3 pr-8 py-2 font-ui text-xs uppercase tracking-wider text-ink dark:text-ice focus:border-sage dark:focus:border-amber-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage cursor-pointer"
                aria-label="Sort recipes"
              >
                <option value="title">Sort: Title (A-Z)</option>
                <option value="servings">Sort: Servings</option>
                <option value="prep">Sort: Prep Time</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted dark:text-slate-muted" />
            </div>
          </div>

          {/* Result Counter & Reset Button */}
          <div className="flex items-center gap-3 font-ui text-xs text-muted dark:text-slate-muted">
            <span>
              Showing <strong className="text-ink dark:text-ice">{filteredRecipes.length}</strong> of{" "}
              <strong className="text-ink dark:text-ice">{recipes.length}</strong> recipes
            </span>

            {(searchQuery || selectedCategory !== "all" || featuredFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setFeaturedFilter("all");
                }}
                className="font-bold text-sage hover:text-sage-dark dark:text-amber-text dark:hover:text-amber-secondary underline"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Recipe List: Table View */}
      {viewMode === "table" ? (
        filteredRecipes.length > 0 ? (
          <div className="overflow-hidden rounded-xl border border-ink/10 dark:border-hairline bg-white dark:bg-surface shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 dark:border-hairline bg-cream/30 dark:bg-panel font-ui text-[11px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted">
                    <th className="py-3.5 px-5">Recipe</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Category</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell">Prep / Cook</th>
                    <th className="py-3.5 px-4 hidden sm:table-cell">Servings</th>
                    <th className="py-3.5 px-4">Home Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5 dark:divide-hairline">
                  {filteredRecipes.map((recipe) => (
                    <tr
                      key={recipe.id}
                      className="group hover:bg-cream/15 dark:hover:bg-panel/40 transition-colors"
                    >
                      {/* Recipe Image & Title */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md bg-linen dark:bg-panel border border-ink/10 dark:border-hairline shadow-2xs">
                            <Image
                              src={recipe.image}
                              alt={recipe.title}
                              fill
                              sizes="64px"
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/recipes/${recipe.slug}`}
                                target="_blank"
                                className="font-display text-base font-semibold text-ink dark:text-ice hover:text-sage dark:hover:text-amber-text transition-colors line-clamp-1"
                              >
                                {recipe.title}
                              </Link>
                              {recipe.status === "draft" ? (
                                <span className="shrink-0 rounded px-1.5 py-0.5 font-ui text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/30">
                                  Draft
                                </span>
                              ) : (
                                <span className="shrink-0 rounded px-1.5 py-0.5 font-ui text-[9px] font-bold uppercase tracking-wider bg-sage/15 text-sage dark:text-emerald-400 border border-sage/30">
                                  Published
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 mt-0.5 font-ui text-[11px] text-muted dark:text-slate-muted">
                              {recipe.author?.name && (
                                <>
                                  <span className="font-semibold text-ink dark:text-ice">
                                    By {recipe.author.name}
                                  </span>
                                  <span>•</span>
                                </>
                              )}
                              <span className="line-clamp-1 max-w-md">{recipe.excerpt}</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1 sm:hidden font-ui text-[10px] uppercase text-muted dark:text-slate-muted">
                              <span className="font-semibold text-sage dark:text-amber-text">{recipe.category}</span>
                              <span>•</span>
                              <span>{recipe.servings} Servings</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        <span className="inline-block rounded-md bg-linen/80 dark:bg-panel px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-wider text-ink dark:text-ice border border-ink/5 dark:border-hairline">
                          {recipe.category}
                        </span>
                      </td>

                      {/* Times */}
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 font-ui text-xs text-muted dark:text-slate-muted">
                          <Clock className="h-3.5 w-3.5 text-sage dark:text-amber-primary" />
                          <span>{recipe.prepTime}</span>
                          <span className="text-ink/30 dark:text-hairline">•</span>
                          <span>{recipe.cookTime}</span>
                        </div>
                      </td>

                      {/* Servings */}
                      <td className="py-3.5 px-4 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 font-ui text-xs text-muted dark:text-slate-muted">
                          <Users className="h-3.5 w-3.5 text-muted dark:text-slate-muted" />
                          <span>{recipe.servings} people</span>
                        </div>
                      </td>

                      {/* Featured Toggle Pill */}
                      <td className="py-3.5 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggleFeatured(recipe.id)}
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-wider transition-all ${
                            recipe.isFeatured
                              ? "bg-sunshine/30 dark:bg-amber-primary/20 text-ink dark:text-amber-text border border-sunshine/60 dark:border-amber-primary/40 hover:bg-sunshine/50 shadow-2xs"
                              : "bg-linen dark:bg-panel text-muted/80 dark:text-slate-muted border border-ink/10 dark:border-hairline hover:border-ink/20 hover:text-ink dark:hover:text-ice"
                          }`}
                          title={
                            recipe.isFeatured
                              ? "Click to remove from homepage hero"
                              : "Click to showcase on homepage hero"
                          }
                        >
                          <Star
                            className={`h-3 w-3 ${
                              recipe.isFeatured
                                ? "fill-sunshine dark:fill-gold text-ink dark:text-amber-text"
                                : "text-muted dark:text-slate-muted"
                            }`}
                          />
                          <span>{recipe.isFeatured ? "Featured" : "Standard"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Edit Recipe */}
                          <Link
                            href={`/admin/recipes/${recipe.slug}/edit`}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 dark:border-hairline bg-white dark:bg-panel text-ink/70 dark:text-ice/70 hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text hover:bg-cream/20 dark:hover:bg-surface transition-all"
                            title="Edit Recipe"
                            aria-label={`Edit ${recipe.title}`}
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </Link>

                          {/* View Live */}
                          <Link
                            href={`/recipes/${recipe.slug}`}
                            target="_blank"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 dark:border-hairline bg-white dark:bg-panel text-ink/70 dark:text-ice/70 hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text hover:bg-cream/20 dark:hover:bg-surface transition-all"
                            title="View Public Recipe"
                            aria-label={`View live ${recipe.title}`}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteRecipe(recipe.id, recipe.title, recipe.slug)
                            }
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 dark:border-hairline bg-white dark:bg-panel text-ink/70 dark:text-ice/70 hover:border-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all"
                            title="Delete Recipe"
                            aria-label={`Delete ${recipe.title}`}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="rounded-xl border border-ink/10 dark:border-hairline bg-white dark:bg-surface p-12 text-center shadow-2xs">
            <AlertCircle className="mx-auto h-8 w-8 text-muted dark:text-slate-muted mb-2" />
            <h3 className="font-display text-xl text-ink dark:text-ice">No recipes match your filter</h3>
            <p className="mt-1 font-display text-sm text-muted dark:text-slate-muted">
              Try adjusting your search query, choosing a different category, or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setFeaturedFilter("all");
                setStatusFilter("all");
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-sage dark:bg-amber-primary px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white dark:text-obsidian hover:bg-sage-dark dark:hover:bg-amber-primary/90"
            >
              Reset All Filters
            </button>
          </div>
        )
      ) : (
        /* Recipe List: Card Grid View */
        filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-ink/10 dark:border-hairline bg-white dark:bg-surface shadow-2xs hover:shadow-md hover:border-ink/20 dark:hover:border-amber-primary/30 transition-all"
              >
                {/* Photo & Overlay */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen dark:bg-panel">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    sizes="(min-width: 1536px) 20vw, (min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-103"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded bg-white/95 dark:bg-panel px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-widest text-ink dark:text-ice shadow-xs">
                      {recipe.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(recipe.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-ui text-[9px] font-bold uppercase tracking-wider shadow-xs backdrop-blur-sm transition-all ${
                        recipe.isFeatured
                          ? "bg-sunshine dark:bg-amber-primary text-ink dark:text-obsidian"
                          : "bg-black/40 text-white hover:bg-black/60"
                      }`}
                    >
                      <Star
                        className={`h-2.5 w-2.5 ${
                          recipe.isFeatured ? "fill-ink text-ink dark:fill-obsidian dark:text-obsidian" : "text-white"
                        }`}
                      />
                      <span>{recipe.isFeatured ? "Featured" : "Standard"}</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        target="_blank"
                        className="font-display text-lg font-semibold text-ink dark:text-ice group-hover:text-sage dark:group-hover:text-amber-text transition-colors line-clamp-1"
                      >
                        {recipe.title}
                      </Link>
                      {recipe.status === "draft" ? (
                        <span className="shrink-0 rounded px-1.5 py-0.5 font-ui text-[9px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-800 dark:text-amber-200 border border-amber-500/30">
                          Draft
                        </span>
                      ) : (
                        <span className="shrink-0 rounded px-1.5 py-0.5 font-ui text-[9px] font-bold uppercase tracking-wider bg-sage/15 text-sage dark:text-emerald-400 border border-sage/30">
                          Published
                        </span>
                      )}
                    </div>
                    {recipe.author?.name && (
                      <p className="mt-1 font-ui text-[10px] uppercase tracking-wider text-sage dark:text-amber-text font-bold">
                        By {recipe.author.name}
                      </p>
                    )}
                    <p className="mt-1 font-display text-xs text-muted dark:text-slate-muted line-clamp-2 leading-relaxed">
                      {recipe.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-ink/5 dark:border-hairline flex items-center justify-between text-muted dark:text-slate-muted font-ui text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-sage dark:text-amber-primary" />
                      <span>{recipe.prepTime}</span>
                      <span className="text-ink/20 dark:text-hairline">•</span>
                      <span>{recipe.cookTime}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Link
                        href={`/admin/recipes/${recipe.slug}/edit`}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 dark:border-hairline bg-white dark:bg-panel text-ink/70 dark:text-ice/70 hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text"
                        title="Edit Recipe"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </Link>
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        target="_blank"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 dark:border-hairline bg-white dark:bg-panel text-ink/70 dark:text-ice/70 hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text"
                        title="View Live"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteRecipe(recipe.id, recipe.title, recipe.slug)
                        }
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 dark:border-hairline bg-white dark:bg-panel text-ink/70 dark:text-ice/70 hover:border-red-400 hover:text-red-600"
                        title="Delete Recipe"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-ink/10 dark:border-hairline bg-white dark:bg-surface p-12 text-center shadow-2xs">
            <AlertCircle className="mx-auto h-8 w-8 text-muted dark:text-slate-muted mb-2" />
            <h3 className="font-display text-xl text-ink dark:text-ice">No recipes match your filter</h3>
            <p className="mt-1 font-display text-sm text-muted dark:text-slate-muted">
              Try adjusting your search query, choosing a different category, or resetting filters.
            </p>
          </div>
        )
      )}
    </div>
  );
}
