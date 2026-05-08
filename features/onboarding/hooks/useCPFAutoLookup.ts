import { useEffect, useRef } from "react"

export function useCpfAutoLookup(cpf: string, lookupByCPF: (cpf: string) => void) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (cpf && cpf.length >= 11) {
      timeoutRef.current = setTimeout(() => {
        lookupByCPF(cpf)
      }, 800)
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [cpf, lookupByCPF])
}