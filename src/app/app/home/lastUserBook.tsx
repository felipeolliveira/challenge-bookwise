'use client'

import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

import { BookCard } from '@/components/cards'
import { Button } from '@/components/ui'
import { getUserRatingBooks } from '@/data'
import { useRouterHook } from '@/hooks/useRouterHook'
import { routes } from '@/utils'

export function LastUserBook() {
  const { searchParams } = useRouterHook()
  const { status, data: session } = useSession()
  const user = session?.user

  const { data } = useQuery({
    queryKey: [getUserRatingBooks.key, user?.id, { limit: 1 }],
    queryFn: getUserRatingBooks.fetch({ userId: user?.id, limit: 1 }),
    enabled: !!user,
  })

  const firstBook = data?.at(0)

  if (status !== 'authenticated' || !firstBook) {
    return null
  }

  const { book, rating } = firstBook

  function handleClickCard(area: string, bookId: string) {
    if (area === 'cover' || area === 'card') {
      searchParams.set('book-info', bookId)
    }
  }

  return (
    <section>
      <header className="mb-4 flex items-center justify-between">
        <h3 className="text-sm leading-relaxed">Sua última leitura</h3>
        <Link href={routes.profile}>
          <Button icon={CaretRight} isEndIcon color="purple">
            Ver todos
          </Button>
        </Link>
      </header>
      <BookCard
        author={book.author}
        coverUrl={book.cover_url}
        ratingAt={new Date(rating.created_at)}
        description={book.summary}
        onClick={(area) => handleClickCard(area, book.id)}
        rating={rating.rate}
        title={book.name}
      />
    </section>
  )
}
