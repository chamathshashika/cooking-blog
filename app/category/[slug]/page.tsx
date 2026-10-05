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
      title: "Category Not Found | Scrumptious",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.displayName} | Authentic Sri Lankan Recipes | Scrumptious`,
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
    <div className="flex min-h-screen flex-col bg-white">
      <Header />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-ink/10 bg-linen/30 py-3">
          <div className="mx-auto flex max-w-[1200px] items-center gap-2 px-4 sm:px-6 font-ui text-[11px] uppercase tracking-wider text-muted">
            <Link href="/" className="hover:text-ink transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/category" className="hover:text-ink transition-colors">
              Categories
            </Link>
            <span>/</span>
            <span className="text-ink font-semibold">{category.displayName}</span>
          </div>
        </div>

        {/* Category Hero Banner */}
        <section className="bg-cream py-12 md:py-16 text-center border-b border-ink/10">
          <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
            {/* Category Avatar Thumbnail */}
            <div className="mx-auto mb-5 relative h-24 w-24 sm:h-28 sm:w-28 overflow-hidden rounded-full border-2 border-sage/40 bg-white shadow-xs">
              <Image
                src={category.image}
                alt={`${category.displayName} hero image`}
                fill
                sizes="(min-width: 640px) 112px, 96px"
                className="object-cover"
                priority
              />
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 mb-3 rounded-full bg-sunshine/30 text-ink font-ui text-[10px] font-bold uppercase tracking-[0.12em]">
              <Sparkles className="h-3 w-3 text-ink/70" />
              <span>Category Collection</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink leading-tight">
              {category.displayName}
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 max-w-xl mx-auto leading-relaxed">
              {category.description}
            </p>

            <div className="mt-4 flex items-center justify-center gap-4 font-ui text-xs text-muted">
              <span className="font-semibold uppercase tracking-wider text-sage">
                {recipes.length} {recipes.length === 1 ? "Recipe" : "Recipes"} Available
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
            <div className="text-center py-16 bg-linen/20 border border-ink/10 p-8 max-w-md mx-auto">
              <p className="font-display text-lg text-ink mb-2">
                No recipes published in this category yet.
              </p>
              <p className="font-display text-sm text-muted mb-6">
                Our kitchen is busy simmering authentic dishes. Check back soon!
              </p>
              <Link
                href="/recipes"
                className="inline-flex items-center gap-2 bg-sage px-5 py-2.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage/90 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Browse All Recipes</span>
              </Link>
            </div>
          )}
        </section>

        {/* Explore Other Categories Slider */}
        <div className="border-t border-ink/10 bg-linen/20">
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
