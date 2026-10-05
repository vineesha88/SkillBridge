import { History, ChevronRight, Calendar } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { useApp } from '../hooks/useApp.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

export default function AssessmentHistory({ navigate }) {
  const { t } = useLanguage()
  const { assessments, setCurrentAssessment, setCurrentWorker, workers } = useApp()

  const sorted = [...assessments].sort((a, b) => {
    if (!a.assessmentDate) return 1
    if (!b.assessmentDate) return -1
    return b.assessmentDate.localeCompare(a.assessmentDate)
  })

  const handleRowClick = (assessment) => {
    setCurrentAssessment(assessment)
    const worker = workers.find((w) => w.id === assessment.workerId)
    if (worker) setCurrentWorker(worker)
    navigate('competencyProfile')
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <History size={24} color="var(--color-charcoal)" />
        <h1 style={{ margin: 0 }}>{t('assessmentHistory')}</h1>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('worker')}</th>
                <th>{t('trade')}</th>
                <th>{t('score')}</th>
                <th>{t('assessorDecision')}</th>
                <th>{t('assessmentDate')}</th>
                <th>{t('status')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((a) => (
                <tr key={a.id} onClick={() => handleRowClick(a)}>
                  <td style={{ fontWeight: 500 }}>{a.workerName}</td>
                  <td>{a.trade}</td>
                  <td style={{ fontWeight: 600 }}>
                    {a.score !== null ? `${a.score}%` : '—'}
                  </td>
                  <td>
                    {a.assessorDecision ? (
                      <StatusBadge status={a.assessorDecision} />
                    ) : (
                      <span className="text-secondary text-sm">Pending</span>
                    )}
                  </td>
                  <td style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)' }}>
                    {a.assessmentDate || '—'}
                  </td>
                  <td><StatusBadge status={a.status} /></td>
                  <td><ChevronRight size={16} color="var(--color-text-secondary)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-3)' }}>
        Click any row to view the full competency profile for that assessment.
      </p>
    </div>
  )
}
