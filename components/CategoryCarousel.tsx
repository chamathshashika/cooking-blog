"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Category } from "@/lib/data";

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
          <h2 className="text-center font-display text-3xl md:text-4xl text-ink lowercase">
            explore by category
          </h2>
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous categories"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-sage hover:text-sage focus:outline-none focus:ring-2 focus:ring-sage"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next categories"
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-ink/20 text-ink transition-colors hover:border-sage hover:text-sage focus:outline-none focus:ring-2 focus:ring-sage"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex items-center gap-7 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-4 px-2 focus:outline-none"
          tabIndex={0}
          aria-label="Category scroll list"
        >
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/category/${cat.slug}`}
              className="group flex flex-col items-center shrink-0 text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <div className="relative h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 overflow-hidden rounded-full bg-cream border-2 border-transparent transition-all duration-200 group-hover:scale-105 group-hover:border-sage">
                <Image
                  src={cat.image}
                  alt={`${cat.name} category`}
                  fill
                  sizes="(min-width: 768px) 128px, (min-width: 640px) 112px, 96px"
                  className="object-cover"
                />
              </div>
              <span className="mt-3.5 font-display text-base md:text-lg lowercase text-ink transition-colors group-hover:text-sage">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
