'use client'

import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

type NextAuthProviderProps = {
  children?: ReactNode
}

export function NextAuthProvider({ children }: NextAuthProviderProps) {
  return <SessionProvider>{children}</SessionProvider>
}
