import { useState } from 'react'
import { Wrench, ChevronRight, ArrowRight, Shield, Camera } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { useApp } from '../hooks/useApp.jsx'
import { practicalTasks, taskStatuses } from '../data/tasks.js'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

export default function PracticalAssessment({ navigate }) {
  const { t } = useLanguage()
  const { currentWorker, currentAssessment, updateAssessmentTask } = useApp()
  const [selectedTask, setSelectedTask] = useState(null)

  if (!currentWorker) {
    return (
      <div>
        <ProgressIndicator currentStep={3} />
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-7)' }}>
          <p className="text-secondary mb-4">Please complete the self-declaration first.</p>
          <button className="btn btn-primary" onClick={() => navigate('selfDeclaration')}>
            {t('selfDeclaration')}
          </button>
        </div>
      </div>
    )
  }

  const assessment = currentAssessment
  const taskProgress = assessment?.taskProgress || practicalTasks.map((task) => ({
    taskId: task.id,
    status: taskStatuses.NOT_STARTED,
    score: null,
    maxScore: 2,
  }))

  const completedCount = taskProgress.filter((tp) => tp.status === taskStatuses.VERIFIED).length
  const progressPercent = Math.round((completedCount / practicalTasks.length) * 100)

  const handleTaskClick = (task) => {
    setSelectedTask(task)
  }

  const handleStatusChange = (taskId, newStatus) => {
    if (assessment) {
      updateAssessmentTask(assessment.id, taskId, { status: newStatus })
    }
  }

  if (selectedTask) {
    const tp = taskProgress.find((p) => p.taskId === selectedTask.id) || { status: taskStatuses.NOT_STARTED }
    return (
      <div>
        <ProgressIndicator currentStep={3} />

        <button className="btn btn-ghost btn-sm mb-4" onClick={() => setSelectedTask(null)}>
          ← {t('back')}
        </button>

        <div className="card mb-4">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-4)' }}>
            <div>
              <span className="badge badge-neutral mb-2">{selectedTask.id.toUpperCase()}</span>
              <h2 style={{ marginTop: 'var(--space-2)' }}>{selectedTask.title}</h2>
            </div>
            <StatusBadge status={tp.status} />
          </div>

          <div className="form-group">
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>
              {t('taskDescription')}
            </div>
            <p style={{ fontSize: '0.875rem' }}>{selectedTask.description}</p>
          </div>

          <div className="form-group">
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>
              {t('requiredCompetency')}
            </div>
            <p style={{ fontSize: '0.875rem' }}>{selectedTask.competency}</p>
          </div>

          <div className="callout callout-warning" style={{ marginBottom: 'var(--space-4)' }}>
            <Shield size={18} />
            <div>
              <strong>{t('safetyInstruction')}</strong>
              <div style={{ marginTop: '2px' }}>{selectedTask.safetyInstruction}</div>
            </div>
          </div>

          <div className="form-group">
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>
              {t('evidenceRequired')}
            </div>
            <p style={{ fontSize: '0.875rem' }}>{selectedTask.evidenceRequired}</p>
          </div>

          <div className="form-group">
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-1)' }}>
              {t('assessmentCriteria')}
            </div>
            <ul style={{ fontSize: '0.875rem', paddingLeft: 'var(--space-5)', lineHeight: 1.8 }}>
              {selectedTask.criteria.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
              {t('status')}
            </div>
            <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
              {Object.values(taskStatuses).map((status) => (
                <button
                  key={status}
                  className={`filter-btn ${tp.status === status ? 'active' : ''}`}
                  onClick={() => handleStatusChange(selectedTask.id, status)}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-3)', justifyContent: 'flex-end', marginTop: 'var(--space-5)' }}>
            <button className="btn btn-secondary" onClick={() => navigate('evidenceReview')}>
              <Camera size={16} />
              {t('evidenceReview')}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <ProgressIndicator currentStep={3} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <Wrench size={24} color="var(--color-charcoal)" />
        <h1 style={{ margin: 0 }}>{t('practicalAssessmentTitle')}</h1>
      </div>

      {/* Trade & Qualification info */}
      <div className="card mb-4">
        <div className="form-row" style={{ marginBottom: 0 }}>
          <div>
            <div className="text-xs text-secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>{t('trade')}</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{currentWorker.trade}</div>
          </div>
          <div>
            <div className="text-xs text-secondary" style={{ textTransform: 'uppercase', letterSpacing: '0.03em', fontWeight: 600 }}>{t('recommendedQualification')}</div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{currentWorker.trade}</div>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="card mb-5">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{t('assessmentProgress')}</span>
          <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>{completedCount}/{practicalTasks.length} {t('tasks')}</span>
        </div>
        <div className="progress-bar">
          <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
        </div>
      </div>

      {/* Task list */}
      {practicalTasks.map((task, idx) => {
        const tp = taskProgress.find((p) => p.taskId === task.id) || { status: taskStatuses.NOT_STARTED }
        return (
          <div
            key={task.id}
            className="card mb-3"
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            onClick={() => handleTaskClick(task)}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: tp.status === taskStatuses.VERIFIED ? 'var(--color-soft-green)' : 'var(--color-border-light)',
                  color: tp.status === taskStatuses.VERIFIED ? 'var(--color-forest)' : 'var(--color-text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.9375rem' }}>{task.title}</div>
                <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
                  {task.competency}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
              <StatusBadge status={tp.status} />
              <ChevronRight size={20} color="var(--color-text-secondary)" />
            </div>
          </div>
        )
      })}

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-5)' }}>
        <button className="btn btn-primary" onClick={() => navigate('evidenceReview')}>
          {t('evidenceReview')}
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  )
}
