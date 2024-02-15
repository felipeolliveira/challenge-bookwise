import { z } from 'zod'

import { GetData } from '.'
import { bookResponseSchema } from './schemas/book'
import { rateSchema } from './schemas/rate'

const bookSchema = bookResponseSchema.and(
  z.object({
    categories: z.array(
      z.object({
        category: z.object({
          name: z.string(),
          id: z.string(),
        }),
      }),
    ),
    rating_average: z.number(),
    ratings: z.array(
      rateSchema.and(
        z.object({
          description: z.string(),
          user: z.object({
            id: z.string(),
            name: z.string(),
            avatar_url: z.string(),
          }),
        }),
      ),
    ),
  }),
)

export type SingleBookArgs = {
  bookId: string
}
export type SingleBookResponse = z.infer<typeof bookSchema>

export const getBook: GetData<SingleBookArgs, SingleBookResponse> = {
  key: 'single-book',
  fetch: ({ bookId }) => {
    return async () => {
      const response = await fetch(`/api/books/${bookId}`)
      const data = await response.json()
      return bookSchema.parse(data)
    }
  },
}
