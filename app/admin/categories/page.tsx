import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers, ShieldCheck } from "lucide-react";
import AdminCategoryList from "@/components/admin/AdminCategoryList";
import { getCategories } from "@/lib/actions/category";
import { getRecipes } from "@/lib/actions/recipe";
import { verifyAdminSession } from "@/lib/dal";

export const metadata: Metadata = {
  title: "Categories Studio | Admin Panel | CeylonSpicer",
  description: "Browse and manage culinary categories and recipe assignments.",
};

export default async function AdminCategoriesPage() {
  const [session, categoriesList, recipes] = await Promise.all([
    verifyAdminSession(),
    getCategories(),
    getRecipes({ includeDrafts: true }),
  ]);
  const isAdmin = session.role === "admin";

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 dark:border-hairline pb-5 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <Link
              href="/admin"
              className="inline-flex items-center gap-1 font-ui text-[10px] font-bold uppercase tracking-wider text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice transition-colors"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Studio Overview</span>
            </Link>
            <span className="text-ink/20 dark:text-slate-muted/30">/</span>
            <span className="font-ui text-[10px] font-bold uppercase tracking-wider text-sage dark:text-amber-text">
              Taxonomy Database
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink dark:text-ice">
            Culinary Categories & Taxonomy
          </h1>
          <p className="mt-1 font-display text-sm text-ink/80 dark:text-slate-muted max-w-2xl">
            Browse all Sri Lankan culinary collections, monitor recipe assignments,
            customize cultural descriptions, and introduce new food themes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isAdmin ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sage/10 dark:bg-amber-primary/10 px-3 py-1 font-ui text-xs font-bold uppercase tracking-wider text-sage dark:text-amber-text border border-sage/20 dark:border-amber-primary/30 shadow-2xs">
              <ShieldCheck className="h-3.5 w-3.5 text-sage dark:text-amber-primary" />
              <span>Admin Management</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/80 dark:bg-surface px-3 py-1 font-ui text-xs font-bold uppercase tracking-wider text-muted dark:text-slate-muted border border-ink/10 dark:border-hairline shadow-2xs">
              <span>Editor (Read Only)</span>
            </span>
          )}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/80 dark:bg-surface px-3 py-1 font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice border border-ink/10 dark:border-hairline shadow-2xs">
            <Layers className="h-3.5 w-3.5 text-sage dark:text-amber-primary" />
            <span>{categoriesList.length} Categories</span>
          </span>
        </div>
      </div>

      <AdminCategoryList
        initialCategories={categoriesList}
        recipes={recipes}
        isAdmin={isAdmin}
      />
    </div>
  );
}

