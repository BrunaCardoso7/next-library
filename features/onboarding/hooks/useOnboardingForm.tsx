'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { onboardingSchema } from '../schemas/onboarding.schema'
import { OnboardingFormValues } from '../types/onboarding.types'
import { useOnboardingContext,} from '../providers/onboarding-provider'


import { useCreateOnboardingMutation,} from './useCreateOnboardingMutation'
import { useUpdateOnboardingMutation } from './useUpdateOnboarding'

export function useOnboardingForm() {
  const router = useRouter()
  const { data, setData, } = useOnboardingContext()
  const [userId, setUserId,] = useState<number | null>(null)

  const form =
    useForm<OnboardingFormValues>({
      resolver: zodResolver( onboardingSchema),
      defaultValues: {
        nm_user: '',
        nr_cpf: '',
        ie_role: 'visitor',
      },
    })

  const updateMutation = useUpdateOnboardingMutation()

  const createMutation = useCreateOnboardingMutation()

  function handleSuccess(response: any) {
    setData({
      nm_user: response.data?.nm_user || form.getValues('nm_user'),
      nr_cpf: response.data?.nr_cpf || form.getValues('nr_cpf'),
      ie_role: response.data?.ie_role || form.getValues('ie_role'),
    })
    router.push('/library')
  }

  function onSubmit(
    formData: OnboardingFormValues
  ) {
    if (userId) {

      updateMutation.mutate(
        {
          user_id: userId,
          data: formData,
        },
        { onSuccess: handleSuccess }
      )
      return
    }

    createMutation.mutate(
      formData,
      { onSuccess: handleSuccess }
    )
  }

  function setRole(role: 'visitor' | 'writer') {
    form.setValue('ie_role', role)

    setData({
      nm_user:
        data.nm_user ||
        form.getValues('nm_user'),
      nr_cpf:
        data.nr_cpf ||
        form.getValues('nr_cpf'),
      ie_role: role,
    })
  }

  return {
    form,
    onSubmit,
    setRole,
    setUserId,
    isLoading:
      createMutation.isPending ||
      updateMutation.isPending,
    isError:
      createMutation.isError ||
      updateMutation.isError,
    error:
      createMutation.error ||
      updateMutation.error,
  }
}