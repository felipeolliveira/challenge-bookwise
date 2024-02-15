import NextAuth from 'next-auth'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import { PrismaAdapter } from '@/lib/auth/prisma-adapter'
import { env } from '@/lib/env'
import { prisma } from '@/lib/prisma'
import { routes } from '@/utils'

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
        },
      },
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          username: '',
          email: profile.email,
          avatarUrl: profile.picture,
          createdAt: new Date(),
        }
      },
    }),
    GithubProvider({
      allowDangerousEmailAccountLinking: true,
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      profile(profile: GithubProfile) {
        return {
          id: profile.id.toString(),
          name: profile.name ?? '',
          username: '',
          email: profile.email,
          avatarUrl: profile.avatar_url,
          createdAt: new Date(),
        }
      },
    }),
  ],
  pages: {
    signIn: routes.signin,
    signOut: routes.signout,
    error: routes.home,
    verifyRequest: routes.signin,
    newUser: routes.home,
  },
  callbacks: {
    session: async ({ session, user }) => {
      return {
        ...session,
        user,
      }
    },
  },
})

export { handler as GET, handler as POST }
