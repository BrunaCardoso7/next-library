'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { onboardingSchema } from '../schemas/onboarding.schema'
import { OnboardingFormValues } from '../types/onboarding.types'
import { useOnboardingContext } from '../providers/onboarding-provider'

export function useOnboardingForm() {
  const router = useRouter()

  const {
    data,
    setData,
    clear,
  } = useOnboardingContext()

  const user_id = data?.id

  const form =
    useForm<OnboardingFormValues>({
      resolver: zodResolver(onboardingSchema),
      defaultValues: {
        nm_user: '',
        nr_cpf: '',
        ie_role: 'visitor',
      },
    })

  function handleSuccess(response: any) {
    const user = response.data

    setData({
      id: user.id,
      nm_user: user.nm_user,
      nr_cpf: user.nr_cpf,
      ie_role: user.ie_role,
    })

    router.push('/library')
  }

  const onSubmit = async (
    values: OnboardingFormValues
  ) => {
    const payload = {
      nm_user: values.nm_user,
      nr_cpf: values.nr_cpf,
      ie_role: values.ie_role,
    }

    // EDITAR usuário existente
    if (data?.id) {
      const response = await fetch(
        `/api/user/${data.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }
      )

      const updatedUser =
        await response.json()

      handleSuccess(updatedUser)

      return
    }

    // NOVO usuário
    // limpa onboarding antigo
    clear()

    const response = await fetch('/api/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const createdUser =
      await response.json()

    handleSuccess(createdUser)
  }

  return {
    form,
    onSubmit,
    user_id,
  }
}