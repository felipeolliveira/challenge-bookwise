import { CaretRight } from '@phosphor-icons/react/dist/ssr/CaretRight'
import { ChartLineUp } from '@phosphor-icons/react/dist/ssr/ChartLineUp'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import Link from 'next/link'

import { Button } from '@/components/ui'
import { getBooksByRating } from '@/data'
import { queryClient } from '@/lib/react-query'
import { routes } from '@/utils'

import { LastUserBook } from './lastUserBook'
import { PopularRatingBooks } from './popularRatingBooks'
import { RecentlyRatingBooks } from './recentlyRatingBooks'

export default async function HomePage() {
  await queryClient.prefetchQuery({
    queryKey: [getBooksByRating.key, 'recently'],
    queryFn: getBooksByRating.fetch({ orderBy: 'recently' }),
  })

  await queryClient.prefetchQuery({
    queryKey: [getBooksByRating.key, 'popular'],
    queryFn: getBooksByRating.fetch({ orderBy: 'popular' }),
  })

  return (
    <div className="h-full pt-14">
      <h1 className="flex items-center gap-3 text-2xl font-bold">
        <ChartLineUp size={32} className="text-green-100" />
        Início
      </h1>
      <div className="mt-10 grid grid-cols-[1fr_20.25rem] gap-16">
        <div className="grid gap-10">
          <LastUserBook />
          <section>
            <h3 className="text-sm leading-relaxed">
              Avaliações mais recentes
            </h3>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <RecentlyRatingBooks />
            </HydrationBoundary>
          </section>
        </div>
        <aside>
          <div className="sticky top-10">
            <header className="flex items-center justify-between">
              <h3 className="text-sm leading-relaxed">Livros populares</h3>
              <Link href={routes.explore}>
                <Button icon={CaretRight} isEndIcon color="purple" size="sm">
                  Ver todos
                </Button>
              </Link>
            </header>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <PopularRatingBooks />
            </HydrationBoundary>
          </div>
        </aside>
      </div>
    </div>
  )
}
