import z from "zod"
import { onboardingSchema } from "../schemas/onboarding.schema"

export type UserRole = 'visitor' | 'writer'

export type OnboardingFormValues = z.infer<typeof onboardingSchema> & {
  nr_cpf: string
}

export interface User {
  id: number
  nm_user: string
  nr_cpf?: string
  ie_role: UserRole
}
 

export interface RoleOption {
  value: UserRole
  label: string
  description: string
  symbol: string
}