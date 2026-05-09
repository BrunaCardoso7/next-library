import { z } from 'zod'

export const booksSchema = z.object({
  nm_title: z
    .string()
    .min(2)
    .max(100)
    .trim(),

  nm_author: z
    .string()
    .min(2)
    .max(100)
    .trim(),

  dt_published_year: z.coerce
    .number()
    .min(1900)
    .max(new Date().getFullYear()),

  nr_followup_count: z.coerce
    .number()
    .min(0)
    .optional()
    .default(0),

  nr_followdown_count: z.coerce
    .number()
    .min(0)
    .optional()
    .default(0),

  dt_criado: z.date().optional(),

  nm_user_cri: z.string().optional(),
})

export type BooksFormData = z.infer<
  typeof booksSchema
>