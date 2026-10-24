import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import AdminRecipeList from "@/components/admin/AdminRecipeList";
import { getRecipes } from "@/lib/actions/recipe";
import { getCategories } from "@/lib/actions/category";

export const metadata: Metadata = {
  title: "Recipe Studio | Admin Panel | CeylonSpicer",
  description: "Browse and manage all published Sri Lankan cooking recipes.",
};

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function AdminRecipesPage({ searchParams }: Props) {
  const resolvedParams = await searchParams;
  const initialCategory =
    typeof resolvedParams.category === "string"
      ? resolvedParams.category
      : undefined;
  const initialFeatured = resolvedParams.featured === "true";

  const recipes = await getRecipes({ includeDrafts: true });
  const categories = await getCategories();

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
              Recipe Database
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink dark:text-ice">
            Recipe Management Studio
          </h1>
          <p className="mt-1 font-display text-sm text-ink/80 dark:text-slate-muted max-w-2xl">
            Explore and curate your Sri Lankan culinary repertoire. Toggle homepage showcases,
            update cooking times and servings, edit excerpts, or add new family recipes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/80 dark:bg-surface px-3 py-1 font-ui text-xs font-bold uppercase tracking-wider text-ink dark:text-ice border border-ink/10 dark:border-hairline shadow-2xs">
            <BookOpen className="h-3.5 w-3.5 text-sage dark:text-amber-primary" />
            <span>{recipes.length} Total Recipes</span>
          </span>
        </div>
      </div>

      <AdminRecipeList
        initialRecipes={recipes}
        categories={categories}
        initialCategoryFilter={initialCategory}
        initialFeaturedFilter={initialFeatured}
      />
    </div>
  );
}
