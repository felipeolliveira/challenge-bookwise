import { Binoculars } from '@phosphor-icons/react/dist/ssr/Binoculars'

import { BooksList } from './booksList'
import { CategoryFilters } from './categoryFilters'
import { SearchBookInExplore } from './searchBookInExplore'

export default function ExplorePage() {
  return (
    <section className="bg-white h-full py-8 pr-14 pt-14">
      <header className="grid grid-cols-[1fr_auto]">
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <Binoculars size={32} className="text-green-100" />
          Explorar
        </h1>
        <SearchBookInExplore />
      </header>
      <CategoryFilters />
      <BooksList />
    </section>
  )
}
