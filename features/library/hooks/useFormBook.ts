import { useOnboardingContext } from "@/features/onboarding/providers/onboarding-provider"
import { BooksFormData, booksSchema } from "../schemas/book.schema"
import { useCreateBookMutation } from "./useBookmutation"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

export function useFormBook() {
  const router = useRouter()
  const { data, setData } = useOnboardingContext()
  const mutation = useCreateBookMutation()

  const cpf = data?.nr_cpf || ''

  const form = useForm({
    resolver: zodResolver(booksSchema),
    mode: 'onChange',
    defaultValues: {
      nm_title: '',
      nm_author: '',
      dt_published_year: new Date().getFullYear(),
      nr_followup: 0,
      nm_user_cri: cpf,
    },
  })

  const onSubmit = async (formData: BooksFormData) => {
    mutation.mutate(
        {
            ...formData,
            nm_user_cri: formData.nm_user_cri || cpf,
        },
        {
            onSuccess: (response) => {
            setData({
                nm_user:
                response.data?.nm_user_cri ||
                form.getValues('nm_user_cri'),

                ie_role: 'writer',
            })

            router.push('/library')
            },

            onError: (error) => {
            toast.error(
                error instanceof Error
                ? error.message
                : 'Erro ao criar livro'
            )
            },
        }
    )
  }

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  }
}