import { useOnboardingContext } from '@/features/onboarding/providers/onboarding-provider'
import { BooksFormData, booksSchema } from '../schemas/book.schema'
import { useCreateBookMutation } from './useBookmutation'
import { useRouter } from 'next/navigation'
import { useForm, UseFormReturn } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import { CreateBookPayload } from '../types/library.types'

export function useFormBook() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { data, setData } = useOnboardingContext()
  const mutation = useCreateBookMutation()
  const userId = data?.id
  const nm_user = data?.nm_user || ''

  const form = useForm({
    resolver: zodResolver(booksSchema),
  }) as UseFormReturn<BooksFormData>

  const onSubmit = async (
    formData: BooksFormData
  ) => {
    if (!userId) {
      toast.error('Usuário de onboarding não encontrado')
      return
    }

    const payload: CreateBookPayload = {
      ...formData,
      nm_user_cri: formData.nm_user_cri || nm_user,
      id_onboarding_user: userId,
    }

    mutation.mutate(payload, {
      onSuccess: (response) => {
        setData({
          ...data,
          nm_user: response.data?.nm_user_cri || form.getValues('nm_user_cri'),
          ie_role: 'writer',
        })

        queryClient.invalidateQueries({
          queryKey: ['books'],
        })

        queryClient.invalidateQueries({
          queryKey: [
            'books',
            userId,
            'writer',
          ],
        })

        toast.success('Livro criado com sucesso')

        router.push('/library')
      },

      onError: (error) => {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Erro ao criar livro'
        )
      },
    })
  }

  return {
    form,
    onSubmit,

    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}