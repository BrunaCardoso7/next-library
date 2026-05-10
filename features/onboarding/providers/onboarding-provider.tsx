'use client'

import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { User } from '../types/onboarding.types'

type OnboardingContextType = {
  data: Partial<User>
  setData: (data: Partial<User>) => void
  clear: () => void
  hydrated: boolean 
}

const OnboardingContext = createContext<OnboardingContextType | null>(null)

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const [data, setDataState] = useState<Partial<User>>({})
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('onboarding')
    if (saved) {
      try {
        setDataState(JSON.parse(saved))
      } catch {
        localStorage.removeItem('onboarding')
      }
    }
    setHydrated(true)
  }, [])

  const setData = useCallback((newData: Partial<User>) => {
    setDataState(prev => {
      const updated = newData.id
        ? newData
        : { ...prev, ...newData }
      localStorage.setItem('onboarding', JSON.stringify(updated))
      return updated
    })
  }, [])

  const clear = useCallback(() => {
    setDataState({})
    localStorage.removeItem('onboarding')
  }, [])

  // 👇 só aqui, depois das funções declaradas
  return (
    <OnboardingContext.Provider value={{ data, setData, clear, hydrated }}>
      {children}
    </OnboardingContext.Provider>
  )
}
export function useOnboardingContext() {
  const context = useContext(OnboardingContext)
  if (!context) {
    throw new Error('useOnboardingContext must be used inside OnboardingProvider')
  }
  return context
}