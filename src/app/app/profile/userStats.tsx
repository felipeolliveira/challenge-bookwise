'use client'

import { BookmarkSimple } from '@phosphor-icons/react/dist/ssr/BookmarkSimple'
import { BookOpen } from '@phosphor-icons/react/dist/ssr/BookOpen'
import { Books } from '@phosphor-icons/react/dist/ssr/Books'
import { Info } from '@phosphor-icons/react/dist/ssr/Info'
import { UserList } from '@phosphor-icons/react/dist/ssr/UserList'
import { useQuery } from '@tanstack/react-query'
import dayjs from 'dayjs'

import { Avatar, CircularProgress } from '@/components/ui'
import { getUserStats } from '@/data'

type UserStatsProps = {
  userId: string
}

export default function UserStats({ userId }: UserStatsProps) {
  const { data } = useQuery({
    queryKey: ['userStats', userId],
    queryFn: getUserStats.fetch({ userId }),
  })

  const labels = {
    totalPages: 'Páginas lidas',
    totalRatingBooks: 'Livros avaliados',
    authors: 'Autores lidos',
    categoryMostRead: 'Categoria mais lida',
  }

  const icons = {
    totalPages: <BookOpen size={32} className="text-green-100" />,
    totalRatingBooks: <Books size={32} className="text-green-100" />,
    authors: <UserList size={32} className="text-green-100" />,
    categoryMostRead: <BookmarkSimple size={32} className="text-green-100" />,
  } as const

  if (!data?.user) {
    return (
      <div className="mt-20 grid place-items-center">
        <CircularProgress />
      </div>
    )
  }

  return (
    <div className="sticky top-10 space-y-6 border-l border-gray-700">
      {data.user && (
        <header className="flex flex-col items-center text-center">
          <Avatar
            size="xl"
            src={data.user.avatar_url || undefined}
            title={data.user.name}
          />
          <h1 className="mt-5 text-xl font-bold">{data.user.name}</h1>
          <span className="text-sm leading-relaxed text-gray-400">
            membro desde {dayjs(data.user.created_at).year()}
          </span>
        </header>
      )}
      <span className="m-auto block h-1 w-6 rounded-full bg-gradient-horizontal" />
      <ul className="grid justify-center gap-10 p-5">
        {data &&
          Object.keys(data.stats).map((key) => {
            const typedKey = key as keyof typeof data.stats
            const value = data.stats[typedKey]
            const label = labels[typedKey] ?? '---'
            const icon = icons[typedKey] ? (
              icons[typedKey]
            ) : (
              <Info size={32} className="text-green-100" />
            )

            return (
              <li
                key={typedKey}
                className="grid grid-cols-[32px_auto] items-center gap-5"
              >
                {icon}
                <div className="flex flex-col">
                  <strong className="text-gray-200">{value}</strong>
                  <span className="text-sm leading-relaxed text-gray-300">
                    {label}
                  </span>
                </div>
              </li>
            )
          })}
      </ul>
    </div>
  )
}
