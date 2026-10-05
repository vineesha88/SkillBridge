import { useState } from 'react'
import {
  Home, ClipboardList, Sparkles, GitBranch, Wrench, Camera,
  LayoutDashboard, FileText, History, Settings as SettingsIcon,
  Network, Menu, X, Wifi, WifiOff, Globe,
} from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { useOffline } from '../hooks/useOffline.jsx'

const navGroups = [
  {
    section: 'assessment',
    items: [
      { key: 'landing', icon: Home },
      { key: 'selfDeclaration', icon: ClipboardList },
      { key: 'skillExtraction', icon: Sparkles },
      { key: 'qualificationMapping', icon: GitBranch },
      { key: 'practicalAssessment', icon: Wrench },
      { key: 'evidenceReview', icon: Camera },
    ],
  },
  {
    section: 'review',
    items: [
      { key: 'assessorDashboard', icon: LayoutDashboard },
      { key: 'competencyProfile', icon: FileText },
      { key: 'assessmentHistory', icon: History },
    ],
  },
  {
    section: 'system',
    items: [
      { key: 'systemArchitecture', icon: Network },
      { key: 'settings', icon: SettingsIcon },
    ],
  },
]

export default function Sidebar({ route, navigate }) {
  const { t } = useLanguage()
  const { isOnline, toggleOnline } = useOffline()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNav = (key) => {
    navigate(key)
    setMobileOpen(false)
  }

  const sidebarClass = `nav-sidebar ${mobileOpen ? 'open' : ''}`

  return (
    <>
      <button
        className="mobile-nav-toggle"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label="Toggle navigation"
        style={{ position: 'fixed', top: '12px', left: '12px', zIndex: 200 }}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <aside className={sidebarClass}>
        <div className="nav-brand">
          <div className="nav-brand-title">
            <span style={{ color: '#4A8B6B' }}>●</span> SkillBridge
          </div>
          <div className="nav-brand-subtitle">AI-Assisted RPL Assessment</div>
        </div>

        {navGroups.map((group) => (
          <div key={group.section} className="nav-section">
            <div className="nav-section-label">{group.section}</div>
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.key}
                  className={`nav-item ${route === item.key ? 'active' : ''}`}
                  onClick={() => handleNav(item.key)}
                >
                  <Icon size={18} />
                  <span>{t(item.key)}</span>
                </button>
              )
            })}
          </div>
        ))}

        <div className="nav-footer">
          <button
            className="nav-footer-item"
            onClick={toggleOnline}
            style={{ background: 'none', border: 'none', width: '100%', cursor: 'pointer' }}
          >
            <span className={`nav-footer-dot ${isOnline ? 'online' : 'offline'}`} />
            {isOnline ? t('online') : t('offline')}
            {isOnline ? <Wifi size={16} /> : <WifiOff size={16} />}
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.3)',
            zIndex: 99,
          }}
        />
      )}
    </>
  )
}
