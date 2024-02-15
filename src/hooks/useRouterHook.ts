'use client'

import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

type UseSearchParamsHookReturnType = {
  router: AppRouterInstance
  pathname: string
  pathnameWithSearch: string
  searchParams: {
    get: (key: string) => string | null
    set: (key: string, value: string) => void
    delete: (key: string) => void
  }
}

export function useRouterHook(): UseSearchParamsHookReturnType {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const urlSearch = new URLSearchParams(searchParams.toString())

  return {
    router,
    pathname,
    pathnameWithSearch: `${pathname}?${searchParams.toString()}`,
    searchParams: {
      get: (key) => {
        return searchParams.get(key)
      },
      set: (key, value) => {
        urlSearch.set(key, value)
        router.push(`${pathname}?${urlSearch.toString()}`)
      },
      delete: (key) => {
        urlSearch.delete(key)
        router.push(`${pathname}?${urlSearch.toString()}`)
      },
    },
  }
}
