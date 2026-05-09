'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { OnboardingFormValues, User } from '../types/onboarding.types'

type OnboardingContextType = {
  data: Partial<User>
  setData: (data: Partial<User>) => void
  clear: () => void
}

const OnboardingContext = createContext<OnboardingContextType | null>(null)

export function OnboardingProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [data, setDataState] = useState<Partial<User>>({})

  useEffect(() => {
    const saved = localStorage.getItem('onboarding')
    if (saved) {
      setDataState(JSON.parse(saved))
    }
  }, [])

  const setData = (newData: Partial<User>) => {
    const updated = {
      ...data,
      ...newData,
    }

    setDataState(updated)
    localStorage.setItem('onboarding', JSON.stringify(updated))
  }

  const clear = () => {
    setDataState({})
    localStorage.removeItem('onboarding')
  }

  return (
    <OnboardingContext.Provider value={{ data, setData, clear }}>
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