"use client";

import { useState, useEffect } from "react";
import { Star, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { rateRecipe } from "@/lib/actions/recipe";
import { useLanguage } from "./LanguageProvider";

type Props = {
  recipeSlug: string;
  recipeTitle: string;
  initialRating: number;
  initialRatingCount: number;
  initialUserRating?: number | null;
  className?: string;
};

export default function RecipeRatingWidget({
  recipeSlug,
  recipeTitle,
  initialRating,
  initialRatingCount,
  initialUserRating = null,
  className = "",
}: Props) {
  const { t } = useLanguage();
  const [averageRating, setAverageRating] = useState<number>(initialRating);
  const [totalRatings, setTotalRatings] = useState<number>(initialRatingCount);
  const [userRating, setUserRating] = useState<number | null>(initialUserRating);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync anonymous ratings from browser localStorage if not logged in
  useEffect(() => {
    if (userRating === null && typeof window !== "undefined") {
      const stored = localStorage.getItem(`ceylonspicer_rating_${recipeSlug}`);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (parsed >= 1 && parsed <= 5) {
          setUserRating(parsed);
          setHasSubmitted(true);
        }
      }
    }
  }, [recipeSlug, userRating]);

  const handleRate = async (star: number) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const result = await rateRecipe(recipeSlug, star);

      if (result.success) {
        if (result.newRating !== undefined) setAverageRating(result.newRating);
        if (result.newRatingCount !== undefined) setTotalRatings(result.newRatingCount);
        setUserRating(star);
        setHasSubmitted(true);

        if (typeof window !== "undefined") {
          localStorage.setItem(`ceylonspicer_rating_${recipeSlug}`, star.toString());
        }
      } else {
        setErrorMessage(result.error || "Could not save your rating. Please try again.");
      }
    } catch (err) {
      console.error("Failed to submit rating:", err);
      setErrorMessage("An unexpected error occurred while saving your rating.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeDisplayRating = hoveredRating || userRating || 0;
  const activeLabel =
    hoveredRating > 0
      ? t.rating.labels[hoveredRating as 1 | 2 | 3 | 4 | 5]
      : userRating
      ? `${t.rating.yourRating}: ${userRating} / 5`
      : t.rating.rateTitle;

  return (
    <section
      id="rate-recipe"
      aria-label={t.rating.rateTitle}
      className={`rounded-2xl border border-ink/10 dark:border-hairline bg-cream/30 dark:bg-surface p-6 sm:p-8 text-center transition-colors shadow-2xs ${className}`}
    >
      <div className="max-w-xl mx-auto space-y-4">
        {/* Header pill */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sunshine/20 dark:bg-panel border border-transparent dark:border-hairline text-ink dark:text-ice font-ui text-[10px] font-bold uppercase tracking-widest">
          <Sparkles className="h-3 w-3 text-sage dark:text-gold" />
          <span>Reader Kitchen Review</span>
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl sm:text-3xl text-ink dark:text-ice leading-tight">
          How did your {recipeTitle} turn out?
        </h3>

        <p className="font-display text-sm sm:text-base text-muted dark:text-slate-muted">
          Your feedback helps home cooks across the world master authentic Sri Lankan recipes.
        </p>

        {/* Interactive 5-Star Row */}
        <div className="pt-2 pb-1">
          <div
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 p-2 rounded-xl bg-white/70 dark:bg-panel/70 border border-ink/5 dark:border-hairline shadow-2xs"
            role="group"
            aria-label="Select a rating from 1 to 5 stars"
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const isFilled = star <= activeDisplayRating;
              const isSelected = star === userRating;

              return (
                <button
                  key={star}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleRate(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  onFocus={() => setHoveredRating(star)}
                  onBlur={() => setHoveredRating(0)}
                  className={`min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg p-1 transition-all transform hover:scale-115 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage dark:focus-visible:ring-amber-primary disabled:opacity-50 disabled:cursor-not-allowed ${
                    isSelected
                      ? "bg-sunshine/20 dark:bg-amber-primary/20 scale-105"
                      : "hover:bg-cream/60 dark:hover:bg-surface"
                  }`}
                  aria-label={`${star} ${t.common.stars} - ${t.rating.labels[star as 1 | 2 | 3 | 4 | 5]}`}
                >
                  <Star
                    className={`h-7 w-7 sm:h-8 sm:w-8 transition-colors ${
                      isFilled
                        ? "fill-star text-star dark:fill-gold dark:text-gold filter drop-shadow-xs"
                        : "fill-transparent text-ink/20 dark:text-ice/20"
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Dynamic Label Indicator */}
          <div className="min-h-[24px] mt-2.5 flex items-center justify-center">
            {isSubmitting ? (
              <span className="inline-flex items-center gap-1.5 font-ui text-xs font-semibold text-muted dark:text-slate-muted">
                <Loader2 className="h-3.5 w-3.5 animate-spin text-sage dark:text-amber-primary" />
                <span>{t.rating.submitting}</span>
              </span>
            ) : (
              <p className="font-ui text-xs font-medium text-ink/80 dark:text-ice/80 italic">
                {activeLabel}
              </p>
            )}
          </div>
        </div>

        {/* Success Confirmation Banner */}
        {hasSubmitted && userRating && !isSubmitting && (
          <div
            role="status"
            className="flex items-center justify-center gap-2 rounded-lg bg-sage/10 dark:bg-amber-primary/10 border border-sage/20 dark:border-amber-primary/30 py-2.5 px-4 text-xs font-ui font-semibold text-ink dark:text-ice animate-in fade-in duration-200"
          >
            <CheckCircle2 className="h-4 w-4 text-sage dark:text-amber-primary shrink-0" />
            <span>
              {t.rating.alreadyRated} ({t.rating.yourRating}: <strong>{userRating} / 5</strong>)
            </span>
          </div>
        )}

        {/* Error message if any */}
        {errorMessage && (
          <div
            role="alert"
            className="rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 p-2.5 font-ui text-xs text-red-700 dark:text-red-300"
          >
            {errorMessage}
          </div>
        )}

        {/* Live Aggregate Summary */}
        <div className="pt-3 border-t border-ink/10 dark:border-hairline flex flex-wrap items-center justify-center gap-2 sm:gap-3 font-ui text-xs text-muted dark:text-slate-muted">
          <span className="font-bold text-ink dark:text-ice flex items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-star text-star dark:fill-gold dark:text-gold inline" />
            {averageRating.toFixed(1)} / 5.0
          </span>
          <span aria-hidden="true">•</span>
          <span>
            {totalRatings} {totalRatings === 1 ? "reader rating" : "total reader ratings"} recorded in kitchen database
          </span>
        </div>
      </div>
    </section>
  );
}
