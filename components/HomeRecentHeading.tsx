"use client";

import SectionHeading from "./SectionHeading";
import { useLanguage } from "./LanguageProvider";

export default function HomeRecentHeading() {
  const { t } = useLanguage();

  return (
    <SectionHeading
      title={t.home.recentRecipes}
      actionText={t.home.browseAll}
      actionHref="/recipes"
    />
  );
}
