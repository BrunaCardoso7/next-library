'use client'

import { useMutation } from '@tanstack/react-query'
import { toggleFollow } from '../services/toogleFollow'


export function useToggleFollowMutation() {
  return useMutation({
    mutationFn: toggleFollow,
  })
}