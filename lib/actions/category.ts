"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import { CategoryModel } from "@/lib/models/Category";
import { verifySession } from "@/lib/dal";
import { categories as defaultCategories, type Category } from "@/lib/data";

/**
 * Fetch all categories from MongoDB.
 * If collection is empty on initial setup, seeds from default categories.
 */
export async function getCategories(): Promise<Category[]> {
  try {
    await connectToDatabase();
    let docs = await CategoryModel.find().lean().sort({ createdAt: 1 });

    // Seed defaults if empty
    if (!docs || docs.length === 0) {
      await CategoryModel.insertMany(
        defaultCategories.map((c) => ({
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
    console.error("Failed to load categories from database, falling back to static data:", error);
    return defaultCategories;
  }
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

    const slug = (
      data.slug?.trim() ||
      displayName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")
    ).toLowerCase();

    const name = (data.name?.trim() || slug).toLowerCase();

    await connectToDatabase();

    const existing = await CategoryModel.findOne({ slug });
    if (existing) {
      return {
        success: false,
        error: `A category with slug "${slug}" already exists. Please choose a different title or slug.`,
      };
    }

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
      ? data.newSlug.trim().toLowerCase()
      : originalSlug;

    await connectToDatabase();

    // If slug is changing, verify the new slug is not already used
    if (newSlug !== originalSlug) {
      const existing = await CategoryModel.findOne({ slug: newSlug });
      if (existing) {
        return {
          success: false,
          error: `A category with slug "${newSlug}" already exists.`,
        };
      }
    }

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
      { new: true }
    );

    if (!updated) {
      return {
        success: false,
        error: `Category "${originalSlug}" not found.`,
      };
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
