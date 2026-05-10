import { toast } from "sonner"
import { OnboardingFormValues } from "../types/onboarding.types"
import { useCreateOnboardingMutation } from "./useCreateOnboardingMutation"
import { useUpdateOnboardingMutation } from "./useUpdateOnboarding"
import { onboardingSchema } from "../schemas/onboarding.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useOnboardingContext } from "../providers/onboarding-provider"
import { useRouter } from "next/navigation"

export function useOnboardingForm() {
  const router = useRouter()
  const { data, setData, clear } = useOnboardingContext()
  const user_id = data?.id

  const form = useForm<OnboardingFormValues>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      nm_user: '',
      nr_cpf: '',
      ie_role: 'visitor',
    },
  })

  const createMutation = useCreateOnboardingMutation()
  const updateMutation = useUpdateOnboardingMutation()

  function handleSuccess(response: any) {
    const user = response.data
    setData({
      id: user.id,
      nm_user: user.nm_user,
      nr_cpf: user.nr_cpf,
      ie_role: user.ie_role,
    })

    toast.success('Seja bem-vindo, ' + user.nm_user)
    router.push('/library')
  }

  const onSubmit = async (values: OnboardingFormValues) => {
    const payload = {
      nm_user: values.nm_user,
      nr_cpf: values.nr_cpf,
      ie_role: values.ie_role,
    }

    if (user_id) {
      updateMutation.mutate(
        { user_id, data: payload },
        { onSuccess: handleSuccess }
      )
    } else {
      
      createMutation.mutate(payload, {
        onSuccess: handleSuccess, 
      })
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending
  const isError = createMutation.isError || updateMutation.isError
  const error = createMutation.error || updateMutation.error

  return { form, onSubmit, user_id, isLoading, isError, error }
}