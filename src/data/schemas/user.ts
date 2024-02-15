import { z } from 'zod'

export const userResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  avatar_url: z.string().nullable(),
  created_at: z.string().datetime(),
})

export type UserResponse = z.infer<typeof userResponseSchema>
