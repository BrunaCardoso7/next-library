'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'

import updateUser from '../services/updateOnboarding'

import { OnboardingFormValues } from '../types/onboarding.types'

type UpdatePayload = {
  user_id: number
  data: OnboardingFormValues
}

export function useUpdateOnboardingMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      user_id,
      data,
    }: UpdatePayload) => updateUser(user_id, data),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['onboarding-user', variables.user_id],
      })

      queryClient.invalidateQueries({
        queryKey: ['books'],
      })
    },
  })
}