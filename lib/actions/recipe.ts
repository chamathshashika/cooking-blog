"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { RecipeModel, IRecipe, IIngredient, IInstruction } from "@/lib/models/Recipe";
import { verifySession } from "@/lib/dal";
import { hasAdminAccess } from "@/lib/definitions";
import { allRecipes as defaultRecipes, type Recipe } from "@/lib/data";

export type CreateRecipeInput = {
  title: string;
  slug?: string;
  category: string;
  image: string;
  prepTime: string;
  cookTime: string;
  totalTime?: string;
  servings: number;
  excerpt: string;
  intro?: string;
  isFeatured?: boolean;
  ingredients: Array<{
    name: string;
    amount?: string;
    quantity?: string;
    group?: string;
    optional?: boolean;
    affiliateUrl?: string;
    affiliateLink?: string;
  }>;
  instructions: Array<{
    step: number;
    title?: string;
    text: string;
  }>;
  notes?: string[];
  tags?: string[];
  status?: "draft" | "published";
};

export type RecipeActionResult = {
  success: boolean;
  slug?: string;
  error?: string;
};

/**
 * Fetch all recipes from MongoDB.
 * Seeds with default static recipes if database collection is empty.
 */
export async function getRecipes(): Promise<Recipe[]> {
  try {
    await connectToDatabase();
    let docs = await RecipeModel.find().lean().sort({ createdAt: -1 });

    if (!docs || docs.length === 0) {
      // Seed default recipes into MongoDB
      await RecipeModel.insertMany(
        defaultRecipes.map((r) => ({
          slug: r.slug,
          title: r.title,
          category: r.category,
          image: r.image,
          rating: r.rating || 0,
          ratingCount: r.ratingCount || 0,
          prepTime: r.prepTime,
          cookTime: r.cookTime,
          totalTime: r.totalTime,
          servings: r.servings || 4,
          excerpt: r.excerpt,
          intro: r.intro,
          isFeatured: !!r.isFeatured,
          ingredients: r.ingredients || [],
          instructions: r.instructions || [],
          notes: r.notes || [],
          tags: r.tags || [],
          author: r.author || {
            name: "Chef Amara Perera",
            role: "Master Recipe Developer",
            avatar: "/images/recipes/sri-lankan-chicken-curry.jpg",
          },
          status: "published",
          publishedDate: r.publishedDate || new Date().toISOString().split("T")[0],
        }))
      );
      docs = await RecipeModel.find().lean().sort({ createdAt: -1 });
    }

    return docs.map((doc) => ({
      id: doc._id ? doc._id.toString() : doc.slug,
      slug: doc.slug,
      title: doc.title,
      category: doc.category,
      image: doc.image,
      rating: doc.rating,
      ratingCount: doc.ratingCount,
      prepTime: doc.prepTime,
      cookTime: doc.cookTime,
      totalTime: doc.totalTime,
      servings: doc.servings,
      excerpt: doc.excerpt,
      intro: doc.intro,
      isFeatured: doc.isFeatured,
      ingredients: doc.ingredients,
      instructions: doc.instructions,
      notes: doc.notes,
      tags: doc.tags,
      author: doc.author,
      publishedDate: doc.publishedDate,
    }));
  } catch (error) {
    console.error("Failed to load recipes from database, using static fallback:", error);
    return defaultRecipes;
  }
}

/**
 * Server action to create and publish a new Recipe.
 * Requires authenticated session with admin or editor privileges.
 */
export async function createRecipe(
  data: CreateRecipeInput
): Promise<RecipeActionResult> {
  try {
    // 1. Authorization check
    const session = await verifySession();
    if (!session.isAuth || !hasAdminAccess(session.role)) {
      return {
        success: false,
        error: "Unauthorized: You do not have permission to publish recipes.",
      };
    }

    // 2. Validate basic input fields
    const title = data.title?.trim();
    if (!title || title.length < 3) {
      return {
        success: false,
        error: "Recipe title must be at least 3 characters long.",
      };
    }

    const category = data.category?.trim();
    if (!category) {
      return {
        success: false,
        error: "Please select a category for this recipe.",
      };
    }

    const image = data.image?.trim();
    if (!image) {
      return {
        success: false,
        error: "Please provide a featured recipe image.",
      };
    }

    const prepTime = data.prepTime?.trim() || "20 min";
    const cookTime = data.cookTime?.trim() || "25 min";
    const servings = Number(data.servings) || 4;
    const excerpt =
      data.excerpt?.trim() ||
      `${title} — an authentic, comforting Sri Lankan recipe made with aromatic spices and traditional ingredients.`;

    // 3. Format or generate slug
    let slug = data.slug?.trim().toLowerCase();
    if (!slug) {
      slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    } else {
      slug = slug
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    if (!slug) {
      return {
        success: false,
        error: "Could not generate a valid URL slug for this recipe.",
      };
    }

    // 4. Validate and sanitize Ingredients (with affiliate links)
    const sanitizedIngredients: IIngredient[] = (data.ingredients || [])
      .filter((ing) => ing.name && ing.name.trim().length > 0)
      .map((ing) => {
        let affiliateUrl = ing.affiliateUrl?.trim() || ing.affiliateLink?.trim();
        // If affiliate URL is provided without protocol, prepend https://
        if (affiliateUrl && !affiliateUrl.startsWith("http://") && !affiliateUrl.startsWith("https://")) {
          affiliateUrl = `https://${affiliateUrl}`;
        }

        return {
          name: ing.name.trim(),
          amount: ing.amount?.trim() || ing.quantity?.trim(),
          quantity: ing.quantity?.trim() || ing.amount?.trim(),
          group: ing.group?.trim(),
          optional: Boolean(ing.optional),
          affiliateUrl: affiliateUrl || undefined,
          affiliateLink: affiliateUrl || undefined,
        };
      });

    // 5. Validate and sanitize Instructions
    const sanitizedInstructions: IInstruction[] = (data.instructions || [])
      .filter((step) => step.text && step.text.trim().length > 0)
      .map((step, idx) => ({
        step: idx + 1,
        title: step.title?.trim() || undefined,
        text: step.text.trim(),
      }));

    // 6. Connect to database
    await connectToDatabase();

    // 7. Check for duplicate slug
    const existing = await RecipeModel.findOne({ slug }).lean();
    if (existing) {
      return {
        success: false,
        error: `A recipe with the slug "${slug}" already exists. Please choose a unique title or slug.`,
      };
    }

    // 8. Author profile
    const authorName = session.name || "Chef Amara Perera";
    const authorRole = session.role === "admin" ? "Master Chef & Founder" : "Culinary Contributor";

    // 9. Create recipe document
    const created = await RecipeModel.create({
      slug,
      title,
      category,
      image,
      rating: 5,
      ratingCount: 1,
      prepTime,
      cookTime,
      totalTime: data.totalTime?.trim() || undefined,
      servings,
      excerpt,
      intro: data.intro?.trim() || undefined,
      isFeatured: Boolean(data.isFeatured),
      ingredients: sanitizedIngredients,
      instructions: sanitizedInstructions,
      notes: (data.notes || []).map((n) => n.trim()).filter(Boolean),
      tags: (data.tags || []).map((t) => t.trim().toLowerCase()).filter(Boolean),
      author: {
        name: authorName,
        role: authorRole,
        avatar: "/images/recipes/sri-lankan-chicken-curry.jpg",
      },
      status: data.status || "published",
      publishedDate: new Date().toISOString().split("T")[0],
    });

    // 10. Revalidate relevant Next.js routes
    revalidatePath("/admin/recipes");
    revalidatePath("/admin");
    revalidatePath("/recipes");
    revalidatePath(`/recipes/${slug}`);
    revalidatePath("/");

    return {
      success: true,
      slug: created.slug,
    };
  } catch (error: unknown) {
    console.error("Failed to create recipe in database:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while publishing the recipe.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Find a recipe by slug from MongoDB, falling back to static recipes.
 */
export async function findRecipeBySlug(
  slug: string
): Promise<Recipe | undefined> {
  try {
    await connectToDatabase();
    const doc = await RecipeModel.findOne({ slug }).lean();
    if (doc) {
      return {
        id: doc._id ? doc._id.toString() : doc.slug,
        slug: doc.slug,
        title: doc.title,
        category: doc.category,
        image: doc.image,
        rating: doc.rating,
        ratingCount: doc.ratingCount,
        prepTime: doc.prepTime,
        cookTime: doc.cookTime,
        totalTime: doc.totalTime,
        servings: doc.servings,
        excerpt: doc.excerpt,
        intro: doc.intro,
        isFeatured: doc.isFeatured,
        ingredients: doc.ingredients,
        instructions: doc.instructions,
        notes: doc.notes,
        tags: doc.tags,
        author: doc.author,
        publishedDate: doc.publishedDate,
      };
    }
  } catch (error) {
    console.error("Error looking up recipe by slug in MongoDB:", error);
  }

  return defaultRecipes.find((r) => r.slug === slug);
}
