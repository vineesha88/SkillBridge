import { useLanguage } from '../hooks/useLanguage.jsx'

const stepKeys = ['stepExperience', 'stepMapping', 'stepTasks', 'stepEvidence', 'stepAssessment']

export default function ProgressIndicator({ currentStep }) {
  const { t } = useLanguage()

  return (
    <div className="progress-steps" role="navigation" aria-label="Assessment progress">
      {stepKeys.map((stepKey, idx) => {
        const stepNum = idx + 1
        const isActive = stepNum === currentStep
        const isCompleted = stepNum < currentStep
        const isPending = stepNum > currentStep

        return (
          <div key={stepKey} style={{ display: 'flex', alignItems: 'center' }}>
            <div
              className={`progress-step ${isActive ? 'active' : isCompleted ? 'completed' : 'pending'}`}
            >
              <div className="progress-step-number">{stepNum}</div>
              <span className="progress-step-label">{t(stepKey)}</span>
            </div>
            {idx < stepKeys.length - 1 && (
              <div className={`progress-step-connector ${isCompleted ? 'completed' : ''}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
