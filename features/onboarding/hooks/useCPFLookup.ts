'use client'

import { useCallback, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'
import { useOnboardingContext } from '../providers/onboarding-provider'

export interface UserFound {
  id: number
  nm_user: string
  nr_cpf: string
  ie_role: 'visitor' | 'writer'
}

export function useCPFLookup(
  setValue: UseFormSetValue<any>,
  onUserFound: (userId: number) => void
) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { setData } = useOnboardingContext()
  const lookupByCPF = useCallback(async (cpf: string) => {
    if (!cpf) {
      setError(null)
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch(`/api/user?cpf=${encodeURIComponent(cpf)}`)
      
      if (response.ok) {
        const user: UserFound = await response.json()
        console.log('Usuário encontrado:', user)

        if (user) {
          setData(user)
        }
        setValue('nm_user', user.nm_user)
        setValue('ie_role', user.ie_role)
        onUserFound(user.id)
        setError(null)
      } else {
        console.log('Usuário não encontrado')
        setValue('nm_user', '')
        onUserFound(0) 
        setError(null)
      }
    } catch (err) {
      setError('Erro ao buscar CPF')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [setValue, onUserFound])

  return {
    lookupByCPF,
    isLoading,
    error,
  }
}
