import { z } from 'zod'

const roles = ['visitor', 'writer'] as const

export const onboardingSchema = z.object({
  nm_user: z
    .string()
    .min(2, 'Nome deve ter ao menos 2 caracteres')
    .max(50, 'Nome muito longo')
    .trim(),
  nr_cpf: z.string().min(1, "CPF obrigatório"),
  ie_role: z.enum(roles, {
    message: 'Selecione como você vai explorar a biblioteca',
  }),
})

export type OnboardingFormData = z.infer<typeof onboardingSchema>