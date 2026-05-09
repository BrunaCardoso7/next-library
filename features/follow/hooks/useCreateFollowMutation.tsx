'use client'

import { useMutation } from '@tanstack/react-query'
import { createFollow } from '../services/createFollow'


export function useCreateFollowMutation() {
  return useMutation({
    mutationFn: createFollow,
  })
}