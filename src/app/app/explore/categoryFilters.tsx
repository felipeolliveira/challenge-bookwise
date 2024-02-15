'use client'

import { useQuery } from '@tanstack/react-query'

import { CircularProgress, Tag } from '@/components/ui'
import { getCategories } from '@/data'
import { useRouterHook } from '@/hooks/useRouterHook'

export function CategoryFilters() {
  const { searchParams, pathname, router } = useRouterHook()
  const selectedCategory = String(searchParams.get('category') ?? '')

  const { status, data } = useQuery({
    queryKey: [getCategories.key],
    queryFn: getCategories.fetch(),
  })

  function handleSelectACategory(categoryId: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', categoryId)

    return () => {
      router.push(`${pathname}?${params.toString()}`)
    }
  }

  return (
    <>
      <div className="mt-5 flex flex-wrap gap-3">
        {status === 'pending' && <CircularProgress />}
        {status === 'success' &&
          data?.map((category) => (
            <Tag
              key={category.id}
              onClick={handleSelectACategory(category.id)}
              selected={selectedCategory === category.id}
            >
              {category.name}
            </Tag>
          ))}
      </div>
    </>
  )
}
