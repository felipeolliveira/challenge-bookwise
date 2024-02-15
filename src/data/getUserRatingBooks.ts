import { z } from 'zod'

import { GetData } from '.'
import { bookResponseSchema } from './schemas/book'
import { rateSchema } from './schemas/rate'

const getUserRatingBooksSchema = z.array(
  z.object({
    book: bookResponseSchema,
    rating: rateSchema,
  }),
)

interface GetUserRatingBooksFetch {
  userId?: string
  limit?: number
}

export type GetUserRatingBooksResponse = z.infer<
  typeof getUserRatingBooksSchema
>

export const getUserRatingBooks: GetData<
  GetUserRatingBooksFetch,
  GetUserRatingBooksResponse
> = {
  key: 'user-rating-books',
  fetch: ({ userId, limit }) => {
    return async () => {
      const response = await fetch(
        `/api/users/${userId}/rating-books?limit=${limit ?? -1}`,
      )
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      return getUserRatingBooksSchema.parse(json)
    }
  },
}
