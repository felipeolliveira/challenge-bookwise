'use client'

import { useQuery } from '@tanstack/react-query'

import { BookCard } from '@/components/cards'
import { CircularProgress } from '@/components/ui'
import { getBooksByRating, GetBooksByRatingResponse } from '@/data'
import { useRouterHook } from '@/hooks/useRouterHook'
import { routes } from '@/utils'

export function RecentlyRatingBooks() {
  const { router, searchParams } = useRouterHook()

  const { data, isFetching, error } = useQuery<GetBooksByRatingResponse>({
    queryKey: [getBooksByRating.key, 'recently'],
    queryFn: getBooksByRating.fetch({ orderBy: 'recently' }),
  })

  function handleClickCard(userId: string, bookId: string) {
    return (area: 'user' | 'cover' | 'card') => {
      if (area === 'user') {
        router.push(`${routes.profile}/${userId}`)
        return
      }

      if (area === 'cover') {
        searchParams.set('book-info', bookId)
      }
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
      {data?.ratingBooks.map(({ book, rating, user }) => {
        return (
          <BookCard
            key={book.id}
            author={book.author}
            title={book.name}
            coverUrl={book.cover_url}
            description={book.summary}
            rating={rating.rate}
            ratingAt={new Date(rating.created_at)}
            mode="withUser"
            onClick={handleClickCard(user.id, book.id)}
            user={{
              avatarUrl: user.avatar_url || '',
              name: user.name,
            }}
          />
        )
      })}
    </div>
  )
}
