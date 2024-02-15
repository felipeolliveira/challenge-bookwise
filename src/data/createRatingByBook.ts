import { MutationData } from '.'

export type CreateRatingByBookIdArgs = {
  bookId: string
  userId: string
  rate: number
  comment: string
}

export const createRatingByBookId: MutationData<CreateRatingByBookIdArgs> = {
  key: 'create-rating-by-bookid',
  fn: async ({ bookId, userId, rate, comment }) => {
    await fetch(`/api/books/${bookId}/rating`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        rate,
        comment,
      }),
    })
  },
}
