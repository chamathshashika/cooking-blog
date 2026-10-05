export type Ingredient = {
  name: string;
  amount: string;
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
  slug: string;
  image: string;
  count?: number;
};

export const categories: Category[] = [
  {
    name: "breakfast",
    slug: "breakfast",
    image:
      "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=300&q=80",
    count: 14,
  },
  {
    name: "lunch",
    slug: "lunch",
    image:
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=300&q=80",
    count: 22,
  },
  {
    name: "dinner",
    slug: "dinner",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=300&q=80",
    count: 31,
  },
  {
    name: "appetizers",
    slug: "appetizers",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=300&q=80",
    count: 12,
  },
  {
    name: "entrees",
    slug: "entrees",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=300&q=80",
    count: 18,
  },
  {
    name: "sides",
    slug: "sides",
    image:
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=300&q=80",
    count: 16,
  },
  {
    name: "desserts",
    slug: "desserts",
    image:
      "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80",
    count: 9,
  },
  {
    name: "drinks",
    slug: "drinks",
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80",
    count: 7,
  },
];

export const allRecipes: Recipe[] = [
  {
    id: "f1",
    slug: "traditional-kiribath",
    title: "Traditional Kiribath with Lunu Miris",
    category: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    ratingCount: 38,
    prepTime: "10 mins",
    cookTime: "30 mins",
    totalTime: "40 mins",
    servings: 4,
    excerpt:
      "A fragrant milk rice dish crafted for special celebrations, paired with fiery chili-onion sambol.",
    intro:
      "Kiribath (milk rice) is the crowning jewel of Sri Lankan hospitality, served to mark auspicious beginnings, New Year festivals, and peaceful Sunday mornings. Cooked until creamy and cut into classic diamond shapes, it is traditionally enjoyed alongside spicy, tart lunu miris.",
    isFeatured: true,
    publishedDate: "2026-03-12",
    author: {
      name: "Chamath Perera",
      role: "Culinary Heritage Host",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["breakfast", "rice", "coconut", "vegan", "festive"],
    ingredients: [
      { amount: "2 cups", name: "Short grain white rice or red raw rice" },
      { amount: "3 cups", name: "Water (for initial cooking)" },
      { amount: "2 cups", name: "Thick coconut milk (first press)" },
      { amount: "1 tsp", name: "Sea salt (or to taste)" },
      { amount: "1 small", name: "Red onion, finely sliced (for lunu miris)" },
      { amount: "2 tbsp", name: "Crushed red chili flakes & powder" },
      { amount: "1 tbsp", name: "Maldive fish flakes (optional)" },
      { amount: "1 tbsp", name: "Fresh lime juice" },
      { amount: "1/2 tsp", name: "Salt (for lunu miris)" },
    ],
    instructions: [
      {
        step: 1,
        text: "Wash the rice thoroughly in cold water until the water runs clear. Drain well.",
      },
      {
        step: 2,
        text: "Place the rice and 3 cups of water in a heavy-bottomed pot. Bring to a boil over medium-high heat, then reduce heat to low, cover, and simmer until the water is completely absorbed and the rice is tender (about 15 minutes).",
      },
      {
        step: 3,
        text: "Whisk the sea salt into the thick coconut milk. Pour the milk over the cooked hot rice and stir gently to combine.",
      },
      {
        step: 4,
        text: "Cook over low heat uncovered, stirring occasionally with a flat wooden spoon, until the mixture becomes creamy, rich, and sticky (about 10–12 minutes).",
      },
      {
        step: 5,
        text: "Transfer the warm rice onto a flat banana leaf or plate lined with parchment paper. Flatten and smooth the top with a piece of oiled parchment paper, then let it cool slightly and cut into traditional diamond or square shapes.",
      },
      {
        step: 6,
        text: "For the Lunu Miris: Using a pestle and mortar or small food processor, crush the sliced red onion, chili flakes, salt, and Maldive fish flakes into a coarse paste. Stir in the fresh lime juice right before serving.",
      },
    ],
    notes: [
      "For authentic aroma, line your serving platter with a fresh banana leaf lightly warmed over flame.",
      "Always use fresh, thick coconut milk rather than low-fat coconut milk to achieve the classic rich gloss and set.",
      "If you prefer a milder sambol, reduce the chili flakes and increase the fresh lime juice slightly.",
    ],
  },
  {
    id: "f2",
    slug: "jaffna-crab-curry",
    title: "Jaffna Style Crab Curry with Roasted Spices",
    category: "Dinner",
    image:
      "https://images.unsplash.com/photo-1559847844-5315695dadae?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    ratingCount: 42,
    prepTime: "25 mins",
    cookTime: "45 mins",
    totalTime: "1 hr 10 mins",
    servings: 4,
    excerpt:
      "Succulent lagoon crabs simmered in dark roasted northern curry powder, thick coconut milk, and fragrant drumstick leaves.",
    intro:
      "From the northern peninsula of Jaffna, this legendary crab curry is famous across the island for its deep crimson hue, smoky roasted spices, and delicate sweetness of fresh lagoon crab. Murunga (drumstick) leaves add an earthy aroma that ties the whole dish together.",
    isFeatured: true,
    publishedDate: "2026-02-28",
    author: {
      name: "Suresh Thillainathan",
      role: "Northern Flavors Explorer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["seafood", "crab", "curry", "spicy", "jaffna"],
    ingredients: [
      { amount: "1 kg (2.2 lbs)", name: "Fresh blue swimmer or lagoon crabs, cleaned and halved" },
      { amount: "3 tbsp", name: "Jaffna dark roasted curry powder" },
      { amount: "1 tsp", name: "Turmeric powder" },
      { amount: "1 tbsp", name: "Chili powder" },
      { amount: "2 cups", name: "Thin coconut milk" },
      { amount: "1 cup", name: "Thick coconut cream" },
      { amount: "2 medium", name: "Red onions, finely chopped" },
      { amount: "5 cloves", name: "Garlic, minced" },
      { amount: "1 inch", name: "Ginger, crushed" },
      { amount: "2 sprigs", name: "Fresh curry leaves & 2 green chilies" },
      { amount: "1 cup", name: "Murunga (drumstick) leaves or moringa leaves" },
      { amount: "2 pieces", name: "Goraka (garcinia) or tamarind paste" },
      { amount: "2 tbsp", name: "Coconut oil" },
      { amount: "1 tsp", name: "Salt (to taste)" },
    ],
    instructions: [
      {
        step: 1,
        text: "Clean crabs thoroughly, crack the large claws gently to let spices penetrate, and pat dry.",
      },
      {
        step: 2,
        text: "Heat coconut oil in a clay pot or heavy pan. Sauté the onions, green chilies, garlic, ginger, and curry leaves until golden and fragrant.",
      },
      {
        step: 3,
        text: "Add the roasted Jaffna curry powder, chili powder, and turmeric. Toast the spices on low heat for 1 minute until deeply aromatic.",
      },
      {
        step: 4,
        text: "Add the crab pieces into the pan, tossing gently to coat every shell in the fragrant spiced paste.",
      },
      {
        step: 5,
        text: "Pour in the thin coconut milk and tamarind water. Bring to a gentle boil, cover, and simmer for 20 minutes until the crabs turn vibrant orange-red.",
      },
      {
        step: 6,
        text: "Uncover, pour in the thick coconut cream, and scatter the fresh drumstick leaves on top. Simmer gently for 5 minutes without boiling vigorously. Serve hot with steamed rice or crusty roast paan.",
      },
    ],
    notes: [
      "Jaffna curry powder has coriander, cumin, fennel, and dried chilies roasted to a dark chocolate color.",
      "Cracking the claws gently with the back of a knife allows the spiced gravy to infuse into the sweet meat.",
    ],
  },
  {
    id: "f3",
    slug: "sri-lankan-black-pork-curry",
    title: "Authentic Sri Lankan Black Pork Curry",
    category: "Entrees",
    image:
      "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    ratingCount: 51,
    prepTime: "20 mins",
    cookTime: "50 mins",
    totalTime: "1 hr 10 mins",
    servings: 6,
    excerpt:
      "Tender pork cubes coated in intensely toasted spices and tangy goraka, delivering deep, earthy flavors.",
    intro:
      "This beloved southern Sri Lankan classic relies on deeply toasted unroasted spices and sour garcinia cambogia (goraka) paste. The curry cooks down slowly until each bite of tender meat is enveloped in a glossy, nearly black, aromatic glaze.",
    isFeatured: true,
    publishedDate: "2026-03-01",
    author: {
      name: "Chamath Perera",
      role: "Culinary Heritage Host",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["curry", "pork", "spicy", "traditional", "slow-cooked"],
    ingredients: [
      { amount: "1 kg (2.2 lbs)", name: "Pork shoulder or belly, cut into 1-inch bite pieces" },
      { amount: "4 pieces", name: "Dried goraka (garcinia), soaked and ground into smooth paste" },
      { amount: "3 tbsp", name: "Sri Lankan dark roasted curry powder" },
      { amount: "1.5 tbsp", name: "Black peppercorns, coarsely crushed" },
      { amount: "1 tbsp", name: "Chili powder" },
      { amount: "1 tsp", name: "Ground turmeric" },
      { amount: "1 large", name: "Red onion, diced" },
      { amount: "6 cloves", name: "Garlic & 1 tbsp ginger, pounded" },
      { amount: "2 sprigs", name: "Curry leaves & 2-inch pandan leaf" },
      { amount: "1 stick", name: "Ceylon cinnamon" },
      { amount: "1.5 cups", name: "Water" },
      { amount: "1.5 tsp", name: "Salt" },
    ],
    instructions: [
      {
        step: 1,
        text: "In a mixing bowl, toss the pork with the ground goraka paste, roasted curry powder, black pepper, chili powder, turmeric, and salt. Allow to marinate for 20 minutes.",
      },
      {
        step: 2,
        text: "Heat a heavy clay pot or dutch oven over medium heat. Sauté the onions, pounded garlic and ginger, curry leaves, pandan leaf, and cinnamon stick until aromatic.",
      },
      {
        step: 3,
        text: "Add the marinated pork into the pot. Sear over medium-high heat for 6-8 minutes, allowing the natural fat to render and the spices to toast further.",
      },
      {
        step: 4,
        text: "Add water, bring to a simmer, then lower the heat. Cover with a lid and simmer gently for 40 minutes, stirring occasionally, until the pork is tender.",
      },
      {
        step: 5,
        text: "Remove the lid and simmer for an additional 10 minutes until the gravy reduces to a dark, thick glaze clinging to the meat.",
      },
    ],
    notes: [
      "Goraka is essential for the authentic taste and tenderization; do not substitute with vinegar if possible.",
      "This curry tastes even better the next day as the meat continues absorbing the dark spice blend.",
    ],
  },
  {
    id: "f4",
    slug: "golden-egg-hoppers",
    title: "Golden Egg Hoppers with Katta Sambol",
    category: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    ratingCount: 29,
    prepTime: "15 mins",
    cookTime: "20 mins",
    totalTime: "35 mins",
    servings: 3,
    excerpt:
      "Crispy, lace-edged fermented rice flour bowl with a soft-steamed golden egg in the center.",
    intro:
      "Hoppers (appa) are fermented rice and coconut pancakes shaped like edible bowls with paper-thin crisp edges and a pillowy, soft sponge at the base. Cracking a whole farm egg into the center creates the ultimate breakfast luxury.",
    isFeatured: true,
    publishedDate: "2026-02-14",
    author: {
      name: "Malkanthi Silva",
      role: "Traditional Recipe Specialist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["breakfast", "hoppers", "egg", "coconut", "streetfood"],
    ingredients: [
      { amount: "2 cups", name: "Rice flour" },
      { amount: "1 tsp", name: "Active dry yeast or fermented coconut toddy" },
      { amount: "1 tsp", name: "Sugar" },
      { amount: "1.5 cups", name: "Warm water & 1 cup thick coconut milk" },
      { amount: "4-6 whole", name: "Farm fresh eggs" },
      { amount: "1 tsp", name: "Salt" },
      { amount: "Pinch", name: "Freshly cracked black pepper" },
    ],
    instructions: [
      {
        step: 1,
        text: "Combine warm water, yeast, and sugar. Let stand for 10 minutes until frothy.",
      },
      {
        step: 2,
        text: "Mix the rice flour and salt in a large bowl. Pour in the yeast mixture and knead into a thick batter. Cover and ferment in a warm place for 6–8 hours.",
      },
      {
        step: 3,
        text: "Before cooking, stir in the thick coconut milk until the batter reaches a smooth crepe-like consistency.",
      },
      {
        step: 4,
        text: "Heat an oiled hopper pan (appa thachchiya) over medium heat. Pour in a ladle of batter, swirl the pan in a circular motion so the batter coats the sides, leaving a pool in the center.",
      },
      {
        step: 5,
        text: "Crack a fresh egg into the center. Season with a pinch of salt and black pepper.",
      },
      {
        step: 6,
        text: "Cover with a dome lid and steam on medium-low for 2 to 3 minutes until the lacy edges are golden brown and crispy and the egg white is set with a soft yolk.",
      },
    ],
    notes: [
      "Use an authentic non-stick or well-seasoned carbon steel hopper pan for the best bowl shape and crispy edges.",
      "Serve right away while hot alongside spicy chili-onion katta sambol and dhal curry.",
    ],
  },
  {
    id: "r1",
    slug: "chicken-kottu-roti",
    title: "Street-Style Chicken Köttu Roti",
    category: "Dinner",
    image:
      "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    ratingCount: 64,
    prepTime: "20 mins",
    cookTime: "25 mins",
    totalTime: "45 mins",
    servings: 4,
    excerpt:
      "The definitive Sri Lankan street food: chopped godamba roti tossed with spicy chicken, eggs, and crisp vegetables.",
    intro:
      "The rhythmic metallic clatter of köttu blades on hot iron griddles is the heartbeat of Sri Lankan nightlife. Fresh godamba flatbread is shredded and stir-fried with tender chicken curry, scrambled eggs, shredded cabbage, leeks, and carrots.",
    publishedDate: "2026-03-08",
    author: {
      name: "Chamath Perera",
      role: "Culinary Heritage Host",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["streetfood", "chicken", "dinner", "spicy", "roti"],
    ingredients: [
      { amount: "6 pieces", name: "Cooked godamba roti or parathas, cut into bite-size strips" },
      { amount: "1.5 cups", name: "Cooked chicken curry with generous spicy gravy" },
      { amount: "3 whole", name: "Eggs, beaten" },
      { amount: "1 cup", name: "Shredded white cabbage" },
      { amount: "1 medium", name: "Carrot, julienned" },
      { amount: "2 stalks", name: "Leeks, sliced" },
      { amount: "1 medium", name: "Onion & 2 green chilies, sliced" },
      { amount: "2 tbsp", name: "Vegetable oil" },
      { amount: "1 tsp", name: "Chili flakes & black pepper" },
    ],
    instructions: [
      {
        step: 1,
        text: "Heat oil in a large wok or flat griddle over high heat. Add onions and green chilies, stir-frying for 1 minute.",
      },
      {
        step: 2,
        text: "Toss in the cabbage, carrots, and leeks. Sauté quickly for 2 minutes to keep them crisp.",
      },
      {
        step: 3,
        text: "Push vegetables to one side, pour in the beaten eggs, and scramble quickly until just set.",
      },
      {
        step: 4,
        text: "Add the sliced roti strips and pieces of chicken curry. Using two metal spatulas or flat blades, chop and toss vigorously together.",
      },
      {
        step: 5,
        text: "Pour in hot chicken curry gravy to moisten the roti strips, tossing continuously until thoroughly steaming and coated. Serve with a lime wedge.",
      },
    ],
    notes: [
      "Use leftover roti or flaky paratha from the night before—slightly dry bread absorbs the spicy curry gravy best.",
    ],
  },
  {
    id: "r2",
    slug: "creamy-parippu-dhal",
    title: "Creamy Red Lentil Dhal (Parippu)",
    category: "Sides",
    image:
      "https://images.unsplash.com/photo-1546833998-877b37c2e5c6?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    ratingCount: 52,
    prepTime: "10 mins",
    cookTime: "25 mins",
    totalTime: "35 mins",
    servings: 4,
    excerpt:
      "Silky lentils simmered with turmeric and coconut milk, topped with a sizzling aromatic mustard and curry leaf tempering.",
    intro:
      "No Sri Lankan rice-and-curry meal is complete without a bowl of comforting parippu. Red lentils are gently simmered with aromatic pandan and turmeric, enriched with thick coconut milk, and finished with tempered spices.",
    publishedDate: "2026-03-02",
    author: {
      name: "Malkanthi Silva",
      role: "Traditional Recipe Specialist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["lentils", "vegan", "coconut", "sides", "comfortfood"],
    ingredients: [
      { amount: "1 cup", name: "Red split lentils (masoor dhal), rinsed" },
      { amount: "2 cups", name: "Water" },
      { amount: "1 cup", name: "Thick coconut milk" },
      { amount: "1/2 tsp", name: "Turmeric powder" },
      { amount: "1/2", name: "Medium red onion, sliced" },
      { amount: "2", name: "Green chilies, slit" },
      { amount: "1 sprig", name: "Curry leaves & piece of pandan leaf" },
      { amount: "1 tbsp", name: "Coconut oil (for tempering)" },
      { amount: "1/2 tsp", name: "Black mustard seeds" },
      { amount: "1/2 tsp", name: "Cumin seeds" },
      { amount: "1/2 tsp", name: "Chili flakes" },
      { amount: "1 tsp", name: "Salt" },
    ],
    instructions: [
      {
        step: 1,
        text: "In a pot, combine rinsed lentils, water, turmeric, half the sliced onions, green chilies, and pandan leaf. Bring to a boil, then simmer until lentils soften.",
      },
      {
        step: 2,
        text: "Pour in the coconut milk and salt. Stir gently and simmer for another 6-8 minutes until thick and creamy.",
      },
      {
        step: 3,
        text: "In a small skillet, heat coconut oil over medium-high heat. Add mustard seeds until they pop, then add remaining onions, cumin, curry leaves, and chili flakes.",
      },
      {
        step: 4,
        text: "Pour the sizzling tempering immediately over the hot creamy dhal. Stir gently and serve.",
      },
    ],
    notes: [
      "The sizzling oil tempering (theldala) at the end releases volatile aromas that elevate simple lentils into a culinary masterpiece.",
    ],
  },
  {
    id: "r3",
    slug: "pol-roti-seeni-sambol",
    title: "Coconut Roti with Caramelized Seeni Sambol",
    category: "Breakfast",
    image:
      "https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=800&q=80",
    rating: 4.9,
    ratingCount: 31,
    prepTime: "15 mins",
    cookTime: "20 mins",
    totalTime: "35 mins",
    servings: 4,
    excerpt:
      "Rustic handmade coconut flatbreads served with sweet, spicy caramelized onion relish.",
    intro:
      "Pol roti is pure rustic joy: fresh grated coconut kneaded directly into wheat flour with finely diced green chilies and onions, griddled on dry cast iron until toasted and blistered with golden spots.",
    publishedDate: "2026-02-22",
    author: {
      name: "Chamath Perera",
      role: "Culinary Heritage Host",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["roti", "coconut", "breakfast", "sambol"],
    ingredients: [
      { amount: "2 cups", name: "All-purpose wheat flour" },
      { amount: "1.5 cups", name: "Freshly grated coconut" },
      { amount: "1 small", name: "Red onion, finely diced" },
      { amount: "2", name: "Green chilies, finely chopped" },
      { amount: "1 tsp", name: "Salt" },
      { amount: "1/2 cup", name: "Lukewarm water (as needed)" },
    ],
    instructions: [
      {
        step: 1,
        text: "In a mixing bowl, combine flour, grated coconut, diced onions, green chilies, and salt.",
      },
      {
        step: 2,
        text: "Gradually add warm water while kneading until a soft, pliable dough forms. Divide into 6 equal balls.",
      },
      {
        step: 3,
        text: "Flatten each ball by hand onto a lightly floured surface or banana leaf into 1/4-inch thick round discs.",
      },
      {
        step: 4,
        text: "Cook on a dry, preheated heavy skillet over medium heat for 3–4 minutes per side until nicely browned with toasted charred spots.",
      },
    ],
    notes: [
      "Use freshly grated coconut if possible; frozen coconut thawed to room temperature works as well.",
    ],
  },
  {
    id: "r4",
    slug: "sri-lankan-jaggery-watalappam",
    title: "Rich Sri Lankan Jaggery Watalappam",
    category: "Desserts",
    image:
      "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80",
    rating: 5.0,
    ratingCount: 46,
    prepTime: "20 mins",
    cookTime: "40 mins",
    totalTime: "1 hr",
    servings: 6,
    excerpt:
      "Steamed coconut custard sweetened with dark kithul jaggery, scented with cardamom and nutmeg, and topped with toasted cashews.",
    intro:
      "Watalappam is a spiced steamed custard perfected by the Sri Lankan Malay community. Dark kithul palm jaggery lends it a deep caramel richness, while fragrant freshly ground cardamom, cloves, and nutmeg create an unforgettable festive indulgence.",
    publishedDate: "2026-02-18",
    author: {
      name: "Malkanthi Silva",
      role: "Traditional Recipe Specialist",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["dessert", "jaggery", "custard", "steamed", "festive"],
    ingredients: [
      { amount: "350g", name: "Dark Kithul palm jaggery, grated or melted" },
      { amount: "1.5 cups", name: "Thick fresh coconut milk" },
      { amount: "5 large", name: "Eggs, room temperature" },
      { amount: "1 tsp", name: "Freshly ground green cardamom powder" },
      { amount: "1/4 tsp", name: "Grated nutmeg & pinch of ground cloves" },
      { amount: "1 tsp", name: "Vanilla extract" },
      { amount: "1/4 cup", name: "Cashew nuts, roasted, for topping" },
    ],
    instructions: [
      {
        step: 1,
        text: "Melt the grated jaggery with 3 tablespoons of warm water over low heat. Strain through a fine sieve to remove any impurities and let cool.",
      },
      {
        step: 2,
        text: "Gently whisk the eggs in a bowl (avoid creating excessive foam). Whisk in the thick coconut milk, melted jaggery syrup, ground cardamom, nutmeg, cloves, and vanilla.",
      },
      {
        step: 3,
        text: "Strain the custard mixture through a fine mesh strainer into heatproof ramekins or a steaming bowl.",
      },
      {
        step: 4,
        text: "Cover the dish tightly with aluminum foil to prevent steam droplets from falling into the custard.",
      },
      {
        step: 5,
        text: "Place inside a steamer over boiling water. Steam over medium-low heat for 35–40 minutes until set and a toothpick inserted in the center comes out clean.",
      },
      {
        step: 6,
        text: "Cool to room temperature, chill in the refrigerator, and top generously with roasted cashews before serving.",
      },
    ],
    notes: [
      "Authentic dark kithul jaggery gives watalappam its distinct honeycomb texture and deep butterscotch color.",
    ],
  },
  {
    id: "r5",
    slug: "southern-fish-ambul-thiyal",
    title: "Southern Fish Ambul Thiyal",
    category: "Entrees",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=800&q=80",
    rating: 4.7,
    ratingCount: 22,
    prepTime: "20 mins",
    cookTime: "35 mins",
    totalTime: "55 mins",
    servings: 4,
    excerpt:
      "Sour and peppery dry fish curry from the southern coast, coated in a thick black garcinia (goraka) paste.",
    intro:
      "Born in the coastal fishing villages of Mirissa and Balapitiya, Ambul Thiyal is an ingenious method of preserving fresh tuna or swordfish. Each firm fish steak is coated in a pungent black paste of simmered goraka, black pepper, and cinnamon, then slow-simmered in a clay pot until dry.",
    publishedDate: "2026-01-28",
    author: {
      name: "Chamath Perera",
      role: "Culinary Heritage Host",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["fish", "seafood", "southern", "traditional", "peppery"],
    ingredients: [
      { amount: "600g", name: "Fresh yellowfin tuna or sailfish, cut into thick cubes" },
      { amount: "6 pieces", name: "Dried goraka (garcinia), boiled in water and pounded into smooth paste" },
      { amount: "2 tbsp", name: "Black peppercorns, coarsely crushed" },
      { amount: "1 tbsp", name: "Chili powder" },
      { amount: "1/2 tsp", name: "Ground turmeric" },
      { amount: "2 sprigs", name: "Curry leaves" },
      { amount: "1-inch", name: "Ceylon cinnamon stick" },
      { amount: "1 tsp", name: "Salt" },
      { amount: "1/2 cup", name: "Water" },
    ],
    instructions: [
      {
        step: 1,
        text: "Clean the fish pieces and pat dry thoroughly with paper towels.",
      },
      {
        step: 2,
        text: "In a small bowl, mix the smooth goraka paste, crushed black pepper, chili powder, turmeric, and salt with 2 tablespoons of water into a thick black marinade.",
      },
      {
        step: 3,
        text: "Coat each piece of fish completely in the black paste.",
      },
      {
        step: 4,
        text: "Line the bottom of a clay pot with curry leaves and cinnamon. Arrange the fish pieces in a single snug layer.",
      },
      {
        step: 5,
        text: "Pour in 1/2 cup water around the edges. Cover and cook on medium-low heat for 25–30 minutes until the liquid completely evaporates and the fish is firm and coated in a dry black glaze.",
      },
    ],
    notes: [
      "In Sri Lankan homes, Ambul Thiyal keeps fresh without refrigeration for several days thanks to the natural preservatives in goraka and black pepper.",
    ],
  },
  {
    id: "r6",
    slug: "crispy-vegetable-roti-rolls",
    title: "Crispy Vegetable & Potato Roti Rolls",
    category: "Appetizers",
    image:
      "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    rating: 4.8,
    ratingCount: 35,
    prepTime: "25 mins",
    cookTime: "30 mins",
    totalTime: "55 mins",
    servings: 5,
    excerpt:
      "Golden crumbed Chinese rolls stuffed with spiced potatoes, leeks, and carrots, fried to crisp perfection.",
    intro:
      "Sri Lankan short eats are a beloved evening tradition, and these vegetable rolls are the undisputed star of every bakery and tea gathering. Thin crepes are wrapped around a fiery, aromatic filling of spiced potatoes, carrots, and leeks, breadcrumbed, and deep-fried.",
    publishedDate: "2026-02-05",
    author: {
      name: "Suresh Thillainathan",
      role: "Northern Flavors Explorer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    tags: ["appetizer", "shorteats", "vegetarian", "crispy", "snack"],
    ingredients: [
      { amount: "3 large", name: "Potatoes, boiled, peeled, and mashed" },
      { amount: "1 medium", name: "Carrot & 1 leek, finely chopped" },
      { amount: "1 small", name: "Red onion, minced" },
      { amount: "2", name: "Green chilies, finely chopped" },
      { amount: "1 tsp", name: "Black pepper & 1 tsp curry powder" },
      { amount: "1 cup", name: "All-purpose flour & water (for thin crepe batter)" },
      { amount: "1.5 cups", name: "Panko or breadcrumbs" },
      { amount: "Oil", name: "For deep frying" },
    ],
    instructions: [
      {
        step: 1,
        text: "Sauté onions, green chilies, leeks, and carrots in 1 tablespoon oil for 3 minutes. Stir in the mashed potatoes, curry powder, black pepper, and salt. Cool.",
      },
      {
        step: 2,
        text: "Prepare thin crepes by whisking flour, water, and pinch of salt. Cook very thin crepes in a non-stick pan without flipping.",
      },
      {
        step: 3,
        text: "Place 2 tablespoons of potato filling on each crepe, fold the sides, and roll tightly into a cylinder.",
      },
      {
        step: 4,
        text: "Dip each roll in thin flour-water batter or beaten egg, roll in breadcrumbs to coat evenly.",
      },
      {
        step: 5,
        text: "Deep fry in hot oil over medium heat until golden brown and super crispy. Serve hot with chili sauce.",
      },
    ],
    notes: [
      "Rolls can be assembled in advance and frozen on a baking tray for up to a month before frying.",
    ],
  },
];

export const featuredRecipes = allRecipes.filter((r) => r.isFeatured);
export const recentRecipes = allRecipes.filter((r) => !r.isFeatured);

export function getAllRecipes(): Recipe[] {
  return allRecipes;
}

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return allRecipes.find((recipe) => recipe.slug === slug);
}

export function getRelatedRecipes(
  currentSlug: string,
  category: string,
  limit: number = 3
): Recipe[] {
  const sameCategory = allRecipes.filter(
    (r) => r.slug !== currentSlug && r.category.toLowerCase() === category.toLowerCase()
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherRecipes = allRecipes.filter(
    (r) => r.slug !== currentSlug && r.category.toLowerCase() !== category.toLowerCase()
  );

  return [...sameCategory, ...otherRecipes].slice(0, limit);
}
