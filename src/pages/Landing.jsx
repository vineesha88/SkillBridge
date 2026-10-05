import { Sparkles, ShieldCheck, Play, LayoutDashboard, ArrowRight } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'

export default function Landing({ navigate, runDemo }) {
  const { t } = useLanguage()

  return (
    <div>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: 'var(--space-5) 0' }}>
        <h1 style={{ fontSize: '2.25rem', lineHeight: '1.15', marginBottom: 'var(--space-4)' }}>
          {t('landingHeadline')}
        </h1>
        <p style={{ fontSize: '1.0625rem', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          {t('landingSubheading')}
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-5)', flexWrap: 'wrap' }}>
          <button className="btn btn-primary btn-lg" onClick={() => navigate('selfDeclaration')}>
            {t('startAssessment')}
            <ArrowRight size={18} />
          </button>
          <button className="btn btn-secondary btn-lg" onClick={() => navigate('assessorDashboard')}>
            <LayoutDashboard size={18} />
            {t('viewAssessorDashboard')}
          </button>
          <button className="btn btn-ghost btn-lg" onClick={runDemo}>
            <Play size={18} />
            {t('runDemo')}
          </button>
        </div>
      </div>

      {/* Three concepts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 'var(--space-4)',
          marginTop: 'var(--space-6)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <div className="card">
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            01
          </div>
          <h3 style={{ marginTop: 'var(--space-2)' }}>{t('experience')}</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
            {t('experienceDesc')}
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-amber)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            02
          </div>
          <h3 style={{ marginTop: 'var(--space-2)' }}>{t('evidence')}</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
            {t('evidenceDesc')}
          </p>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-terracotta)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            03
          </div>
          <h3 style={{ marginTop: 'var(--space-2)' }}>{t('recognition')}</h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginTop: 'var(--space-1)' }}>
            {t('recognitionDesc')}
          </p>
        </div>
      </div>

      {/* AI vs Human */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <div className="card" style={{ borderLeft: '3px solid #3a6a7a' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <Sparkles size={18} color="#3a6a7a" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#3a6a7a', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('aiAssistance')}
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            {t('aiAssistanceDesc')}
          </p>
        </div>

        <div className="card" style={{ borderLeft: '3px solid var(--color-forest)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', marginBottom: 'var(--space-2)' }}>
            <ShieldCheck size={18} color="var(--color-forest)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-forest)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              {t('humanDecision')}
            </span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
            {t('humanDecisionDesc')}
          </p>
        </div>
      </div>

      <div className="callout callout-important" style={{ marginTop: 'var(--space-5)' }}>
        AI assists. The authorized assessor makes the final decision.
      </div>

      {/* Responsive grid adjustments */}
      <style>{`
        @media (max-width: 768px) {
          div[style*='grid-template-columns: repeat(3'] {
            grid-template-columns: 1fr !important;
          }
          div[style*='grid-template-columns: 1fr 1fr'] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
