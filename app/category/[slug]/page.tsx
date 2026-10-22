import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Sparkles } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RecipeCard from "@/components/RecipeCard";
import CategoryCarousel from "@/components/CategoryCarousel";
import SubscribeBanner from "@/components/SubscribeBanner";
import {
  categories,
  getCategoryBySlug,
  getRecipesByCategory,
} from "@/lib/data";
import { getBlobDisplayUrl, isBlobProxyUrl } from "@/lib/blob-util";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | CeylonSpicer",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.displayName} | Authentic Sri Lankan Recipes | CeylonSpicer`,
    description: category.description,
    openGraph: {
      title: `${category.displayName} - Sri Lankan Recipes`,
      description: category.description,
      images: [
        {
          url: category.image,
          width: 800,
          height: 600,
          alt: `${category.displayName} collection`,
        },
      ],
    },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const recipes = getRecipesByCategory(slug);
  const otherCategories = categories.filter((c) => c.slug !== slug);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-obsidian transition-colors duration-200">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 dark:border-hairline bg-linen/30 dark:bg-surface/50 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
            <Link
              href="/"
              className="hover:text-ink dark:hover:text-ice transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/category"
              className="hover:text-ink dark:hover:text-ice transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              Categories
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink dark:text-ice font-semibold">
              {category.displayName}
            </span>
          </div>
        </div>

        {/* Category Hero Banner */}
        <section className="bg-cream dark:bg-surface py-12 md:py-16 text-center border-b border-ink/10 dark:border-hairline transition-colors duration-200">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            {/* Category Avatar Thumbnail */}
            <div className="mx-auto mb-5 relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-sage/40 dark:border-amber-primary/40 bg-white dark:bg-panel shadow-xs">
              <Image
                src={getBlobDisplayUrl(category.image)}
                alt={`${category.displayName} hero image`}
                fill
                sizes="(min-width: 640px) 112px, 96px"
                unoptimized={isBlobProxyUrl(category.image)}
                className="object-cover"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-sunshine/30 dark:bg-panel text-ink dark:text-ice font-ui text-[10px] font-bold uppercase tracking-[0.12em] border border-transparent dark:border-hairline">
              <Sparkles className="h-3 w-3 text-ink/70 dark:text-gold" />
              <span>Category Collection</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink dark:text-ice leading-tight">
              {category.displayName}
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 dark:text-slate-muted max-w-xl mx-auto leading-relaxed">
              {category.description}
            </p>

            <div className="mt-4 flex items-center justify-center gap-4 font-ui text-xs text-muted dark:text-slate-muted">
              <span className="font-semibold uppercase tracking-wider text-sage dark:text-amber-text">
                {recipes.length} {recipes.length === 1 ? "Recipe" : "Recipes"}{" "}
                Available
              </span>
            </div>
          </div>
        </section>

        {/* Recipes Grid Section */}
        <section
          className="mx-auto max-w-[1200px] px-4 sm:px-6 py-12 md:py-16"
          aria-label={`${category.displayName} Recipe List`}
        >
          {recipes.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recipes.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  title={recipe.title}
                  category={recipe.category}
                  image={recipe.image}
                  slug={recipe.slug}
                  rating={recipe.rating}
                  aspectRatio="4/3"
                  prepTime={recipe.prepTime}
                  cookTime={recipe.cookTime}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-linen/20 dark:bg-panel border border-ink/10 dark:border-hairline p-8 max-w-md mx-auto">
              <p className="font-display text-lg text-ink dark:text-ice mb-2">
                No recipes published in this category yet.
              </p>
              <p className="font-display text-sm text-muted dark:text-slate-muted mb-6">
                Our kitchen is busy simmering authentic dishes. Check back soon!
              </p>
              <Link
                href="/recipes"
                className="inline-flex min-h-[44px] items-center gap-2 bg-sage dark:bg-amber-primary px-6 py-2.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage-dark dark:hover:bg-amber-secondary transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-ink"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Browse All Recipes</span>
              </Link>
            </div>
          )}
        </section>

        {/* Explore Other Categories Slider */}
        <div className="border-t border-ink/10 dark:border-hairline bg-linen/20 dark:bg-panel/30">
          <CategoryCarousel categories={otherCategories} />
        </div>

        {/* Subscribe Banner */}
        <div className="mt-12 md:mt-16">
          <SubscribeBanner />
        </div>
      </main>

      <Footer />
    </div>
  );
}
