import { z } from 'zod'

export const bookResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  author: z.string(),
  summary: z.string(),
  cover_url: z.string(),
  total_pages: z.number(),
  created_at: z.string().datetime(),
})

export type BookResponse = z.infer<typeof bookResponseSchema>
