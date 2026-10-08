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
    image: "/images/recipes/sri-lankan-string-hoppers.jpg",
    description:
      "Start your morning with fresh coconut milk rice, crispy lacy hoppers, flatbreads, and fiery lunu miris.",
    count: 1,
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

export const stringHoppers: Recipe = {
  id: "sri-lankan-string-hoppers",
  slug: "sri-lankan-string-hoppers",
  title: "Sri Lankan String Hoppers",
  category: "Breakfast",
  image: "/images/recipes/sri-lankan-string-hoppers.jpg",
  rating: 0,
  ratingCount: 0,
  prepTime: "25 minutes",
  cookTime: "10 minutes per batch",
  servings: 4,
  isFeatured: true,

  excerpt:
    "Soft, steamed rice flour noodles made into small nests. Enjoy this Sri Lankan breakfast with coconut milk and your favourite curry.",

  intro:
    "String hoppers, also called idiyappam, are a popular Sri Lankan breakfast. They are made by pressing rice flour dough into thin strands and steaming them in small nests. Serve them warm with coconut milk, potato curry or a fried egg.",

  ingredients: [
    {
      name: "Fine rice flour suitable for string hoppers",
      quantity: "2 cups",
    },
    {
      name: "Hot water",
      quantity: "About 1 cup, plus more as needed",
    },
    {
      name: "Salt",
      quantity: "1 tsp, or to taste",
    },
    {
      name: "Virgin coconut oil",
      quantity: "2 tbsp",
    },
    {
      name: "Full-fat coconut milk, for serving",
      quantity: "1 cup",
    },
  ],

  instructions: [
    {
      step: 1,
      text:
        "Mix the rice flour and salt in a large heatproof bowl. If you are using packaged string hopper flour, follow its instructions for the water temperature.",
    },
    {
      step: 2,
      text:
        "Bring the water to a boil. Slowly add it to the flour while mixing with a wooden spoon. Start with a little water and add more until the mixture comes together into a soft dough.",
    },
    {
      step: 3,
      text:
        "Add the coconut oil and mix well. Let the dough cool until you can handle it comfortably, then knead until smooth and soft. Add a little more hot water if it feels dry or cracks.",
    },
    {
      step: 4,
      text:
        "Cover the dough with a damp kitchen towel while you prepare the steamer. Keep it covered between batches so it does not dry out.",
    },
    {
      step: 5,
      text:
        "Add water to the steamer, keeping the water below the steaming trays. Bring it to a boil. Lightly grease the string hopper mats or plates.",
    },
    {
      step: 6,
      text:
        "Put some dough into a string hopper press. Press it onto the mats in a circular motion to make small, loosely layered nests about 4 inches wide.",
    },
    {
      step: 7,
      text:
        "Place the mats in the steamer and cover with the lid. Steam for about 8–10 minutes, until the strands are set and no longer taste raw. The time may vary depending on the thickness of the nests.",
    },
    {
      step: 8,
      text:
        "Carefully remove the mats using oven mitts. Let the string hoppers cool slightly, then gently lift them onto a serving plate. Repeat with the remaining dough.",
    },
    {
      step: 9,
      text:
        "Warm the coconut milk gently in a small saucepan, stirring occasionally.",
    },
    {
      step: 10,
      text:
        "Serve the string hoppers warm, with the coconut milk on the side or lightly spooned over them. Add potato curry or a fried egg if you like.",
    },
  ],

  notes: [
    "Use a string hopper press with a fine-hole disc to make thin, even strands.",
    "The amount of water depends on the rice flour. Add it gradually instead of pouring it all in at once.",
    "Let the hot dough cool enough to handle before kneading.",
    "Keep the nests loosely layered so the steam can pass through them.",
    "Preparation time and servings are estimates. Total cooking time depends on how many batches you make.",
    "For a gluten-free meal, check that the flour and side dishes are also gluten-free.",
  ],

  tags: [
    "Sri Lankan string hoppers",
    "idiyappam",
    "Sri Lankan breakfast",
    "rice flour",
    "steamed noodles",
    "Sri Lankan recipes",
  ],
};

export const allRecipes: Recipe[] = [chickenCurry, stringHoppers];

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
