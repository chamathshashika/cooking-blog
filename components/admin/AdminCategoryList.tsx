"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  Edit3,
  Plus,
  BookOpen,
  X,
  CheckCircle2,
  AlertCircle,
  Check,
  ArrowRight,
} from "lucide-react";
import type { Category, Recipe } from "@/lib/data";

type Props = {
  initialCategories: Category[];
  recipes: Recipe[];
};

export default function AdminCategoryList({
  initialCategories,
  recipes,
}: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    displayName: "",
    slug: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Helper to compute live recipe count for a category
  const getRecipeCount = (categorySlug: string) => {
    const target = categorySlug.toLowerCase();
    return recipes.filter((recipe) => {
      const rCat = recipe.category.toLowerCase();
      if (rCat === target) return true;
      if (
        (target === "dinner" ||
          target === "curries" ||
          target === "chicken-curries" ||
          target === "seafood" ||
          target === "meat") &&
        (rCat === "dinner" ||
          rCat === "entrees" ||
          rCat === "seafood" ||
          rCat === "meat" ||
          rCat.includes("curry") ||
          rCat.includes("curries"))
      ) {
        return true;
      }
      if (target === "desserts" && (rCat === "desserts" || rCat === "sweets")) return true;
      if (target === "breakfast" && rCat === "breakfast") return true;
      if (target === "appetizers" && rCat === "appetizers") return true;
      if (target === "sides" && rCat === "sides") return true;
      if (
        target === "entrees" &&
        (rCat === "entrees" || rCat === "dinner" || rCat === "seafood" || rCat === "meat" || rCat.includes("curry"))
      ) {
        return true;
      }
      if (target === "lunch" && (rCat === "lunch" || rCat === "entrees")) return true;
      if (target === "drinks" && rCat === "drinks") return true;
      return false;
    }).length;
  };

  // Save Edit
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    setCategories((prev) =>
      prev.map((c) => (c.slug === editingCategory.slug ? editingCategory : c))
    );
    showToast(`Updated category "${editingCategory.displayName}".`);
    setEditingCategory(null);
  };

  // Create Category
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryData.displayName.trim()) return;

    const generatedSlug =
      newCategoryData.slug.trim() ||
      newCategoryData.displayName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newCategory: Category = {
      name: newCategoryData.name.trim() || generatedSlug,
      displayName: newCategoryData.displayName.trim(),
      slug: generatedSlug,
      description:
        newCategoryData.description.trim() ||
        "Authentic Sri Lankan culinary collection.",
      image: newCategoryData.image.trim(),
    };

    setCategories((prev) => [...prev, newCategory]);
    showToast(`Created new category "${newCategory.displayName}".`);
    setCreateModalOpen(false);
    setNewCategoryData({
      name: "",
      displayName: "",
      slug: "",
      description: "",
      image:
        "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
    });
  };

  // Filtered categories
  const filteredCategories = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return categories;
    return categories.filter(
      (c) =>
        c.displayName.toLowerCase().includes(query) ||
        c.slug.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query)
    );
  }, [categories, searchQuery]);

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-lg border border-sage/40 bg-white px-4 py-3 shadow-lg animate-in slide-in-from-bottom-3">
          <CheckCircle2 className="h-5 w-5 text-sage shrink-0" />
          <span className="font-ui text-xs font-semibold text-ink">
            {toastMessage}
          </span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-muted hover:text-ink ml-2 focus:outline-none"
            aria-label="Dismiss toast"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Main Filter & Action Toolbar */}
      <div className="rounded-xl border border-ink/10 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories by name or description..."
              className="w-full min-h-[42px] rounded-md border border-ink/15 bg-[#faf8f5]/60 pl-10 pr-10 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink focus:outline-none"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Add Category Button */}
          <button
            onClick={() => setCreateModalOpen(true)}
            className="inline-flex min-h-[42px] items-center gap-2 rounded-md bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest text-white shadow-xs transition-all hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>New Category</span>
          </button>
        </div>

        {/* Count Indicator */}
        <div className="flex items-center justify-between pt-3 border-t border-ink/5 font-ui text-xs text-muted">
          <span>
            Showing <strong className="text-ink">{filteredCategories.length}</strong> of{" "}
            <strong className="text-ink">{categories.length}</strong> categories
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="font-bold text-sage hover:text-sage-dark underline"
            >
              Clear Search
            </button>
          )}
        </div>
      </div>

      {/* Category Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const count = getRecipeCount(category.slug);
            return (
              <div
                key={category.slug}
                className="group flex flex-col justify-between rounded-xl border border-ink/10 bg-white p-5 shadow-2xs hover:shadow-md hover:border-ink/20 transition-all"
              >
                <div>
                  <div className="flex items-start gap-4">
                    {/* Circular Photo with warm border */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border-2 border-sunshine/40 bg-linen shadow-2xs">
                      <Image
                        src={category.image}
                        alt={category.displayName}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Category Title & Slug */}
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/category/${category.slug}`}
                        target="_blank"
                        className="font-display text-lg font-semibold text-ink group-hover:text-sage transition-colors line-clamp-1"
                      >
                        {category.displayName}
                      </Link>
                      <p className="font-ui text-[10px] text-muted tracking-wider uppercase mt-0.5">
                        /category/{category.slug}
                      </p>

                      {/* Recipe Count Badge */}
                      <div className="mt-2">
                        <Link
                          href={`/admin/recipes?category=${category.slug}`}
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-ui text-[10px] font-bold uppercase tracking-wider border transition-all ${
                            count > 0
                              ? "bg-sage/10 text-sage border-sage/20 hover:bg-sage hover:text-white"
                              : "bg-linen text-muted border-ink/10"
                          }`}
                        >
                          <BookOpen className="h-3 w-3" />
                          <span>
                            {count} {count === 1 ? "Recipe" : "Recipes"}
                          </span>
                          <ArrowRight className="h-2.5 w-2.5 opacity-60" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-4 font-display text-xs text-ink/80 leading-relaxed line-clamp-3">
                    {category.description}
                  </p>
                </div>

                {/* Footer Actions */}
                <div className="mt-5 flex items-center justify-between border-t border-ink/5 pt-3">
                  <Link
                    href={`/category/${category.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-ui text-[11px] font-bold uppercase tracking-wider text-muted hover:text-ink transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    <span>Public View</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>

                  <button
                    onClick={() => setEditingCategory({ ...category })}
                    className="inline-flex items-center gap-1.5 rounded-md border border-ink/10 bg-white px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider text-sage hover:bg-cream/30 hover:border-sage transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    <Edit3 className="h-3 w-3" />
                    <span>Edit</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-ink/10 bg-white p-12 text-center shadow-2xs">
          <AlertCircle className="mx-auto h-8 w-8 text-muted mb-2" />
          <h3 className="font-display text-xl text-ink">No categories found</h3>
          <p className="mt-1 font-display text-sm text-muted">
            Try adjusting your search query or reset the search filter.
          </p>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="edit-category-title"
        >
          <div className="relative w-full max-w-lg rounded-xl border border-ink/15 bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div>
                <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-sage">
                  Taxonomy Editor
                </span>
                <h3 id="edit-category-title" className="font-display text-2xl text-ink mt-0.5">
                  Edit Category
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setEditingCategory(null)}
                className="rounded-md p-1.5 text-muted hover:text-ink hover:bg-linen/50 transition-colors"
                aria-label="Close edit modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-5 space-y-4">
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Display Name
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.displayName}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      displayName: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3.5 py-2 font-display text-sm text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Slug (URL path)
                </label>
                <input
                  type="text"
                  required
                  value={editingCategory.slug}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      slug: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Image URL
                </label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    required
                    value={editingCategory.image}
                    onChange={(e) =>
                      setEditingCategory({
                        ...editingCategory,
                        image: e.target.value,
                      })
                    }
                    className="flex-1 rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  />
                  <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-ink/15 bg-linen">
                    <Image
                      src={editingCategory.image}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3 py-2 font-display text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
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

      {/* Create Category Modal */}
      {createModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="create-category-title"
        >
          <div className="relative w-full max-w-lg rounded-xl border border-ink/15 bg-white p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <div>
                <span className="font-ui text-[10px] font-bold uppercase tracking-widest text-sage">
                  Taxonomy Creator
                </span>
                <h3 id="create-category-title" className="font-display text-2xl text-ink mt-0.5">
                  Add New Category
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

            <form onSubmit={handleCreateCategory} className="mt-5 space-y-4">
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Display Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Street Food Snacks"
                  value={newCategoryData.displayName}
                  onChange={(e) =>
                    setNewCategoryData({
                      ...newCategoryData,
                      displayName: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3.5 py-2 font-display text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Slug (Optional - auto-generated)
                </label>
                <input
                  type="text"
                  placeholder="street-food-snacks"
                  value={newCategoryData.slug}
                  onChange={(e) =>
                    setNewCategoryData({
                      ...newCategoryData,
                      slug: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Image URL
                </label>
                <input
                  type="text"
                  value={newCategoryData.image}
                  onChange={(e) =>
                    setNewCategoryData({
                      ...newCategoryData,
                      image: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Warm narrative describing this culinary category..."
                  value={newCategoryData.description}
                  onChange={(e) =>
                    setNewCategoryData({
                      ...newCategoryData,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3 py-2 font-display text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
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
                  <span>Create Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
