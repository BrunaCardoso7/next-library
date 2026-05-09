import { z } from 'zod'

export const booksSchema = z.object({
  nm_title: z
    .string()
    .min(2, 'Título deve ter ao menos 2 caracteres')
    .max(100, 'Título muito longo')
    .trim(),

  nm_author: z
    .string()
    .min(2, 'Autor deve ter ao menos 2 caracteres')
    .max(100, 'Autor muito longo')
    .trim(),

  dt_published_year: z.coerce
    .number()
    .min(1900, 'Ano deve ser maior que 1900')
    .max(
      new Date().getFullYear(),
      'Ano não pode ser no futuro'
    ),

  nr_followup_count: z.coerce
    .number()
    .min(0, 'Follow-up deve ser positivo')
    .optional()
    .default(0),

  nr_followdown_count: z.coerce
    .number()
    .min(0, 'Follow-down deve ser positivo')
    .optional()
    .default(0),

  dt_criado: z.date().optional(),

  nm_user_cri: z.string().optional(),
})

export type BooksFormData = z.infer<typeof booksSchema>