'use client'

import { useRouter } from 'next/navigation'
import { booksSchema } from '../schemas/book.schema'
import type { z } from 'zod'
import { useOnboardingContext } from '@/features/onboarding/providers/onboarding-provider'
import { useFormBook } from './useFormBook'

type BooksFormData = z.infer<typeof booksSchema>

export function useLibrary() {
  const router = useRouter()
  const { data, setData } = useOnboardingContext()

  const { 
    form, 
    onSubmit, 
    isLoading, 
    isError, 
    error 
  } = useFormBook()


  const setRole = (role: 'visitor' | 'writer') => {
    setData({ 
      nm_user: data.nm_user,
      ie_role: role
    })
  }

  return {
    form,
    onSubmit,
    router,
    setRole,
    isLoading,
    isError,
    error,
  }
}