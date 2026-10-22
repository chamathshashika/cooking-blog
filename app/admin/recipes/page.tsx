import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, BookOpen, Plus } from "lucide-react";
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

  const recipes = await getRecipes();
  const categories = await getCategories();

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
              Recipe Database
            </span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl text-ink">
            Recipe Management Studio
          </h1>
          <p className="mt-1 font-display text-sm text-ink/80 max-w-2xl">
            Explore and curate your Sri Lankan culinary repertoire. Toggle homepage showcases,
            update cooking times and servings, edit excerpts, or add new family recipes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-cream/80 px-3 py-1 font-ui text-xs font-bold uppercase tracking-wider text-ink border border-ink/10 shadow-2xs">
            <BookOpen className="h-3.5 w-3.5 text-sage" />
            <span>{recipes.length} Total Recipes</span>
          </span>

          <Link
            href="/admin/recipes/new"
            className="inline-flex min-h-[42px] items-center gap-1.5 rounded-md bg-sage px-4 py-2 font-ui text-xs font-bold uppercase tracking-wider text-white hover:bg-sage-dark shadow-xs transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>New Recipe</span>
          </Link>
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
