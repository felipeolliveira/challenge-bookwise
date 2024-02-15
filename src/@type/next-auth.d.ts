import 'next-auth'

declare module 'next-auth' {
  export interface User {
    avatarUrl?: string
    name: string
    createdAt: Date
  }

  export interface Session {
    user: User
  }
}
