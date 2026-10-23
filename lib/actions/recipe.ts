"use server";

import { revalidatePath } from "next/cache";
import { Types } from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import { RecipeModel, IIngredient, IInstruction } from "@/lib/models/Recipe";
import { RecipeRating } from "@/lib/models/RecipeRating";
import { User } from "@/lib/models/User";
import { verifySession } from "@/lib/dal";
import { hasAdminAccess } from "@/lib/definitions";
import { type Recipe, type RecipeAuthor } from "@/lib/data";
import { seedRecipes } from "@/lib/seedData";
import { generateSlug } from "@/lib/slug";
import { deleteBlobByUrl } from "@/lib/actions/upload";

/**
 * Safely format populated author document into RecipeAuthor.
 */
function formatPopulatedAuthor(rawAuthor: unknown): RecipeAuthor {
  if (rawAuthor && typeof rawAuthor === "object") {
    const a = rawAuthor as Record<string, unknown>;
    const name =
      typeof a.name === "string" && a.name.trim()
        ? a.name.trim()
        : "Chef Amara Perera";
    const role =
      a.role === "admin"
        ? "Master Chef & Founder"
        : a.role === "editor"
        ? "Culinary Contributor"
        : typeof a.role === "string" && a.role.trim()
        ? a.role.trim()
        : "Recipe Author";
    const email = typeof a.email === "string" ? a.email : undefined;
    const id = a._id ? a._id.toString() : undefined;
    const avatar =
      typeof a.avatar === "string" && a.avatar.trim()
        ? a.avatar.trim()
        : "/images/recipes/sri-lankan-chicken-curry.jpg";

    return {
      id,
      name,
      role,
      email,
      avatar,
    };
  }

  return {
    name: "Chef Amara Perera",
    role: "Master Recipe Developer",
    avatar: "/images/recipes/sri-lankan-chicken-curry.jpg",
  };
}

/**
 * Lean populated recipe document returned by Mongoose queries.
 */
interface PopulatedRecipeDoc {
  _id?: Types.ObjectId;
  slug: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  ratingCount: number;
  prepTime: string;
  cookTime: string;
  totalTime?: string;
  servings: number;
  excerpt: string;
  intro?: string;
  isFeatured: boolean;
  ingredients: IIngredient[];
  instructions: IInstruction[];
  notes?: string;
  tags?: string[];
  author?: unknown;
  publishedDate?: string;
  status?: "draft" | "published";
}

/**
 * Retrieve an existing admin or user ObjectId to use as a fallback author foreign key.
 */
async function getOrCreateDefaultAuthorId(): Promise<Types.ObjectId> {
  let user = await User.findOne({ role: "admin" }).lean();
  if (user && user._id) {
    return user._id as Types.ObjectId;
  }

  user = await User.findOne().lean();
  if (user && user._id) {
    return user._id as Types.ObjectId;
  }

  const created = await User.create({
    name: "Chef Amara Perera",
    email: "chef.amara@ceylonspicer.com",
    password: "$2a$10$defaultdummyhashedpasswordforchefamara",
    role: "admin",
    avatar: "/images/recipes/sri-lankan-chicken-curry.jpg",
    bio: "Passionate about preserving authentic Sri Lankan heritage recipes.",
  });

  return created._id as Types.ObjectId;
}

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

let hasMigratedRecipeAuthors = false;

async function ensureRecipeAuthorsMigrated() {
  if (hasMigratedRecipeAuthors) return;
  try {
    const totalCount = await RecipeModel.countDocuments();
    if (totalCount === 0) {
      const defaultAuthorId = await getOrCreateDefaultAuthorId();
      await RecipeModel.insertMany(
        seedRecipes.map((r) => ({
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
          author: defaultAuthorId,
          status: "published",
          publishedDate: r.publishedDate || new Date().toISOString().split("T")[0],
        }))
      );
    } else {
      const legacyCount = await RecipeModel.countDocuments({
        $or: [
          { "author.name": { $exists: true } },
          { author: { $exists: false } },
          { author: null },
        ],
      });
      if (legacyCount > 0) {
        const defaultAuthorId = await getOrCreateDefaultAuthorId();
        await RecipeModel.updateMany(
          {
            $or: [
              { "author.name": { $exists: true } },
              { author: { $exists: false } },
              { author: null },
            ],
          },
          { $set: { author: defaultAuthorId } }
        );
      }
    }
    hasMigratedRecipeAuthors = true;
  } catch (err) {
    console.error("ensureRecipeAuthorsMigrated error:", err);
  }
}

/**
 * Fetch all recipes from MongoDB and populate the author foreign key.
 * By default, returns ONLY published recipes ({ status: { $ne: "draft" } }).
 * Pass options.includeDrafts = true (for Admin Studio) to include drafts.
 */
export async function getRecipes(options?: {
  includeDrafts?: boolean;
}): Promise<Recipe[]> {
  try {
    await connectToDatabase();
    await ensureRecipeAuthorsMigrated();

    const query = options?.includeDrafts
      ? {}
      : { status: { $ne: "draft" as const } };

    const docs = await RecipeModel.find(query)
      .populate("author", "name email role avatar")
      .sort({ createdAt: -1 })
      .lean();

    return (docs as unknown as PopulatedRecipeDoc[]).map((doc) => ({
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
      author: formatPopulatedAuthor(doc.author),
      publishedDate: doc.publishedDate,
      status: doc.status || "published",
    }));
  } catch (error) {
    console.error("Failed to load recipes from database:", error);
    return [];
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

    // 3. Format or auto-generate SEO-friendly slug
    const baseSlug = generateSlug(data.slug || title);
    if (!baseSlug) {
      return {
        success: false,
        error: "Could not generate a valid SEO URL slug for this recipe.",
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

    // 7. Auto-resolve duplicate slug for clean SEO URLs
    let slug = baseSlug;
    let counter = 2;
    while (await RecipeModel.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    // 8. Logged-in user is the single author; keep user ID as ObjectId foreign key
    let authorId: Types.ObjectId;
    if (session.userId && Types.ObjectId.isValid(session.userId)) {
      authorId = new Types.ObjectId(session.userId);
    } else {
      authorId = await getOrCreateDefaultAuthorId();
    }

    // 9. Create recipe document with author foreign key
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
      author: authorId,
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
    await ensureRecipeAuthorsMigrated();
    const doc = (await RecipeModel.findOne({ slug })
      .populate("author", "name email role avatar")
      .lean()) as unknown as PopulatedRecipeDoc | null;
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
        author: formatPopulatedAuthor(doc.author),
        publishedDate: doc.publishedDate,
        status: doc.status || "published",
      };
    }
    return undefined;
  } catch (error) {
    console.error("Error looking up recipe by slug in MongoDB:", error);
    return undefined;
  }
}

/**
 * Retrieve related recipes directly from MongoDB.
 */
export async function getRelatedRecipes(
  currentSlug: string,
  category: string,
  limit: number = 3
): Promise<Recipe[]> {
  try {
    await connectToDatabase();
    await ensureRecipeAuthorsMigrated();
    const sameCategoryDocs = await RecipeModel.find({
      slug: { $ne: currentSlug },
      category: { $regex: new RegExp(`^${category}$`, "i") },
      status: { $ne: "draft" as const },
    })
      .populate("author", "name email role avatar")
      .limit(limit)
      .lean();

    let related = (sameCategoryDocs as unknown as PopulatedRecipeDoc[]).map((doc) => ({
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
      author: formatPopulatedAuthor(doc.author),
      publishedDate: doc.publishedDate,
    }));

    if (related.length < limit) {
      const remainingCount = limit - related.length;
      const existingSlugs = [currentSlug, ...related.map((r) => r.slug)];
      const otherDocs = await RecipeModel.find({
        slug: { $nin: existingSlugs },
        status: { $ne: "draft" as const },
      })
        .populate("author", "name email role avatar")
        .limit(remainingCount)
        .lean();

      related = [
        ...related,
        ...(otherDocs as unknown as PopulatedRecipeDoc[]).map((doc) => ({
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
          author: formatPopulatedAuthor(doc.author),
          publishedDate: doc.publishedDate,
          status: doc.status || "published",
        })),
      ];
    }

    return related;
  } catch (error) {
    console.error("Failed to fetch related recipes from database:", error);
    return [];
  }
}

export type UpdateRecipeInput = CreateRecipeInput;

/**
 * Server action to update an existing Recipe.
 * Requires authenticated session with admin or editor privileges.
 */
export async function updateRecipe(
  originalSlug: string,
  data: UpdateRecipeInput
): Promise<RecipeActionResult> {
  try {
    // 1. Authorization check
    const session = await verifySession();
    if (!session.isAuth || !hasAdminAccess(session.role)) {
      return {
        success: false,
        error: "Unauthorized: You do not have permission to update recipes.",
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

    // 3. Format or validate SEO-friendly slug
    let newSlug = generateSlug(data.slug || title);
    if (!newSlug) {
      newSlug = originalSlug;
    }

    await connectToDatabase();

    // 4. If slug changed, ensure new slug is not taken by another recipe
    if (newSlug !== originalSlug) {
      const existingNew = await RecipeModel.findOne({ slug: newSlug }).lean();
      if (existingNew) {
        return {
          success: false,
          error: `The URL slug "${newSlug}" is already in use by another recipe. Please pick a unique slug.`,
        };
      }
    }

    // 5. Sanitize Ingredients (with affiliate links)
    const sanitizedIngredients: IIngredient[] = (data.ingredients || [])
      .filter((ing) => ing.name && ing.name.trim().length > 0)
      .map((ing) => {
        let affiliateUrl = ing.affiliateUrl?.trim() || ing.affiliateLink?.trim();
        if (
          affiliateUrl &&
          !affiliateUrl.startsWith("http://") &&
          !affiliateUrl.startsWith("https://")
        ) {
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

    // 6. Sanitize Instructions
    const sanitizedInstructions: IInstruction[] = (data.instructions || [])
      .filter((step) => step.text && step.text.trim().length > 0)
      .map((step, idx) => ({
        step: idx + 1,
        title: step.title?.trim() || undefined,
        text: step.text.trim(),
      }));

    // 7. Find existing or upsert (for static recipes being customized for the first time)
    const existingDoc = await RecipeModel.findOne({ slug: originalSlug });

    if (existingDoc) {
      const previousImage = existingDoc.image;
      existingDoc.slug = newSlug;
      existingDoc.title = title;
      existingDoc.category = category;
      existingDoc.image = image;
      existingDoc.prepTime = prepTime;
      existingDoc.cookTime = cookTime;
      existingDoc.totalTime = data.totalTime?.trim() || undefined;
      existingDoc.servings = servings;
      existingDoc.excerpt = excerpt;
      existingDoc.intro = data.intro?.trim() || undefined;
      existingDoc.isFeatured = Boolean(data.isFeatured);
      existingDoc.ingredients = sanitizedIngredients;
      existingDoc.instructions = sanitizedInstructions;
      existingDoc.notes = (data.notes || []).map((n) => n.trim()).filter(Boolean);
      existingDoc.tags = (data.tags || []).map((t) => t.trim().toLowerCase()).filter(Boolean);
      if (data.status) {
        existingDoc.status = data.status;
      }
      // Ensure author is set as ObjectId foreign key
      if (
        !existingDoc.author ||
        !Types.ObjectId.isValid(existingDoc.author as unknown as string | Types.ObjectId)
      ) {
        existingDoc.author =
          session.userId && Types.ObjectId.isValid(session.userId)
            ? new Types.ObjectId(session.userId)
            : await getOrCreateDefaultAuthorId();
      }
      await existingDoc.save();

      // Clean up previous image from blob storage if updated with a new image
      if (previousImage && previousImage !== image) {
        try {
          await deleteBlobByUrl(previousImage);
        } catch (imgErr) {
          console.warn("Failed to delete old recipe image blob:", imgErr);
        }
      }
    } else {
      // Upsert: Create a new document in MongoDB from the static recipe with logged user as author
      const authorId =
        session.userId && Types.ObjectId.isValid(session.userId)
          ? new Types.ObjectId(session.userId)
          : await getOrCreateDefaultAuthorId();

      await RecipeModel.create({
        slug: newSlug,
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
        author: authorId,
        status: data.status || "published",
        publishedDate: new Date().toISOString().split("T")[0],
      });
    }

    // 8. Revalidate all dependent routes
    revalidatePath("/admin/recipes");
    revalidatePath(`/admin/recipes/${newSlug}/edit`);
    revalidatePath(`/admin/recipes/${originalSlug}/edit`);
    revalidatePath("/admin");
    revalidatePath("/recipes");
    revalidatePath(`/recipes/${newSlug}`);
    revalidatePath(`/recipes/${originalSlug}`);
    revalidatePath("/");

    return {
      success: true,
      slug: newSlug,
    };
  } catch (error: unknown) {
    console.error("Failed to update recipe in database:", error);
    const errorMessage =
      error instanceof Error
        ? error.message
        : "An unexpected error occurred while updating the recipe.";
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Server action to delete a recipe.
 * Requires admin or editor role.
 */
export async function deleteRecipe(
  slug: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const session = await verifySession();
    if (!session.isAuth || !hasAdminAccess(session.role)) {
      return {
        success: false,
        error: "Unauthorized: You do not have permission to delete recipes.",
      };
    }

    await connectToDatabase();
    const deleted = await RecipeModel.findOneAndDelete({ slug });

    // 1. Delete associated hero image from blob storage
    if (deleted && deleted.image) {
      try {
        await deleteBlobByUrl(deleted.image);
      } catch (imgErr) {
        console.warn("Failed to delete recipe image blob:", imgErr);
      }
    }

    // 2. Clean up associated recipe ratings
    try {
      await RecipeRating.deleteMany({ recipeSlug: slug });
    } catch (rateErr) {
      console.warn("Failed to delete recipe ratings:", rateErr);
    }

    revalidatePath("/admin/recipes");
    revalidatePath("/admin");
    revalidatePath("/recipes");
    revalidatePath(`/recipes/${slug}`);
    revalidatePath("/");

    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to delete recipe:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the recipe.",
    };
  }
}

export type RateRecipeResult = {
  success: boolean;
  newRating?: number;
  newRatingCount?: number;
  userRating?: number;
  error?: string;
};

/**
 * Server action allowing any user to submit a star rating (1-5).
 * Does NOT require or check author or user authentication.
 * Persists rating in MongoDB using direct field update and revalidates paths.
 */
export async function rateRecipe(
  slug: string,
  rating: number
): Promise<RateRecipeResult> {
  try {
    const trimmedSlug = slug?.trim();
    if (!trimmedSlug) {
      return { success: false, error: "Recipe slug is required." };
    }

    const starValue = Math.round(Number(rating));
    if (isNaN(starValue) || starValue < 1 || starValue > 5) {
      return { success: false, error: "Rating must be an integer between 1 and 5." };
    }

    await connectToDatabase();

    // 1. Locate current recipe document to read current rating metrics
    const recipeDoc = await RecipeModel.findOne({ slug: trimmedSlug }).lean();

    if (!recipeDoc) {
      return { success: false, error: "Recipe not found." };
    }

    if (recipeDoc.status === "draft") {
      return { success: false, error: "Cannot rate an unpublished or draft recipe." };
    }

    // 2. Compute updated rating average and increment count
    const oldCount = recipeDoc?.ratingCount || 0;
    const oldRating = recipeDoc?.rating || 0;
    const newCount = oldCount + 1;
    const newTotal = (oldRating * oldCount) + starValue;
    const newAverage = Math.max(1, Math.min(5, Math.round((newTotal / newCount) * 10) / 10));

    // 3. Update ONLY rating and ratingCount (never touches, checks, or requires author)
    await RecipeModel.updateOne(
      { slug: trimmedSlug },
      { $set: { rating: newAverage, ratingCount: newCount } }
    );

    // 4. Save rating record to RecipeRating
    await RecipeRating.create({
      recipeSlug: trimmedSlug,
      rating: starValue,
    });

    // 5. Revalidate pages displaying recipe ratings
    revalidatePath(`/recipes/${trimmedSlug}`);
    revalidatePath("/recipes");
    revalidatePath("/");

    return {
      success: true,
      newRating: newAverage,
      newRatingCount: newCount,
      userRating: starValue,
    };
  } catch (error: unknown) {
    console.error("Failed to rate recipe:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to record star rating.",
    };
  }
}
