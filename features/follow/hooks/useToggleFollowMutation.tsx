'use client'

import { useMutation } from '@tanstack/react-query'
import { createFollow } from '../services/createFollow'

export function useToggleFollowMutation() {
  return useMutation({
    mutationFn: createFollow,
  })
}
