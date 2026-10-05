import { Check, AlertTriangle, X, Clock, FileText } from 'lucide-react'

const statusConfig = {
  'Not Started': { variant: 'neutral', icon: Clock },
  'In Progress': { variant: 'warning', icon: AlertTriangle },
  'Evidence Submitted': { variant: 'info', icon: FileText },
  'Verified': { variant: 'success', icon: Check },
  'Pending': { variant: 'warning', icon: Clock },
  'Needs Review': { variant: 'warning', icon: AlertTriangle },
  'Ready for Decision': { variant: 'info', icon: FileText },
  'Completed': { variant: 'success', icon: Check },
  'Recommend Certification': { variant: 'success', icon: Check },
  'Needs Further Assessment': { variant: 'warning', icon: AlertTriangle },
  'Request Re-Demonstration': { variant: 'error', icon: X },
}

export default function StatusBadge({ status }) {
  const config = statusConfig[status] || { variant: 'neutral', icon: Clock }
  const Icon = config.icon

  return (
    <span className={`badge badge-${config.variant}`}>
      <Icon size={12} />
      {status}
    </span>
  )
}
