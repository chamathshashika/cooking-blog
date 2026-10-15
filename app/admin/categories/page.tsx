import type { Metadata } from "next";
import AdminCategoryList from "@/components/admin/AdminCategoryList";
import { categories, allRecipes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categories | Admin Panel | CeylonSpicer",
  description: "Browse and manage culinary categories and recipe assignments.",
};

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div className="border-b border-ink/10 pb-4">
        <p className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
          Culinary Taxonomy
        </p>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl text-ink">
          All Categories
        </h1>
        <p className="mt-1 font-display text-sm text-ink/80 max-w-xl">
          Browse all 8 Sri Lankan cuisine categories, review recipe assignments,
          edit taxonomy descriptions, or add new culinary categories.
        </p>
      </div>

      <AdminCategoryList initialCategories={categories} recipes={allRecipes} />
    </div>
  );
}
