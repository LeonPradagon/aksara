"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { translations, type Locale } from "@/lib/translations";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
  t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  const toggleLocale = () => {
    setLocale((prev) => (prev === "en" ? "id" : "en"));
  };

  const t = (key: string) => {
    const keys = key.split(".");
    let value: any = translations[locale];
    for (const k of keys) {
      if (value && typeof value === "object" && k in value) {
        value = value[k as keyof typeof value];
      } else {
        return key;
      }
    }
    return value as string;
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggleLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}
