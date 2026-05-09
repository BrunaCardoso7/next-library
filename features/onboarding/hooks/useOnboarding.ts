'use client'

import { useState } from 'react'
import { useOnboardingForm } from './useOnboardingForm'

export function useOnboarding() {
  const [userId, setUserId] = useState<number | null>(null)

  const { form, onSubmit, setRole, isLoading, isError } = useOnboardingForm()

  return {
    form,
    onSubmit,
    setRole,
    setUserId,
    isLoading,
    isError,
  }
}