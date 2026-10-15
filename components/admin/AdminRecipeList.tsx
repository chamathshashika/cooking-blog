"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Filter,
  ExternalLink,
  Edit3,
  Trash2,
  Star,
  Plus,
  Clock,
  Users,
  CheckCircle2,
  X,
  AlertCircle,
} from "lucide-react";
import type { Recipe, Category } from "@/lib/data";

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

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

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
        return 0;
      });
  }, [recipes, searchQuery, selectedCategory, featuredFilter, sortBy]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 border border-sage bg-white px-4 py-3 shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="h-5 w-5 text-sage" />
          <span className="font-ui text-xs font-semibold uppercase tracking-wider text-ink">
            {toastMessage}
          </span>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-2 text-muted hover:text-ink"
            aria-label="Dismiss toast"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Action Bar & Controls */}
      <div className="flex flex-col gap-4 border border-ink/10 bg-white p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search recipes, tags, ingredients..."
            className="w-full border border-ink/15 bg-white pl-9 pr-8 py-2 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
              aria-label="Clear search"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        {/* Filters and Add Button */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Category Dropdown */}
          <div className="flex items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-muted hidden sm:inline-block" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-ink/15 bg-white px-2.5 py-2 font-ui text-xs uppercase tracking-wider text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.displayName}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Dropdown */}
          <select
            value={featuredFilter}
            onChange={(e) => setFeaturedFilter(e.target.value)}
            className="border border-ink/15 bg-white px-2.5 py-2 font-ui text-xs uppercase tracking-wider text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            aria-label="Filter by featured status"
          >
            <option value="all">All Status</option>
            <option value="featured">Featured Only</option>
            <option value="standard">Standard</option>
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="border border-ink/15 bg-white px-2.5 py-2 font-ui text-xs uppercase tracking-wider text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            aria-label="Sort recipes"
          >
            <option value="title">Sort: Title</option>
            <option value="servings">Sort: Servings</option>
          </select>

          {/* Add New Recipe Button */}
          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex min-h-[40px] items-center gap-2 bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <Plus className="h-4 w-4" />
            <span>New Recipe</span>
          </button>
        </div>
      </div>

      {/* Recipes Count and Active Filter Indicators */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-muted font-ui text-xs uppercase tracking-wider">
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
            className="text-sage hover:text-sage-dark font-bold underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Recipe List Table */}
      {filteredRecipes.length > 0 ? (
        <div className="overflow-x-auto border border-ink/10 bg-white">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-ink/10 bg-cream/40 font-ui text-[11px] font-bold uppercase tracking-wider text-muted">
                <th className="py-3 px-4">Recipe</th>
                <th className="py-3 px-4 hidden md:table-cell">Category</th>
                <th className="py-3 px-4 hidden lg:table-cell">Prep / Cook</th>
                <th className="py-3 px-4 hidden sm:table-cell">Servings</th>
                <th className="py-3 px-4">Featured</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {filteredRecipes.map((recipe) => (
                <tr
                  key={recipe.id}
                  className="group hover:bg-cream/15 transition-colors"
                >
                  {/* Recipe Image & Title */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative h-14 w-14 sm:h-16 sm:w-16 shrink-0 overflow-hidden bg-linen border border-ink/10">
                        <Image
                          src={recipe.image}
                          alt={recipe.title}
                          fill
                          sizes="64px"
                          className="object-cover"
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
                        <p className="font-ui text-[11px] text-muted line-clamp-1 mt-0.5">
                          {recipe.excerpt}
                        </p>
                        <div className="flex items-center gap-2 mt-1 sm:hidden font-ui text-[10px] uppercase text-muted">
                          <span>{recipe.category}</span>
                          <span>•</span>
                          <span>{recipe.servings} Servings</span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 hidden md:table-cell">
                    <span className="inline-block bg-linen/70 px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-wider text-ink border border-ink/5">
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
                      <span>{recipe.servings}</span>
                    </div>
                  </td>

                  {/* Featured Status Toggle */}
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => handleToggleFeatured(recipe.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 font-ui text-[10px] font-bold uppercase tracking-wider transition-colors border ${
                        recipe.isFeatured
                          ? "bg-sunshine/30 text-ink border-sunshine/80 hover:bg-sunshine/50"
                          : "bg-white text-muted border-ink/15 hover:border-ink/40"
                      } focus:outline-none focus-visible:ring-2 focus-visible:ring-sage`}
                      title="Click to toggle featured status on home page"
                    >
                      <Star
                        className={`h-3 w-3 ${
                          recipe.isFeatured
                            ? "fill-amber-500 text-amber-500"
                            : "text-muted"
                        }`}
                      />
                      <span>{recipe.isFeatured ? "Featured" : "Standard"}</span>
                    </button>
                  </td>

                  {/* Action Buttons */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* View Live */}
                      <Link
                        href={`/recipes/${recipe.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center border border-ink/15 bg-white text-ink hover:text-sage hover:border-sage transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                        title="View recipe on live website"
                        aria-label={`View ${recipe.title} on site`}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </Link>

                      {/* Edit */}
                      <button
                        onClick={() => setEditingRecipe({ ...recipe })}
                        className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center border border-ink/15 bg-white text-ink hover:bg-cream hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                        title="Edit recipe"
                        aria-label={`Edit ${recipe.title}`}
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>

                      {/* Delete */}
                      <button
                        onClick={() => handleDeleteRecipe(recipe.id, recipe.title)}
                        className="inline-flex min-h-[36px] min-w-[36px] items-center justify-center border border-ink/15 bg-white text-muted hover:text-red-600 hover:border-red-300 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                        title="Delete recipe"
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
      ) : (
        <div className="border border-ink/10 bg-white py-16 px-4 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-muted mb-3" />
          <h3 className="font-display text-xl text-ink">No recipes found</h3>
          <p className="mt-1 font-ui text-xs text-muted max-w-sm mx-auto">
            No recipes matched your search and filter criteria. Try adjusting your
            search terms or resetting active filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
              setFeaturedFilter("all");
            }}
            className="mt-4 inline-flex items-center gap-2 bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white hover:bg-sage-dark"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Edit Recipe Modal */}
      {editingRecipe && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg border border-ink/20 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <h3 className="font-display text-xl text-ink">
                Edit Recipe: {editingRecipe.title}
              </h3>
              <button
                onClick={() => setEditingRecipe(null)}
                className="text-muted hover:text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close edit modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Recipe Title
                </label>
                <input
                  type="text"
                  value={editingRecipe.title}
                  onChange={(e) =>
                    setEditingRecipe({ ...editingRecipe, title: e.target.value })
                  }
                  required
                  className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    Category
                  </label>
                  <select
                    value={editingRecipe.category}
                    onChange={(e) =>
                      setEditingRecipe({ ...editingRecipe, category: e.target.value })
                    }
                    className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.displayName}>
                        {cat.displayName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    Servings
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={editingRecipe.servings}
                    onChange={(e) =>
                      setEditingRecipe({
                        ...editingRecipe,
                        servings: Number(e.target.value) || 1,
                      })
                    }
                    className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    Prep Time
                  </label>
                  <input
                    type="text"
                    value={editingRecipe.prepTime}
                    onChange={(e) =>
                      setEditingRecipe({ ...editingRecipe, prepTime: e.target.value })
                    }
                    className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>
                <div>
                  <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    Cook Time
                  </label>
                  <input
                    type="text"
                    value={editingRecipe.cookTime}
                    onChange={(e) =>
                      setEditingRecipe({ ...editingRecipe, cookTime: e.target.value })
                    }
                    className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>
              </div>

              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Excerpt (Short Summary)
                </label>
                <textarea
                  rows={2}
                  value={editingRecipe.excerpt}
                  onChange={(e) =>
                    setEditingRecipe({ ...editingRecipe, excerpt: e.target.value })
                  }
                  className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="editIsFeatured"
                  checked={editingRecipe.isFeatured || false}
                  onChange={(e) =>
                    setEditingRecipe({ ...editingRecipe, isFeatured: e.target.checked })
                  }
                  className="h-4 w-4 accent-sage"
                />
                <label
                  htmlFor="editIsFeatured"
                  className="font-ui text-xs font-semibold uppercase tracking-wider text-ink cursor-pointer"
                >
                  Feature this recipe on homepage hero row
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingRecipe(null)}
                  className="min-h-[44px] border border-ink/20 px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-muted hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] bg-sage px-5 py-2 font-ui text-xs font-bold uppercase tracking-widest text-white hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Recipe Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg border border-ink/20 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <h3 className="font-display text-xl text-ink">
                Create New Recipe
              </h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="text-muted hover:text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close create modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRecipe} className="mt-4 space-y-4">
              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Recipe Title *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sri Lankan Crab Curry"
                  value={newRecipeData.title}
                  onChange={(e) =>
                    setNewRecipeData({ ...newRecipeData, title: e.target.value })
                  }
                  required
                  className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    Category
                  </label>
                  <select
                    value={newRecipeData.category}
                    onChange={(e) =>
                      setNewRecipeData({ ...newRecipeData, category: e.target.value })
                    }
                    className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    {categories.map((cat) => (
                      <option key={cat.slug} value={cat.displayName}>
                        {cat.displayName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    Servings
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={newRecipeData.servings}
                    onChange={(e) =>
                      setNewRecipeData({
                        ...newRecipeData,
                        servings: Number(e.target.value) || 1,
                      })
                    }
                    className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    Prep Time
                  </label>
                  <input
                    type="text"
                    value={newRecipeData.prepTime}
                    onChange={(e) =>
                      setNewRecipeData({ ...newRecipeData, prepTime: e.target.value })
                    }
                    className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>
                <div>
                  <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                    Cook Time
                  </label>
                  <input
                    type="text"
                    value={newRecipeData.cookTime}
                    onChange={(e) =>
                      setNewRecipeData({ ...newRecipeData, cookTime: e.target.value })
                    }
                    className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                </div>
              </div>

              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Excerpt
                </label>
                <textarea
                  rows={2}
                  placeholder="A short enticing description of the dish..."
                  value={newRecipeData.excerpt}
                  onChange={(e) =>
                    setNewRecipeData({ ...newRecipeData, excerpt: e.target.value })
                  }
                  className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="newIsFeatured"
                  checked={newRecipeData.isFeatured}
                  onChange={(e) =>
                    setNewRecipeData({ ...newRecipeData, isFeatured: e.target.checked })
                  }
                  className="h-4 w-4 accent-sage"
                />
                <label
                  htmlFor="newIsFeatured"
                  className="font-ui text-xs font-semibold uppercase tracking-wider text-ink cursor-pointer"
                >
                  Feature this recipe on homepage
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="min-h-[44px] border border-ink/20 px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-muted hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="min-h-[44px] bg-sage px-5 py-2 font-ui text-xs font-bold uppercase tracking-widest text-white hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                >
                  Publish Recipe
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
