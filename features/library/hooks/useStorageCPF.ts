'use client'

import { useEffect, useState } from 'react'


export function useLibrary() {
  const [cpf, setCpf] = useState<string>('')

  useEffect(() => {
    const saved = localStorage.getItem('onboarding')
    if (saved) {
      const parsed = JSON.parse(saved)
      setCpf(parsed.nr_cpf || '')
    }
  }, [])

  return {
    cpf, 
    setCpf
  }
}