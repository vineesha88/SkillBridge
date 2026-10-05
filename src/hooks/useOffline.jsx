import { useState, useEffect, createContext, useContext } from 'react'

const OfflineContext = createContext(null)

export function OfflineProvider({ children }) {
  const [isOnline, setIsOnline] = useState(true)
  const [pendingRecords, setPendingRecords] = useState(0)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('skillbridge_online')
      if (stored !== null) setIsOnline(stored === 'true')
      const pending = localStorage.getItem('skillbridge_pending')
      if (pending !== null) setPendingRecords(parseInt(pending, 10) || 0)
    } catch {
      // ignore
    }
  }, [])

  const toggleOnline = () => {
    const next = !isOnline
    setIsOnline(next)
    try {
      localStorage.setItem('skillbridge_online', String(next))
    } catch {
      // ignore
    }
  }

  const incrementPending = () => {
    const next = pendingRecords + 1
    setPendingRecords(next)
    try {
      localStorage.setItem('skillbridge_pending', String(next))
    } catch {
      // ignore
    }
  }

  const simulateSync = () => {
    const count = pendingRecords
    setPendingRecords(0)
    try {
      localStorage.setItem('skillbridge_pending', '0')
    } catch {
      // ignore
    }
    return count
  }

  return (
    <OfflineContext.Provider
      value={{ isOnline, toggleOnline, pendingRecords, incrementPending, simulateSync }}
    >
      {children}
    </OfflineContext.Provider>
  )
}

export function useOffline() {
  const ctx = useContext(OfflineContext)
  if (!ctx) throw new Error('useOffline must be used within OfflineProvider')
  return ctx
}
