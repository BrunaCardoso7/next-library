import { useEffect, useRef } from 'react'

export function useCpfAutoLookup(cpf: string, lookupByCPF: (cpf: string) => void) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const digits = cpf?.replace(/\D/g, '') ?? ''
    
    if (timerRef.current) clearTimeout(timerRef.current)

    if (digits.length !== 11) return 

    timerRef.current = setTimeout(() => {
      lookupByCPF(digits)
    }, 600)

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [cpf, lookupByCPF])
}