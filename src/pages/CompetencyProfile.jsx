import { useState } from 'react'
import {
  FileText, Printer, ShieldCheck, Check, AlertTriangle, X,
  User, Wrench, Award, Camera, BarChart3, Calendar, GitBranch,
} from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { useApp } from '../hooks/useApp.jsx'
import { practicalTasks } from '../data/tasks.js'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import AIPanel from '../components/AIPanel.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

export default function CompetencyProfile({ navigate }) {
  const { t } = useLanguage()
  const { currentAssessment, currentWorker, updateAssessment } = useApp()
  const [decision, setDecision] = useState(currentAssessment?.assessorDecision)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const assessment = currentAssessment
  const worker = currentWorker

  if (!assessment) {
    return (
      <div>
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-7)' }}>
          <p className="text-secondary mb-4">No assessment selected.</p>
          <button className="btn btn-primary" onClick={() => navigate('assessorDashboard')}>
            {t('assessorDashboard')}
          </button>
        </div>
      </div>
    )
  }

  const handleDecision = (decisionValue) => {
    setDecision(decisionValue)
    setShowConfirmation(true)
    updateAssessment(assessment.id, {
      assessorDecision: decisionValue,
      status: decisionValue === 'Recommend Certification' ? 'Completed' : 'Pending',
      assessmentDate: new Date().toISOString().split('T')[0],
    })
  }

  const scorePercent = assessment.score !== null ? assessment.score : 87
  const rubricCriteria = [
    { criterion: 'Tool identification', score: 2, maxScore: 2 },
    { criterion: 'Safety procedure', score: 1, maxScore: 2 },
    { criterion: 'Wiring procedure', score: 2, maxScore: 2 },
    { criterion: 'Testing', score: 2, maxScore: 2 },
  ]
  const rubricTotal = rubricCriteria.reduce((sum, r) => sum + r.score, 0)
  const rubricMax = rubricCriteria.reduce((sum, r) => sum + r.maxScore, 0)

  return (
    <div>
      <ProgressIndicator currentStep={5} />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-5)' }} className="no-print">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
          <FileText size={24} color="var(--color-charcoal)" />
          <h1 style={{ margin: 0 }}>{t('competencyProfileTitle')}</h1>
        </div>
        <button className="btn btn-secondary" onClick={() => window.print()}>
          <Printer size={16} />
          {t('printSave')}
        </button>
      </div>

      {/* Worker header */}
      <div className="card mb-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
          <div className="avatar avatar-lg" style={{ background: 'var(--color-forest)', width: '56px', height: '56px', fontSize: '1rem' }}>
            {worker?.avatarInitials || assessment.workerName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
          </div>
          <div>
            <h2 style={{ margin: 0 }}>{assessment.workerName}</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              {assessment.trade} · {assessment.experienceYears} years experience
            </p>
          </div>
        </div>
      </div>

      {/* Profile details */}
      <div className="card mb-4">
        <h3 className="mb-4">Assessment Details</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }} className="profile-grid">
          <ProfileItem icon={User} label={t('workerName')} value={assessment.workerName} />
          <ProfileItem icon={Wrench} label={t('trade')} value={assessment.trade} />
          <ProfileItem icon={BarChart3} label={t('yearsOfExperience')} value={`${assessment.experienceYears} years`} />
          <ProfileItem icon={GitBranch} label={t('qualificationMapped')} value={assessment.qualification} />
          <ProfileItem icon={Camera} label={t('evidenceStatus')} value={assessment.evidenceStatus} />
          <ProfileItem icon={BarChart3} label={t('assessmentDate') || 'Assessment Date'} value={assessment.assessmentDate || new Date().toISOString().split('T')[0]} />
        </div>
      </div>

      {/* Scoring Rubric */}
      <div className="card mb-4">
        <h3 className="mb-4">{t('scoringRubric')}</h3>
        <table className="data-table" style={{ marginBottom: 'var(--space-3)' }}>
          <thead>
            <tr>
              <th>{t('criterion')}</th>
              <th style={{ textAlign: 'right' }}>{t('score')}</th>
            </tr>
          </thead>
          <tbody>
            {rubricCriteria.map((r, idx) => (
              <tr key={idx} style={{ cursor: 'default' }}>
                <td>{r.criterion}</td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>
                  {r.score} / {r.maxScore}
                </td>
              </tr>
            ))}
            <tr style={{ cursor: 'default', borderTop: '2px solid var(--color-border)' }}>
              <td style={{ fontWeight: 700 }}>{t('total')}</td>
              <td style={{ textAlign: 'right', fontWeight: 700, fontSize: '1.125rem', color: 'var(--color-forest)' }}>
                {rubricTotal} / {rubricMax}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Score bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginTop: 'var(--space-3)' }}>
          <div style={{ flex: 1 }}>
            <div className="progress-bar" style={{ height: '12px' }}>
              <div className="progress-bar-fill" style={{ width: `${scorePercent}%` }} />
            </div>
          </div>
          <div style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-charcoal)' }}>
            {scorePercent}%
          </div>
        </div>
      </div>

      {/* Competencies assessed */}
      <div className="card mb-4">
        <h3 className="mb-4">{t('competenciesAssessed')}</h3>
        {practicalTasks.map((task) => {
          const tp = assessment.taskProgress?.find((p) => p.taskId === task.id)
          return (
            <div
              key={task.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-2) 0',
                borderBottom: '1px solid var(--color-border-light)',
              }}
            >
              <div>
                <div style={{ fontSize: '0.875rem', fontWeight: 500 }}>{task.title}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>{task.competency}</div>
              </div>
              <StatusBadge status={tp?.status || 'Not Started'} />
            </div>
          )
        })}
      </div>

      {/* AI Review summary */}
      {assessment.aiReview && (
        <AIPanel title={t('aiAssistanceTitle')}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#3a6a7a', marginBottom: 'var(--space-1)' }}>
            {t('suggestedObservation')}
          </div>
          <p style={{ fontSize: '0.875rem', marginBottom: 'var(--space-2)' }}>"{assessment.aiReview.observation}"</p>
          <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
            {t('aiSuggestedOutcome')}: <strong style={{ color: 'var(--color-text)' }}>{assessment.aiSuggestedOutcome}</strong>
          </div>
          <div className="callout callout-important" style={{ marginTop: 'var(--space-3)' }}>
            {t('aiSuggestionOnly')}
          </div>
        </AIPanel>
      )}

      {/* Assessor Decision */}
      <div className="card mt-4" style={{ borderLeft: '3px solid var(--color-forest)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          <ShieldCheck size={20} color="var(--color-forest)" />
          <h2 style={{ margin: 0, fontSize: '1.125rem' }}>{t('assessorVerification')}</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-4)' }} className="profile-grid">
          <div>
            <div className="text-xs text-secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>{t('overallCompetency')}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-forest)' }}>{scorePercent}%</div>
          </div>
          <div>
            <div className="text-xs text-secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>{t('aiSuggestedOutcome')}</div>
            <div style={{ fontSize: '1rem', fontWeight: 600 }}>{assessment.aiSuggestedOutcome || '—'}</div>
          </div>
        </div>

        <div className="callout callout-important mb-4">
          {t('finalDecisionRequired')}
        </div>

        {!showConfirmation ? (
          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => handleDecision('Recommend Certification')}>
              <Check size={16} />
              {t('recommendCertification')}
            </button>
            <button className="btn btn-secondary" onClick={() => handleDecision('Needs Further Assessment')}>
              <AlertTriangle size={16} />
              {t('needsFurtherAssessment')}
            </button>
            <button className="btn btn-terracotta" onClick={() => handleDecision('Request Re-Demonstration')}>
              <X size={16} />
              {t('requestRedemonstration')}
            </button>
          </div>
        ) : (
          <div className="callout callout-important" style={{ fontSize: '1rem', fontWeight: 600 }}>
            <Check size={20} />
            <span>{t('decisionRecorded')}</span>
          </div>
        )}

        {decision && (
          <div style={{ marginTop: 'var(--space-3)', fontSize: '0.875rem' }}>
            <strong>{t('assessorDecision')}:</strong>{' '}
            <StatusBadge status={decision} />
          </div>
        )}
      </div>

      <div className="callout callout-info mt-4 no-print" style={{ marginBottom: 'var(--space-4)' }}>
        This is an assessment profile and recommendation from a prototype system. It is not an official government certificate.
      </div>

      <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end' }} className="no-print">
        <button className="btn btn-secondary" onClick={() => navigate('assessorDashboard')}>
          {t('assessorDashboard')}
        </button>
        <button className="btn btn-primary" onClick={() => navigate('assessmentHistory')}>
          {t('assessmentHistory')}
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .profile-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}

function ProfileItem({ icon: Icon, label, value }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--space-2)' }}>
      <Icon size={18} color="var(--color-text-secondary)" style={{ flexShrink: 0, marginTop: '2px' }} />
      <div>
        <div className="text-xs text-secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>{label}</div>
        <div style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{value}</div>
      </div>
    </div>
  )
}
