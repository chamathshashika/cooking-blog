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
  Check,
} from "lucide-react";
import type { Recipe, Category } from "@/lib/data";
import { useToast } from "@/components/ToastProvider";

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
  const [sortBy, setSortBy] = useState<"title" | "prep" | "servings">("title");
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  // Edit Modal State
  const [editingRecipe, setEditingRecipe] = useState<Recipe | null>(null);

  // Create Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newRecipeData, setNewRecipeData] = useState({
    title: "",
    slug: "",
    category: categories[0]?.name || "Dinner",
    prepTime: "20 min",
    cookTime: "25 min",
    servings: 4,
    excerpt: "",
    intro: "",
    image: "/images/recipes/sri-lankan-chicken-curry.jpg",
    isFeatured: false,
  });

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
  const handleDeleteRecipe = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      setRecipes((prev) => prev.filter((r) => r.id !== id));
      showToast(`Recipe "${title}" removed from listing.`);
    }
  };

  // Save Edited Recipe
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecipe) return;

    setRecipes((prev) =>
      prev.map((r) => (r.id === editingRecipe.id ? editingRecipe : r))
    );
    showToast(`Updated "${editingRecipe.title}" successfully.`);
    setEditingRecipe(null);
  };

  // Create New Recipe
  const handleCreateRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRecipeData.title.trim()) return;

    const generatedSlug =
      newRecipeData.slug.trim() ||
      newRecipeData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newRecipe: Recipe = {
      id: `custom-${Date.now()}`,
      slug: generatedSlug,
      title: newRecipeData.title.trim(),
      category: newRecipeData.category,
      image: newRecipeData.image,
      rating: 0,
      ratingCount: 0,
      prepTime: newRecipeData.prepTime,
      cookTime: newRecipeData.cookTime,
      servings: Number(newRecipeData.servings) || 4,
      excerpt: newRecipeData.excerpt.trim() || "A flavorful authentic Sri Lankan family recipe.",
      intro: newRecipeData.intro.trim(),
      isFeatured: newRecipeData.isFeatured,
      publishedDate: new Date().toISOString().split("T")[0],
    };

    setRecipes((prev) => [newRecipe, ...prev]);
    showToast(`Created new recipe "${newRecipe.title}".`);
    setCreateModalOpen(false);
    setNewRecipeData({
      title: "",
      slug: "",
      category: categories[0]?.name || "Dinner",
      prepTime: "20 min",
      cookTime: "25 min",
      servings: 4,
      excerpt: "",
      intro: "",
      image: "/images/recipes/sri-lankan-chicken-curry.jpg",
      isFeatured: false,
    });
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

        return matchesSearch && matchesCategory && matchesFeatured;
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
  }, [recipes, searchQuery, selectedCategory, featuredFilter, sortBy]);

  return (
    <div className="space-y-5">
      {/* Main Filter & Action Toolbar */}
      <div className="rounded-xl border border-ink/10 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
            <input
              type="text"
              placeholder="Search recipes, ingredients, excerpt..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[42px] rounded-md border border-ink/15 bg-[#faf8f5]/60 pl-10 pr-10 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink focus:outline-none"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Quick Actions (View Mode Switcher + Add Recipe) */}
          <div className="flex items-center gap-2.5">
            {/* View Mode Toggle */}
            <div className="flex items-center rounded-md border border-ink/15 bg-linen/30 p-1">
              <button
                type="button"
                onClick={() => setViewMode("table")}
                className={`flex h-8 w-8 items-center justify-center rounded transition-all ${
                  viewMode === "table"
                    ? "bg-white text-ink shadow-2xs"
                    : "text-muted hover:text-ink"
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
                    ? "bg-white text-ink shadow-2xs"
                    : "text-muted hover:text-ink"
                }`}
                title="Grid Cards View"
                aria-label="Switch to Grid View"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
            </div>

            {/* Add New Recipe Button */}
            <button
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest text-white shadow-xs transition-all hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage shrink-0"
            >
              <Plus className="h-4 w-4" />
              <span>New Recipe</span>
            </button>
          </div>
        </div>

        {/* Filters and Controls Row */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-ink/5">
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Category Dropdown */}
            <div className="relative">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="appearance-none rounded-md border border-ink/15 bg-white pl-3 pr-8 py-2 font-ui text-xs uppercase tracking-wider text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage cursor-pointer"
                aria-label="Filter by category"
              >
                <option value="all">All Categories ({recipes.length})</option>
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.displayName}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
            </div>

            {/* Featured Filter Segmented Tabs */}
            <div className="flex items-center rounded-md border border-ink/15 bg-linen/30 p-0.5">
              <button
                onClick={() => setFeaturedFilter("all")}
                className={`px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${
                  featuredFilter === "all"
                    ? "bg-white text-ink shadow-2xs"
                    : "text-muted hover:text-ink"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFeaturedFilter("featured")}
                className={`flex items-center gap-1 px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${
                  featuredFilter === "featured"
                    ? "bg-sunshine/40 text-ink shadow-2xs font-extrabold"
                    : "text-muted hover:text-ink"
                }`}
              >
                <Star className="h-3 w-3 fill-sunshine text-ink" />
                <span>Featured</span>
              </button>
              <button
                onClick={() => setFeaturedFilter("standard")}
                className={`px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider rounded transition-colors ${
                  featuredFilter === "standard"
                    ? "bg-white text-ink shadow-2xs"
                    : "text-muted hover:text-ink"
                }`}
              >
                Standard
              </button>
            </div>

            {/* Sort Selector */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as "title" | "prep" | "servings")}
                className="appearance-none rounded-md border border-ink/15 bg-white pl-3 pr-8 py-2 font-ui text-xs uppercase tracking-wider text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage cursor-pointer"
                aria-label="Sort recipes"
              >
                <option value="title">Sort: Title (A-Z)</option>
                <option value="servings">Sort: Servings</option>
                <option value="prep">Sort: Prep Time</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted" />
            </div>
          </div>

          {/* Result Counter & Reset Button */}
          <div className="flex items-center gap-3 font-ui text-xs text-muted">
            <span>
              Showing <strong className="text-ink">{filteredRecipes.length}</strong> of{" "}
              <strong className="text-ink">{recipes.length}</strong> recipes
            </span>

            {(searchQuery || selectedCategory !== "all" || featuredFilter !== "all") && (
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                  setFeaturedFilter("all");
                }}
                className="font-bold text-sage hover:text-sage-dark underline"
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
          <div className="overflow-hidden rounded-xl border border-ink/10 bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-ink/10 bg-cream/30 font-ui text-[11px] font-bold uppercase tracking-wider text-muted">
                    <th className="py-3.5 px-5">Recipe</th>
                    <th className="py-3.5 px-4 hidden md:table-cell">Category</th>
                    <th className="py-3.5 px-4 hidden lg:table-cell">Prep / Cook</th>
                    <th className="py-3.5 px-4 hidden sm:table-cell">Servings</th>
                    <th className="py-3.5 px-4">Home Status</th>
                    <th className="py-3.5 px-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {filteredRecipes.map((recipe) => (
                    <tr
                      key={recipe.id}
                      className="group hover:bg-cream/15 transition-colors"
                    >
                      {/* Recipe Image & Title */}
                      <td className="py-3.5 px-5">
                        <div className="flex items-center gap-3.5">
                          <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden rounded-md bg-linen border border-ink/10 shadow-2xs">
                            <Image
                              src={recipe.image}
                              alt={recipe.title}
                              fill
                              sizes="64px"
                              className="object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                          <div className="min-w-0">
                            <Link
                              href={`/recipes/${recipe.slug}`}
                              target="_blank"
                              className="font-display text-base font-semibold text-ink hover:text-sage transition-colors line-clamp-1"
                            >
                              {recipe.title}
                            </Link>
                            <p className="font-ui text-[11px] text-muted line-clamp-1 mt-0.5 max-w-md">
                              {recipe.excerpt}
                            </p>
                            <div className="flex items-center gap-2 mt-1 sm:hidden font-ui text-[10px] uppercase text-muted">
                              <span className="font-semibold text-sage">{recipe.category}</span>
                              <span>•</span>
                              <span>{recipe.servings} Servings</span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 hidden md:table-cell">
                        <span className="inline-block rounded-md bg-linen/80 px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-wider text-ink border border-ink/5">
                          {recipe.category}
                        </span>
                      </td>

                      {/* Times */}
                      <td className="py-3.5 px-4 hidden lg:table-cell">
                        <div className="flex items-center gap-1.5 font-ui text-xs text-muted">
                          <Clock className="h-3.5 w-3.5 text-sage" />
                          <span>{recipe.prepTime}</span>
                          <span className="text-ink/30">•</span>
                          <span>{recipe.cookTime}</span>
                        </div>
                      </td>

                      {/* Servings */}
                      <td className="py-3.5 px-4 hidden sm:table-cell">
                        <div className="flex items-center gap-1.5 font-ui text-xs text-muted">
                          <Users className="h-3.5 w-3.5 text-muted" />
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
                              ? "bg-sunshine/30 text-ink border border-sunshine/60 hover:bg-sunshine/50 shadow-2xs"
                              : "bg-linen text-muted/80 border border-ink/10 hover:border-ink/20 hover:text-ink"
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
                                ? "fill-sunshine text-ink"
                                : "text-muted"
                            }`}
                          />
                          <span>{recipe.isFeatured ? "Featured" : "Standard"}</span>
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Quick Edit */}
                          <button
                            type="button"
                            onClick={() => setEditingRecipe(recipe)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 bg-white text-ink/70 hover:border-sage hover:text-sage hover:bg-cream/20 transition-all"
                            title="Edit Recipe"
                            aria-label={`Edit ${recipe.title}`}
                          >
                            <Edit3 className="h-3.5 w-3.5" />
                          </button>

                          {/* View Live */}
                          <Link
                            href={`/recipes/${recipe.slug}`}
                            target="_blank"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 bg-white text-ink/70 hover:border-sage hover:text-sage hover:bg-cream/20 transition-all"
                            title="View Public Recipe"
                            aria-label={`View live ${recipe.title}`}
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </Link>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 bg-white text-ink/70 hover:border-red-400 hover:text-red-600 hover:bg-red-50 transition-all"
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
          <div className="rounded-xl border border-ink/10 bg-white p-12 text-center shadow-2xs">
            <AlertCircle className="mx-auto h-8 w-8 text-muted mb-2" />
            <h3 className="font-display text-xl text-ink">No recipes match your filter</h3>
            <p className="mt-1 font-display text-sm text-muted">
              Try adjusting your search query, choosing a different category, or resetting filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setFeaturedFilter("all");
              }}
              className="mt-4 inline-flex items-center gap-1.5 rounded-md bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white hover:bg-sage-dark"
            >
              Reset All Filters
            </button>
          </div>
        )
      ) : (
        /* Recipe List: Card Grid View */
        filteredRecipes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="group flex flex-col justify-between overflow-hidden rounded-xl border border-ink/10 bg-white shadow-2xs hover:shadow-md hover:border-ink/20 transition-all"
              >
                {/* Photo & Overlay */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-linen">
                  <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-103"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="rounded bg-white/95 px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-widest text-ink shadow-xs">
                      {recipe.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <button
                      type="button"
                      onClick={() => handleToggleFeatured(recipe.id)}
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-ui text-[9px] font-bold uppercase tracking-wider shadow-xs backdrop-blur-sm transition-all ${
                        recipe.isFeatured
                          ? "bg-sunshine text-ink"
                          : "bg-black/40 text-white hover:bg-black/60"
                      }`}
                    >
                      <Star
                        className={`h-2.5 w-2.5 ${
                          recipe.isFeatured ? "fill-ink text-ink" : "text-white"
                        }`}
                      />
                      <span>{recipe.isFeatured ? "Featured" : "Standard"}</span>
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      href={`/recipes/${recipe.slug}`}
                      target="_blank"
                      className="font-display text-lg font-semibold text-ink group-hover:text-sage transition-colors line-clamp-1"
                    >
                      {recipe.title}
                    </Link>
                    <p className="mt-1 font-display text-xs text-muted line-clamp-2 leading-relaxed">
                      {recipe.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-ink/5 flex items-center justify-between text-muted font-ui text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-sage" />
                      <span>{recipe.prepTime}</span>
                      <span className="text-ink/20">•</span>
                      <span>{recipe.cookTime}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingRecipe(recipe)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 bg-white text-ink/70 hover:border-sage hover:text-sage"
                        title="Edit Recipe"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        target="_blank"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 bg-white text-ink/70 hover:border-sage hover:text-sage"
                        title="View Live"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-ink/10 bg-white text-ink/70 hover:border-red-400 hover:text-red-600"
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
          <div className="rounded-xl border border-ink/10 bg-white p-12 text-center shadow-2xs">
            <AlertCircle className="mx-auto h-8 w-8 text-muted mb-2" />
            <h3 className="font-display text-xl text-ink">No recipes match your filter</h3>
            <p className="mt-1 font-display text-sm text-muted">
              Try adjusting your search query, choosing a different category, or resetting filters.
            </p>
          </div>
        )
      )}

      {/* Quick Edit Recipe Modal */}
      {editingRecipe && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-modal-title"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-ink/15 bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div>
                <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-sage">
                  Content Editor
                </span>
                <h3 id="edit-modal-title" className="font-display text-2xl text-ink mt-0.5">
                  Edit &quot;{editingRecipe.title}&quot;
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingRecipe(null)}
                className="rounded-md p-1.5 text-muted hover:text-ink hover:bg-linen/50 transition-colors"
                aria-label="Close edit modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Recipe Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingRecipe.title}
                    onChange={(e) =>
                      setEditingRecipe({ ...editingRecipe, title: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3.5 py-2 font-display text-sm text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Category
                  </label>
                  <select
                    value={editingRecipe.category}
                    onChange={(e) =>
                      setEditingRecipe({ ...editingRecipe, category: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs uppercase tracking-wider text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.name}>
                        {cat.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Servings */}
                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Servings
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingRecipe.servings}
                    onChange={(e) =>
                      setEditingRecipe({
                        ...editingRecipe,
                        servings: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Prep Time */}
                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Prep Time
                  </label>
                  <input
                    type="text"
                    value={editingRecipe.prepTime}
                    onChange={(e) =>
                      setEditingRecipe({ ...editingRecipe, prepTime: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Cook Time */}
                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Cook Time
                  </label>
                  <input
                    type="text"
                    value={editingRecipe.cookTime}
                    onChange={(e) =>
                      setEditingRecipe({ ...editingRecipe, cookTime: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Image Path / URL with Live Preview */}
                <div className="sm:col-span-2">
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Image Path or URL
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={editingRecipe.image}
                      onChange={(e) =>
                        setEditingRecipe({ ...editingRecipe, image: e.target.value })
                      }
                      className="flex-1 rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                    />
                    <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-md border border-ink/15 bg-linen">
                      <Image
                        src={editingRecipe.image}
                        alt="Preview"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Excerpt */}
                <div className="sm:col-span-2">
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Short Excerpt
                  </label>
                  <textarea
                    rows={2}
                    value={editingRecipe.excerpt}
                    onChange={(e) =>
                      setEditingRecipe({ ...editingRecipe, excerpt: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-display text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Featured Checkbox */}
                <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    checked={editingRecipe.isFeatured}
                    onChange={(e) =>
                      setEditingRecipe({
                        ...editingRecipe,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded accent-sage focus:ring-sage"
                  />
                  <label
                    htmlFor="edit-featured"
                    className="font-ui text-xs font-bold uppercase tracking-wider text-ink cursor-pointer"
                  >
                    Feature this recipe on the homepage hero banner
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-ink/10 pt-5">
                <button
                  type="button"
                  onClick={() => setEditingRecipe(null)}
                  className="rounded-md border border-ink/20 bg-white px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-ink hover:bg-linen/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-md bg-sage px-5 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white hover:bg-sage-dark shadow-xs transition-colors"
                >
                  <Check className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create New Recipe Modal */}
      {createModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-modal-title"
        >
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-ink/15 bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div>
                <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-sage">
                  Recipe Creator
                </span>
                <h3 id="create-modal-title" className="font-display text-2xl text-ink mt-0.5">
                  Publish New Recipe
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className="rounded-md p-1.5 text-muted hover:text-ink hover:bg-linen/50 transition-colors"
                aria-label="Close create modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecipe} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div className="sm:col-span-2">
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Recipe Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jaffna Crab Curry"
                    value={newRecipeData.title}
                    onChange={(e) =>
                      setNewRecipeData({ ...newRecipeData, title: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3.5 py-2 font-display text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Category
                  </label>
                  <select
                    value={newRecipeData.category}
                    onChange={(e) =>
                      setNewRecipeData({ ...newRecipeData, category: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs uppercase tracking-wider text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.name}>
                        {cat.displayName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Servings */}
                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Servings
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newRecipeData.servings}
                    onChange={(e) =>
                      setNewRecipeData({
                        ...newRecipeData,
                        servings: Number(e.target.value),
                      })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Prep Time */}
                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Prep Time
                  </label>
                  <input
                    type="text"
                    value={newRecipeData.prepTime}
                    onChange={(e) =>
                      setNewRecipeData({ ...newRecipeData, prepTime: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Cook Time */}
                <div>
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Cook Time
                  </label>
                  <input
                    type="text"
                    value={newRecipeData.cookTime}
                    onChange={(e) =>
                      setNewRecipeData({ ...newRecipeData, cookTime: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Image Path */}
                <div className="sm:col-span-2">
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Image Path or URL
                  </label>
                  <input
                    type="text"
                    value={newRecipeData.image}
                    onChange={(e) =>
                      setNewRecipeData({ ...newRecipeData, image: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Excerpt */}
                <div className="sm:col-span-2">
                  <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                    Short Excerpt
                  </label>
                  <textarea
                    rows={2}
                    placeholder="A rich, fragrant Sri Lankan curry infused with roasted spices..."
                    value={newRecipeData.excerpt}
                    onChange={(e) =>
                      setNewRecipeData({ ...newRecipeData, excerpt: e.target.value })
                    }
                    className="w-full rounded-md border border-ink/20 px-3 py-2 font-display text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>

                {/* Featured Checkbox */}
                <div className="sm:col-span-2 flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="new-featured"
                    checked={newRecipeData.isFeatured}
                    onChange={(e) =>
                      setNewRecipeData({
                        ...newRecipeData,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="h-4 w-4 rounded accent-sage focus:ring-sage"
                  />
                  <label
                    htmlFor="new-featured"
                    className="font-ui text-xs font-bold uppercase tracking-wider text-ink cursor-pointer"
                  >
                    Feature this recipe on the homepage hero banner
                  </label>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 border-t border-ink/10 pt-5">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="rounded-md border border-ink/20 bg-white px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-ink hover:bg-linen/50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-md bg-sage px-5 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white hover:bg-sage-dark shadow-xs transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create Recipe</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
