import type { Metadata } from "next";
import AdminRecipeList from "@/components/admin/AdminRecipeList";
import { allRecipes, categories } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Recipes | Admin Panel | CeylonSpicer",
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

  return (
    <div className="space-y-6">
      <div className="border-b border-ink/10 pb-4">
        <p className="font-ui text-[11px] font-bold uppercase tracking-[0.15em] text-muted">
          Recipe Database
        </p>
        <h1 className="mt-1 font-display text-2xl sm:text-3xl text-ink">
          All Recipes
        </h1>
        <p className="mt-1 font-display text-sm text-ink/80 max-w-xl">
          Complete list of traditional curries, breakfast staples, seafood dishes, and sweets.
          Search, toggle homepage feature status, edit details, or preview live posts.
        </p>
      </div>

      <AdminRecipeList
        initialRecipes={allRecipes}
        categories={categories}
        initialCategoryFilter={initialCategory}
        initialFeaturedFilter={initialFeatured}
      />
    </div>
  );
}
