import { useState, useEffect, useCallback, createContext, useContext } from 'react'
import { translations } from '../data/translations.js'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('skillbridge_lang') || 'en'
    } catch {
      return 'en'
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('skillbridge_lang', lang)
    } catch {
      // ignore
    }
  }, [lang])

  const t = useCallback(
    (key) => {
      const dict = translations[lang] || translations.en
      return dict[key] || translations.en[key] || key
    },
    [lang],
  )

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
