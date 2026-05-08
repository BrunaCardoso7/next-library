'use client'

import { useCallback, useState } from 'react'
import { UseFormSetValue } from 'react-hook-form'

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
        // Auto-completa o nome com o usuário encontrado
        setValue('nm_user', user.nm_user)
        // Carrega o papel anterior do usuário (pode ser editado)
        setValue('ie_role', user.ie_role)
        // Passa o ID do usuário para fazer update
        onUserFound(user.id)
        setError(null)
      } else {
        // Usuário não encontrado - limpa o nome para nova criação
        console.log('Usuário não encontrado')
        setValue('nm_user', '')
        onUserFound(0) // 0 significa criação nova
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
