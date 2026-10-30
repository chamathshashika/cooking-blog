import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Clock, Users, ChefHat, ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import RecipeCard from "@/components/RecipeCard";
import SubscribeBanner from "@/components/SubscribeBanner";
import IngredientsList from "@/components/IngredientsList";
import RecipeRatingWidget from "@/components/RecipeRatingWidget";
import {
  findRecipeBySlug,
  getRecipes,
  getRelatedRecipes,
} from "@/lib/actions/recipe";
import { verifySession } from "@/lib/dal";
import { cookies } from "next/headers";
import { translations } from "@/lib/i18n/translations";
import { localizeRecipe, localizeRecipes } from "@/lib/i18n/dynamicContent";
import type { Language } from "@/lib/i18n/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const recipes = await getRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("ceylonspicer_language")?.value as Language) || "en";
  const rawRecipe = await findRecipeBySlug(slug);

  if (!rawRecipe || rawRecipe.status === "draft") {
    return {
      title: "Recipe Not Found | CeylonSpicer",
    };
  }

  const recipe = localizeRecipe(rawRecipe, lang);

  return {
    title: `${recipe.title} - Sri Lankan Recipe | CeylonSpicer`,
    description: recipe.excerpt,
    openGraph: {
      title: `${recipe.title} - Sri Lankan Recipe`,
      description: recipe.excerpt,
      images: [{ url: recipe.image }],
      type: "article",
      publishedTime: recipe.publishedDate,
    },
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { slug } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("ceylonspicer_language")?.value as Language) || "en";
  const dict = translations[lang] || translations.en;
  const rawRecipe = await findRecipeBySlug(slug);

  if (!rawRecipe) {
    notFound();
  }

  // Prevent draft recipe exposure on the public website (allow only admin/editor to preview)
  let isDraftPreview = false;
  if (rawRecipe.status === "draft") {
    const session = await verifySession();
    if (!session.isAuth || (session.role !== "admin" && session.role !== "editor")) {
      notFound();
    }
    isDraftPreview = true;
  }

  const rawRelated = await getRelatedRecipes(rawRecipe.slug, rawRecipe.category, 3);
  const recipe = localizeRecipe(rawRecipe, lang);
  const related = localizeRecipes(rawRelated, lang);

  // Schema.org Recipe JSON-LD for rich SEO snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",
    name: recipe.title,
    image: [recipe.image],
    description: recipe.excerpt,
    author: {
      "@type": "Person",
      name: recipe.author?.name || "CeylonSpicer Kitchen",
    },
    datePublished: recipe.publishedDate || "2026-01-01",
    prepTime: "PT" + recipe.prepTime.replace(/[^0-9]/g, "") + "M",
    cookTime: "PT" + recipe.cookTime.replace(/[^0-9]/g, "") + "M",
    recipeYield: `${recipe.servings} servings`,
    recipeCategory: recipe.category,
    recipeCuisine: "Sri Lankan",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: recipe.rating,
      reviewCount: recipe.ratingCount || 25,
    },
    recipeIngredient:
      recipe.ingredients?.map((i) =>
        `${i.amount || i.quantity || ""} ${i.name}`.trim(),
      ) || [],
    recipeInstructions:
      recipe.instructions?.map((inst) => ({
        "@type": "HowToStep",
        text: inst.text,
        position: inst.step,
      })) || [],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-obsidian transition-colors duration-200">
      {/* Recipe JSON-LD structured data */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      {isDraftPreview && (
        <div className="bg-amber-500/15 dark:bg-amber-500/25 border-b border-amber-500/30 px-4 py-2.5 text-center font-ui text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-200">
          {dict.recipeDetail.draftPreview}
        </div>
      )}

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 dark:border-hairline bg-linen/30 dark:bg-surface/50 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            <Link
              href="/"
              className="hover:text-ink dark:hover:text-ice transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              {dict.nav.home}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/recipes"
              className="hover:text-ink dark:hover:text-ice transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              {dict.nav.recipes}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href={`/category/${recipe.category.toLowerCase()}`}
              className="hover:text-ink dark:hover:text-ice transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              {recipe.category}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink dark:text-ice truncate max-w-xs">{recipe.title}</span>
          </div>
        </div>

        {/* Recipe Article Header */}
        <article className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-8 md:pt-12">
          {/* Back link */}
          <Link
            href="/recipes"
            className="inline-flex min-h-[44px] items-center gap-1.5 font-ui text-[11px] font-semibold uppercase tracking-wider text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice transition-colors mb-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{dict.recipeDetail.backToRecipes}</span>
          </Link>

          {/* 1. Category Tag, Title & Rating Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-cream dark:bg-surface px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-widest text-ink dark:text-ice border border-transparent dark:border-hairline">
              {recipe.category}
            </span>

            <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-[44px] text-ink dark:text-ice leading-tight">
              {recipe.title}
            </h1>

            <div className="mt-3 flex items-center justify-center gap-2">
              <StarRating value={recipe.rating} />
              <span className="font-ui text-xs font-semibold text-ink dark:text-ice">
                {recipe.rating.toFixed(1)}
              </span>
              {recipe.ratingCount && (
                <span className="font-ui text-xs text-muted dark:text-slate-muted">
                  ({recipe.ratingCount} {dict.common.reviews})
                </span>
              )}
              <span aria-hidden="true" className="text-ink/20 dark:text-slate-muted/40">•</span>
              <a
                href="#rate-recipe"
                className="font-ui text-xs font-semibold text-sage dark:text-amber-text hover:underline focus:outline-none focus-visible:ring-1 focus-visible:ring-sage"
              >
                {dict.recipeDetail.rateThisRecipe}
              </a>
            </div>

            {/* Author & Date Bar */}
            {recipe.author && (
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-ink/10 dark:border-hairline">
                  <Image
                    src={recipe.author.avatar}
                    alt={recipe.author.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-ui text-xs font-bold text-ink dark:text-ice">
                    {lang === "it" ? "Di" : "By"} {recipe.author.name}
                  </p>
                  <p className="font-ui text-[10px] uppercase tracking-wider text-muted dark:text-slate-muted">
                    {lang === "it" && recipe.author.role === "Master Chef & Founder"
                      ? "Capo Chef e Fondatore"
                      : lang === "it" && recipe.author.role === "Culinary Contributor"
                      ? "Collaboratore Culinario"
                      : lang === "it" && recipe.author.role === "Master Recipe Developer"
                      ? "Chef Sviluppatore di Ricette"
                      : recipe.author.role}{" "}
                    • {recipe.publishedDate}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 2. Hero Photo */}
          <div className="mt-8 md:mt-10 relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-linen dark:bg-panel border border-transparent dark:border-hairline shadow-xs">
            <Image
              src={recipe.image}
              alt={recipe.title}
              fill
              priority
              sizes="(min-width: 1200px) 1200px, 100vw"
              className="object-cover"
            />
          </div>

          {/* Quick Meta Stats Strip */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-ink/10 dark:border-hairline py-5 text-center bg-cream/20 dark:bg-panel/40">
            <div>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted dark:text-slate-muted flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 text-sage dark:text-gold" />
                {dict.recipeDetail.prepTime}
              </p>
              <p className="mt-1 font-display text-lg text-ink dark:text-ice">
                {recipe.prepTime}
              </p>
            </div>
            <div>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted dark:text-slate-muted flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 text-sage dark:text-gold" />
                {dict.recipeDetail.cookTime}
              </p>
              <p className="mt-1 font-display text-lg text-ink dark:text-ice">
                {recipe.cookTime}
              </p>
            </div>
            <div>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted dark:text-slate-muted flex items-center justify-center gap-1">
                <Users className="h-3 w-3 text-sage dark:text-gold" />
                {dict.recipeDetail.servings}
              </p>
              <p className="mt-1 font-display text-lg text-ink dark:text-ice">
                {recipe.servings} {dict.common.servings}
              </p>
            </div>
            <div>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted dark:text-slate-muted flex items-center justify-center gap-1">
                <ChefHat className="h-3 w-3 text-sage dark:text-gold" />
                {lang === "it" ? "Cucina" : "Cuisine"}
              </p>
              <p className="mt-1 font-display text-lg text-ink dark:text-ice">
                {lang === "it" ? "Singalese" : "Sri Lankan"}
              </p>
            </div>
          </div>

          {/* 3. Short Editorial Intro */}
          <div className="mx-auto max-w-3xl py-8 md:py-10">
            <p className="font-display text-lg md:text-xl text-ink dark:text-ice leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-sage dark:first-letter:text-amber-text">
              {recipe.intro || recipe.excerpt}
            </p>
          </div>

          {/* 4 & 5. Ingredients & Instructions Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 mx-auto max-w-[1200px] mt-2">
            {/* Ingredients Column (Left 4 cols) */}
            <div className="lg:col-span-5">
              <div className="sticky top-6">
                {recipe.ingredients && (
                  <IngredientsList ingredients={recipe.ingredients} />
                )}

                {/* Recipe Tags */}
                {recipe.tags && recipe.tags.length > 0 && (
                  <div className="mt-6">
                    <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted dark:text-slate-muted mb-2">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {recipe.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-linen dark:bg-panel px-2.5 py-1 font-ui text-[10px] uppercase tracking-wider text-ink dark:text-ice border border-transparent dark:border-hairline"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Instructions Column (Right 7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div>
                <h3 className="font-display text-2xl md:text-3xl text-ink dark:text-ice border-b border-ink/10 dark:border-hairline pb-3 mb-6">
                  {dict.recipeDetail.instructions}
                </h3>

                <ol
                  className="space-y-6"
                  aria-label="Step by step instructions"
                >
                  {recipe.instructions?.map((inst) => (
                    <li
                      key={inst.step}
                      className="flex items-start gap-4 sm:gap-5"
                    >
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage dark:bg-amber-primary text-white font-ui text-xs font-bold">
                        {inst.step}
                      </span>
                      <div className="pt-0.5">
                        {inst.title && (
                          <h4 className="font-display font-semibold text-lg text-ink dark:text-ice mb-1">
                            {inst.title}
                          </h4>
                        )}
                        <p className="font-display text-base sm:text-[17px] text-ink dark:text-ice leading-relaxed">
                          {inst.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 6. Notes and Tips Card */}
              {recipe.notes && recipe.notes.length > 0 && (
                <div className="border-l-4 border-sunshine dark:border-gold bg-cream/30 dark:bg-panel p-6 md:p-8 mt-10">
                  <h4 className="font-display text-xl text-ink dark:text-ice mb-3">
                    {dict.recipeDetail.notesTips}
                  </h4>
                  <ul className="space-y-2.5 font-display text-sm md:text-base text-ink/90 dark:text-slate-muted list-disc list-inside">
                    {recipe.notes.map((note, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* 7. Reader Rating & Review Box */}
              <div className="mt-10 sm:mt-12">
                <RecipeRatingWidget
                  recipeSlug={recipe.slug}
                  recipeTitle={recipe.title}
                  initialRating={recipe.rating}
                  initialRatingCount={recipe.ratingCount || 0}
                />
              </div>
            </div>
          </div>
        </article>

        {/* 7. Related Recipes Section */}
        {related.length > 0 && (
          <section className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-16 md:pt-24">
            <div className="border-t border-ink/10 dark:border-hairline pt-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink dark:text-ice mb-8 text-center sm:text-left">
                {dict.recipeDetail.relatedRecipes}
              </h2>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((relRecipe) => (
                  <RecipeCard
                    key={relRecipe.id}
                    title={relRecipe.title}
                    category={relRecipe.category}
                    image={relRecipe.image}
                    slug={relRecipe.slug}
                    rating={relRecipe.rating}
                    aspectRatio="4/3"
                    prepTime={relRecipe.prepTime}
                    cookTime={relRecipe.cookTime}
                    translations={relRecipe.translations}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Subscribe Banner at bottom of recipe */}
        <div className="mt-16 md:mt-24">
          <SubscribeBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
