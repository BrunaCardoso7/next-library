'use client'

import { useState } from 'react'
import { useOnboardingForm } from './useOnboardingForm'

export function useOnboarding() {
  const { form, onSubmit, isLoading, isError } = useOnboardingForm()

  return {
    form,
    onSubmit,
    isLoading,
    isError,
  }
}