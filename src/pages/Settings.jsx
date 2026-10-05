import { Settings as SettingsIcon, Wifi, WifiOff, RefreshCw, Globe, Trash2, Info } from 'lucide-react'
import { useState } from 'react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { useOffline } from '../hooks/useOffline.jsx'
import { languages } from '../data/translations.js'
import { clearState } from '../utils/storage.js'

export default function Settings() {
  const { t, lang, setLang } = useLanguage()
  const { isOnline, toggleOnline, pendingRecords, simulateSync } = useOffline()
  const [syncMessage, setSyncMessage] = useState('')
  const [resetMessage, setResetMessage] = useState('')

  const handleSync = () => {
    const count = simulateSync()
    setSyncMessage(`${count} ${t('recordsSynced')}`)
    setTimeout(() => setSyncMessage(''), 4000)
  }

  const handleReset = () => {
    clearState()
    setResetMessage('Local data cleared. Please reload the page.')
    setTimeout(() => setResetMessage(''), 5000)
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <SettingsIcon size={24} color="var(--color-charcoal)" />
        <h1 style={{ margin: 0 }}>{t('settings')}</h1>
      </div>

      {/* Language */}
      <div className="card mb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          <Globe size={20} color="var(--color-charcoal)" />
          <h2 style={{ margin: 0, fontSize: '1.125rem' }}>Language / భాష / भाषा</h2>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
          Worker-facing labels are translated. The assessor dashboard remains in English for consistency.
        </p>
        <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
          {languages.map((l) => (
            <button
              key={l.code}
              className={`filter-btn ${lang === l.code ? 'active' : ''}`}
              onClick={() => setLang(l.code)}
            >
              {l.nativeLabel}
            </button>
          ))}
        </div>
      </div>

      {/* Offline / Sync */}
      <div className="card mb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          {isOnline ? <Wifi size={20} color="var(--color-forest)" /> : <WifiOff size={20} color="var(--color-amber)" />}
          <h2 style={{ margin: 0, fontSize: '1.125rem' }}>Offline & Sync</h2>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
          Assessment data is stored locally in the browser. When offline, data is saved and can be synchronized later.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-3)' }}>
          <span className={`badge ${isOnline ? 'badge-success' : 'badge-warning'}`}>
            {isOnline ? t('online') : t('offline')}
          </span>
          <button className="btn btn-secondary btn-sm" onClick={toggleOnline}>
            {isOnline ? 'Go Offline' : 'Go Online'}
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <button className="btn btn-primary btn-sm" onClick={handleSync} disabled={pendingRecords === 0 && isOnline}>
            <RefreshCw size={14} />
            {t('simulateSync')}
          </button>
          <span style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            {pendingRecords > 0 ? `${pendingRecords} record(s) pending` : 'All records synchronized'}
          </span>
        </div>

        {syncMessage && (
          <div className="callout callout-important" style={{ marginTop: 'var(--space-3)' }}>
            {syncMessage}
          </div>
        )}
      </div>

      {/* Demo data management */}
      <div className="card mb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          <Info size={20} color="var(--color-charcoal)" />
          <h2 style={{ margin: 0, fontSize: '1.125rem' }}>Demo Data</h2>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
          This application uses local demo data stored in your browser. Clearing local data will reset the app to its initial demo state on the next reload.
        </p>
        <button className="btn btn-terracotta btn-sm" onClick={handleReset}>
          <Trash2 size={14} />
          Clear Local Data
        </button>
        {resetMessage && (
          <div className="callout callout-warning" style={{ marginTop: 'var(--space-3)' }}>
            {resetMessage}
          </div>
        )}
      </div>

      {/* About */}
      <div className="card">
        <h2 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-3)' }}>About SkillBridge</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          SkillBridge is a prototype MVP for SIH 2026 — Problem Statement 26242.
          It demonstrates an AI-assisted RPL assessment workflow.
          AI features are simulated using local logic. No real certification is issued.
          The authorized assessor always makes the final decision.
        </p>
        <div style={{ marginTop: 'var(--space-3)', fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>
          <strong>Frontend:</strong> React + JavaScript + Vite<br />
          <strong>Data:</strong> Local JSON / localStorage<br />
          <strong>AI:</strong> Demonstration / mock AI assistance layer<br />
          <strong>Deployment:</strong> GitHub Pages
        </div>
      </div>
    </div>
  )
}
