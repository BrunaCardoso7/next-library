'use client'

import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { onboardingSchema } from '../schemas/onboarding.schema'
import { OnboardingFormValues } from '../types/onboarding.types'
import createUser from '../services/createOnboarding'
import { useOnboardingContext } from '../providers/onboarding-provider'

export function useOnboarding() {
  const router = useRouter()
  const { data, setData, clear } = useOnboardingContext()
  const [userId, setUserId] = useState<number | null>(null)

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      nm_user: '',
      nr_cpf: '',
      ie_role: 'visitor',
    },
  })

  const mutation = useMutation({
    mutationFn: async (formData: OnboardingFormValues) => {
      // Se tem userId, é uma atualização
      if (userId) {
        const res = await fetch(`/api/user/${userId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('Erro ao atualizar')
        return res.json()
      } else {
        // Senão, é criação
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        if (!res.ok) throw new Error('Erro ao criar')
        return res.json()
      }
    },
    onSuccess: (response) => {
      setData({
        nm_user: response.data?.nm_user || form.getValues('nm_user'),
        ie_role: response.data?.ie_role || form.getValues('ie_role'),
      })
      router.push('/library')
    },
  })

  const onSubmit = (data: OnboardingFormValues) => {
    mutation.mutate(data)
  }

  const setRole = (role: 'visitor' | 'writer') => {
    form.setValue('ie_role', role)
    setData({ 
      nm_user: data.nm_user || form.getValues('nm_user'),
      ie_role: role
    })
  }

  return {
    form,
    onSubmit,
    setRole,
    setUserId,

    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}