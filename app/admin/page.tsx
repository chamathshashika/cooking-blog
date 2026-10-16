import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Sparkles } from "lucide-react";
import AdminStats from "@/components/admin/AdminStats";
import AdminRecipeList from "@/components/admin/AdminRecipeList";
import AdminCategoryList from "@/components/admin/AdminCategoryList";
import { allRecipes, categories } from "@/lib/data";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      {/* Studio Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-ink/10 bg-gradient-to-br from-cream/60 via-cream/30 to-white p-6 sm:p-8 shadow-xs">
        {/* Decorative subtle background accents */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-sunshine/20 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 right-24 h-40 w-40 rounded-full bg-sage/10 blur-2xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[0.15em] text-ink border border-ink/10 shadow-2xs mb-3">
              <Sparkles className="h-3 w-3 text-sage" />
              <span>Sri Lankan Culinary Studio</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-ink tracking-tight">
              Kitchen Content Control Center
            </h1>
            <p className="mt-2 font-display text-sm sm:text-base text-ink/80 leading-relaxed">
              Curate and publish authentic Sri Lankan dishes, manage food photography,
              organize cultural recipe categories, and toggle homepage featured showcases.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/recipes"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest text-white shadow-xs transition-all hover:bg-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <BookOpen className="h-4 w-4" />
              <span>Recipes Database</span>
            </Link>
            <Link
              href="/admin/categories"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-ink/20 bg-white px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-ink shadow-2xs transition-all hover:border-sage hover:text-sage focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <Layers className="h-4 w-4" />
              <span>Categories</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <section aria-label="Studio Statistics">
        <AdminStats recipes={allRecipes} categories={categories} />
      </section>

      {/* Recipes Section */}
      <section className="space-y-4" aria-label="Recipes Management">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 pb-4 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-sage" />
              <h2 className="font-display text-xl sm:text-2xl text-ink">
                Published Recipes
              </h2>
            </div>
            <p className="font-ui text-xs text-muted mt-1">
              Live search, filter by taxonomy or featured status, edit details, or preview live dishes
            </p>
          </div>
          <Link
            href="/admin/recipes"
            className="inline-flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-wider text-sage hover:text-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <span>Dedicated Recipe View</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <AdminRecipeList initialRecipes={allRecipes} categories={categories} />
      </section>

      {/* Categories Section */}
      <section className="space-y-4 pt-4" aria-label="Categories Management">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 pb-4 gap-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-sunshine" />
              <h2 className="font-display text-xl sm:text-2xl text-ink">
                Culinary Categories & Taxonomy
              </h2>
            </div>
            <p className="font-ui text-xs text-muted mt-1">
              Taxonomy overview, live recipe count assignments, and culinary descriptions
            </p>
          </div>
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-wider text-sage hover:text-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <span>Dedicated Categories View</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <AdminCategoryList initialCategories={categories} recipes={allRecipes} />
      </section>
    </div>
  );
}
