import { Star } from '@phosphor-icons/react/dist/ssr/Star'
import Image from 'next/image'
import { MouseEventHandler } from 'react'
import { tv } from 'tailwind-variants'

import { dayjsWithRelative } from '@/lib/dayjs'

import { Avatar } from '../ui'

const styles = tv({
  slots: {
    infoContainer: ['flex flex-col self-stretch'],
    infoDate: ['flex-1 text-sm text-gray-300'],
    infoTitle: ['mt-3 font-bold'],
    infoRating: ['flex items-center gap-1'],
    infoDescription: ['mt-auto line-clamp-2 pt-5'],
    cardContainer: [
      'relative grid w-full gap-8 bg-gray-600',
      'rounded-lg border-2 border-transparent px-6 py-5',
      'group/book-card cursor-pointer hover:border-purple-100',
      'transition-all',
    ],
    readTag: [
      'absolute -right-[2px] -top-[2px] rounded-bl-md rounded-tr-lg px-3 py-1',
      'text-xs font-bold uppercase',
      'bg-green-300 text-green-100 transition-all',
      'group-hover/book-card:right-0 group-hover/book-card:top-0',
    ],
    bookContainer: ['flex items-start gap-6'],
  },
  variants: {
    isRead: {
      true: {
        readTag: 'block',
      },
      false: {
        readTag: 'hidden',
      },
    },
    mode: {
      regular: {
        // infoDate: 'initial',
        // infoDescription: 'initial',
        // infoRating: 'initial',
      },
      compact: {
        infoTitle: 'mt-0',
        infoContainer: 'flex-col-reverse justify-between',
        infoDate: 'hidden',
        infoDescription: 'hidden',
        cardContainer: 'w-auto bg-gray-700',
      },
      explorer: {
        infoTitle: 'mt-0',
        infoContainer: 'flex-col-reverse justify-between',
        infoDate: 'hidden',
        infoDescription: 'hidden',
        cardContainer: 'w-auto bg-gray-700',
      },
      withUser: {
        infoTitle: 'mt-0',
        infoContainer: '',
        infoDate: 'hidden',
        infoRating: 'hidden',
        infoDescription: 'mt-0 line-clamp-4',
        cardContainer: 'bg-gray-700',
      },
      complete: {
        infoTitle: 'mt-0',
        infoContainer: 'flex-col-reverse justify-between',
        infoDate: 'hidden',
        infoRating: '',
        infoDescription: 'mt-0 line-clamp-4',
        cardContainer: 'gap-6 bg-gray-700',
      },
    },
  },
})

type BookCardProps = (
  | {
      user?: {
        avatarUrl: string
        name: string
      }
      mode?: 'compact' | 'regular' | 'complete' | 'explorer'
    }
  | {
      user: {
        avatarUrl: string
        name: string
      }
      mode?: 'withUser'
    }
) & {
  title: string
  author: string
  coverUrl: string
  rating: number
  ratingAt: Date
  description: string
  isRead?: boolean
  onClick?: (area: 'card' | 'user' | 'cover') => void
}

export function BookCard({
  user,
  title,
  author,
  coverUrl,
  rating,
  ratingAt,
  description,
  isRead = false,
  onClick,
  mode = 'regular',
}: BookCardProps) {
  const {
    bookContainer,
    cardContainer,
    infoContainer,
    infoDate,
    infoDescription,
    infoTitle,
    infoRating,
    readTag,
  } = styles({ mode, isRead })
  const date = dayjsWithRelative(ratingAt)

  const imageSize = {
    regular: { w: 108, h: 152 },
    compact: { w: 64, h: 94 },
    complete: { w: 98, h: 134 },
    withUser: { w: 108, h: 152 },
    explorer: { w: 108, h: 152 },
  }[mode]

  function handleClick(where: 'card' | 'user' | 'cover') {
    if (onClick) {
      const handler: MouseEventHandler<HTMLElement> = (event) => {
        event.preventDefault()
        event.stopPropagation()
        onClick(where)
      }
      return handler
    }
  }

  return (
    <article className={cardContainer()} onClick={handleClick('card')}>
      <span className={readTag()}>lido</span>

      {mode === 'withUser' && user && (
        <header className="grid grid-cols-[auto_1fr_auto] place-items-start gap-4">
          <span onClick={handleClick('user')}>
            <Avatar src={user.avatarUrl} title={user.name} />
          </span>
          <div className="grid">
            <strong className="leading-relaxed">{user.name}</strong>
            <span className={infoDate({ className: 'inline leading-relaxed' })}>
              {date.fromNow()}
            </span>
          </div>
          <div className={infoRating({ className: 'flex' })}>
            {Array.from({ length: 5 }).map((_, i) => {
              return (
                <Star
                  key={i}
                  size={16}
                  className="text-purple-100"
                  weight={rating <= i ? 'regular' : 'fill'}
                />
              )
            })}
          </div>
        </header>
      )}

      <div className={bookContainer()}>
        <Image
          src={coverUrl}
          alt={`Capa do livro: ${title}`}
          width={imageSize.w}
          height={imageSize.h}
          className="rounded object-cover object-center"
          onClick={handleClick('cover')}
          style={{
            aspectRatio: imageSize.w / imageSize.h,
          }}
        />
        <div className={infoContainer()}>
          <div className="flex items-center">
            <span className={infoDate()}>{date.fromNow()}</span>
            <div className={infoRating()}>
              {Array.from({ length: 5 }).map((_, i) => {
                return (
                  <Star
                    key={i}
                    size={16}
                    className="text-purple-100"
                    weight={rating <= i ? 'regular' : 'fill'}
                  />
                )
              })}
            </div>
          </div>
          <div className="flex flex-col">
            <strong className={infoTitle()}>{title}</strong>
            <span className="text-sm leading-relaxed text-gray-400">
              {author}
            </span>
          </div>
          {mode !== 'complete' && (
            <p className={infoDescription()}>{description}</p>
          )}
        </div>
      </div>

      {mode === 'complete' && (
        <p className={infoDescription({ className: 'm-0 p-0' })}>
          {description}
        </p>
      )}
    </article>
  )
}
