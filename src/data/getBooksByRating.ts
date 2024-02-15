import { z } from 'zod'

import { GetData } from '.'
import { bookResponseSchema } from './schemas/book'
import { rateSchema } from './schemas/rate'
import { userResponseSchema } from './schemas/user'

const booksByRatingReponseSchema = z.object({
  orderBy: z.string(),
  ratingBooks: z.array(
    z.object({
      book: bookResponseSchema,
      rating: rateSchema,
      user: userResponseSchema,
    }),
  ),
})

export type GetBooksByRatingResponse = z.infer<
  typeof booksByRatingReponseSchema
>

type GetBooksByRatingFetch = {
  orderBy: 'recently' | 'popular'
  limit?: number
}

export const getBooksByRating: GetData<
  GetBooksByRatingFetch,
  GetBooksByRatingResponse
> = {
  key: 'books-by-rating',
  fetch: ({ orderBy, limit }) => {
    return async () => {
      const response = await fetch(
        `/api/ratings?orderBy=${orderBy}&limit=${limit ?? -1}`,
      )
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      const booksRating = booksByRatingReponseSchema.parse(json)

      return booksRating
    }
  },
}
