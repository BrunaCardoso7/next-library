'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

type Book = {
  id?: string
  nm_title: string
  nm_author: string
  dt_published_year: number
  nr_followdown_count: number
  dt_criado?: Date
  nr_followup_count: number
  nm_user_cri?: string
  user_reaction?: 'UP' | 'DOWN' | null
}

export function useSearchBooks(
  searchTerm: string,
  id_onboarding_user?: number,
  ie_role?: string
) {
  const queryClient = useQueryClient()

  const filteredBooks = useMemo(() => {
    const cachedData = queryClient.getQueryData(['books', id_onboarding_user, ie_role]) as any

    if (!cachedData?.pages) return []

    const allBooks = cachedData.pages.flatMap((page: any) => page.books) as Book[]

    if (!searchTerm.trim()) return allBooks

    return allBooks.filter(book =>
      book.nm_title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [searchTerm, queryClient, id_onboarding_user, ie_role])

  return {
    books: filteredBooks,
    isLoading: false,
    isError: false,
  }
}
