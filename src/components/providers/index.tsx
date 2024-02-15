'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactNode } from 'react'

import { queryClient } from '@/lib/react-query'

import { NextAuthProvider } from './nextAuthProvider'

type ProviderProps = {
  children?: ReactNode
}

export function Providers({ children }: ProviderProps) {
  return (
    <NextAuthProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </NextAuthProvider>
  )
}
