import React, { createContext, useContext, useEffect, useState } from 'react'
import { CONTENT } from '../content'

export type Language = 'bn' | 'en'

interface LanguageContextType {
  lang: Language
  setLang: (lang: Language) => void
  toggleLanguage: () => void
  t: typeof CONTENT.translations.bn
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const STORAGE_KEY = 'azraf_huzaifa_invitation_lang'

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'bn' || saved === 'en') {
        return saved
      }
    }
    return CONTENT.config.defaultLanguage
  })

  const setLang = (newLang: Language) => {
    setLangState(newLang)
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLang)
    }
  }

  const toggleLanguage = () => {
    setLang(lang === 'bn' ? 'en' : 'bn')
  }

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang
      document.title =
        lang === 'bn'
          ? 'আজরাফ & হুজাইফা | বিবাহোত্তর সংবর্ধনা'
          : 'Azraf & Huzaifa | Wedding Reception'
    }
  }, [lang])

  const t = CONTENT.translations[lang]

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextType {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
