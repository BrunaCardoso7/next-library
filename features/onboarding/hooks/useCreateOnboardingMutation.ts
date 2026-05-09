'use client'

import { useMutation } from '@tanstack/react-query'
import createUser from '../services/createOnboarding'


export function useCreateOnboardingMutation() {
  const mutation = useMutation({
    mutationFn: createUser,
  })

  return mutation
}