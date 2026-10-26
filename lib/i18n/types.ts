export type Language = "en" | "it";

export interface TranslationDictionary {
  common: {
    siteTitle: string;
    tagline: string;
    loading: string;
    close: string;
    all: string;
    backToHome: string;
    back: string;
    reset: string;
    mins: string;
    servings: string;
    prep: string;
    cook: string;
    total: string;
    items: string;
    reviews: string;
    stars: string;
    languageName: string;
    languageSwitchAria: string;
    en: string;
    it: string;
  };
  nav: {
    home: string;
    recipes: string;
    categories: string;
    about: string;
    allRecipes: string;
    breakfastDishes: string;
    curriesDinners: string;
    sweetsTreats: string;
    allCategories: string;
    breakfast: string;
    dinner: string;
    desserts: string;
    appetizers: string;
    entrees: string;
    sides: string;
    lunch: string;
    drinks: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
  };
  home: {
    exploreByCategory: string;
    recentRecipes: string;
    browseAll: string;
    noRecipes: string;
    noRecipesDesc: string;
  };
  search: {
    placeholder: string;
    filterPlaceholder: string;
    showing: string;
    clear: string;
    noMatchTitle: string;
    noMatchDesc: string;
    resetFilters: string;
    recipesFound: string;
  };
  subscribe: {
    badge: string;
    title: string;
    subtitle: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    button: string;
    subscribing: string;
    successMessage: string;
  };
  recipeDetail: {
    backToRecipes: string;
    rateThisRecipe: string;
    ingredients: string;
    instructions: string;
    step: string;
    notesTips: string;
    relatedRecipes: string;
    draftPreview: string;
    optional: string;
    markAsPrepared: string;
    prepTime: string;
    cookTime: string;
    servings: string;
  };
  rating: {
    rateTitle: string;
    alreadyRated: string;
    yourRating: string;
    submitting: string;
    labels: Record<1 | 2 | 3 | 4 | 5, string>;
  };
  footer: {
    brandNarrative: string;
    explore: string;
    categories: string;
    breakfastFavorites: string;
    curryRice: string;
    copyright: string;
    privacy: string;
    terms: string;
    contact: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    formTitle: string;
    formSubtitle: string;
    yourName: string;
    emailAddress: string;
    message: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
    thankYou: string;
    thankYouDesc: string;
    sendAnother: string;
  };
  about: {
    badge: string;
    title: string;
    subtitle: string;
    pillarsTitle: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
  };
}
