'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import createUser from '../services/createOnboarding'


export function useCreateOnboardingMutation() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: createUser,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['onboarding-user'],
      })

      queryClient.invalidateQueries({
        queryKey: ['books'],
      })
  },
  })
}