export type Ingredient = {
  name: string;
  amount?: string;
  quantity?: string;
  group?: string;
  optional?: boolean;
  affiliateUrl?: string;
  affiliateLink?: string;
};

export type Instruction = {
  step: number;
  title?: string;
  text: string;
};

export type RecipeAuthor = {
  id?: string;
  name: string;
  role: string;
  email?: string;
  avatar: string;
};

export type Recipe = {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  rating: number;
  ratingCount?: number;
  prepTime: string;
  cookTime: string;
  totalTime?: string;
  servings: number;
  excerpt: string;
  intro?: string;
  isFeatured?: boolean;
  ingredients?: Ingredient[];
  instructions?: Instruction[];
  notes?: string[];
  tags?: string[];
  author?: RecipeAuthor;
  publishedDate?: string;
  status?: "draft" | "published";
};

export type Category = {
  name: string;
  displayName: string;
  slug: string;
  image: string;
  description: string;
  count?: number;
};

// Mock data removed — all content is stored and retrieved from MongoDB database
export const categories: Category[] = [];
export const allRecipes: Recipe[] = [];
export const featuredRecipes: Recipe[] = [];
export const recentRecipes: Recipe[] = [];

export function getAllRecipes(): Recipe[] {
  return [];
}

export function getRecipeBySlug(slug: string, recipes: Recipe[] = []): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

export function getRelatedRecipes(
  currentSlug: string,
  category: string,
  limit: number = 3,
  recipes: Recipe[] = []
): Recipe[] {
  const sameCategory = recipes.filter(
    (r) =>
      r.slug !== currentSlug &&
      r.category.toLowerCase() === category.toLowerCase()
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherRecipes = recipes.filter(
    (r) =>
      r.slug !== currentSlug &&
      r.category.toLowerCase() !== category.toLowerCase()
  );

  return [...sameCategory, ...otherRecipes].slice(0, limit);
}

export function getCategoryBySlug(
  slug: string,
  categoryList: Category[] = []
): Category | undefined {
  const target = slug.toLowerCase();
  return categoryList.find(
    (cat) =>
      cat.slug.toLowerCase() === target ||
      ((target === "curries" || target === "chicken-curries") && cat.slug === "dinner")
  );
}

export function getRecipesByCategory(
  categorySlug: string,
  recipes: Recipe[] = []
): Recipe[] {
  const target = categorySlug.toLowerCase();
  return recipes.filter((recipe) => {
    const rCat = recipe.category.toLowerCase();
    if (rCat === target) return true;
    if (
      (target === "dinner" || target === "curries" || target === "chicken-curries" || target === "seafood" || target === "meat") &&
      (rCat === "dinner" ||
        rCat === "entrees" ||
        rCat === "seafood" ||
        rCat === "meat" ||
        rCat.includes("curry") ||
        rCat.includes("curries"))
    ) {
      return true;
    }
    if (target === "desserts" && (rCat === "desserts" || rCat === "sweets")) return true;
    if (target === "breakfast" && rCat === "breakfast") return true;
    if (target === "appetizers" && rCat === "appetizers") return true;
    if (target === "sides" && rCat === "sides") return true;
    if (
      target === "entrees" &&
      (rCat === "entrees" || rCat === "dinner" || rCat === "seafood" || rCat === "meat" || rCat.includes("curry"))
    ) {
      return true;
    }
    if (target === "lunch" && (rCat === "lunch" || rCat === "entrees")) return true;
    if (target === "drinks" && rCat === "drinks") return true;
    return false;
  });
}

export function getCategoryCount(categorySlug: string, recipes: Recipe[] = []): number {
  return getRecipesByCategory(categorySlug, recipes).length;
}
