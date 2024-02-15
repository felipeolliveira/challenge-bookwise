import { z } from 'zod'

import { GetData } from '.'
import { userResponseSchema } from './schemas/user'

const userStatsSchema = z.object({
  user: userResponseSchema.optional(),
  stats: z.object({
    totalPages: z.number(),
    totalRatingBooks: z.number(),
    authors: z.number(),
    categoryMostRead: z.string(),
  }),
})

export type GetUserStatsResponse = z.infer<typeof userStatsSchema>

type GetUserStatsFetch = {
  userId?: string
}

export const getUserStats: GetData<GetUserStatsFetch, GetUserStatsResponse> = {
  key: 'user-stats',
  fetch: ({ userId }) => {
    return async () => {
      const response = await fetch(`/api/users/${userId}/stats`)
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      const booksRating = userStatsSchema.parse(json)

      return booksRating
    }
  },
}
