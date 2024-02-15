'use client'

import { MagnifyingGlass } from '@phosphor-icons/react/dist/ssr/MagnifyingGlass'
import { useQuery } from '@tanstack/react-query'
import { ChangeEvent, useCallback } from 'react'

import { BookCard } from '@/components/cards'
import { CircularProgress, Input } from '@/components/ui'
import { getUserRatingBooks, GetUserRatingBooksResponse } from '@/data'
import { useRouterHook } from '@/hooks/useRouterHook'
import { dayjsWithRelative } from '@/lib/dayjs'

type BooksGroupByRelativeDate = {
  [relativeDate: string]: GetUserRatingBooksResponse
}

type UserRatingBooksProps = {
  userId: string
}

export function UserRatingBooks({ userId }: UserRatingBooksProps) {
  const { router, pathname, searchParams } = useRouterHook()
  const searchByText = String(searchParams.get('search') ?? '')

  function handleSetSearchText(input: ChangeEvent<HTMLInputElement>) {
    router.push(`${pathname}?search=${input.target.value}`)
  }

  const filterBySearchText = useCallback(
    (books: GetUserRatingBooksResponse) => {
      return books.filter(({ book }) =>
        `${book.name} ${book.author}`
          .toLowerCase()
          .includes(`${searchByText}`.toLowerCase()),
      )
    },
    [searchByText],
  )

  const { data } = useQuery<GetUserRatingBooksResponse>({
    queryKey: [getUserRatingBooks.key, userId],
    queryFn: getUserRatingBooks.fetch({ userId }),
    select: filterBySearchText,
  })

  const booksGroupByRelativeDate = data?.reduce((acc, books) => {
    const relativeDate = dayjsWithRelative(
      new Date(books.rating.created_at),
    ).fromNow()

    if (acc[relativeDate]) {
      acc[relativeDate].push(books)
    } else {
      acc[relativeDate] = [books]
    }

    return acc
  }, {} as BooksGroupByRelativeDate)

  const booksGroupByRelativeDateKeys = booksGroupByRelativeDate
    ? Object.keys(booksGroupByRelativeDate)
    : []

  if (status === 'loading') {
    return (
      <div className="mt-20 grid place-items-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div>
      <Input.Root className="mb-7 mt-10">
        <Input.Control
          value={searchByText}
          onChange={handleSetSearchText}
          type="text"
          placeholder="Buscar livro avaliado por título ou autor"
        />
        <Input.Icon icon={MagnifyingGlass} />
      </Input.Root>

      {booksGroupByRelativeDateKeys.length === 0 && !searchByText && (
        <div className="mt-20 flex flex-col items-center gap-2">
          <span className="text-gray-400">Nenhum livro avaliado</span>
        </div>
      )}

      {booksGroupByRelativeDateKeys.length === 0 && searchByText && (
        <div className="mt-20 flex flex-col items-center gap-2">
          <span className="text-center text-gray-400">
            Nenhum livro avaliado foi encontrado com o termo:
          </span>
          <span className="text-lg text-gray-300">{searchByText}</span>
        </div>
      )}

      {booksGroupByRelativeDateKeys.length !== 0 && (
        <div className="grid gap-6">
          {booksGroupByRelativeDateKeys.map((relativeDateKey) => {
            const books = booksGroupByRelativeDate
              ? booksGroupByRelativeDate[relativeDateKey]
              : undefined

            return (
              <div className="flex flex-col gap-2" key={relativeDateKey}>
                <span>{relativeDateKey}</span>
                {books?.map(({ book, rating }) => {
                  const ratingAt = new Date(rating.created_at)
                  return (
                    <BookCard
                      key={rating.id}
                      author={book.author}
                      coverUrl={book.cover_url}
                      ratingAt={ratingAt}
                      description={book.summary}
                      rating={rating.rate}
                      title={book.name}
                      mode="complete"
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default UserRatingBooks
