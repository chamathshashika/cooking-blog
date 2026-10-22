"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type Props = {
  variant?: "default" | "minimal" | "pill";
  className?: string;
  showLabel?: boolean;
};

export default function ThemeToggle({
  variant = "default",
  className = "",
  showLabel = false,
}: Props) {
  const { resolvedTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid layout shift before mount
  if (!mounted) {
    return (
      <div
        className={`flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  if (variant === "pill") {
    return (
      <button
        onClick={toggleTheme}
        type="button"
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
        className={`group flex min-h-[44px] items-center gap-2.5 rounded-full px-3.5 py-2 font-ui text-xs font-semibold uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
          isDark
            ? "bg-panel text-ice border border-hairline hover:border-amber-primary/40 hover:text-amber-text"
            : "bg-cream/80 text-ink border border-ink/10 hover:bg-cream hover:text-sage"
        } ${className}`}
      >
        <span className="relative flex h-5 w-5 items-center justify-center">
          {isDark ? (
            <Sun className="h-4 w-4 text-gold transition-transform duration-300 group-hover:rotate-45" />
          ) : (
            <Moon className="h-4 w-4 text-ink transition-transform duration-300 group-hover:-rotate-12" />
          )}
        </span>
        <span>{isDark ? "Light Mode" : "Dark Mode"}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      type="button"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`group relative flex min-h-[44px] min-w-[44px] h-11 w-11 items-center justify-center rounded-lg transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
        isDark
          ? "text-ice hover:text-amber-text hover:bg-panel"
          : "text-ink hover:text-sage hover:bg-cream/60"
      } ${className}`}
    >
      <span className="relative flex h-5 w-5 items-center justify-center">
        {isDark ? (
          <Sun className="h-4 w-4 text-gold transition-transform duration-300 group-hover:rotate-45" />
        ) : (
          <Moon className="h-4 w-4 text-ink transition-transform duration-300 group-hover:-rotate-12" />
        )}
      </span>
      {showLabel && (
        <span className="ml-2 font-ui text-xs uppercase tracking-wider">
          {isDark ? "Light" : "Dark"}
        </span>
      )}
    </button>
  );
}
