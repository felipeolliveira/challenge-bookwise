import { z } from 'zod'

import { GetData } from '.'
import { bookResponseSchema } from './schemas/book'
import { rateSchema } from './schemas/rate'

const getBooksSchema = z.array(
  bookResponseSchema.and(
    z.object({
      rating_average: z.number(),
      is_read_by_user: z.boolean(),
      ratings: z.array(rateSchema),
      categories: z.array(z.object({ name: z.string(), id: z.string() })),
    }),
  ),
)

export type GetBooksResponse = z.output<typeof getBooksSchema>

export type GetBooksArgs = {
  userId?: string
  categoryId?: string | null
}

export const getBooks: GetData<GetBooksArgs, GetBooksResponse> = {
  key: 'books',
  fetch: ({ userId, categoryId }) => {
    return async () => {
      const response = await fetch(
        `/api/books?userId=${userId}&categoryId=${categoryId ?? ''}`,
      )
      const json = await response.json()

      if (!response.ok) {
        throw new Error(json.message)
      }

      return getBooksSchema.parse(json)
    }
  },
}
