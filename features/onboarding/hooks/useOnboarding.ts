'use client'

import { useState } from 'react'
import { useOnboardingForm } from './useOnboardingForm'

export function useOnboarding() {
  const [userId, setUserId] = useState<number | null>(null)

  const { form, onSubmit, isError, isLoading } = useOnboardingForm()

  return {
    form,
    onSubmit,
    userId,
    setUserId,
    isError,
    isLoading,
  }
}