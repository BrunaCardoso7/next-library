'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import getBooks from '../services/getBooks'

type UseBooksQueryProps = {
  id_onboarding_user?: number
  ie_role?: string
}

export function useBooksQuery({
  id_onboarding_user,
  ie_role,
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

    staleTime: 1000 * 60 * 5,
  })
}