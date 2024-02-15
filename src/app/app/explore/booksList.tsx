'use client'

import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'

import { BookCard } from '@/components/cards'
import { CircularProgress } from '@/components/ui'
import { getBooks } from '@/data'
import { useRouterHook } from '@/hooks/useRouterHook'

export function BooksList() {
  const { searchParams } = useRouterHook()
  const categoryId = searchParams.get('category')
  const searchText = searchParams.get('search')

  const { data: session } = useSession()

  const { status, data } = useQuery({
    queryKey: [getBooks.key, session?.user.id, categoryId],
    queryFn: getBooks.fetch({ userId: session?.user.id, categoryId }),
    select: (data) => {
      if (searchText) {
        return data.filter((book) =>
          `${book.name}${book.author}`
            .toLowerCase()
            .replace(/\s/g, '')
            .includes(searchText.toLowerCase().replace(/\s/g, '')),
        )
      }
      return data
    },
  })

  function handleClickCard(area: string, bookId: string) {
    if (area === 'cover' || area === 'card') {
      searchParams.set('book-info', bookId)
    }
  }

  if (status === 'pending') {
    return (
      <div className="mt-12 grid place-items-center">
        <CircularProgress />
      </div>
    )
  }

  if (status === 'success' && !data.length) {
    return (
      <div className="mt-12 grid place-items-center">
        <p className="text-center text-gray-400">Nenhum livro encontrado</p>
      </div>
    )
  }

  return (
    <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {data?.map((book) => {
        return (
          <BookCard
            key={book.id}
            author={book.author}
            title={book.name}
            rating={book.rating_average}
            coverUrl={book.cover_url}
            description={book.summary}
            ratingAt={new Date(book.created_at)}
            isRead={book.is_read_by_user}
            onClick={(area) => handleClickCard(area, book.id)}
            mode="explorer"
          />
        )
      })}
    </div>
  )
}
