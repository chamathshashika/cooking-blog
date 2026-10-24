import Image from "next/image";
import Link from "next/link";
import StarRating from "./StarRating";

type Props = {
  title: string;
  category: string;
  image: string;
  slug: string;
  rating?: number;
  aspectRatio?: "3/4" | "4/3";
  prepTime?: string;
  cookTime?: string;
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
  className = "",
  priority = false,
}: Props) {
  const aspectClass =
    aspectRatio === "4/3" ? "aspect-[4/3]" : "aspect-[3/4]";

  return (
    <article className={`group block text-center ${className}`}>
      <Link href={`/recipes/${slug}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-sage">
        <div
          className={`relative ${aspectClass} w-full overflow-hidden bg-linen dark:bg-panel border border-transparent dark:border-hairline`}
          style={{ aspectRatio: aspectRatio === "4/3" ? "4 / 3" : "3 / 4" }}
        >
          <Image
            src={image}
            alt={title}
            fill
            priority={priority}
            sizes="(min-width: 1200px) 25vw, (min-width: 768px) 50vw, 100vw"
            className="object-cover transition-transform duration-200 ease-out group-hover:scale-[1.03]"
          />
          <span className="absolute bottom-0 left-0 bg-white dark:bg-surface px-2.5 py-1 font-ui text-[10px] font-semibold uppercase tracking-widest text-ink dark:text-ice border-t border-r border-transparent dark:border-hairline select-none">
            {category}
          </span>
        </div>

        <div className="pt-3.5 pb-1">
          <h3 className="font-display text-[18px] md:text-[19px] leading-snug text-ink dark:text-ice transition-colors duration-150 group-hover:text-sage dark:group-hover:text-amber-text line-clamp-2">
            {title}
          </h3>

          {(prepTime || cookTime) && (
            <p className="mt-1 font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
              {prepTime && `Prep: ${prepTime}`}
              {prepTime && cookTime && " • "}
              {cookTime && `Cook: ${cookTime}`}
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
