"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Store translations in memory
const translationsCache: Record<Language, Record<string, string>> = {
  en: {},
  ar: {},
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [translationsLoaded, setTranslationsLoaded] = useState(false)

  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enTranslations, arTranslations] = await Promise.all([
          import("./translations/en.json"),
          import("./translations/ar.json"),
        ])

        translationsCache.en = enTranslations.default
        translationsCache.ar = arTranslations.default
        setTranslationsLoaded(true)
      } catch (error) {
        console.error("Failed to load translations:", error)
        setTranslationsLoaded(true) // Still set to true to prevent infinite loading
      }
    }

    loadTranslations()
  }, [])

  useEffect(() => {
    // Load saved language from localStorage
    const saved = localStorage.getItem("language") as Language
    if (saved && (saved === "en" || saved === "ar")) {
      setLanguage(saved)
    }
  }, [])

  useEffect(() => {
    // Save language to localStorage and update document direction
    localStorage.setItem("language", language)
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
    document.documentElement.lang = language
  }, [language])

  const t = (key: string): string => {
    if (!translationsLoaded) return key
    return getTranslation(key, language)
  }

  const isRTL = language === "ar"

  return <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Translation function
function getTranslation(key: string, language: Language): string {
  const translations = translationsCache[language] || {}
  return translations[key] || key
}
