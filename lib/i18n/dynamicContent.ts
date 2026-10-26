import type { Recipe, Category } from "@/lib/data";
import type { Language } from "./types";
import {
  translateCulinaryTitle,
  translateTime,
  translateIngredients,
  translateInstructions,
} from "./culinaryTranslator";

/**
 * Standard system category taxonomy translations (English to Italian).
 * Translates standard system taxonomy names while preserving database descriptions.
 */
export const categoryTranslations: Record<
  string,
  { name: string; displayName: string }
> = {
  breakfast: {
    name: "colazione",
    displayName: "Colazione",
  },
  dinner: {
    name: "curry e cene",
    displayName: "Curry e Cene",
  },
  desserts: {
    name: "dolci e dessert",
    displayName: "Dolci e Dessert",
  },
  appetizers: {
    name: "antipasti e snack",
    displayName: "Antipasti e Snack",
  },
  entrees: {
    name: "secondi piatti",
    displayName: "Secondi Piatti",
  },
  sides: {
    name: "contorni e sambol",
    displayName: "Contorni e Sambol",
  },
  lunch: {
    name: "piatti per il pranzo",
    displayName: "Piatti per il Pranzo",
  },
  drinks: {
    name: "bevande dell'isola",
    displayName: "Bevande dell'Isola",
  },
  "chicken curries": {
    name: "curry di pollo",
    displayName: "Curry di Pollo",
  },
  seafood: {
    name: "frutti di mare",
    displayName: "Frutti di Mare",
  },
  meat: {
    name: "carne",
    displayName: "Carne",
  },
};

/**
 * Localize a single recipe object dynamically for the requested language.
 * 1. Checks if MongoDB document contains a dedicated `translations.it` field.
 * 2. Falls back to dynamic culinary translation for untranslated fields.
 */
export function localizeRecipe(recipe: Recipe, language: Language): Recipe {
  if (language !== "it" || !recipe) {
    return recipe;
  }

  const catKey = recipe.category?.toLowerCase().trim() || "";
  const localizedCat = categoryTranslations[catKey]?.displayName || recipe.category;

  // 1. If recipe has an Italian translation stored in the database, use it
  const dbTranslation = recipe.translations?.it;
  if (dbTranslation) {
    return {
      ...recipe,
      title: dbTranslation.title || translateCulinaryTitle(recipe.title),
      category: dbTranslation.category || localizedCat,
      prepTime: dbTranslation.prepTime || translateTime(recipe.prepTime) || recipe.prepTime,
      cookTime: dbTranslation.cookTime || translateTime(recipe.cookTime) || recipe.cookTime,
      totalTime: dbTranslation.totalTime || translateTime(recipe.totalTime) || recipe.totalTime,
      excerpt: dbTranslation.excerpt || recipe.excerpt,
      intro: dbTranslation.intro || recipe.intro,
      ingredients:
        dbTranslation.ingredients && dbTranslation.ingredients.length > 0
          ? dbTranslation.ingredients
          : translateIngredients(recipe.ingredients) || recipe.ingredients,
      instructions:
        dbTranslation.instructions && dbTranslation.instructions.length > 0
          ? dbTranslation.instructions
          : translateInstructions(recipe.instructions) || recipe.instructions,
      notes:
        dbTranslation.notes && dbTranslation.notes.length > 0
          ? dbTranslation.notes
          : recipe.notes,
    };
  }

  // 2. Dynamic culinary translation fallback for database recipes without manual translations
  return {
    ...recipe,
    title: translateCulinaryTitle(recipe.title),
    category: localizedCat,
    prepTime: translateTime(recipe.prepTime) || recipe.prepTime,
    cookTime: translateTime(recipe.cookTime) || recipe.cookTime,
    totalTime: translateTime(recipe.totalTime) || recipe.totalTime,
    ingredients: translateIngredients(recipe.ingredients) || recipe.ingredients,
    instructions: translateInstructions(recipe.instructions) || recipe.instructions,
    notes: recipe.notes,
  };
}

/**
 * Localize a list of recipes dynamically
 */
export function localizeRecipes(recipes: Recipe[], language: Language): Recipe[] {
  if (language !== "it" || !recipes) return recipes;
  return recipes.map((r) => localizeRecipe(r, language));
}

/**
 * Localize a category object dynamically
 * Translates standard taxonomy name/displayName while preserving database descriptions.
 */
export function localizeCategory(category: Category, language: Language): Category {
  if (language !== "it" || !category) return category;
  const key = category.slug?.toLowerCase().trim() || category.name?.toLowerCase().trim() || "";
  const tr = categoryTranslations[key];
  if (!tr) return category;

  return {
    ...category,
    displayName: tr.displayName || category.displayName,
    name: tr.name || category.name,
  };
}

/**
 * Localize a list of categories dynamically
 */
export function localizeCategories(categories: Category[], language: Language): Category[] {
  if (language !== "it" || !categories) return categories;
  return categories.map((c) => localizeCategory(c, language));
}
