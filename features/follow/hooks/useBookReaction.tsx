'use client'

import { useQueryClient } from '@tanstack/react-query'
import { useRemoveFollowMutation } from './useRemoveFollowMutation'
import { useCreateFollowMutation } from './useCreateFollowMutation'

type ReactionType = 'UP' | 'DOWN'

type BookReactionParams = {
  id_book: number
  id_onboarding_user: number
  currentReaction?: ReactionType | null
}

export function useBookReaction({
  id_book,
  id_onboarding_user,
  currentReaction,
}: BookReactionParams) {
  const queryClient = useQueryClient()
  const toggleMutation = useCreateFollowMutation()
  const removeMutation = useRemoveFollowMutation()

  async function handleReaction(type: ReactionType) {
    // Atualiza o cache otimisticamente antes de fazer a requisição
    queryClient.setQueryData(['books', id_onboarding_user], (oldData: any) => {
      if (!oldData) return oldData

      return {
        ...oldData,
        pages: oldData.pages.map((page: any) => ({
          ...page,
          books: page.books.map((book: any) => {
            if (book.id !== id_book) return book

            // Se clicou na mesma reação, remove
            if (currentReaction === type) {
              return {
                ...book,
                user_reaction: null,
                nr_followup_count: type === 'UP' ? Math.max(0, book.nr_followup_count - 1) : book.nr_followup_count,
                nr_followdown_count: type === 'DOWN' ? Math.max(0, book.nr_followdown_count - 1) : book.nr_followdown_count,
              }
            }

            // Se trocou de reação
            return {
              ...book,
              user_reaction: type,
              nr_followup_count: type === 'UP' ? book.nr_followup_count + 1 : (currentReaction === 'UP' ? Math.max(0, book.nr_followup_count - 1) : book.nr_followup_count),
              nr_followdown_count: type === 'DOWN' ? book.nr_followdown_count + 1 : (currentReaction === 'DOWN' ? Math.max(0, book.nr_followdown_count - 1) : book.nr_followdown_count),
            }
          }),
        })),
      }
    })

    try {
      // Se clicou na mesma reação, remove
      if (currentReaction === type) {
        await removeMutation.mutateAsync({
          id_book,
          id_onboarding_user,
        })
      } else {
        // Se trocou de reação, add/update
        await toggleMutation.mutateAsync({
          id_book,
          id_onboarding_user,
          type,
        })
      }

      // Invalida o cache para garantir sincronização com o backend
      queryClient.invalidateQueries({
        queryKey: ['books', id_onboarding_user],
      })
    } catch (error) {
      // Se falhar, invalida o cache para refetch
      queryClient.invalidateQueries({
        queryKey: ['books', id_onboarding_user],
      })
      throw error
    }
  }

  return {
    handleReaction,
    isLoading: toggleMutation.isPending || removeMutation.isPending,
  }
}