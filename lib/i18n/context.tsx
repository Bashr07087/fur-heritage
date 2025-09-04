"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Language = "en" | "ar" | "fur"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  isRTL: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// In-memory translations
const translationsCache: Record<Language, Record<string, string>> = {
  en: {},
  ar: {},
  fur: {},
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")
  const [translationsLoaded, setTranslationsLoaded] = useState(false)

  // Load translations dynamically
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [enTranslations, arTranslations, furTranslations] = await Promise.all([
          import("./translations/en.json"),
          import("./translations/ar.json"),
          import("./translations/fur.json"),
        ])

        translationsCache.en = enTranslations.default
        translationsCache.ar = arTranslations.default
        translationsCache.fur = furTranslations.default

        setTranslationsLoaded(true)
      } catch (error) {
        console.error("Failed to load translations:", error)
        setTranslationsLoaded(true) // avoid infinite loading
      }
    }

    loadTranslations()
  }, [])

  // Load saved language from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("language") as Language
    if (saved && ["en", "ar", "fur"].includes(saved)) {
      setLanguage(saved)
    }
  }, [])

  // Update localStorage and document attributes on language change
  useEffect(() => {
    localStorage.setItem("language", language)
    document.documentElement.lang = language
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr"
  }, [language])

  const t = (key: string): string => {
    if (!translationsLoaded) return key
    return getTranslation(key, language)
  }

  const isRTL = language === "ar"

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

// Helper to fetch translation with fallback
function getTranslation(key: string, language: Language): string {
  const translations = translationsCache[language] || {}
  return translations[key] || translationsCache.en[key] || key
}
