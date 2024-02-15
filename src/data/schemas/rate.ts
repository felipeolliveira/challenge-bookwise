import { z } from 'zod'

export const rateSchema = z.object({
  id: z.string(),
  rate: z.number().int(),
  created_at: z.string().datetime(),
})
