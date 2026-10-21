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

export const prawnCurry: Recipe = {
  id: "prawn-curry",
  slug: "sri-lankan-prawn-curry",
  title: "Prawn Curry",
  category: "Seafood",
  image: "/images/recipes/prawn-curry.jpg", // TODO: replace with your real image path
  rating: 0, // TODO: set real rating
  ratingCount: 0, // TODO: set real count
  prepTime: "12 min",
  cookTime: "18 min",
  totalTime: "30 min",
  servings: 4,
  excerpt:
    "A rich, creamy Sri Lankan prawn curry with fragrant spices. Ready in 30 minutes and perfect with steamed rice or bread.",
  intro:
    "This prawn curry is a real treat. It has a bright colour, a wonderful smell and a deep, joyful taste. Sri Lankan spices bring it all together, and it goes beautifully with steamed rice or bread. It is easy to make and ready to eat in 30 minutes.",
  isFeatured: true,
  ingredients: [
    // To season the prawns
    { group: "To season the prawns", quantity: "500 g", name: "prawns, cleaned and washed" },
    { group: "To season the prawns", quantity: "1 tsp", name: "salt" },
    { group: "To season the prawns", quantity: "1/2 tsp", name: "turmeric powder" },
    { group: "To season the prawns", quantity: "1 tsp", name: "black pepper powder" },

    // For the curry
    { group: "For the curry", quantity: "1 tbsp", name: "oil" },
    { group: "For the curry", quantity: "8", name: "curry leaves" },
    { group: "For the curry", quantity: "4", name: "pandan leaves" },
    { group: "For the curry", quantity: "1/2", name: "cinnamon stick" },
    { group: "For the curry", quantity: "1 tsp", name: "fenugreek seeds" },
    { group: "For the curry", quantity: "4", name: "cardamom pods" },
    { group: "For the curry", quantity: "3", name: "dried chillies" },
    { group: "For the curry", quantity: "1", name: "onion, chopped" },
    { group: "For the curry", quantity: "4 cloves", name: "garlic, chopped" },
    { group: "For the curry", quantity: "1 tsp", name: "ginger" },
    { group: "For the curry", quantity: "1 tsp", name: "curry powder" },
    { group: "For the curry", quantity: "1 1/2 tsp", name: "chilli powder" },
    { group: "For the curry", quantity: "1", name: "tomato, chopped" },
    { group: "For the curry", quantity: "1", name: "green chilli" },
    { group: "For the curry", quantity: "1", name: "red chilli", optional: true },
    { group: "For the curry", quantity: "1 1/2 cups", name: "coconut milk" },
    { group: "For the curry", quantity: "1 tsp", name: "salt, or to taste" },
    { group: "To finish", quantity: "1 tsp", name: "lemon juice" },
    { group: "To finish", quantity: "1 tbsp", name: "coriander leaves, chopped" },
  ],
  instructions: [
    {
      step: 1,
      title: "Season the prawns",
      text: "Clean the prawns well. Mix them with the turmeric, salt and black pepper. Set them aside while you make the curry.",
    },
    {
      step: 2,
      title: "Fry the whole spices",
      text: "Heat the oil in a saucepan over medium heat. When the oil is hot, add the curry leaves, pandan leaves, cinnamon stick, cardamom pods, dried chillies and fenugreek seeds. Stir briefly. Add the garlic, onion and ginger, and saute for about 2 minutes.",
    },
    {
      step: 3,
      title: "Add the spice powders and tomato",
      text: "Add the curry powder and chilli powder. Mix well and fry for about 2 minutes. Do not let the spices burn. Add the tomato and cook for about 2 minutes, stirring now and then.",
    },
    {
      step: 4,
      title: "Cook the prawns in coconut milk",
      text: "Add the prawns and fry for about 3 minutes, turning them now and then. Stir in the green and red chillies. Pour in the coconut milk and cook for about 7 minutes, stirring all the time. Add salt to taste.",
    },
    {
      step: 5,
      title: "Finish and serve",
      text: "Turn off the heat. Add the lemon juice and coriander leaves, and stir well. Serve hot with rice or bread.",
    },
  ],
  notes: [
    "Clean the prawns properly before you season them.",
    "Stir the spice powders constantly so they do not burn.",
    "The red chilli is optional. Leave it out for a milder curry.",
  ],
  tags: ["prawn", "seafood", "sri lankan", "curry", "coconut milk", "30 minutes"],
  publishedDate: "2026-10-12",
};

export const muttonCurry: Recipe = {
  id: "mutton-curry",
  slug: "sri-lankan-mutton-curry",
  title: "Sri Lankan Mutton Curry",
  category: "Meat",
  image: "/images/recipes/mutton-curry.jpg", // TODO: replace with your real image path
  rating: 0, // TODO: set real rating
  ratingCount: 0, // TODO: set real count
  prepTime: "15 min",
  cookTime: "33 min",
  totalTime: "48 min",
  servings: 6,
  excerpt:
    "A hearty, comforting Sri Lankan mutton curry, cooked down until thick and rich. Serve it with steamed rice or toasted garlic bread.",
  intro:
    "This is a proper hearty and comforting curry that suits any occasion. Sri Lankan mutton curry comes in a few different versions, and this reduced, thick version is my favourite. It goes nicely with steamed rice and is also brilliant with toasted garlic bread.",
  isFeatured: true,
  ingredients: [
    // To marinate the mutton
    { group: "To marinate the mutton", quantity: "900 g", name: "mutton, cut into cubes" },
    { group: "To marinate the mutton", quantity: "3 tsp", name: "salt" },
    { group: "To marinate the mutton", quantity: "2 tsp", name: "black pepper, crushed" },
    { group: "To marinate the mutton", quantity: "1 tsp", name: "turmeric powder" },
    { group: "To marinate the mutton", quantity: "2 tbsp", name: "chilli powder" },
    { group: "To marinate the mutton", quantity: "2 tbsp", name: "curry powder" },
    { group: "To marinate the mutton", quantity: "2 tbsp", name: "vinegar" },

    // For the curry
    { group: "For the curry", quantity: "3 tbsp", name: "oil" },
    { group: "For the curry", quantity: "1 sprig", name: "curry leaves" },
    { group: "For the curry", quantity: "1 tsp", name: "cumin seeds" },
    { group: "For the curry", quantity: "1 tsp", name: "mustard seeds" },
    { group: "For the curry", quantity: "1 tsp", name: "coriander seeds" },
    { group: "For the curry", quantity: "1 small", name: "cinnamon stick" },
    { group: "For the curry", quantity: "5", name: "small cloves" },
    { group: "For the curry", quantity: "4", name: "small cardamom pods" },
    { group: "For the curry", quantity: "2 tbsp", name: "garlic, chopped" },
    { group: "For the curry", quantity: "1 tbsp", name: "ginger, chopped" },
    { group: "For the curry", quantity: "2 small", name: "onions, chopped" },
    { group: "For the curry", quantity: "2 medium", name: "green chillies, sliced" },
    { group: "For the curry", quantity: "1 small stick", name: "lemongrass" },
    { group: "For the curry", quantity: "1 1/2 cups", name: "coconut milk" },
    { group: "To finish", quantity: "to taste", name: "extra salt", optional: true },
  ],
  instructions: [
    {
      step: 1,
      title: "Marinate the mutton",
      text: "Put the mutton in a large mixing bowl. Add the salt, black pepper, turmeric, chilli powder, curry powder and vinegar, and mix everything well. Let the mutton marinate for about 15 minutes.",
    },
    {
      step: 2,
      title: "Fry the spices and aromatics",
      text: "Heat the oil in a saucepan over medium heat for about 2 minutes. When the oil is hot, add the curry leaves, cumin seeds, mustard seeds, coriander seeds, cinnamon stick, cloves, cardamom pods, garlic, ginger, onion and green chilli. Fry for about 3 minutes.",
    },
    {
      step: 3,
      title: "Brown the mutton",
      text: "Add the marinated mutton to the pan and mix well. Fry for about 3 minutes, then add the lemongrass and stir gently. Fry for 10 more minutes, stirring regularly.",
    },
    {
      step: 4,
      title: "Simmer in coconut milk",
      text: "Pour in the coconut milk and stir gently. Keep cooking for 15 more minutes, stirring regularly, until the curry thickens.",
    },
    {
      step: 5,
      title: "Season and serve",
      text: "When the curry is thick enough, turn off the heat. Add more salt if you like. Serve hot with rice or bread.",
    },
  ],
  notes: [
    "Cut the mutton into even cubes so the pieces cook at the same speed.",
    "Stir regularly while the curry thickens so it does not stick to the pan.",
    "This is a reduced, thick curry. Add a splash of water if you prefer more gravy.",
  ],
  tags: ["mutton", "meat", "sri lankan", "curry", "coconut milk", "comfort food"],
  publishedDate: "2026-10-12",
};

export const allRecipes: Recipe[] = [chickenCurry, stringHoppers, prawnCurry, muttonCurry];

export const featuredRecipes: Recipe[] = (() => {
  const explicitFeatured = allRecipes.filter((r) => r.isFeatured);
  if (explicitFeatured.length >= 4) {
    return explicitFeatured.slice(0, 4);
  }
  const remaining = allRecipes.filter((r) => !explicitFeatured.includes(r));
  return [...explicitFeatured, ...remaining].slice(0, 4);
})();

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

export function getCategoryCount(categorySlug: string): number {
  return getRecipesByCategory(categorySlug).length;
}
