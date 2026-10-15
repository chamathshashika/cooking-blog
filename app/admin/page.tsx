import Link from "next/link";
import { Plus, ArrowRight, BookOpen, Layers, ExternalLink } from "lucide-react";
import AdminStats from "@/components/admin/AdminStats";
import AdminRecipeList from "@/components/admin/AdminRecipeList";
import AdminCategoryList from "@/components/admin/AdminCategoryList";
import { allRecipes, categories } from "@/lib/data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Studio Header Banner */}
      <div className="flex flex-col gap-4 border border-ink/10 bg-cream/50 p-6 sm:p-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
            Administration & Publishing Studio
          </p>
          <h1 className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl text-ink">
            Kitchen Content Studio
          </h1>
          <p className="mt-2 font-display text-sm sm:text-base text-ink/80 max-w-xl">
            Manage your Sri Lankan recipes, culinary taxonomy, home page featured selections,
            and published dishes from a single control center.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/admin/recipes"
            className="inline-flex min-h-[44px] items-center gap-2 bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <BookOpen className="h-4 w-4" />
            <span>Manage Recipes</span>
          </Link>
          <Link
            href="/admin/categories"
            className="inline-flex min-h-[44px] items-center gap-2 border border-ink/20 bg-white px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:border-sage hover:text-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <Layers className="h-4 w-4" />
            <span>Manage Categories</span>
          </Link>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <section aria-label="Studio Statistics">
        <AdminStats recipes={allRecipes} categories={categories} />
      </section>

      {/* Recipes Section */}
      <section className="space-y-4" aria-label="Recipes Management">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <div>
            <h2 className="font-display text-xl sm:text-2xl text-ink">
              All Recipes
            </h2>
            <p className="font-ui text-xs text-muted mt-0.5">
              Live search, filter by category or featured status, and edit published items
            </p>
          </div>
          <Link
            href="/admin/recipes"
            className="inline-flex items-center gap-1 font-ui text-xs font-bold uppercase tracking-wider text-sage hover:text-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <span>Full Recipe View</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <AdminRecipeList initialRecipes={allRecipes} categories={categories} />
      </section>

      {/* Categories Section */}
      <section className="space-y-4 pt-4" aria-label="Categories Management">
        <div className="flex items-center justify-between border-b border-ink/10 pb-3">
          <div>
            <h2 className="font-display text-xl sm:text-2xl text-ink">
              Categories & Taxonomy
            </h2>
            <p className="font-ui text-xs text-muted mt-0.5">
              Browse categories, check recipe assignments, and edit culinary descriptions
            </p>
          </div>
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-1 font-ui text-xs font-bold uppercase tracking-wider text-sage hover:text-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <span>Full Categories View</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <AdminCategoryList initialCategories={categories} recipes={allRecipes} />
      </section>
    </div>
  );
}
