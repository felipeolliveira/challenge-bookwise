'use client'

import { MagnifyingGlass } from '@phosphor-icons/react'
import { X } from '@phosphor-icons/react/dist/ssr/X'

import { Button, Input } from '@/components/ui'
import { useRouterHook } from '@/hooks/useRouterHook'

export function SearchBookInExplore() {
  const { router, searchParams, pathname } = useRouterHook()
  const category = String(searchParams.get('category') ?? '')
  const searchText = String(searchParams.get('search') ?? '')

  function handleSetSearchText(input: React.ChangeEvent<HTMLInputElement>) {
    searchParams.set('search', input.target.value)
  }

  function handleCleanFilters() {
    router.push(pathname)
  }

  return (
    <div className="flex items-center gap-4 ">
      {(category || searchText) && (
        <Button size="sm" icon={X} onClick={handleCleanFilters}>
          Limpar filtros
        </Button>
      )}

      <Input.Root>
        <Input.Control
          value={searchText}
          onChange={handleSetSearchText}
          placeholder="Buscar livro ou autor"
        />
        <Input.Icon icon={MagnifyingGlass} />
      </Input.Root>
    </div>
  )
}
