import { useState, useEffect, useCallback } from 'react'

export function useRouter() {
  const [route, setRoute] = useState(() => {
    const hash = window.location.hash.replace('#/', '').replace('#', '')
    return hash || 'landing'
  })

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '')
      setRoute(hash || 'landing')
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const navigate = useCallback((path) => {
    window.location.hash = '/' + path
    setRoute(path)
    window.scrollTo(0, 0)
  }, [])

  return { route, navigate }
}
