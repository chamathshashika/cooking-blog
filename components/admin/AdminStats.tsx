import Link from "next/link";
import { BookOpen, Star, Layers, Clock, ArrowUpRight } from "lucide-react";
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
      pill: "Published",
      pillColor: "bg-sage/10 text-sage border-sage/20",
      description: "Traditional island dishes in database",
      icon: BookOpen,
      href: "/admin/recipes",
      accentBorder: "border-t-4 border-t-sage",
      iconBg: "bg-sage/10 text-sage",
    },
    {
      label: "Featured Recipes",
      value: featuredCount,
      pill: "Hero Display",
      pillColor: "bg-sunshine/20 text-ink border-sunshine/40",
      description: "Showcased on the home hero banner",
      icon: Star,
      href: "/admin/recipes?featured=true",
      accentBorder: "border-t-4 border-t-sunshine",
      iconBg: "bg-sunshine/20 text-ink",
    },
    {
      label: "Categories",
      value: totalCategories,
      pill: "Taxonomy",
      pillColor: "bg-cream text-ink border-ink/10",
      description: "Curated Sri Lankan food themes",
      icon: Layers,
      href: "/admin/categories",
      accentBorder: "border-t-4 border-t-[#D4AF37]",
      iconBg: "bg-cream text-ink",
    },
    {
      label: "Avg. Simmer Time",
      value: "25m",
      pill: "Cooking Prep",
      pillColor: "bg-linen text-muted border-ink/10",
      description: "Average cook time across all dishes",
      icon: Clock,
      href: "/admin/recipes",
      accentBorder: "border-t-4 border-t-muted/40",
      iconBg: "bg-linen text-muted",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statCards.map((card) => {
        const Icon = card.icon;
        return (
          <Link
            key={card.label}
            href={card.href}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-lg border border-ink/10 bg-white p-5 shadow-2xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:border-ink/20 ${card.accentBorder}`}
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-ui text-[11px] font-bold uppercase tracking-wider text-muted">
                  {card.label}
                </span>
                <span
                  className={`inline-flex items-center rounded px-1.5 py-0.5 font-ui text-[9px] font-bold uppercase tracking-wider border ${card.pillColor}`}
                >
                  {card.pill}
                </span>
              </div>

              <div className="mt-3 flex items-baseline justify-between">
                <span className="font-display text-3xl sm:text-4xl text-ink tracking-tight">
                  {card.value}
                </span>
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md transition-transform group-hover:scale-110 ${card.iconBg}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-ink/5 pt-3">
              <span className="font-ui text-[11px] text-muted line-clamp-1">
                {card.description}
              </span>
              <span className="inline-flex items-center gap-0.5 font-ui text-[10px] font-bold uppercase tracking-wider text-sage group-hover:text-sage-dark shrink-0">
                <span>View</span>
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
