'use client'

import { useMutation } from '@tanstack/react-query'

import updateUser from '../services/updateOnboarding'

import { OnboardingFormValues, } from '../types/onboarding.types'

type UpdatePayload = {
  user_id: number
  data: OnboardingFormValues
}

export function useUpdateOnboardingMutation() {
  return useMutation({
    mutationFn: ({
      user_id,
      data,
    }: UpdatePayload) =>
      updateUser(user_id, data),
  })
}