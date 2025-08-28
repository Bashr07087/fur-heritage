"use client"

import { useLanguage } from "./context"

export function useTranslation() {
  const { t, language, isRTL } = useLanguage()

  return {
    t,
    language,
    isRTL,
    dir: isRTL ? "rtl" : "ltr",
  }
}

export function useDirection() {
  const { isRTL } = useLanguage()
  return {
    isRTL,
    dir: isRTL ? "rtl" : "ltr",
    textAlign: isRTL ? "right" : "left",
    marginStart: isRTL ? "mr" : "ml",
    marginEnd: isRTL ? "ml" : "mr",
    paddingStart: isRTL ? "pr" : "pl",
    paddingEnd: isRTL ? "pl" : "pr",
  }
}
