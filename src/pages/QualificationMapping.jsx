import { GitBranch, Check, AlertTriangle, ArrowRight, Info } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { useApp } from '../hooks/useApp.jsx'
import { extractSkills } from '../utils/skillExtraction.js'
import { mapQualification } from '../utils/qualificationMapping.js'
import ProgressIndicator from '../components/ProgressIndicator.jsx'

export default function QualificationMapping({ navigate }) {
  const { t } = useLanguage()
  const { currentWorker } = useApp()

  if (!currentWorker) {
    return (
      <div>
        <ProgressIndicator currentStep={2} />
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-7)' }}>
          <p className="text-secondary mb-4">Please complete the self-declaration first.</p>
          <button className="btn btn-primary" onClick={() => navigate('selfDeclaration')}>
            {t('selfDeclaration')}
          </button>
        </div>
      </div>
    )
  }

  const extractedSkills = extractSkills(currentWorker)
  const mapping = mapQualification(currentWorker.trade, extractedSkills)
  const { qualification, matchedSkills, skillsToVerify, experienceMatch, skillsMatched, additionalSkillsToVerify } = mapping

  return (
    <div>
      <ProgressIndicator currentStep={2} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <GitBranch size={24} color="var(--color-charcoal)" />
        <h1 style={{ margin: 0 }}>{t('qualificationMappingTitle')}</h1>
      </div>

      <div className="callout callout-info mb-5">
        <Info size={18} />
        <span>{t('demoDataset')} — This is a prototype recommendation/mapping system. Not an official NSQF certification.</span>
      </div>

      <div className="card mb-5">
        <span className="label label-demo mb-2" style={{ display: 'inline-flex' }}>{t('demoDataset')}</span>
        <h2 style={{ marginTop: 'var(--space-2)', marginBottom: 'var(--space-1)' }}>{t('recommendedQualification')}</h2>
        <h3 style={{ color: 'var(--color-forest)', marginBottom: 'var(--space-2)' }}>{qualification.title}</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {qualification.code} · NSQF Level {qualification.nsqfLevel} · {qualification.sector}
        </p>
        <p style={{ fontSize: '0.875rem', marginTop: 'var(--space-3)' }}>{qualification.description}</p>
      </div>

      {/* Matching info */}
      <div className="summary-grid mb-5" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
        <div className="summary-card">
          <div className="summary-card-value">{experienceMatch}%</div>
          <div className="summary-card-label">{t('experienceMatch')}</div>
          <div className="progress-bar mt-2">
            <div className="progress-bar-fill" style={{ width: `${experienceMatch}%` }} />
          </div>
        </div>
        <div className="summary-card">
          <div className="summary-card-value">{skillsMatched}</div>
          <div className="summary-card-label">{t('skillsMatched')}</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-value" style={{ color: 'var(--color-amber)' }}>{additionalSkillsToVerify}</div>
          <div className="summary-card-label">{t('additionalSkillsToVerify')}</div>
        </div>
      </div>

      {/* Matched skills */}
      <div className="card mb-4">
        <h3 className="mb-4">{t('matchedSkills')}</h3>
        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          {matchedSkills.map((skill) => (
            <span key={skill} className="skill-tag">
              <Check size={14} />
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Skills to verify */}
      {skillsToVerify.length > 0 && (
        <div className="card mb-4" style={{ borderLeft: '3px solid var(--color-amber)' }}>
          <h3 className="mb-4">{t('skillsToVerify')}</h3>
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            {skillsToVerify.map((skill) => (
              <span key={skill} className="skill-tag warning">
                <AlertTriangle size={14} />
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Why suggested */}
      <div className="card mb-5" style={{ background: 'var(--color-off-white)' }}>
        <h3 className="mb-2">{t('whySuggested')}</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
          {t('whySuggestedText')}
        </p>
      </div>

      <div className="callout callout-important mb-5">
        This mapping is a recommendation. The assessor must verify skills through practical assessment.
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button className="btn btn-primary" onClick={() => navigate('practicalAssessment')}>
          {t('continueToTasks')}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
