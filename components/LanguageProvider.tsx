"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import type { Language, TranslationDictionary } from "@/lib/i18n/types";
import { translations } from "@/lib/i18n/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: TranslationDictionary;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "ceylonspicer_language";

export function LanguageProvider({
  children,
  initialLanguage = "en",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguageState] = useState<Language>(initialLanguage);
  const [mounted, setMounted] = useState(false);

  // Apply lang attribute to document.documentElement
  const applyLanguage = useCallback((lang: Language) => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, []);

  // Initialize from localStorage or cookie on client mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Language | null;
      if (stored === "en" || stored === "it") {
        setLanguageState(stored);
        applyLanguage(stored);
      } else {
        applyLanguage(initialLanguage);
      }
    } catch {
      // Storage access fallback
      applyLanguage(initialLanguage);
    }
    setMounted(true);
  }, [applyLanguage, initialLanguage]);

  const setLanguage = useCallback(
    (newLang: Language) => {
      setLanguageState(newLang);
      try {
        localStorage.setItem(STORAGE_KEY, newLang);
        document.cookie = `${STORAGE_KEY}=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      } catch {
        // Storage access restricted
      }
      applyLanguage(newLang);
    },
    [applyLanguage]
  );

  const toggleLanguage = useCallback(() => {
    const nextLang: Language = language === "en" ? "it" : "en";
    setLanguage(nextLang);
  }, [language, setLanguage]);

  const dictionary = translations[language] || translations.en;

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: dictionary,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
