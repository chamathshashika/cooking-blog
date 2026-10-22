import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  title: string;
  actionText?: string;
  actionHref?: string;
  className?: string;
};

export default function SectionHeading({
  title,
  actionText,
  actionHref,
  className = "",
}: Props) {
  return (
    <div
      className={`flex items-baseline justify-between border-b border-ink/10 dark:border-hairline pb-4 mb-8 ${className}`}
    >
      <h2 className="font-display text-2xl md:text-[28px] text-ink dark:text-ice leading-tight">
        {title}
      </h2>

      {actionText && actionHref && (
        <Link
          href={actionHref}
          className="inline-flex items-center gap-1 font-ui text-[11px] font-semibold uppercase tracking-wider text-ink dark:text-ice transition-colors hover:text-sage dark:hover:text-amber-text focus:outline-none focus:ring-1 focus:ring-sage dark:focus:ring-amber-primary"
        >
          <span>{actionText}</span>
          <ArrowRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}
