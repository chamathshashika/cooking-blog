"use client";

import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";
import { useLanguage } from "./LanguageProvider";
import { localizeRecipe } from "@/lib/i18n/dynamicContent";

import type { Recipe } from "@/lib/data";

type Props = {
  title: string;
  category: string;
  image: string;
  slug: string;
  rating?: number;
  aspectRatio?: "3/4" | "4/3";
  prepTime?: string;
  cookTime?: string;
  translations?: Recipe["translations"];
  className?: string;
  priority?: boolean;
};

export default function RecipeCard({
  title,
  category,
  image,
  slug,
  rating,
  aspectRatio = "3/4",
  prepTime,
  cookTime,
  translations,
  className = "",
  priority = false,
}: Props) {
  const { language, t } = useLanguage();
  const aspectClass =
    aspectRatio === "4/3" ? "aspect-[4/3]" : "aspect-[3/4]";

  const localized = localizeRecipe(
    {
      id: slug,
      slug,
      title,
      category,
      image,
      prepTime: prepTime ?? "",
      cookTime: cookTime ?? "",
      rating: rating ?? 0,
      servings: 4,
      excerpt: "",
      translations,
    },
    language
  );

  const displayTitle = localized.title || title;
  const displayCategory = localized.category || category;
  const displayPrep = localized.prepTime || prepTime;
  const displayCook = localized.cookTime || cookTime;

  return (
    <article className={`group block text-center ${className}`}>
      <Link href={`/recipes/${slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-sage">
        <div
          className={`relative ${aspectClass} w-full overflow-hidden bg-linen dark:bg-panel border border-transparent dark:border-hairline`}
          style={{ aspectRatio: aspectRatio === "4/3" ? "4 / 3" : "3 / 4" }}
        >
          <Image
            src={image}
            alt={displayTitle}
            fill
            priority={priority}
            sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-0 left-0 bg-white dark:bg-surface px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-widest text-ink dark:text-ice border-t border-r border-transparent dark:border-hairline select-none">
            {displayCategory}
          </span>
        </div>

        <div className="pt-3.5 pb-1">
          <h3 className="font-display text-[18px] md:text-[19px] leading-snug text-ink dark:text-ice transition-colors duration-150 group-hover:text-sage dark:group-hover:text-amber-text line-clamp-2">
            {displayTitle}
          </h3>

          {(displayPrep || displayCook) && (
            <p className="mt-1 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
              {displayPrep && `${t.common.prep}: ${displayPrep}`}
              {displayPrep && displayCook && " • "}
              {displayCook && `${t.common.cook}: ${displayCook}`}
            </p>
          )}

          {rating !== undefined && rating > 0 && (
            <div className="mt-1.5 flex justify-center">
              <StarRating value={rating} />
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
