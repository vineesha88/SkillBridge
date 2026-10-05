import { useState, useEffect } from 'react'
import { Sparkles, ArrowRight, Loader } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { useApp } from '../hooks/useApp.jsx'
import { extractSkills } from '../utils/skillExtraction.js'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import AIPanel from '../components/AIPanel.jsx'

export default function SkillExtraction({ navigate }) {
  const { t } = useLanguage()
  const { currentWorker, setCurrentWorker } = useApp()
  const [phase, setPhase] = useState('processing')
  const [extractedSkills, setExtractedSkills] = useState([])

  const worker = currentWorker

  useEffect(() => {
    if (!worker) {
      setPhase('noWorker')
      return
    }
    setPhase('processing')
    const timer = setTimeout(() => {
      const skills = extractSkills(worker)
      setExtractedSkills(skills)
      setPhase('results')
    }, 2000)
    return () => clearTimeout(timer)
  }, [worker])

  if (phase === 'noWorker') {
    return (
      <div>
        <ProgressIndicator currentStep={1} />
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-7)' }}>
          <p className="text-secondary mb-4">Please complete the self-declaration first.</p>
          <button className="btn btn-primary" onClick={() => navigate('selfDeclaration')}>
            {t('selfDeclaration')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ProgressIndicator currentStep={1} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <Sparkles size={24} color="#3a6a7a" />
        <h1 style={{ margin: 0 }}>{t('skillExtractionTitle')}</h1>
      </div>

      {phase === 'processing' && (
        <AIPanel title={t('aiDemonstration')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', padding: 'var(--space-4) 0' }}>
            <Loader size={24} className="spin" style={{ animation: 'spin 1s linear infinite' }} />
            <span style={{ fontSize: '0.875rem', color: '#3a6a7a' }}>{t('extractingSkills')}</span>
          </div>
          <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </AIPanel>
      )}

      {phase === 'results' && (
        <>
          <AIPanel title={t('aiDemonstration')}>
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <span className="label label-demo">AI Assistance — Demonstration</span>
            </div>
            <h3 style={{ marginBottom: 'var(--space-3)' }}>{t('skillsIdentified')}</h3>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {extractedSkills.map((skill) => (
                <span key={skill} className="skill-tag">
                  <Sparkles size={12} />
                  {skill}
                </span>
              ))}
            </div>

            <div style={{ marginTop: 'var(--space-4)', padding: 'var(--space-3)', background: 'var(--color-white)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                Source data analyzed:
              </div>
              <div style={{ fontSize: '0.8125rem' }}>
                <strong>{worker.name}</strong> — {worker.trade}, {worker.experienceYears} years
              </div>
              <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
                Previous work: {(worker.previousWork || []).join(', ')}
              </div>
            </div>
          </AIPanel>

          <div className="callout callout-info" style={{ marginTop: 'var(--space-4)' }}>
            AI suggestion only. These skills will be verified through practical assessment.
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-5)' }}>
            <button className="btn btn-primary" onClick={() => navigate('qualificationMapping')}>
              {t('continueToMapping')}
              <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
