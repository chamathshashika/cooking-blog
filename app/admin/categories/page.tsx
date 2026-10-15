import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers } from "lucide-react";
import AdminCategoryList from "@/components/admin/AdminCategoryList";
import { categories, allRecipes } from "@/lib/data";

export const metadata: Metadata = {
  title: "Categories Studio | Admin Panel | CeylonSpicer",
  description: "Browse and manage culinary categories and recipe assignments.",
};

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 font-ui text-[10px] font-bold uppercase tracking-wider text-muted hover:text-ink transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Studio Overview</span>
            </Link>
            <span className="text-ink/20">/</span>
            <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-sage">
              Taxonomy Database
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink">
            Culinary Categories & Taxonomy
          </h1>
          <p className="mt-1 font-display text-sm text-ink/80 max-w-2xl">
            Browse all Sri Lankan culinary collections, monitor recipe assignments,
            customize cultural descriptions, and introduce new food themes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/80 px-3 py-1 font-ui text-xs font-bold uppercase tracking-wider text-ink border border-ink/10 shadow-2xs">
            <Layers className="h-3.5 w-3.5 text-sage" />
            <span>{categories.length} Categories</span>
          </span>
        </div>
      </div>

      <AdminCategoryList initialCategories={categories} recipes={allRecipes} />
    </div>
  );
}
