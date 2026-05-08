'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { onboardingSchema } from '../schemas/onboarding.schema'
import type { z } from 'zod'

type OnboardingFormValues = z.infer<typeof onboardingSchema>

export function useOnboarding() {
  const router = useRouter()

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      nm_user: '',
      ie_role: 'visitor',
    },
  })

  const onSubmit = async (data: OnboardingFormValues) => {
    console.log('Onboarding data:', data)
    router.push('/library')
  }

  const setRole = (role: OnboardingFormValues['ie_role']) => {
    form.setValue('ie_role', role)
  }

  return {
    form,
    onSubmit,
    setRole,
  }
}