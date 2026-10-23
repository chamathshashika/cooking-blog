"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { CategoryModel } from "@/lib/models/Category";
import { verifySession } from "@/lib/dal";
import { type Category } from "@/lib/data";
import { seedCategories } from "@/lib/seedData";
import { deleteBlobByUrl } from "@/lib/actions/upload";
import { generateSlug } from "@/lib/slug";

/**
 * Fetch all categories from MongoDB.
 * If collection is empty on initial setup, seeds from seedCategories.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    await connectToDatabase();
    let docs = await CategoryModel.find().lean().sort({ createdAt: 1 });

    // Seed defaults if empty
    if (!docs || docs.length === 0) {
      await CategoryModel.insertMany(
        seedCategories.map((c) => ({
          name: c.name,
          displayName: c.displayName,
          slug: c.slug,
          description: c.description,
          image: c.image,
        }))
      );
      docs = await CategoryModel.find().lean().sort({ createdAt: 1 });
    }

    return docs.map((doc) => ({
      name: doc.name,
      displayName: doc.displayName,
      slug: doc.slug,
      description: doc.description,
      image: doc.image,
    }));
  } catch (error) {
    console.error("Failed to load categories from database:", error);
    return [];
  }
}

/**
 * Fetch single category from MongoDB by slug.
 */
export async function getCategoryBySlug(
  slug: string
): Promise<Category | undefined> {
  try {
    await connectToDatabase();
    const target = slug?.toLowerCase().trim();
    if (!target) return undefined;

    const doc = await CategoryModel.findOne({
      $or: [{ slug: target }, { name: target }],
    }).lean();

    if (doc) {
      return {
        name: doc.name,
        displayName: doc.displayName,
        slug: doc.slug,
        description: doc.description,
        image: doc.image,
      };
    }
  } catch (error) {
    console.error("Failed to load category by slug from database:", error);
  }
  return undefined;
}

/**
 * Server action to create a new category.
 * Strictly restricted to "admin" role only.
 */
export async function createCategory(data: {
  name?: string;
  displayName: string;
  slug?: string;
  description: string;
  image: string;
}) {
  try {
    const session = await verifySession();

    // Enforce role authorization: only admin can create category
    if (session.role !== "admin") {
      return {
        success: false,
        error: "Unauthorized: Only administrators have permission to create categories.",
      };
    }

    const displayName = data.displayName?.trim();
    if (!displayName || displayName.length < 2) {
      return {
        success: false,
        error: "Display name must be at least 2 characters long.",
      };
    }

    const description = data.description?.trim();
    if (!description) {
      return {
        success: false,
        error: "Description is required.",
      };
    }

    const image = data.image?.trim();
    if (!image) {
      return {
        success: false,
        error: "Image URL is required.",
      };
    }

    // 3. Format or auto-generate SEO-friendly slug
    const baseSlug = generateSlug(data.slug || displayName);
    if (!baseSlug) {
      return {
        success: false,
        error: "Could not generate a valid SEO URL slug for this category.",
      };
    }

    await connectToDatabase();

    // Auto-resolve duplicate slug for clean SEO URLs
    let slug = baseSlug;
    let counter = 2;
    while (await CategoryModel.exists({ slug })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    const name = (data.name?.trim() || slug).toLowerCase();

    const newDoc = await CategoryModel.create({
      name,
      displayName,
      slug,
      description,
      image,
    });

    revalidatePath("/admin/categories");
    revalidatePath("/category");
    revalidatePath("/");

    return {
      success: true,
      category: {
        name: newDoc.name,
        displayName: newDoc.displayName,
        slug: newDoc.slug,
        description: newDoc.description,
        image: newDoc.image,
      },
      message: `Category "${newDoc.displayName}" created successfully.`,
    };
  } catch (error) {
    console.error("Create category error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while saving the category.",
    };
  }
}

/**
 * Server action to update an existing category.
 * Strictly restricted to "admin" role only.
 */
export async function updateCategory(
  originalSlug: string,
  data: {
    name?: string;
    displayName: string;
    newSlug?: string;
    description: string;
    image: string;
  }
) {
  try {
    const session = await verifySession();

    // Enforce role authorization: only admin can update category
    if (session.role !== "admin") {
      return {
        success: false,
        error: "Unauthorized: Only administrators have permission to update categories.",
      };
    }

    const displayName = data.displayName?.trim();
    if (!displayName || displayName.length < 2) {
      return {
        success: false,
        error: "Display name must be at least 2 characters long.",
      };
    }

    const description = data.description?.trim();
    if (!description) {
      return {
        success: false,
        error: "Description is required.",
      };
    }

    const image = data.image?.trim();
    if (!image) {
      return {
        success: false,
        error: "Image URL is required.",
      };
    }

    const newSlug = data.newSlug
      ? generateSlug(data.newSlug)
      : originalSlug;

    await connectToDatabase();

    const existing = await CategoryModel.findOne({ slug: originalSlug });
    if (!existing) {
      return {
        success: false,
        error: `Category "${originalSlug}" not found.`,
      };
    }

    // If slug is changing, verify the new slug is not already used
    if (newSlug !== originalSlug) {
      const duplicate = await CategoryModel.findOne({ slug: newSlug });
      if (duplicate) {
        return {
          success: false,
          error: `A category with slug "${newSlug}" already exists.`,
        };
      }
    }

    const previousImage = existing.image;

    const name = (data.name?.trim() || newSlug).toLowerCase();

    const updated = await CategoryModel.findOneAndUpdate(
      { slug: originalSlug },
      {
        name,
        displayName,
        slug: newSlug,
        description,
        image,
      },
      { returnDocument: "after" }
    );

    if (!updated) {
      return {
        success: false,
        error: `Category "${originalSlug}" not found.`,
      };
    }

    // If image has changed, remove previous image from Vercel Blob
    if (previousImage && previousImage !== image) {
      await deleteBlobByUrl(previousImage);
    }

    revalidatePath("/admin/categories");
    revalidatePath("/category");
    revalidatePath("/");

    return {
      success: true,
      category: {
        name: updated.name,
        displayName: updated.displayName,
        slug: updated.slug,
        description: updated.description,
        image: updated.image,
      },
      message: `Category "${updated.displayName}" updated successfully.`,
    };
  } catch (error) {
    console.error("Update category error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while updating the category.",
    };
  }
}

/**
 * Server action to delete an existing category.
 * Strictly restricted to "admin" role only.
 */
export async function deleteCategory(slug: string) {
  try {
    const session = await verifySession();

    // Enforce role authorization: only admin can delete category
    if (session.role !== "admin") {
      return {
        success: false,
        error: "Unauthorized: Only administrators have permission to delete categories.",
      };
    }

    await connectToDatabase();

    const deleted = await CategoryModel.findOneAndDelete({ slug });

    if (!deleted) {
      return {
        success: false,
        error: `Category "${slug}" not found.`,
      };
    }

    // Delete image from Vercel Blob if stored there
    if (deleted.image) {
      await deleteBlobByUrl(deleted.image);
    }

    revalidatePath("/admin/categories");
    revalidatePath("/category");
    revalidatePath("/");

    return {
      success: true,
      message: `Category "${deleted.displayName}" removed successfully.`,
    };
  } catch (error) {
    console.error("Delete category error:", error);
    return {
      success: false,
      error: "An unexpected error occurred while deleting the category.",
    };
  }
}
