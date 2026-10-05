import { Globe } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { languages } from '../data/translations.js'

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="lang-select">
      <Globe size={16} color="var(--color-text-secondary)" />
      <select value={lang} onChange={(e) => setLang(e.target.value)} aria-label="Select language">
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.nativeLabel}
          </option>
        ))}
      </select>
    </div>
  )
}
