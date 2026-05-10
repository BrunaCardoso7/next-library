'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import getBooks from '../services/getBooks'

type UseBooksQueryProps = {
  id_onboarding_user?: number
  ie_role?: string
  enabled?: boolean
}

export function useBooksQuery({
  id_onboarding_user,
  ie_role,
  enabled
}: UseBooksQueryProps = {}) {
  return useInfiniteQuery({
    queryKey: ['books', id_onboarding_user, ie_role],

    queryFn: ({ pageParam = 1 }) =>
      getBooks({
        page: pageParam,
        limit: 10,
        id_onboarding_user,
        ie_role,
      }),

    initialPageParam: 1,

    getNextPageParam: (lastPage) => {
      if (lastPage.pagination.page < lastPage.pagination.totalPages) {
        return lastPage.pagination.page + 1
      }
      return undefined
    },
    enabled: enabled && !!id_onboarding_user,
    staleTime: 1000 * 60 * 5,
  })
}