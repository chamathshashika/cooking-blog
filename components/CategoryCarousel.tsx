"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category } from "@/lib/data";
import { getBlobDisplayUrl, isBlobProxyUrl } from "@/lib/blob-util";

type Props = {
  categories: Category[];
};

export default function CategoryCarousel({ categories }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className="w-full py-16 md:py-24"
      aria-label="Explore recipes by category"
    >
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6">
        <div className="relative flex items-center justify-between mb-10">
          <div className="w-10" />
          <h2 className="text-center font-display text-3xl md:text-4xl text-ink dark:text-ice lowercase">
            explore by category
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous categories"
              className="flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center rounded-full border border-ink/20 dark:border-hairline text-ink dark:text-ice bg-transparent dark:bg-panel transition-colors hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next categories"
              className="flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center rounded-full border border-ink/20 dark:border-hairline text-ink dark:text-ice bg-transparent dark:bg-panel transition-colors hover:border-sage dark:hover:border-amber-primary hover:text-sage dark:hover:text-amber-text focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex items-center gap-7 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth motion-reduce:scroll-auto pb-4 px-2 focus:outline-none"
          tabIndex={0}
          aria-label="Category scroll list"
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center shrink-0 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 overflow-hidden rounded-full bg-cream dark:bg-panel border-2 border-transparent dark:border-hairline transition-all duration-200 group-hover:scale-105 group-hover:border-sage dark:group-hover:border-amber-primary">
                <Image
                  src={getBlobDisplayUrl(cat.image)}
                  alt={`${cat.name} category`}
                  fill
                  sizes="(min-width: 768px) 128px, (min-width: 640px) 112px, 96px"
                  unoptimized={isBlobProxyUrl(cat.image)}
                  className="object-cover"
                />
              </div>
              <span className="mt-3.5 font-display text-base md:text-lg lowercase text-ink dark:text-ice transition-colors group-hover:text-sage dark:group-hover:text-amber-text">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
