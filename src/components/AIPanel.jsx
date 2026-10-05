import { Sparkles, Info, AlertTriangle } from 'lucide-react'

export default function AIPanel({ title, children }) {
  return (
    <div className="ai-panel">
      <div className="ai-panel-header">
        <Sparkles size={16} color="#3a6a7a" />
        <span className="ai-panel-title">{title || 'AI Assistance'}</span>
        <span className="label label-ai">Demo</span>
      </div>
      {children}
    </div>
  )
}

export function Callout({ type = 'info', icon: CustomIcon, children }) {
  const Icon = CustomIcon || (type === 'warning' ? AlertTriangle : Info)

  return (
    <div className={`callout callout-${type}`}>
      <Icon size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
      <span>{children}</span>
    </div>
  )
}
