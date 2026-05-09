'use client'

import { useMutation } from '@tanstack/react-query'
import { removeFollow } from '../services/removeFollow'

export function useRemoveFollowMutation() {
  return useMutation({
    mutationFn: removeFollow,
  })
}
