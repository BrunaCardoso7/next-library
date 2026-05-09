'use client'

import { useMutation } from '@tanstack/react-query'
import createBook from '../services/createBook'


export function useCreateBookMutation() {
  const mutation = useMutation({
    mutationFn: createBook,
  })

  return mutation
}