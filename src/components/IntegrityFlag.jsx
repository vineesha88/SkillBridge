import { Check, AlertTriangle, X } from 'lucide-react'

export default function IntegrityFlag({ level, message }) {
  const Icon = level === 'ok' ? Check : level === 'warning' ? AlertTriangle : X

  return (
    <div className={`integrity-flag ${level}`}>
      <Icon size={16} flex-shrink="0" />
      <span>{message}</span>
    </div>
  )
}
