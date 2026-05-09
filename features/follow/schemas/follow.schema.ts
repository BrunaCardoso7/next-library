import { z } from 'zod'

export const followSchema = z
  .object({
    id_book: z.coerce.number(),

    id_onboarding_user: z.coerce.number(),

    is_followup: z.boolean(),

    is_followdown: z.boolean(),

    dt_criado: z.date().optional(),
  })

  .refine(
    (data) =>
      !(
        data.is_followup &&
        data.is_followdown
      ),

    {
      message:
        'Não é possível curtir e descurtir ao mesmo tempo',

      path: ['is_followup'],
    }
  )

export type FollowFormData =
  z.infer<typeof followSchema>