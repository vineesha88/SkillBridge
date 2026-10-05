import { useState, useEffect, createContext, useContext } from 'react'
import { demoAssessments } from '../data/assessments.js'
import { workers as demoWorkers } from '../data/workers.js'
import { loadState, saveState } from '../utils/storage.js'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [assessments, setAssessments] = useState(() => {
    const stored = loadState()
    return (stored && stored.assessments) || demoAssessments
  })

  const [workers, setWorkers] = useState(() => {
    const stored = loadState()
    return (stored && stored.workers) || demoWorkers
  })

  const [currentWorker, setCurrentWorker] = useState(() => {
    const stored = loadState()
    return (stored && stored.currentWorker) || demoWorkers[0]
  })

  const [currentAssessment, setCurrentAssessment] = useState(() => {
    const stored = loadState()
    return (stored && stored.currentAssessment) || demoAssessments[0]
  })

  useEffect(() => {
    saveState({ assessments, workers, currentWorker, currentAssessment })
  }, [assessments, workers, currentWorker, currentAssessment])

  const updateAssessment = (id, updates) => {
    setAssessments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    )
  }

  const updateAssessmentTask = (assessmentId, taskId, updates) => {
    setAssessments((prev) =>
      prev.map((a) => {
        if (a.id !== assessmentId) return a
        const newTaskProgress = a.taskProgress.map((tp) =>
          tp.taskId === taskId ? { ...tp, ...updates } : tp,
        )
        return { ...a, taskProgress: newTaskProgress }
      }),
    )
  }

  const addWorker = (worker) => {
    setWorkers((prev) => [...prev, worker])
  }

  const value = {
    assessments,
    workers,
    currentWorker,
    currentAssessment,
    setCurrentWorker,
    setCurrentAssessment,
    updateAssessment,
    updateAssessmentTask,
    addWorker,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
