'use client'

import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr/BookmarkSimple'
import { BookOpen } from '@phosphor-icons/react/dist/ssr/BookOpen'
import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import { useQuery } from '@tanstack/react-query'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

import { Avatar, Button, CircularProgress, Dialog } from '@/components/ui'
import { getBook } from '@/data'
import { useRouterHook } from '@/hooks/useRouterHook'
import { dayjsWithRelative } from '@/lib/dayjs'

import { RatingForm } from './ratingForm'

export function BookModal() {
  const { data: session } = useSession()
  const { searchParams } = useRouterHook()
  const bookInfo = searchParams.get('book-info')

  function handleCloseModal(open: boolean) {
    if (!open) {
      searchParams.delete('book-info')
    }
  }

  const { data: book } = useQuery({
    queryKey: [getBook.key, bookInfo],
    queryFn: getBook.fetch({ bookId: bookInfo || '' }),
    enabled: !!bookInfo,
  })

  const userHasRated = book?.ratings.some(
    (book) => book.user.id === session?.user?.id,
  )

  return (
    <Dialog.Root open={!!bookInfo} onOpenChange={handleCloseModal}>
      <Dialog.Content position="right" className="bg-gray-800">
        {!book && (
          <div className="flex h-full w-screen max-w-[35.25rem] items-center justify-center px-12 py-16">
            <CircularProgress size={32} />
          </div>
        )}

        {book && (
          <div className="h-full w-full max-w-[35.25rem] overflow-auto px-12 py-16">
            <div className="rounded-xl bg-gray-700 p-6 p-8">
              <div className="grid grid-cols-[auto_1fr] gap-8">
                <Image
                  src={book.cover_url}
                  alt={`Capa do livro ${book.name}`}
                  width={171}
                  height={242}
                  className="rounded object-cover object-center"
                />
                <div className="flex flex-col">
                  <h1 className="text-lg font-bold text-gray-100">
                    {book.name}
                  </h1>
                  <span className="leading-relaxed text-gray-300">
                    {book.author}
                  </span>
                  <div className="mt-auto flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) => {
                      return (
                        <Star
                          key={i}
                          size={16}
                          className="text-purple-100"
                          weight={i >= book.rating_average ? 'regular' : 'fill'}
                        />
                      )
                    })}
                  </div>
                  <span className="mt-1 text-sm text-gray-400">
                    {book.ratings.length} avaliações
                  </span>
                </div>
              </div>
              <div className="mt-10 flex items-center gap-14 border-t border-gray-600 pt-6">
                <div className="col-span-1 grid grid-cols-[24px_auto] items-center gap-5">
                  <BookmarkSimple size={24} className="text-green-100" />
                  <div className="flex flex-col">
                    <span className="text-sm leading-relaxed text-gray-300">
                      Categorias
                    </span>
                    <strong className="text-gray-200">
                      {book.categories
                        .map(({ category }) => category.name)
                        .join(', ')}
                    </strong>
                  </div>
                </div>
                <div className="col-span-1 grid grid-cols-[24px_auto] items-center gap-4">
                  <BookOpen size={24} className="text-green-100" />
                  <div className="flex flex-col">
                    <span className="text-sm leading-relaxed text-gray-300">
                      Páginas
                    </span>
                    <strong className="text-gray-200">
                      {book.total_pages}
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            <RatingForm userHasRated={userHasRated} />

            <div className="mt-4 flex flex-col gap-3">
              {book.ratings.map((rating) => {
                return (
                  <article
                    key={rating.id}
                    className="rounded-lg bg-gray-700 p-6"
                  >
                    <div className="grid grid-cols-[1fr_auto] gap-4">
                      <div className="grid grid-cols-[auto_1fr] gap-4">
                        <Avatar
                          src={rating.user.avatar_url}
                          title={rating.user.name}
                        />
                        <div className="flex flex-col">
                          <strong className="leading-relaxed">
                            {rating.user.name}
                          </strong>
                          <span className="text-sm leading-relaxed text-gray-400">
                            {dayjsWithRelative(rating.created_at).fromNow()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-1">
                        {Array.from({ length: 5 }).map((_, i) => {
                          return (
                            <Star
                              key={i}
                              size={16}
                              className="text-purple-100"
                              weight={i >= rating.rate ? 'regular' : 'fill'}
                            />
                          )
                        })}
                      </div>
                    </div>
                    <p className="mt-5 text-gray-300">{rating.description}</p>
                  </article>
                )
              })}
            </div>
          </div>
        )}
      </Dialog.Content>
    </Dialog.Root>
  )
}
