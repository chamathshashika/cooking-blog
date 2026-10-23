import Link from "next/link";
import { ArrowRight, BookOpen, Layers, Sparkles } from "lucide-react";
import AdminStats from "@/components/admin/AdminStats";
import AdminRecipeList from "@/components/admin/AdminRecipeList";
import AdminCategoryList from "@/components/admin/AdminCategoryList";
import { getCategories } from "@/lib/actions/category";
import { getRecipes } from "@/lib/actions/recipe";
import { verifyAdminSession } from "@/lib/dal";

export default async function AdminDashboardPage() {
  const [session, recipes, categoriesList] = await Promise.all([
    verifyAdminSession(),
    getRecipes({ includeDrafts: true }),
    getCategories(),
  ]);
  const isAdmin = session.role === "admin";
  return (
    <div className="space-y-10">
      {/* Studio Header Banner */}
      <div className="relative overflow-hidden rounded-xl border border-ink/10 dark:border-hairline bg-gradient-to-br from-cream/60 via-cream/30 to-white dark:from-surface dark:via-surface/90 dark:to-panel p-6 sm:p-8 shadow-xs">
        {/* Decorative subtle background accents */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-sunshine/20 dark:bg-amber-primary/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-12 right-24 h-40 w-40 rounded-full bg-sage/10 dark:bg-sage/15 blur-2xl" />

        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/90 dark:bg-panel px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-[0.15em] text-ink dark:text-ice border border-ink/10 dark:border-hairline shadow-2xs mb-3">
              <Sparkles className="h-3 w-3 text-sage dark:text-amber-primary" />
              <span>Sri Lankan Culinary Studio</span>
            </div>
            <h1 className="font-display text-2xl sm:text-3xl md:text-4xl text-ink dark:text-ice tracking-tight">
              Kitchen Content Control Center
            </h1>
            <p className="mt-2 font-display text-sm sm:text-base text-ink/80 dark:text-slate-muted leading-relaxed">
              Curate and publish authentic Sri Lankan dishes, manage food photography,
              organize cultural recipe categories, and toggle homepage featured showcases.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/recipes"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-sage dark:bg-amber-primary px-4 py-2 font-ui text-xs font-bold uppercase tracking-widest text-white dark:text-obsidian shadow-xs transition-all hover:bg-sage-dark dark:hover:bg-amber-primary/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <BookOpen className="h-4 w-4" />
              <span>Recipes Database</span>
            </Link>
            <Link
              href="/admin/categories"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md border border-ink/20 dark:border-hairline bg-white dark:bg-panel px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice shadow-2xs transition-all hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <Layers className="h-4 w-4" />
              <span>Categories</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <section aria-label="Studio Statistics">
        <AdminStats recipes={recipes} categories={categoriesList} />
      </section>

      {/* Studio Split Grid: Left Side Recipes (Published & Drafts) | Right Side Category List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Recipe Management */}
        <section className="lg:col-span-7 xl:col-span-8 space-y-4" aria-label="Recipes Management">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 dark:border-hairline pb-4 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-sage dark:bg-amber-primary" />
                <h2 className="font-display text-xl sm:text-2xl text-ink dark:text-ice">
                  Recipes (Published & Drafts)
                </h2>
              </div>
              <p className="font-ui text-xs text-muted dark:text-slate-muted mt-1">
                Browse, search, and manage all published dishes and unpublished drafts
              </p>
            </div>
            <Link
              href="/admin/recipes"
              className="inline-flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-wider text-sage hover:text-sage-dark dark:text-amber-text dark:hover:text-amber-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <span>Dedicated Recipe View</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <AdminRecipeList
            initialRecipes={recipes}
            categories={categoriesList}
            compact={true}
          />
        </section>

        {/* Right Side: Category List */}
        <section className="lg:col-span-5 xl:col-span-4 space-y-4" aria-label="Categories Management">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-ink/10 dark:border-hairline pb-4 gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-sunshine dark:bg-gold" />
                <h2 className="font-display text-xl sm:text-2xl text-ink dark:text-ice">
                  Category List
                </h2>
              </div>
              <p className="font-ui text-xs text-muted dark:text-slate-muted mt-1">
                Taxonomies, live dish counts, and quick management
              </p>
            </div>
            <Link
              href="/admin/categories"
              className="inline-flex items-center gap-1.5 font-ui text-xs font-bold uppercase tracking-wider text-sage hover:text-sage-dark dark:text-amber-text dark:hover:text-amber-secondary focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <span>Full View</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <AdminCategoryList
            initialCategories={categoriesList}
            recipes={recipes}
            isAdmin={isAdmin}
            compact={true}
          />
        </section>
      </div>
    </div>
  );
}
