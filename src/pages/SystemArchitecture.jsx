import { Network, ArrowDown, Cpu, Database, Cloud, GitBranch } from 'lucide-react'
import { useLanguage } from '../hooks/useLanguage.jsx'

const workflowNodes = [
  'Worker Interface',
  'Self-Declaration',
  'Skill Extraction',
  'Qualification Mapping Engine',
  'Assessment Task Engine',
  'Evidence Management',
  'AI Assistance Layer',
  'Standardized Scoring Engine',
  'Assessor Dashboard',
  'Competency Profile',
]

const stack = [
  { label: 'Frontend', value: 'React + JavaScript + Vite', icon: Cpu },
  { label: 'Data', value: 'Local JSON / localStorage / IndexedDB', icon: Database },
  { label: 'AI', value: 'Demonstration / mock AI assistance layer', icon: Network },
  { label: 'Deployment', value: 'GitHub Pages', icon: Cloud },
  { label: 'Future Backend', value: 'Can later connect to a secure API/database', icon: GitBranch },
]

export default function SystemArchitecture() {
  const { t } = useLanguage()

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', marginBottom: 'var(--space-5)' }}>
        <Network size={24} color="var(--color-charcoal)" />
        <h1 style={{ margin: 0 }}>{t('systemArchitecture')}</h1>
      </div>

      <div className="card mb-5">
        <h2 className="mb-4">Assessment Workflow</h2>
        <div className="workflow-diagram">
          {workflowNodes.map((node, idx) => (
            <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div className="workflow-node" style={{
                borderColor: idx === 0 ? 'var(--color-forest)' : idx === workflowNodes.length - 1 ? 'var(--color-forest)' : 'var(--color-border)',
                background: idx === 0 || idx === workflowNodes.length - 1 ? 'var(--color-soft-green)' : 'var(--color-white)',
              }}>
                {node}
              </div>
              {idx < workflowNodes.length - 1 && <div className="workflow-arrow" />}
            </div>
          ))}
        </div>
      </div>

      <div className="card mb-5">
        <h2 className="mb-4">Technology Stack</h2>
        {stack.map((item, idx) => {
          const Icon = item.icon
          return (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 'var(--space-3)',
                padding: 'var(--space-3) 0',
                borderBottom: idx < stack.length - 1 ? '1px solid var(--color-border-light)' : 'none',
              }}
            >
              <Icon size={20} color="var(--color-forest)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.03em', color: 'var(--color-text-secondary)' }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '0.9375rem', fontWeight: 500 }}>{item.value}</div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="callout callout-info mb-4">
        This is a frontend-only MVP. The AI assistance layer uses local/mock logic — no external API calls are made.
        A production version could connect to a secure backend API and database.
      </div>

      <div className="card">
        <h2 className="mb-3">Key Design Principles</h2>
        <ul style={{ paddingLeft: 'var(--space-5)', lineHeight: 1.8, fontSize: '0.875rem' }}>
          <li>Experience is not automatically trusted — it must be demonstrated and assessed</li>
          <li>AI does not replace the assessor — AI assists with mapping, evidence review, and scoring suggestions</li>
          <li>Evidence matters — the system connects claims to practical demonstrations</li>
          <li>Standardization matters — common rubrics help reduce variation between assessments</li>
          <li>Offline access matters — assessment data can be captured in low-connectivity environments and synchronized later</li>
        </ul>
      </div>
    </div>
  )
}
