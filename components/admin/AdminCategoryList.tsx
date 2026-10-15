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

    const slug =
      newCategoryData.slug.trim() ||
      newCategoryData.displayName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    const newCategory: Category = {
      name: newCategoryData.displayName.toLowerCase(),
      displayName: newCategoryData.displayName.trim(),
      slug,
      description: newCategoryData.description.trim(),
      image: newCategoryData.image,
      count: 0,
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

      {/* Action Bar */}
      <div className="flex flex-col gap-4 border border-ink/10 bg-white p-4 sm:p-5 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search categories by name or description..."
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

        {/* Add Category Button */}
        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex min-h-[40px] items-center gap-2 bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
        >
          <Plus className="h-4 w-4" />
          <span>New Category</span>
        </button>
      </div>

      {/* Count Indicator */}
      <div className="flex items-center justify-between px-1 text-muted font-ui text-xs uppercase tracking-wider">
        <span>
          Showing <strong className="text-ink">{filteredCategories.length}</strong> of{" "}
          <strong className="text-ink">{categories.length}</strong> categories
        </span>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-sage hover:text-sage-dark font-bold underline"
          >
            Clear Search
          </button>
        )}
      </div>

      {/* Category Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCategories.map((category) => {
            const count = getRecipeCount(category.slug);
            return (
              <div
                key={category.slug}
                className="group flex flex-col justify-between border border-ink/10 bg-white p-5 transition-shadow hover:shadow-xs"
              >
                <div>
                  <div className="flex items-start gap-4">
                    {/* Circle Photo */}
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-ink/10 bg-linen">
                      <Image
                        src={category.image}
                        alt={category.displayName}
                        fill
                        sizes="64px"
                        className="object-cover transition-transform duration-200 group-hover:scale-105"
                      />
                    </div>

                    {/* Category Title & Slug */}
                    <div className="min-w-0 flex-1">
                      <Link
                        href={`/category/${category.slug}`}
                        target="_blank"
                        className="font-display text-lg font-semibold text-ink hover:text-sage transition-colors line-clamp-1"
                      >
                        {category.displayName}
                      </Link>
                      <p className="font-ui text-[11px] text-muted tracking-wider uppercase mt-0.5">
                        /category/{category.slug}
                      </p>

                      {/* Recipe Count Badge */}
                      <div className="mt-2">
                        <Link
                          href={`/admin/recipes?category=${category.slug}`}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 font-ui text-[10px] font-bold uppercase tracking-wider border ${
                            count > 0
                              ? "bg-sage/10 text-sage border-sage/20 hover:bg-sage/20"
                              : "bg-linen text-muted border-ink/10"
                          } transition-colors`}
                        >
                          <BookOpen className="h-3 w-3" />
                          <span>
                            {count} {count === 1 ? "Recipe" : "Recipes"}
                          </span>
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
                    className="inline-flex items-center gap-1 font-ui text-[11px] font-bold uppercase tracking-wider text-muted hover:text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                  >
                    <span>View Public</span>
                    <ExternalLink className="h-3 w-3" />
                  </Link>

                  <button
                    onClick={() => setEditingCategory({ ...category })}
                    className="inline-flex items-center gap-1 font-ui text-[11px] font-bold uppercase tracking-wider text-sage hover:text-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
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
        <div className="border border-ink/10 bg-white py-16 px-4 text-center">
          <AlertCircle className="mx-auto h-8 w-8 text-muted mb-3" />
          <h3 className="font-display text-xl text-ink">No categories found</h3>
          <p className="mt-1 font-ui text-xs text-muted max-w-sm mx-auto">
            No category names or descriptions matched your search term.
          </p>
          <button
            onClick={() => setSearchQuery("")}
            className="mt-4 inline-flex items-center gap-2 bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white hover:bg-sage-dark"
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md border border-ink/20 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <h3 className="font-display text-xl text-ink">Edit Category</h3>
              <button
                onClick={() => setEditingCategory(null)}
                className="text-muted hover:text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close edit modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Display Name
                </label>
                <input
                  type="text"
                  value={editingCategory.displayName}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      displayName: e.target.value,
                    })
                  }
                  required
                  className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
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
                  className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
                <button
                  type="button"
                  onClick={() => setEditingCategory(null)}
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

      {/* Create Category Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md border border-ink/20 bg-white p-6 shadow-xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-ink/10 pb-4">
              <h3 className="font-display text-xl text-ink">New Category</h3>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="text-muted hover:text-ink min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Close create modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCategory} className="mt-4 space-y-4">
              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Sambols & Chutneys"
                  value={newCategoryData.displayName}
                  onChange={(e) =>
                    setNewCategoryData({
                      ...newCategoryData,
                      displayName: e.target.value,
                    })
                  }
                  required
                  className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
              </div>

              <div>
                <label className="block font-ui text-[11px] font-bold uppercase tracking-wider text-ink mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description of this culinary group..."
                  value={newCategoryData.description}
                  onChange={(e) =>
                    setNewCategoryData({
                      ...newCategoryData,
                      description: e.target.value,
                    })
                  }
                  className="w-full border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
                />
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
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
