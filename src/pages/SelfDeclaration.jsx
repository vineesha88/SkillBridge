import { useState } from 'react'
import { User, Plus, Trash2, ArrowRight } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'
import { useApp } from '../hooks/useApp.jsx'
import { workers as demoWorkers } from '../data/workers.js'
import ProgressIndicator from '../components/ProgressIndicator.jsx'

export default function SelfDeclaration({ navigate }) {
  const { t } = useLanguage()
  const { addWorker, setCurrentWorker, currentAssessment, setCurrentAssessment } = useApp()

  const [formData, setFormData] = useState({
    name: currentAssessment?.workerName || '',
    trade: currentAssessment?.trade || 'Electrician',
    experienceYears: currentAssessment?.experienceYears || '',
    phone: '',
    location: '',
    previousWork: [''],
    declaredSkills: [''],
  })

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateListItem = (field, idx, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].map((item, i) => (i === idx ? value : item)),
    }))
  }

  const addListItem = (field) => {
    setFormData((prev) => ({ ...prev, [field]: [...prev[field], ''] }))
  }

  const removeListItem = (field, idx) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== idx),
    }))
  }

  const loadDemoWorker = (workerId) => {
    const worker = demoWorkers.find((w) => w.id === workerId)
    if (!worker) return
    setFormData({
      name: worker.name,
      trade: worker.trade,
      experienceYears: worker.experienceYears,
      phone: worker.phone,
      location: worker.location,
      previousWork: worker.previousWork,
      declaredSkills: worker.declaredSkills,
    })
  }

  const handleSubmit = () => {
    const cleaned = {
      ...formData,
      previousWork: formData.previousWork.filter((w) => w.trim()),
      declaredSkills: formData.declaredSkills.filter((s) => s.trim()),
      experienceYears: parseInt(formData.experienceYears, 10) || 0,
    }

    const worker = {
      id: 'w' + Date.now(),
      ...cleaned,
      avatarInitials: cleaned.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase(),
      assessmentId: null,
    }

    addWorker(worker)
    setCurrentWorker(worker)
    navigate('skillExtraction')
  }

  return (
    <div>
      <ProgressIndicator currentStep={1} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <User size={24} color="var(--color-charcoal)" />
        <h1 style={{ margin: 0 }}>{t('workerSelfDeclaration')}</h1>
      </div>

      {/* Demo worker selector */}
      <div className="card mb-5">
        <div className="card-title">{t('selectWorker')}</div>
        <div style={{ display: 'flex', gap: 'var(--space-3)', flexWrap: 'wrap' }}>
          {demoWorkers.map((w) => (
            <button
              key={w.id}
              className="btn btn-secondary btn-sm"
              onClick={() => loadDemoWorker(w.id)}
            >
              {w.name} — {w.experienceYears} yrs
            </button>
          ))}
        </div>
      </div>

      <div className="card">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="name">{t('fullName')}</label>
            <input
              id="name"
              className="form-input"
              value={formData.name}
              onChange={(e) => updateField('name', e.target.value)}
              placeholder="e.g. Ravi Kumar"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="trade">{t('trade')}</label>
            <select
              id="trade"
              className="form-select"
              value={formData.trade}
              onChange={(e) => updateField('trade', e.target.value)}
            >
              <option>Electrician</option>
              <option>Plumber</option>
              <option>Welder</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="exp">{t('yearsOfExperience')}</label>
            <input
              id="exp"
              className="form-input"
              type="number"
              min="0"
              value={formData.experienceYears}
              onChange={(e) => updateField('experienceYears', e.target.value)}
              placeholder="e.g. 8"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="phone">{t('phone')}</label>
            <input
              id="phone"
              className="form-input"
              value={formData.phone}
              onChange={(e) => updateField('phone', e.target.value)}
              placeholder="e.g. +91 98765 43210"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="location">{t('location')}</label>
          <input
            id="location"
            className="form-input"
            value={formData.location}
            onChange={(e) => updateField('location', e.target.value)}
            placeholder="e.g. Hyderabad, Telangana"
          />
        </div>

        {/* Previous work */}
        <div className="form-group">
          <label className="form-label">{t('previousWork')}</label>
          {formData.previousWork.map((work, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <input
                className="form-input"
                value={work}
                onChange={(e) => updateListItem('previousWork', idx, e.target.value)}
                placeholder="e.g. Residential wiring"
              />
              {formData.previousWork.length > 1 && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => removeListItem('previousWork', idx)}
                  aria-label="Remove"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button className="btn btn-ghost btn-sm" onClick={() => addListItem('previousWork')}>
            <Plus size={16} /> {t('addWorkItem')}
          </button>
        </div>

        {/* Declared skills */}
        <div className="form-group">
          <label className="form-label">{t('declaredSkills')}</label>
          {formData.declaredSkills.map((skill, idx) => (
            <div key={idx} style={{ display: 'flex', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
              <input
                className="form-input"
                value={skill}
                onChange={(e) => updateListItem('declaredSkills', idx, e.target.value)}
                placeholder="e.g. Wiring"
              />
              {formData.declaredSkills.length > 1 && (
                <button
                  className="btn btn-ghost btn-sm"
                  onClick={() => removeListItem('declaredSkills', idx)}
                  aria-label="Remove"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
          ))}
          <button className="btn btn-ghost btn-sm" onClick={() => addListItem('declaredSkills')}>
            <Plus size={16} /> {t('addSkill')}
          </button>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-4)' }}>
          <button
            className="btn btn-primary"
            onClick={handleSubmit}
            disabled={!formData.name.trim()}
          >
            {t('submitDeclaration')}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  )
}
