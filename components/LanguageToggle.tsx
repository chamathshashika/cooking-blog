"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";
import { useLanguage } from "./LanguageProvider";

type Props = {
  variant?: "default" | "pill" | "minimal";
  className?: string;
  showLabel?: boolean;
};

export default function LanguageToggle({
  variant = "pill",
  className = "",
  showLabel = false,
}: Props) {
  const { language, setLanguage, toggleLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectLanguage = (newLang: "en" | "it") => {
    setLanguage(newLang);
    router.refresh();
  };

  const handleToggleLanguage = () => {
    toggleLanguage();
    router.refresh();
  };

  // Avoid layout shift before client mount
  if (!mounted) {
    return (
      <div
        className={`inline-flex h-7 w-16 items-center justify-center opacity-0 ${className}`}
        aria-hidden="true"
      />
    );
  }

  const isEn = language === "en";

  // Segmented Pill Selector [ EN | IT ] - Sleek & compact
  if (variant === "pill") {
    return (
      <div
        role="group"
        aria-label="Language selection"
        className={`inline-flex h-7 items-center rounded-full border border-ink/15 dark:border-hairline bg-cream/70 dark:bg-panel p-0.5 shadow-2xs transition-colors ${className}`}
      >
        <button
          type="button"
          onClick={() => handleSelectLanguage("en")}
          aria-pressed={isEn}
          aria-label="Switch language to English"
          className={`flex h-6 min-w-[24px] sm:min-w-[26px] items-center justify-center rounded-full px-2 font-ui text-[10px] font-bold uppercase tracking-wider transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
            isEn
              ? "bg-sage dark:bg-amber-primary text-white shadow-xs"
              : "text-ink/70 dark:text-slate-muted hover:text-ink dark:hover:text-ice"
          }`}
        >
          EN
        </button>

        <button
          type="button"
          onClick={() => handleSelectLanguage("it")}
          aria-pressed={!isEn}
          aria-label="Passa alla lingua italiana (Switch to Italian)"
          className={`flex h-6 min-w-[24px] sm:min-w-[26px] items-center justify-center rounded-full px-2 font-ui text-[10px] font-bold uppercase tracking-wider transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${
            !isEn
              ? "bg-sage dark:bg-amber-primary text-white shadow-xs"
              : "text-ink/70 dark:text-slate-muted hover:text-ink dark:hover:text-ice"
          }`}
        >
          IT
        </button>
      </div>
    );
  }

  // Minimal single toggle button with Globe icon
  if (variant === "minimal") {
    return (
      <button
        onClick={handleToggleLanguage}
        type="button"
        aria-label={t.common.languageSwitchAria}
        className={`group inline-flex h-7 items-center gap-1 px-2 font-ui text-[10px] font-semibold uppercase tracking-wider text-muted dark:text-slate-muted hover:text-ink dark:hover:text-ice transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${className}`}
      >
        <Globe className="h-3 w-3 text-sage dark:text-amber-text transition-transform duration-300 group-hover:rotate-45" />
        <span>{isEn ? "IT" : "EN"}</span>
      </button>
    );
  }

  // Default compact button with Globe icon and active code
  return (
    <button
      onClick={handleToggleLanguage}
      type="button"
      aria-label={t.common.languageSwitchAria}
      className={`group relative flex h-7 items-center justify-center rounded-md px-2 text-ink dark:text-ice transition-colors duration-200 hover:text-sage dark:hover:text-amber-text hover:bg-cream/60 dark:hover:bg-panel focus:outline-none focus-visible:ring-2 focus-visible:ring-sage ${className}`}
    >
      <Globe className="h-3.5 w-3.5 text-sage dark:text-amber-text transition-transform duration-300 group-hover:rotate-45" />
      <span className="ml-1 font-ui text-[10px] font-bold uppercase tracking-wider">
        {isEn ? "EN" : "IT"}
      </span>
      {showLabel && (
        <span className="ml-1.5 font-ui text-[10px] uppercase tracking-wider text-muted dark:text-slate-muted">
          {isEn ? "English" : "Italiano"}
        </span>
      )}
    </button>
  );
}
