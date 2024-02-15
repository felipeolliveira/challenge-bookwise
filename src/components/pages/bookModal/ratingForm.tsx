'use client'

import { Star } from '@phosphor-icons/react'
import { Check } from '@phosphor-icons/react/dist/ssr/Check'
import { SignIn } from '@phosphor-icons/react/dist/ssr/SignIn'
import { X } from '@phosphor-icons/react/dist/ssr/X'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useEffect, useRef, useState } from 'react'

import {
  Avatar,
  Button,
  CircularProgress,
  Dialog,
  IconButton,
} from '@/components/ui'
import { createRatingByBookId } from '@/data/createRatingByBook'
import { useRouterHook } from '@/hooks/useRouterHook'

import { SignInActions } from '../signInActions'

type RatingFormProps = {
  userHasRated?: boolean
}

export function RatingForm({ userHasRated = false }: RatingFormProps) {
  const { data: session } = useSession()
  const { searchParams } = useRouterHook()
  const bookId = searchParams.get('book-info')

  const [open, setOpen] = useState(false)
  const [error, setError] = useState('')
  const [rating, setRating] = useState(0)
  const textAreaRef = useRef<HTMLTextAreaElement | null>(null)

  const mutation = useMutation({
    mutationKey: [createRatingByBookId.key, bookId],
    mutationFn: createRatingByBookId.fn,
  })

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    setError('')
    event.preventDefault()

    if (!session?.user.id || !bookId) {
      alert('Você precisa estar logado para avaliar um livro')
      return
    }

    if (rating === 0) {
      setError('Por favor, selecione uma avaliação')
      return
    }

    if (!textAreaRef.current?.value) {
      setError('Por favor, digite um comentário')
      return
    }

    mutation.mutate({
      bookId,
      userId: session.user.id,
      rate: rating,
      comment: textAreaRef.current.value,
    })
  }

  function handleClear() {
    setRating(0)
    setError('')
    setOpen(false)
    if (textAreaRef.current?.value) {
      textAreaRef.current.value = ''
    }
  }

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError('')
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [error])

  useEffect(() => {
    if (mutation.isSuccess) {
      setOpen(false)
    }
    if (mutation.isError) {
      setError('Erro ao enviar avaliação, tente novamente')
    }
  }, [mutation.isError, mutation.isSuccess])

  return (
    <>
      <header className="mt-8 grid grid-cols-[1fr_auto]">
        <span>Avaliações</span>
        {(userHasRated || mutation.isSuccess) && (
          <span className="text-purple-100">Você já avaliou este livro</span>
        )}

        {session?.user ? (
          <>
            {!userHasRated && !mutation.isSuccess && (
              <Button
                color="purple"
                className="font-bold"
                disabled={open}
                onClick={() => setOpen((open) => !open)}
              >
                Avaliar
              </Button>
            )}
          </>
        ) : (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button color="purple" isEndIcon>
                Avaliar
              </Button>
            </Dialog.Trigger>
            <Dialog.Content className="flex flex-col gap-10 px-[4.5rem] py-14 sm:min-w-[32rem]">
              <strong className="text-center">
                Faça login para deixar sua avaliação
              </strong>
              <SignInActions hideOptions={['guest']} disableRedirect />
            </Dialog.Content>
          </Dialog.Root>
        )}
      </header>
      {mutation.isPending && (
        <div className="mt-4 flex items-center justify-center gap-2 rounded bg-gray-600 p-3">
          <span>Enviando...</span>
          <CircularProgress size={16} />
        </div>
      )}

      {session && open && (!mutation.isPending || !mutation.isSuccess) && (
        <form onSubmit={handleSubmit} className="mt-4 bg-gray-700 p-6">
          <div className="flex items-center gap-4">
            <Avatar src={session.user.avatarUrl} title={session.user.name} />
            <strong className="flex-1">{session.user.name}</strong>
            <div className="flex items-center gap-1 rounded focus-within:ring-1 focus-within:ring-green-100 focus-within:ring-offset-4 focus-within:ring-offset-gray-700">
              {Array.from({ length: 5 }).map((_, i) => {
                return (
                  <label key={i} className="relative flex items-center gap-1">
                    <input
                      type="radio"
                      className="sr-only"
                      name="rating"
                      checked={i === rating - 1}
                      onChange={() => setRating(i + 1)}
                    />
                    <Star
                      key={i}
                      size={24}
                      className="text-purple-100 hover:cursor-pointer hover:text-purple-100/50"
                      weight={i >= rating ? 'regular' : 'fill'}
                    />
                  </label>
                )
              })}
            </div>
          </div>
          <textarea
            className="mt-6 w-full resize-none rounded bg-gray-800 px-5 py-4 text-sm outline-none placeholder:text-gray-400 focus:ring-1 focus:ring-green-100"
            rows={5}
            name="comment"
            placeholder="Escreva sua avaliação"
            ref={textAreaRef}
          />
          <div className="mt-3 flex items-center justify-end gap-2">
            {error && (
              <span className="flex-1 rounded-md bg-red-500/20 px-4 py-3 text-xs text-red-500">
                {error}
              </span>
            )}
            <IconButton type="button" icon={X} onClick={handleClear} />
            <IconButton type="submit" icon={Check} className="text-green-100" />
          </div>
        </form>
      )}
    </>
  )
}
