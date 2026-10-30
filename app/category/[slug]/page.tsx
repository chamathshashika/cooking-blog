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
import { getCategories, getCategoryBySlug } from "@/lib/actions/category";
import { getRecipes } from "@/lib/actions/recipe";
import { getBlobDisplayUrl, isBlobProxyUrl } from "@/lib/blob-util";
import { cookies } from "next/headers";
import { translations } from "@/lib/i18n/translations";
import { localizeCategory, localizeCategories, localizeRecipes } from "@/lib/i18n/dynamicContent";
import type { Language } from "@/lib/i18n/types";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cookieStore = await cookies();
  const lang = (cookieStore.get("ceylonspicer_language")?.value as Language) || "en";
  const rawCategory = await getCategoryBySlug(slug);

  if (!rawCategory) {
    return {
      title: "Category Not Found | CeylonSpicer",
      description: "The requested category could not be found.",
    };
  }

  const category = localizeCategory(rawCategory, lang);

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
  const cookieStore = await cookies();
  const lang = (cookieStore.get("ceylonspicer_language")?.value as Language) || "en";
  const dict = translations[lang] || translations.en;

  const [rawCategory, allRawRecipes, rawAllCategories] = await Promise.all([
    getCategoryBySlug(slug),
    getRecipes(),
    getCategories(),
  ]);

  if (!rawCategory) {
    notFound();
  }

  const category = localizeCategory(rawCategory, lang);
  const allCategories = localizeCategories(rawAllCategories, lang);

  const target = slug.toLowerCase();
  const filteredRaw = allRawRecipes.filter((recipe) => {
    const rCat = recipe.category.toLowerCase();
    if (rCat === target) return true;
    if (
      (target === "dinner" || target === "curries") &&
      (rCat === "dinner" ||
        rCat === "entrees" ||
        rCat === "meat" ||
        rCat === "seafood" ||
        rCat.includes("curry"))
    ) {
      return true;
    }
    if (
      target === "desserts" &&
      (rCat === "desserts" || rCat === "sweets")
    ) {
      return true;
    }
    if (
      target === "entrees" &&
      (rCat === "entrees" || rCat === "dinner" || rCat.includes("curry"))
    ) {
      return true;
    }
    if (
      target === "lunch" &&
      (rCat === "lunch" || rCat === "entrees")
    ) {
      return true;
    }
    return false;
  });

  const recipes = localizeRecipes(filteredRaw, lang);

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
              {dict.nav.home}
            </Link>
            <span aria-hidden="true">/</span>
            <Link
              href="/category"
              className="hover:text-ink dark:hover:text-ice transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              {dict.nav.categories}
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
              <span>{lang === "it" ? "Collezione Categoria" : "Category Collection"}</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl text-ink dark:text-ice leading-tight">
              {category.displayName}
            </h1>

            <p className="mt-3 font-display text-base sm:text-lg text-ink/80 dark:text-slate-muted max-w-xl mx-auto leading-relaxed">
              {category.description}
            </p>

            <div className="mt-4 flex items-center justify-center gap-4 font-ui text-xs text-muted dark:text-slate-muted">
              <span className="font-semibold uppercase tracking-wider text-sage dark:text-amber-text">
                {recipes.length} {recipes.length === 1 ? (lang === "it" ? "Ricetta Disponibile" : "Recipe Available") : (lang === "it" ? "Ricette Disponibili" : "Recipes Available")}
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
                  translations={recipe.translations}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-linen/20 dark:bg-panel border border-ink/10 dark:border-hairline p-8 max-w-lg mx-auto">
              <p className="font-display text-2xl text-ink dark:text-ice mb-2">
                {lang === "it" ? "Nessuna ricetta in questa categoria" : "No recipes in this category yet"}
              </p>
              <p className="font-display text-sm text-muted dark:text-slate-muted mb-6">
                {lang === "it"
                  ? "Stiamo preparando nuove ricette per questa sezione. Esplora le altre categorie o torna presto!"
                  : "We are simmering new dishes for this section. Check out our other categories or check back soon!"}
              </p>
              <Link
                href="/recipes"
                className="inline-flex min-h-[44px] items-center gap-2 bg-sage dark:bg-amber-primary px-6 py-2.5 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-white hover:bg-sage-dark dark:hover:bg-amber-secondary transition-colors"
              >
                <span>{dict.home.browseAll}</span>
              </Link>
            </div>
          )}

          {/* Back link */}
          <div className="mt-12 pt-8 border-t border-ink/10 dark:border-hairline">
            <Link
              href="/category"
              className="inline-flex min-h-[44px] items-center gap-2 font-ui text-[11px] font-bold uppercase tracking-[0.1em] text-sage dark:text-amber-text hover:text-ink dark:hover:text-ice transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{dict.nav.allCategories}</span>
            </Link>
          </div>
        </section>

        {/* Visual Category Carousel */}
        <div className="border-t border-ink/10 dark:border-hairline bg-linen/20 dark:bg-panel/30">
          <CategoryCarousel categories={allCategories} />
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
