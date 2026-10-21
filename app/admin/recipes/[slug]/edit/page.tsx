import type { Metadata } from "next";
import { notFound } from "next/navigation";
import RecipeForm from "@/components/admin/RecipeForm";
import { getCategories } from "@/lib/actions/category";
import { findRecipeBySlug } from "@/lib/actions/recipe";
import { verifySession } from "@/lib/dal";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = await findRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found | CeylonSpicer Admin",
    };
  }

  return {
    title: `Edit ${recipe.title} | Recipe Studio | CeylonSpicer Admin`,
    description: `Edit recipe details, ingredients checklist with affiliate links, instructions, and photography for ${recipe.title}.`,
  };
}

export default async function EditRecipePage({ params }: Props) {
  const { slug } = await params;
  const session = await verifySession();
  const [recipe, categories] = await Promise.all([
    findRecipeBySlug(slug),
    getCategories(),
  ]);

  if (!recipe) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <RecipeForm
        categories={categories}
        authorName={session.name || recipe.author?.name || "Chef Amara Perera"}
        initialRecipe={recipe}
        isEditing={true}
      />
    </div>
  );
}
