"use client"

import { useLanguage } from "./context"

// Translation hook
export function useTranslation() {
  const { t, language, isRTL } = useLanguage()

  return {
    t,                 // Function to get translation by key
    language,          // Current language code: "en" | "ar" | "fur"
    isRTL,             // Boolean for RTL languages (Arabic only)
    dir: isRTL ? "rtl" : "ltr", // Document direction
  }
}

// UI direction and alignment hook
export function useDirection() {
  const { isRTL } = useLanguage()

  return {
    isRTL,
    dir: isRTL ? "rtl" : "ltr",
    textAlign: isRTL ? "right" : "left",
    marginStart: isRTL ? "mr" : "ml",   // Tailwind CSS margin start
    marginEnd: isRTL ? "ml" : "mr",     // Tailwind CSS margin end
    paddingStart: isRTL ? "pr" : "pl",  // Tailwind CSS padding start
    paddingEnd: isRTL ? "pl" : "pr",    // Tailwind CSS padding end
  }
}
