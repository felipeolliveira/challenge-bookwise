'use client'

import { useQuery } from '@tanstack/react-query'

import { BookCard } from '@/components/cards'
import { CircularProgress } from '@/components/ui'
import { getBooksByRating, GetBooksByRatingResponse } from '@/data'
import { useRouterHook } from '@/hooks/useRouterHook'

export function PopularRatingBooks() {
  const { searchParams } = useRouterHook()

  const { data, isFetching, error } = useQuery<GetBooksByRatingResponse>({
    queryKey: [getBooksByRating.key, 'popular'],
    queryFn: getBooksByRating.fetch({ orderBy: 'popular', limit: 4 }),
  })

  function handleClickCard(area: string, bookId: string) {
    if (area === 'cover' || area === 'card') {
      searchParams.set('book-info', bookId)
    }
  }

  if (isFetching) {
    return (
      <div className="mt-20 grid place-items-center gap-3">
        <CircularProgress />
      </div>
    )
  }

  if (error) {
    return <p>{error.message}</p>
  }

  return (
    <div className="mt-4 grid gap-3">
      {data?.ratingBooks.map(({ book, rating }) => {
        return (
          <BookCard
            key={rating.id}
            author={book.author}
            title={book.name}
            coverUrl={book.cover_url}
            ratingAt={new Date(rating.created_at)}
            description={book.summary}
            rating={rating.rate}
            onClick={(area) => handleClickCard(area, book.id)}
            mode="compact"
          />
        )
      })}
    </div>
  )
}
