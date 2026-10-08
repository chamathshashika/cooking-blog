import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock,
  Users,
  ChefHat,
  Calendar,
  ArrowLeft,
  Bookmark,
  Share2,
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StarRating from "@/components/StarRating";
import RecipeCard from "@/components/RecipeCard";
import SubscribeBanner from "@/components/SubscribeBanner";
import IngredientsList from "@/components/IngredientsList";
import { getRecipeBySlug, getAllRecipes, getRelatedRecipes } from "@/lib/data";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const recipes = getAllRecipes();
  return recipes.map((recipe) => ({
    slug: recipe.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    return {
      title: "Recipe Not Found | CeylonSpicer",
    };
  }

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
  const recipe = getRecipeBySlug(slug);

  if (!recipe) {
    notFound();
  }

  const related = getRelatedRecipes(recipe.slug, recipe.category, 3);

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
    <div className="flex min-h-screen flex-col bg-white">
      {/* Recipe JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 bg-linen/30 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/recipes" className="hover:text-ink transition-colors">
              Recipes
            </Link>
            <span>/</span>
            <Link
              href={`/category/${recipe.category.toLowerCase()}`}
              className="hover:text-ink transition-colors"
            >
              {recipe.category}
            </Link>
            <span>/</span>
            <span className="text-ink truncate max-w-xs">{recipe.title}</span>
          </div>
        </div>

        {/* Recipe Article Header */}
        <article className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-8 md:pt-12">
          {/* Back link */}
          <Link
            href="/recipes"
            className="inline-flex items-center gap-1.5 font-ui text-[11px] font-semibold uppercase tracking-wider text-muted hover:text-ink transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>All Recipes</span>
          </Link>

          {/* 1. Category Tag, Title & Rating Header */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block bg-cream px-3 py-1 font-ui text-[10px] font-bold uppercase tracking-widest text-ink">
              {recipe.category}
            </span>

            <h1 className="mt-3 font-display text-3xl sm:text-4xl md:text-[44px] text-ink leading-tight">
              {recipe.title}
            </h1>

            <div className="mt-3 flex items-center justify-center gap-2">
              <StarRating value={recipe.rating} />
              <span className="font-ui text-xs font-semibold text-ink">
                {recipe.rating.toFixed(1)}
              </span>
              {recipe.ratingCount && (
                <span className="font-ui text-xs text-muted">
                  ({recipe.ratingCount} reviews)
                </span>
              )}
            </div>

            {/* Author & Date Bar */}
            {recipe.author && (
              <div className="mt-5 flex items-center justify-center gap-3">
                <div className="relative h-10 w-10 overflow-hidden rounded-full border border-ink/10">
                  <Image
                    src={recipe.author.avatar}
                    alt={recipe.author.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="font-ui text-xs font-bold text-ink">
                    By {recipe.author.name}
                  </p>
                  <p className="font-ui text-[10px] uppercase tracking-wider text-muted">
                    {recipe.author.role} • {recipe.publishedDate}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* 2. Hero Photo */}
          <div className="mt-8 md:mt-10 relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden bg-linen shadow-xs">
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
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 border-y border-ink/10 py-5 text-center bg-cream/20">
            <div>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 text-sage" />
                Prep Time
              </p>
              <p className="mt-1 font-display text-lg text-ink">
                {recipe.prepTime}
              </p>
            </div>
            <div>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 text-sage" />
                Cook Time
              </p>
              <p className="mt-1 font-display text-lg text-ink">
                {recipe.cookTime}
              </p>
            </div>
            <div>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted flex items-center justify-center gap-1">
                <Users className="h-3 w-3 text-sage" />
                Servings
              </p>
              <p className="mt-1 font-display text-lg text-ink">
                {recipe.servings} people
              </p>
            </div>
            <div>
              <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted flex items-center justify-center gap-1">
                <ChefHat className="h-3 w-3 text-sage" />
                Cuisine
              </p>
              <p className="mt-1 font-display text-lg text-ink">Sri Lankan</p>
            </div>
          </div>

          {/* 3. Short Editorial Intro */}
          <div className="mx-auto max-w-3xl py-8 md:py-10">
            <p className="font-display text-lg md:text-xl text-ink leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:text-sage">
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
                    <p className="font-ui text-[10px] font-bold uppercase tracking-widest text-muted mb-2">
                      Tags
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {recipe.tags.map((tag) => (
                        <span
                          key={tag}
                          className="bg-linen px-2.5 py-1 font-ui text-[10px] uppercase tracking-wider text-ink"
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
                <h3 className="font-display text-2xl md:text-3xl text-ink border-b border-ink/10 pb-3 mb-6">
                  Instructions
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
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sage text-white font-ui text-xs font-bold">
                        {inst.step}
                      </span>
                      <div className="pt-0.5">
                        <p className="font-display text-base sm:text-[17px] text-ink leading-relaxed">
                          {inst.text}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* 6. Notes and Tips Card */}
              {recipe.notes && recipe.notes.length > 0 && (
                <div className="border-l-4 border-sunshine bg-cream/30 p-6 md:p-8 mt-10">
                  <h4 className="font-display text-xl text-ink mb-3">
                    Cook&apos;s Notes & Tips
                  </h4>
                  <ul className="space-y-2.5 font-display text-sm md:text-base text-ink/90 list-disc list-inside">
                    {recipe.notes.map((note, idx) => (
                      <li key={idx} className="leading-relaxed">
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </article>

        {/* 7. Related Recipes Section */}
        {related.length > 0 && (
          <section className="mx-auto max-w-[1200px] px-4 sm:px-6 pt-16 md:pt-24">
            <div className="border-t border-ink/10 pt-10">
              <h2 className="font-display text-2xl md:text-3xl text-ink mb-8 text-center sm:text-left">
                You Might Also Like
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
