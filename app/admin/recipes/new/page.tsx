import type { Metadata } from "next";
import RecipeForm from "@/components/admin/RecipeForm";
import { getCategories } from "@/lib/actions/category";
import { verifySession } from "@/lib/dal";

export const metadata: Metadata = {
  title: "New Recipe | Recipe Studio | CeylonSpicer Admin",
  description: "Compose and publish an authentic Sri Lankan recipe with rich photography, ingredients checklist, and affiliate links.",
};

export default async function NewRecipePage() {
  const session = await verifySession();
  const categories = await getCategories();

  return (
    <div className="space-y-6">
      <RecipeForm
        categories={categories}
        authorName={session.name || "Chef Amara Perera"}
      />
    </div>
  );
}
