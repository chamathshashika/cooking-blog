import { Star } from "lucide-react";

type Props = {
  value: number;
  max?: number;
  className?: string;
};

export default function StarRating({ value, max = 5, className = "" }: Props) {
  return (
    <div
      role="img"
      className={`inline-flex items-center justify-center gap-1 ${className}`}
      aria-label={`Rated ${value} out of ${max} stars`}
    >
      {Array.from({ length: max }, (_, i) => {
        const starNumber = i + 1;
        const isFilled = starNumber <= Math.round(value);
        return (
          <Star
            key={i}
            className={`h-3.5 w-3.5 ${
              isFilled
                ? "fill-star text-star dark:fill-gold dark:text-gold"
                : "fill-transparent text-ink/20 dark:text-panel"
            }`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
