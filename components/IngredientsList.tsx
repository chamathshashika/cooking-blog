"use client";

import { useState } from "react";
import { Check } from "lucide-react";
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
    <div className="bg-linen/40 p-6 md:p-8 border border-ink/5">
      <div className="flex items-baseline justify-between border-b border-ink/10 pb-3 mb-6">
        <h3 className="font-display text-2xl text-ink">Ingredients</h3>
        <span className="font-ui text-[11px] uppercase tracking-wider text-muted">
          {ingredients.length} items
        </span>
      </div>

      <ul className="space-y-3.5" role="list" aria-label="Recipe ingredients">
        {ingredients.map((item, index) => {
          const isChecked = !!checkedItems[index];

          return (
            <li
              key={index}
              onClick={() => toggleItem(index)}
              className="flex items-start gap-3.5 cursor-pointer group select-none transition-opacity"
            >
              <button
                type="button"
                role="checkbox"
                aria-checked={isChecked}
                aria-label={`Mark ${item.name} as prepared`}
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border transition-all ${
                  isChecked
                    ? "bg-sage border-sage text-white"
                    : "border-ink/30 bg-white group-hover:border-sage"
                }`}
              >
                {isChecked && <Check className="h-3.5 w-3.5 stroke-[2.5]" />}
              </button>

              <span
                className={`font-ui text-sm leading-relaxed transition-all ${
                  isChecked
                    ? "line-through text-muted/60"
                    : "text-ink group-hover:text-ink/80"
                }`}
              >
                <strong className="font-semibold text-ink">{item.amount}</strong>{" "}
                <span>{item.name}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
