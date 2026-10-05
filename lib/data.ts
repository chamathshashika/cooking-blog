export type Ingredient = {
  name: string;
  amount?: string;
  quantity?: string;
};

export type Instruction = {
  step: number;
  text: string;
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
  author?: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedDate?: string;
};

export type Category = {
  name: string;
  displayName: string;
  slug: string;
  image: string;
  description: string;
  count?: number;
};

export const categories: Category[] = [
  {
    name: "breakfast",
    displayName: "Breakfast Dishes",
    slug: "breakfast",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=400&q=80",
    description:
      "Start your morning with fresh coconut milk rice, crispy lacy hoppers, flatbreads, and fiery lunu miris.",
    count: 0,
  },
  {
    name: "curries & dinners",
    displayName: "Curries & Dinners",
    slug: "dinner",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80",
    description:
      "Intensely aromatic northern crab curries, sizzling street kottu roti, and richly spiced evening dishes.",
    count: 1,
  },
  {
    name: "sweets & treats",
    displayName: "Sweets & Treats",
    slug: "desserts",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=400&q=80",
    description:
      "Cardamom-infused steamed watalappam, dark kithul palm jaggery custards, and celebratory festival sweets.",
    count: 0,
  },
  {
    name: "appetizers",
    displayName: "Appetizers & Short Eats",
    slug: "appetizers",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=400&q=80",
    description:
      "Iconic Sri Lankan bakery short eats: golden crumbed potato rolls, spiced patties, and teatime snacks.",
    count: 0,
  },
  {
    name: "main entrees",
    displayName: "Main Entrees",
    slug: "entrees",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80",
    description:
      "Deeply toasted black pork curry, sour southern fish ambul thiyal, and hearty family centerpieces.",
    count: 0,
  },
  {
    name: "sides & sambols",
    displayName: "Sides & Sambols",
    slug: "sides",
    image:
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=400&q=80",
    description:
      "Velvety tempered red lentil dhal, sweet seeni sambols, and fresh grated coconut condiments.",
    count: 0,
  },
  {
    name: "lunch platters",
    displayName: "Lunch Platters",
    slug: "lunch",
    image:
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=400&q=80",
    description:
      "Classic multi-dish village rice and curry spreads bundled in fresh steamed banana leaves.",
    count: 0,
  },
  {
    name: "island drinks",
    displayName: "Island Drinks",
    slug: "drinks",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80",
    description:
      "Fresh golden king coconut waters, spiced Ceylon milk teas, and soothing herbal infusions.",
    count: 0,
  },
];

export const chickenCurry: Recipe = {
  id: "sri-lankan-chicken-curry",
  slug: "traditional-sri-lankan-chicken-curry",
  title: "Traditional Sri Lankan Chicken Curry",
  category: "Chicken Curries",
  image: "/images/recipes/sri-lankan-chicken-curry.jpg",
  rating: 0,
  ratingCount: 0,
  prepTime: "40 minutes",
  cookTime: "30 minutes",
  totalTime: "70 minutes",
  servings: 6,
  isFeatured: true,

  excerpt:
    "A rich Sri Lankan chicken curry made with aromatic spices, curry leaves, pandan and coconut milk. Serve with rice, bread or string hoppers.",

  intro:
    "This traditional-style Sri Lankan chicken curry brings together warm spices, fragrant herbs and a rich coconut gravy. The chicken is marinated before cooking, then simmered with cinnamon, cardamom, cloves and lemongrass. A final spoonful of roasted curry powder adds depth to the sauce.",

  ingredients: [
    // For the marinade
    {
      name: "Chicken, cut into medium-sized pieces",
      quantity: "1 kg",
    },
    {
      name: "Sri Lankan curry powder",
      quantity: "2 tbsp",
    },
    {
      name: "Salt",
      quantity: "2 1/2 tsp, or less to taste",
    },
    {
      name: "Chilli powder",
      quantity: "2 tbsp",
    },
    {
      name: "Turmeric powder",
      quantity: "1/2 tsp",
    },
    {
      name: "Ground black pepper",
      quantity: "1 tbsp",
    },
    {
      name: "Vinegar",
      quantity: "1 tbsp",
    },
    {
      name: "Ground coriander",
      quantity: "1 tsp",
    },

    // For cooking
    {
      name: "Coconut oil or vegetable oil",
      quantity: "2 tbsp",
    },
    {
      name: "Mustard seeds",
      quantity: "1 tsp",
    },
    {
      name: "Curry leaves",
      quantity: "1 sprig",
    },
    {
      name: "Pandan leaf (rampe)",
      quantity: "4 small strips",
    },
    {
      name: "Cinnamon stick",
      quantity: "1/2 stick",
    },
    {
      name: "Cloves",
      quantity: "4",
    },
    {
      name: "Cardamom pods, lightly crushed",
      quantity: "4",
    },
    {
      name: "Lemongrass, tender lower section lightly bruised",
      quantity: "1 stalk",
    },
    {
      name: "Cumin seeds",
      quantity: "1 tsp",
    },
    {
      name: "Garlic, finely chopped",
      quantity: "8 cloves",
    },
    {
      name: "Onion, chopped",
      quantity: "1 medium",
    },
    {
      name: "Ginger, finely chopped",
      quantity: "1 tsp",
    },
    {
      name: "Green chilli, slit lengthways",
      quantity: "1",
    },
    {
      name: "Dried red chillies",
      quantity: "3",
    },
    {
      name: "Sri Lankan black roasted curry powder",
      quantity: "1 tbsp",
    },
    {
      name: "Coconut milk",
      quantity: "2 1/2 cups",
    },
  ],

  instructions: [
    {
      step: 1,
      text:
        "Place the chicken in a bowl. Add curry powder, salt, chilli powder, turmeric, black pepper, vinegar and ground coriander. Mix thoroughly to coat every piece. Cover and refrigerate for 30 minutes.",
    },
    {
      step: 2,
      text:
        "Heat the oil in a large saucepan over medium heat. Add the mustard seeds and let them begin to pop. Add curry leaves, pandan, lemongrass, cardamom, cloves, cumin, green chilli, dried chillies and cinnamon. Stir for 1–2 minutes until fragrant, lowering the heat if the spices start to darken quickly.",
    },
    {
      step: 3,
      text:
        "Add the garlic, ginger and onion. Cook for about 2 minutes, stirring frequently, until the onion begins to soften. Avoid burning the garlic or spices.",
    },
    {
      step: 4,
      text:
        "Add the chicken and all the marinade. Stir well to combine with the aromatics. Cook uncovered for about 6 minutes, turning the pieces occasionally.",
    },
    {
      step: 5,
      text:
        "Cover and cook over medium-low heat for about 10 minutes, stirring occasionally. If the pan becomes dry, add a small splash of water to prevent sticking.",
    },
    {
      step: 6,
      text:
        "Pour in the coconut milk and stir gently. Bring to a gentle simmer, then cook partially covered for about 10 minutes, or longer until the chicken is fully cooked and tender. Cooking time depends on the size of the pieces.",
    },
    {
      step: 7,
      text:
        "Stir in the black roasted curry powder and simmer for another 1–2 minutes. Taste the gravy and adjust the salt. If the sauce is too thin, simmer uncovered until it reaches your preferred consistency.",
    },
    {
      step: 8,
      text:
        "Remove from the heat. Discard the lemongrass, pandan and large whole spices before serving with rice, bread or string hoppers.",
    },
  ],

  notes: [
    "This is a spicy curry. Reduce the chilli powder, black pepper and dried chillies for a milder version.",
    "Start with less salt if preferred, then adjust the finished gravy.",
    "Black curry powder means dark-roasted Sri Lankan curry powder.",
    "The pandan quantity is interpreted as four small strips, rather than four whole leaves.",
    "Prep time includes 30 minutes of refrigerated marinating.",
    "Cooking time and servings are estimates.",
  ],

  tags: [
    "Sri Lankan chicken curry",
    "traditional chicken curry",
    "kukul mas curry",
    "coconut milk curry",
    "Sri Lankan recipes",
    "rice and curry",
  ],
};

export const allRecipes: Recipe[] = [chickenCurry];

export const featuredRecipes =
  allRecipes.filter((r) => r.isFeatured).length > 0
    ? allRecipes.filter((r) => r.isFeatured)
    : allRecipes.slice(0, 4);

export const recentRecipes = allRecipes.slice(0, 6);

export function getAllRecipes(): Recipe[] {
  return allRecipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return allRecipes.find((recipe) => recipe.slug === slug);
}

export function getRelatedRecipes(
  currentSlug: string,
  category: string,
  limit: number = 3,
): Recipe[] {
  const sameCategory = allRecipes.filter(
    (r) =>
      r.slug !== currentSlug &&
      r.category.toLowerCase() === category.toLowerCase(),
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherRecipes = allRecipes.filter(
    (r) =>
      r.slug !== currentSlug &&
      r.category.toLowerCase() !== category.toLowerCase(),
  );

  return [...sameCategory, ...otherRecipes].slice(0, limit);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const target = slug.toLowerCase();
  return categories.find(
    (cat) =>
      cat.slug.toLowerCase() === target ||
      ((target === "curries" || target === "chicken-curries") && cat.slug === "dinner")
  );
}

export function getRecipesByCategory(categorySlug: string): Recipe[] {
  const target = categorySlug.toLowerCase();
  return allRecipes.filter((recipe) => {
    const rCat = recipe.category.toLowerCase();
    if (rCat === target) return true;
    if (
      (target === "dinner" || target === "curries" || target === "chicken-curries") &&
      (rCat === "dinner" ||
        rCat === "entrees" ||
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
      (rCat === "entrees" || rCat === "dinner" || rCat.includes("curry"))
    ) {
      return true;
    }
    if (target === "lunch" && (rCat === "lunch" || rCat === "entrees")) return true;
    if (target === "drinks" && rCat === "drinks") return true;
    return false;
  });
}

export function getCategoryCount(categorySlug: string): number {
  return getRecipesByCategory(categorySlug).length;
}
