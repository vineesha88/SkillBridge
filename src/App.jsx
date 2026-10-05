import './styles/global.css'

import { useState } from 'react'
import { LanguageProvider, useLanguage } from './hooks/useLanguage.jsx'
import { OfflineProvider, useOffline } from './hooks/useOffline.jsx'
import { AppProvider } from './hooks/useApp.jsx'
import { useRouter } from './hooks/useRouter.js'
import Sidebar from './components/Sidebar.jsx'
import LanguageSelector from './components/LanguageSelector.jsx'

import Landing from './pages/Landing.jsx'
import SelfDeclaration from './pages/SelfDeclaration.jsx'
import SkillExtraction from './pages/SkillExtraction.jsx'
import QualificationMapping from './pages/QualificationMapping.jsx'
import PracticalAssessment from './pages/PracticalAssessment.jsx'
import EvidenceReview from './pages/EvidenceReview.jsx'
import AssessorDashboard from './pages/AssessorDashboard.jsx'
import CompetencyProfile from './pages/CompetencyProfile.jsx'
import AssessmentHistory from './pages/AssessmentHistory.jsx'
import Settings from './pages/Settings.jsx'
import SystemArchitecture from './pages/SystemArchitecture.jsx'

const demoSteps = [
  'selfDeclaration',
  'skillExtraction',
  'qualificationMapping',
  'practicalAssessment',
  'evidenceReview',
  'assessorDashboard',
  'competencyProfile',
]

function AppContent() {
  const { route, navigate } = useRouter()
  const { t } = useLanguage()
  const { isOnline, pendingRecords, simulateSync } = useOffline()
  const [syncMsg, setSyncMsg] = useState('')

  const runDemo = () => {
    navigate('selfDeclaration')
  }

  const handleSync = () => {
    const count = simulateSync()
    setSyncMsg(`${count} ${t('recordsSynced')}`)
    setTimeout(() => setSyncMsg(''), 4000)
  }

  const renderPage = () => {
    switch (route) {
      case 'landing':
        return <Landing navigate={navigate} runDemo={runDemo} />
      case 'selfDeclaration':
        return <SelfDeclaration navigate={navigate} />
      case 'skillExtraction':
        return <SkillExtraction navigate={navigate} />
      case 'qualificationMapping':
        return <QualificationMapping navigate={navigate} />
      case 'practicalAssessment':
        return <PracticalAssessment navigate={navigate} />
      case 'evidenceReview':
        return <EvidenceReview navigate={navigate} />
      case 'assessorDashboard':
        return <AssessorDashboard navigate={navigate} />
      case 'competencyProfile':
        return <CompetencyProfile navigate={navigate} />
      case 'assessmentHistory':
        return <AssessmentHistory navigate={navigate} />
      case 'settings':
        return <Settings />
      case 'systemArchitecture':
        return <SystemArchitecture />
      default:
        return <Landing navigate={navigate} runDemo={runDemo} />
    }
  }

  const headerTitle = t(route) || 'SkillBridge'

  return (
    <div className="app-layout">
      <Sidebar route={route} navigate={navigate} />
      <div className="main-content">
        <header className="main-header">
          <div className="main-header-title">{headerTitle}</div>
          <div className="main-header-actions">
            {syncMsg && (
              <span style={{ fontSize: '0.75rem', color: 'var(--color-forest)' }}>{syncMsg}</span>
            )}
            {!isOnline && pendingRecords > 0 && (
              <button className="btn btn-secondary btn-sm" onClick={handleSync}>
                {t('simulateSync')} ({pendingRecords})
              </button>
            )}
            <LanguageSelector />
          </div>
        </header>
        <main className="main-body">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <OfflineProvider>
        <AppProvider>
          <AppContent />
        </AppProvider>
      </OfflineProvider>
    </LanguageProvider>
  )
}
