import Link from "next/link";
import { BookOpen, Star, Layers, Clock, ArrowRight } from "lucide-react";
import type { Recipe, Category } from "@/lib/data";

type Props = {
  recipes: Recipe[];
  categories: Category[];
};

export default function AdminStats({ recipes, categories }: Props) {
  const totalRecipes = recipes.length;
  const featuredCount = recipes.filter((r) => r.isFeatured).length;
  const totalCategories = categories.length;

  const statCards = [
    {
      label: "Total Recipes",
      value: totalRecipes,
      description: "Published island recipes",
      icon: BookOpen,
      href: "/admin/recipes",
      accentBg: "bg-sage/10 text-sage",
    },
    {
      label: "Featured Recipes",
      value: featuredCount,
      description: "Showcased on home hero",
      icon: Star,
      href: "/admin/recipes?featured=true",
      accentBg: "bg-sunshine/20 text-ink",
    },
    {
      label: "Categories",
      value: totalCategories,
      description: "Taxonomy & culinary themes",
      icon: Layers,
      href: "/admin/categories",
      accentBg: "bg-cream text-ink",
    },
    {
      label: "Avg. Cook Time",
      value: "25m",
      description: "Typical kitchen prep & simmer",
      icon: Clock,
      href: "/admin/recipes",
      accentBg: "bg-linen text-muted",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="flex flex-col justify-between border border-ink/10 bg-white p-5 transition-shadow hover:shadow-xs"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-ui text-[11px] font-bold uppercase tracking-wider text-muted">
                  {card.label}
                </p>
                <p className="mt-2 font-display text-3xl md:text-4xl text-ink">
                  {card.value}
                </p>
              </div>
              <div className={`flex h-10 w-10 items-center justify-center ${card.accentBg}`}>
                <Icon className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3">
              <span className="font-ui text-[11px] text-muted">
                {card.description}
              </span>
              <Link
                href={card.href}
                className="inline-flex items-center gap-1 font-ui text-[10px] font-bold uppercase tracking-wider text-sage hover:text-sage-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
              >
                <span>View</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
