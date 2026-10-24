"use client";

import { useState } from "react";
import { Check, ShoppingCart, ExternalLink } from "lucide-react";
import type { Ingredient } from "@/lib/data";

type Props = {
  ingredients: Ingredient[];
};

export default function IngredientsList({ ingredients }: Props) {
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  const toggleItem = (index: number) => {
    setCheckedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="bg-linen/40 dark:bg-panel p-6 md:p-8 border border-ink/5 dark:border-hairline transition-colors duration-200">
      <div className="flex items-baseline justify-between border-b border-ink/10 dark:border-hairline pb-3 mb-6">
        <h3 className="font-display text-2xl text-ink dark:text-ice">Ingredients</h3>
        <span className="font-ui text-[11px] uppercase tracking-wider text-muted dark:text-slate-muted">
          {ingredients.length} items
        </span>
      </div>

      <ul className="space-y-2" role="list" aria-label="Recipe ingredients">
        {ingredients.map((item, index) => {
          const isChecked = !!checkedItems[index];

          return (
            <li
              key={index}
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggleItem(index);
                }
              }}
              className="flex min-h-[44px] items-center gap-3.5 py-1 px-2 -mx-2 cursor-pointer group select-none transition-colors hover:bg-white/40 dark:hover:bg-surface/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage"
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                aria-label={`Mark ${item.name} as prepared`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(index);
                }}
                className={`flex h-5 w-5 shrink-0 items-center justify-center border transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-sage focus-visible:ring-offset-1 ${
                  isChecked
                    ? "bg-sage border-sage text-white"
                    : "border-ink/30 dark:border-slate-muted/40 bg-white dark:bg-surface group-hover:border-sage dark:group-hover:border-amber-primary"
                }`}
              >
                {isChecked && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
              </button>

              <span
                className={`font-ui text-sm leading-relaxed transition-all ${
                  isChecked
                    ? "line-through text-muted/60 dark:text-slate-muted/50"
                    : "text-ink dark:text-ice group-hover:text-ink/80 dark:group-hover:text-ice/90"
                }`}
              >
                {(item.amount || item.quantity) && (
                  <>
                    <strong className="font-semibold text-ink dark:text-ice">
                      {item.amount || item.quantity}
                    </strong>{" "}
                  </>
                )}
                <span>{item.name}</span>
                {item.optional && (
                  <span className="text-xs text-muted/80 dark:text-slate-muted/80 italic ml-1.5 font-normal">
                    (optional)
                  </span>
                )}
              </span>

              {(item.affiliateUrl || item.affiliateLink) && (
                <a
                  href={item.affiliateUrl || item.affiliateLink}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  onClick={(e) => e.stopPropagation()}
                  className="ml-auto inline-flex items-center gap-1 rounded-sm border border-sage/40 dark:border-amber-primary/40 bg-white/90 dark:bg-surface px-2 py-0.5 font-ui text-[10px] font-bold uppercase tracking-wider text-sage dark:text-amber-text hover:bg-sage dark:hover:bg-amber-primary hover:text-white dark:hover:text-white transition-all shadow-2xs shrink-0"
                  title={`Buy ${item.name} online (partner link)`}
                  aria-label={`Buy ${item.name} via partner link`}
                >
                  <ShoppingCart className="h-3 w-3" />
                  <span>Shop</span>
                  <ExternalLink className="h-2.5 w-2.5 opacity-70" />
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
