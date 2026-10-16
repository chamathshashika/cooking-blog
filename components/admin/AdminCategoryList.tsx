"use client";

import { useState, useMemo, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  ExternalLink,
  Edit3,
  Trash2,
  Plus,
  BookOpen,
  X,
  AlertCircle,
  ArrowRight,
  Loader2,
  ShieldAlert,
} from "lucide-react";
import type { Category, Recipe } from "@/lib/data";
import { useToast } from "@/components/ToastProvider";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/lib/actions/category";

type Props = {
  initialCategories: Category[];
  recipes: Recipe[];
  isAdmin?: boolean;
};

export default function AdminCategoryList({
  initialCategories,
  recipes,
  isAdmin = false,
}: Props) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [newCategoryData, setNewCategoryData] = useState({
    name: "",
    displayName: "",
    slug: "",
    description: "",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
  });

  const { showToast } = useToast();

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
        (rCat === "entrees" ||
          rCat === "dinner" ||
          rCat === "seafood" ||
          rCat === "meat" ||
          rCat.includes("curry"))
      ) {
        return true;
      }
      if (target === "lunch" && (rCat === "lunch" || rCat === "entrees")) return true;
      if (target === "drinks" && rCat === "drinks") return true;
      return false;
    }).length;
  };

  // Save / Update Category
  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCategory) return;

    if (!isAdmin) {
      showToast("Unauthorized: Only administrators can update categories.", "error");
      return;
    }

    startTransition(async () => {
      const res = await updateCategory(editingCategory.slug, {
        displayName: editingCategory.displayName,
        description: editingCategory.description,
        image: editingCategory.image,
        name: editingCategory.name,
      });

      if (res.success && res.category) {
        setCategories((prev) =>
          prev.map((c) => (c.slug === editingCategory.slug ? res.category! : c))
        );
        showToast(res.message || "Category updated successfully.", "success");
        setEditingCategory(null);
      } else {
        showToast(res.error || "Failed to update category.", "error");
      }
    });
  };

  // Create Category
  const handleCreateCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryData.displayName.trim()) return;

    if (!isAdmin) {
      showToast("Unauthorized: Only administrators can create categories.", "error");
      return;
    }

    startTransition(async () => {
      const res = await createCategory(newCategoryData);

      if (res.success && res.category) {
        setCategories((prev) => [...prev, res.category!]);
        showToast(res.message || "Category created successfully.", "success");
        setCreateModalOpen(false);
        setNewCategoryData({
          name: "",
          displayName: "",
          slug: "",
          description: "",
          image:
            "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
        });
      } else {
        showToast(res.error || "Failed to create category.", "error");
      }
    });
  };

  // Delete Category
  const handleConfirmDelete = () => {
    if (!deletingCategory) return;

    if (!isAdmin) {
      showToast("Unauthorized: Only administrators can delete categories.", "error");
      return;
    }

    startTransition(async () => {
      const res = await deleteCategory(deletingCategory.slug);

      if (res.success) {
        setCategories((prev) =>
          prev.filter((c) => c.slug !== deletingCategory.slug)
        );
        showToast(res.message || "Category removed successfully.", "success");
        setDeletingCategory(null);
      } else {
        showToast(res.error || "Failed to delete category.", "error");
      }
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
      {/* Main Filter & Action Toolbar */}
      <div className="rounded-xl border border-ink/10 bg-white p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search categories by name or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full min-h-[44px] rounded-md border border-ink/20 bg-white pl-10 pr-4 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink focus:outline-none"
                aria-label="Clear category search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Action button: Admin create button vs Editor notice */}
          <div className="flex items-center gap-2">
            {isAdmin ? (
              <button
                type="button"
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-md bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white shadow-xs transition-all hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-ink cursor-pointer"
              >
                <Plus className="h-4 w-4" />
                <span>New Category</span>
              </button>
            ) : (
              <div
                title="Only users with Admin role can create new categories"
                className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-ink/10 bg-cream/30 px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-muted cursor-not-allowed"
              >
                <ShieldAlert className="h-4 w-4 text-sage" />
                <span>Admin Required to Add</span>
              </div>
            )}
          </div>
        </div>

        {/* Counter & helper indicator */}
        <div className="flex items-center justify-between border-t border-ink/5 pt-3 text-[11px] font-ui text-muted">
          <span>
            Showing <strong className="text-ink">{filteredCategories.length}</strong> of{" "}
            <strong className="text-ink">{categories.length}</strong> categories
          </span>
          {!isAdmin && (
            <span className="text-[10px] uppercase tracking-wider text-muted font-medium">
              Category mutations restricted to Admin role
            </span>
          )}
        </div>
      </div>

      {/* Categories Grid */}
      {filteredCategories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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

                  {isAdmin ? (
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingCategory({ ...category })}
                        className="inline-flex items-center gap-1.5 rounded-md border border-ink/10 bg-white px-3 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider text-sage hover:bg-cream/30 hover:border-sage transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sage cursor-pointer"
                      >
                        <Edit3 className="h-3 w-3" />
                        <span>Edit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setDeletingCategory(category)}
                        className="inline-flex items-center gap-1 rounded-md border border-red-200 bg-white px-2.5 py-1.5 font-ui text-[11px] font-bold uppercase tracking-wider text-red-600 hover:bg-red-50 hover:border-red-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400 cursor-pointer"
                        title="Delete category"
                        aria-label={`Delete category ${category.displayName}`}
                      >
                        <Trash2 className="h-3 w-3" />
                        <span className="hidden sm:inline">Delete</span>
                      </button>
                    </div>
                  ) : (
                    <span className="font-ui text-[10px] uppercase tracking-wider text-muted/80 font-medium">
                      Read Only
                    </span>
                  )}
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

      {/* Edit Category Modal (Admin Only) */}
      {isAdmin && editingCategory && (
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
                  Taxonomy Editor • Admin
                </span>
                <h3 id="edit-category-title" className="font-display text-2xl text-ink mt-0.5">
                  Edit Category
                </h3>
              </div>
              <button
                type="button"
                disabled={isPending}
                onClick={() => setEditingCategory(null)}
                className="rounded-md p-1.5 text-muted hover:text-ink hover:bg-linen/50 transition-colors cursor-pointer"
                aria-label="Close edit modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-5 space-y-4">
              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Display Name *
                </label>
                <input
                  type="text"
                  required
                  disabled={isPending}
                  value={editingCategory.displayName}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      displayName: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3.5 py-2 font-display text-sm text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Slug (URL path)
                </label>
                <input
                  type="text"
                  disabled
                  value={editingCategory.slug}
                  className="w-full rounded-md border border-ink/10 bg-linen/40 px-3.5 py-2 font-ui text-xs text-muted cursor-not-allowed"
                />
                <p className="mt-1 text-[10px] font-ui text-muted">
                  URL slug is fixed to preserve existing external recipe and SEO links.
                </p>
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Image URL *
                </label>
                <input
                  type="text"
                  required
                  disabled={isPending}
                  value={editingCategory.image}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      image: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3.5 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  disabled={isPending}
                  value={editingCategory.description}
                  onChange={(e) =>
                    setEditingCategory({
                      ...editingCategory,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3.5 py-2 font-display text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setEditingCategory(null)}
                  className="rounded-md border border-ink/20 bg-white px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-ink hover:bg-linen/50 transition-colors cursor-pointer disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 rounded-md bg-sage px-5 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white hover:bg-sage-dark shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>Save Changes</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Create Category Modal (Admin Only) */}
      {isAdmin && createModalOpen && (
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
                  Taxonomy Creator • Admin
                </span>
                <h3 id="create-category-title" className="font-display text-2xl text-ink mt-0.5">
                  New Category
                </h3>
              </div>
              <button
                type="button"
                disabled={isPending}
                onClick={() => setCreateModalOpen(false)}
                className="rounded-md p-1.5 text-muted hover:text-ink hover:bg-linen/50 transition-colors cursor-pointer"
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
                  disabled={isPending}
                  placeholder="e.g. Street Food Snacks"
                  value={newCategoryData.displayName}
                  onChange={(e) =>
                    setNewCategoryData({
                      ...newCategoryData,
                      displayName: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3.5 py-2 font-display text-sm text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Slug (Optional - auto-generated)
                </label>
                <input
                  type="text"
                  disabled={isPending}
                  placeholder="street-food-snacks"
                  value={newCategoryData.slug}
                  onChange={(e) =>
                    setNewCategoryData({
                      ...newCategoryData,
                      slug: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Image URL *
                </label>
                <input
                  type="text"
                  required
                  disabled={isPending}
                  value={newCategoryData.image}
                  onChange={(e) =>
                    setNewCategoryData({
                      ...newCategoryData,
                      image: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3 py-2 font-ui text-xs text-ink focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block font-ui text-xs font-bold uppercase tracking-wider text-ink mb-1.5">
                  Description *
                </label>
                <textarea
                  rows={3}
                  required
                  disabled={isPending}
                  placeholder="Warm narrative describing this culinary category..."
                  value={newCategoryData.description}
                  onChange={(e) =>
                    setNewCategoryData({
                      ...newCategoryData,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-ink/20 px-3 py-2 font-display text-xs text-ink placeholder:text-muted focus:border-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage disabled:opacity-60"
                />
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
                <button
                  type="button"
                  disabled={isPending}
                  onClick={() => setCreateModalOpen(false)}
                  className="rounded-md border border-ink/20 bg-white px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-ink hover:bg-linen/50 transition-colors cursor-pointer disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex items-center gap-1.5 rounded-md bg-sage px-5 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white hover:bg-sage-dark shadow-xs transition-colors cursor-pointer disabled:opacity-60"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Creating...</span>
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4" />
                      <span>Create Category</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal (Admin Only) */}
      {isAdmin && deletingCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-category-title"
        >
          <div className="relative w-full max-w-md rounded-xl border border-red-200 bg-white p-6 shadow-2xl">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <Trash2 className="h-5 w-5" />
              </div>
              <div className="flex-1">
                <h3
                  id="delete-category-title"
                  className="font-display text-xl font-bold text-ink"
                >
                  Delete Category?
                </h3>
                <p className="mt-2 text-xs font-ui text-muted leading-relaxed">
                  Are you sure you want to delete{" "}
                  <strong className="text-ink">
                    &quot;{deletingCategory.displayName}&quot;
                  </strong>
                  ? This will permanently remove it from the taxonomy database.
                </p>
                {getRecipeCount(deletingCategory.slug) > 0 && (
                  <div className="mt-3 rounded-md border border-sunshine/60 bg-cream/40 p-2.5 text-xs font-ui text-ink">
                    <span className="font-bold">Notice:</span> There are{" "}
                    <strong>{getRecipeCount(deletingCategory.slug)} recipes</strong> assigned
                    to this category. Recipes will remain published, but their taxonomy tag will be removed.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3 border-t border-ink/10 pt-4">
              <button
                type="button"
                disabled={isPending}
                onClick={() => setDeletingCategory(null)}
                className="rounded-md border border-ink/20 bg-white px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-ink hover:bg-linen/50 transition-colors cursor-pointer disabled:opacity-60"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isPending}
                onClick={handleConfirmDelete}
                className="inline-flex items-center gap-1.5 rounded-md bg-red-600 px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white hover:bg-red-700 shadow-xs transition-colors cursor-pointer disabled:opacity-60"
              >
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4" />
                    <span>Confirm Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
