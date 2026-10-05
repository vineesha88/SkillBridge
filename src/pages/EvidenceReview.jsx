import { useState } from 'react'
import { Camera, Upload, Video, FileText, ArrowRight, ShieldCheck } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { useApp } from '../hooks/useApp.jsx'
import { practicalTasks } from '../data/tasks.js'
import { generateAIReview, checkEvidenceIntegrity, calculateTotalScore } from '../utils/scoring.js'
import ProgressIndicator from '../components/ProgressIndicator.jsx'
import AIPanel from '../components/AIPanel.jsx'
import IntegrityFlag from '../components/IntegrityFlag.jsx'
import StatusBadge from '../components/StatusBadge.jsx'

export default function EvidenceReview({ navigate }) {
  const { t } = useLanguage()
  const { currentAssessment, currentWorker, updateAssessment } = useApp()
  const [selectedTaskId, setSelectedTaskId] = useState('task2')
  const [evidenceItems, setEvidenceItems] = useState(
    currentAssessment?.evidence || [],
  )
  const [assessorObservation, setAssessorObservation] = useState('')
  const [uploadedFile, setUploadedFile] = useState(null)
  const [acceptedScore, setAcceptedScore] = useState(null)

  if (!currentWorker) {
    return (
      <div>
        <ProgressIndicator currentStep={4} />
        <div className="card" style={{ textAlign: 'center', padding: 'var(--space-7)' }}>
          <p className="text-secondary mb-4">Please complete the self-declaration first.</p>
          <button className="btn btn-primary" onClick={() => navigate('selfDeclaration')}>
            {t('selfDeclaration')}
          </button>
        </div>
      </div>
    )
  }

  const task = practicalTasks.find((tk) => tk.id === selectedTaskId)
  const taskEvidence = evidenceItems.filter((e) => e.taskId === selectedTaskId)
  const aiReview = generateAIReview(selectedTaskId, taskEvidence)
  const integrityFlags = checkEvidenceIntegrity(selectedTaskId, taskEvidence)
  const needsReview = integrityFlags.some((f) => f.level === 'warning' || f.level === 'error')

  const handleFileUpload = (type) => {
    if (!uploadedFile) return
    const newEvidence = {
      taskId: selectedTaskId,
      fileName: uploadedFile,
      status: 'Pending Verification',
      type,
    }
    setEvidenceItems([...evidenceItems, newEvidence])
    setUploadedFile(null)
  }

  const handleAcceptScore = () => {
    setAcceptedScore(aiReview.suggestedScore)
  }

  return (
    <div>
      <ProgressIndicator currentStep={4} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <Camera size={24} color="var(--color-charcoal)" />
        <h1 style={{ margin: 0 }}>{t('evidenceCapture')}</h1>
      </div>

      {/* Task selector */}
      <div className="filter-group mb-5">
        {practicalTasks.map((tk) => (
          <button
            key={tk.id}
            className={`filter-btn ${selectedTaskId === tk.id ? 'active' : ''}`}
            onClick={() => { setSelectedTaskId(tk.id); setAcceptedScore(null) }}
          >
            {tk.id.replace('task', 'Task ')}
          </button>
        ))}
      </div>

      <div className="card mb-4">
        <h3 className="mb-2">{task.title}</h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>{task.description}</p>
        <div className="callout callout-warning" style={{ marginTop: 'var(--space-3)' }}>
          <ShieldCheck size={18} />
          <span><strong>Safety:</strong> {task.safetyInstruction}</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }} className="evidence-grid">
        {/* Evidence upload */}
        <div className="card mb-4">
          <h3 className="mb-4">{t('evidenceCapture')}</h3>

          <div className="form-group">
            <label className="form-label">File name (simulated upload)</label>
            <input
              className="form-input"
              value={uploadedFile || ''}
              onChange={(e) => setUploadedFile(e.target.value)}
              placeholder="e.g. wiring-demonstration.jpg"
            />
          </div>

          <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap', marginBottom: 'var(--space-3)' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => handleFileUpload('image')} disabled={!uploadedFile}>
              <Upload size={14} />
              {t('uploadImage')}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleFileUpload('video')} disabled={!uploadedFile}>
              <Video size={14} />
              {t('uploadVideo')}
            </button>
          </div>

          <div className="form-group">
            <label className="form-label">{t('addAssessorObservation')}</label>
            <textarea
              className="form-textarea"
              value={assessorObservation}
              onChange={(e) => setAssessorObservation(e.target.value)}
              placeholder="Enter assessor observation notes..."
            />
          </div>
        </div>

        {/* Submitted evidence */}
        <div className="card mb-4">
          <h3 className="mb-4">{t('evidenceSubmittedLabel')}</h3>
          {taskEvidence.length === 0 ? (
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              No evidence submitted for this task yet.
            </p>
          ) : (
            taskEvidence.map((ev, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-2) 0',
                  borderBottom: idx < taskEvidence.length - 1 ? '1px solid var(--color-border-light)' : 'none',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                  {ev.type === 'image' ? <FileText size={16} color="var(--color-text-secondary)" /> : <Video size={16} color="var(--color-text-secondary)" />}
                  <span style={{ fontSize: '0.8125rem' }}>{ev.fileName}</span>
                </div>
                <StatusBadge status={ev.status} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* Evidence Integrity */}
      <div className="card mb-4" style={{ borderLeft: needsReview ? '3px solid var(--color-amber)' : '3px solid var(--color-forest)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-3)' }}>
          <h3>{t('evidenceIntegrity')}</h3>
          <span className={`badge ${needsReview ? 'badge-warning' : 'badge-success'}`}>
            {needsReview ? 'Needs Review' : 'Passed'}
          </span>
        </div>
        {integrityFlags.map((flag, idx) => (
          <IntegrityFlag key={idx} level={flag.level} message={flag.message} />
        ))}
        {needsReview && (
          <button className="btn btn-terracotta btn-sm mt-2">
            {t('requestRedemonstration')}
          </button>
        )}
      </div>

      {/* AI Review */}
      <AIPanel title={t('aiAssistanceTitle')}>
        <div style={{ marginBottom: 'var(--space-3)' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#3a6a7a', marginBottom: 'var(--space-1)' }}>
            {t('suggestedObservation')}
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text)', background: 'var(--color-white)', padding: 'var(--space-3)', borderRadius: 'var(--radius-md)' }}>
            "{aiReview.observation}"
          </p>
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-5)', marginBottom: 'var(--space-3)' }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#3a6a7a', marginBottom: 'var(--space-1)' }}>
              {t('suggestedScore')}
            </div>
            <div className="score-display">
              <span className="score-number">{acceptedScore !== null ? acceptedScore : aiReview.suggestedScore}</span>
              <span className="score-max">/ {aiReview.maxScore}</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: '#3a6a7a', marginBottom: 'var(--space-1)' }}>
              {t('confidence')}
            </div>
            <div style={{ fontSize: '1.125rem', fontWeight: 600 }}>{aiReview.confidence}</div>
          </div>
        </div>

        <div className="callout callout-important" style={{ marginBottom: 'var(--space-3)' }}>
          {t('aiSuggestionOnly')}
        </div>

        <div style={{ display: 'flex', gap: 'var(--space-2)', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-sm" onClick={handleAcceptScore}>
            <ShieldCheck size={14} />
            {t('acceptSuggestion')}
          </button>
          <button className="btn btn-secondary btn-sm">
            {t('modifyScore')}
          </button>
          <button className="btn btn-terracotta btn-sm">
            {t('requestRedemonstration')}
          </button>
        </div>
      </AIPanel>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-5)' }}>
        <button className="btn btn-primary" onClick={() => navigate('assessorDashboard')}>
          {t('assessorDashboard')}
          <ArrowRight size={16} />
        </button>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .evidence-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
