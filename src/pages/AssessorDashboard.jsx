import { useState } from 'react'
import {
  LayoutDashboard, Clock, AlertTriangle, CheckCircle, FileText,
  ChevronRight, Scale,
} from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { useApp } from '../hooks/useApp.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

const filters = ['All', 'Pending', 'Needs Review', 'Completed']

export default function AssessorDashboard({ navigate }) {
  const { t } = useLanguage()
  const { assessments, setCurrentAssessment, workers, setCurrentWorker } = useApp()
  const [filter, setFilter] = useState('All')

  const counts = {
    Pending: assessments.filter((a) => a.status === 'Pending' || a.status === 'Ready for Decision').length,
    InProgress: assessments.filter((a) => a.progress > 0 && a.progress < 100).length,
    Completed: assessments.filter((a) => a.status === 'Completed').length,
    NeedsReview: assessments.filter((a) => a.evidenceStatus === 'Needs Review').length,
  }

  const filtered = assessments.filter((a) => {
    if (filter === 'All') return true
    if (filter === 'Pending') return a.status === 'Pending' || a.status === 'Ready for Decision'
    if (filter === 'Needs Review') return a.evidenceStatus === 'Needs Review'
    if (filter === 'Completed') return a.status === 'Completed'
    return true
  })

  const handleRowClick = (assessment) => {
    setCurrentAssessment(assessment)
    const worker = workers.find((w) => w.id === assessment.workerId)
    if (worker) setCurrentWorker(worker)
    if (assessment.status === 'Completed' || assessment.status === 'Ready for Decision') {
      navigate('competencyProfile')
    } else {
      navigate('practicalAssessment')
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <LayoutDashboard size={24} color="var(--color-charcoal)" />
        <h1 style={{ margin: 0 }}>{t('assessorDashboard')}</h1>
      </div>

      {/* Summary cards */}
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-card-icon"><Clock size={20} color="var(--color-amber)" /></div>
          <div className="summary-card-value">{counts.Pending}</div>
          <div className="summary-card-label">{t('pendingAssessments')}</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-icon"><FileText size={20} color="#3a6a7a" /></div>
          <div className="summary-card-value">{counts.InProgress}</div>
          <div className="summary-card-label">{t('inProgress')}</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-icon"><CheckCircle size={20} color="var(--color-forest)" /></div>
          <div className="summary-card-value">{counts.Completed}</div>
          <div className="summary-card-label">{t('completed')}</div>
        </div>
        <div className="summary-card">
          <div className="summary-card-icon"><AlertTriangle size={20} color="var(--color-terracotta)" /></div>
          <div className="summary-card-value">{counts.NeedsReview}</div>
          <div className="summary-card-label">{t('needsReview')}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="filter-group mb-5">
        {filters.map((f) => (
          <button
            key={f}
            className={`filter-btn ${filter === f ? 'active' : ''}`}
            onClick={() => setFilter(f)}
          >
            {f === 'All' ? 'All' : f === 'Pending' ? t('pendingAssessments') : f === 'Needs Review' ? t('needsReview') : t('completed')}
          </button>
        ))}
      </div>

      {/* Assessment table */}
      <div className="card mb-5" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>{t('worker')}</th>
                <th>{t('trade')}</th>
                <th>{t('progress')}</th>
                <th>Evidence</th>
                <th>Score</th>
                <th>{t('status')}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id} onClick={() => handleRowClick(a)}>
                  <td style={{ fontWeight: 500 }}>{a.workerName}</td>
                  <td>{a.trade}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                      <div className="progress-bar" style={{ width: '60px' }}>
                        <div className="progress-bar-fill" style={{ width: `${a.progress}%` }} />
                      </div>
                      <span style={{ fontSize: '0.8125rem' }}>{a.progress}%</span>
                    </div>
                  </td>
                  <td><StatusBadge status={a.evidenceStatus} /></td>
                  <td style={{ fontWeight: 600 }}>
                    {a.score !== null ? `${a.score}%` : '—'}
                  </td>
                  <td><StatusBadge status={a.status} /></td>
                  <td><ChevronRight size={16} color="var(--color-text-secondary)" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assessment Consistency */}
      <div className="card" style={{ borderLeft: '3px solid var(--color-forest)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-3)' }}>
          <Scale size={20} color="var(--color-forest)" />
          <h2 style={{ margin: 0, fontSize: '1.125rem' }}>{t('assessmentConsistency')}</h2>
        </div>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-4)' }}>
          {t('consistencyExplanation')}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }} className="consistency-grid">
          <div style={{ background: 'var(--color-off-white)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-3)' }}>
              {t('manualStyleScoring')}
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Assessor A</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-terracotta)' }}>7<span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>/10</span></div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Assessor B</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-amber)' }}>9<span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>/10</span></div>
              </div>
            </div>
            <div style={{ marginTop: 'var(--space-2)', fontSize: '0.75rem', color: 'var(--color-terracotta)' }}>
              Variation: 2 points
            </div>
          </div>

          <div style={{ background: 'var(--color-soft-green)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-forest)', marginBottom: 'var(--space-3)' }}>
              {t('afterRubric')}
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Assessor A</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-forest)' }}>8<span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>/10</span></div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Assessor B</div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-forest)' }}>8<span style={{ fontSize: '1rem', color: 'var(--color-text-secondary)' }}>/10</span></div>
              </div>
            </div>
            <div style={{ marginTop: 'var(--space-2)', fontSize: '0.75rem', color: 'var(--color-forest)' }}>
              Consistent scoring
            </div>
          </div>
        </div>

        <div style={{ marginTop: 'var(--space-3)' }}>
          <span className="label label-illustrative">{t('illustrative')}</span>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .consistency-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
