import { Star } from "lucide-react";

type Props = {
  value: number;
  max?: number;
  className?: string;
};

export default function StarRating({ value, max = 5, className = "" }: Props) {
  return (
    <div
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
                ? "fill-star text-star"
                : "fill-transparent text-gray-300"
            }`}
            aria-hidden="true"
          />
        );
      })}
    </div>
  );
}
