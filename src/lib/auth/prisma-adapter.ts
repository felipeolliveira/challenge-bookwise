import { PrismaClient } from '@prisma/client'
import { Adapter } from 'next-auth/adapters'

export function PrismaAdapter(prisma: PrismaClient): Adapter {
  return {
    async createUser(user) {
      const createdUser = await prisma.user.create({
        data: {
          name: user.name ?? '',
          email: user.email,
          avatar_url: user.avatarUrl,
        },
      })

      return {
        id: createdUser.id,
        email: createdUser.email,
        name: createdUser.name,
        emailVerified: null,
        avatarUrl: createdUser.avatar_url ?? undefined,
        createdAt: createdUser.created_at,
      }
    },

    async getUser(id) {
      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      })

      if (!user) {
        return null
      }

      return {
        id: user.id,
        avatarUrl: user.avatar_url ?? undefined,
        email: user.email,
        emailVerified: null,
        name: user.name,
        createdAt: user.created_at,
      }
    },
    async getUserByAccount({ provider, providerAccountId }) {
      const account = await prisma.account.findUnique({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
        select: {
          user: true,
        },
      })

      if (!account) return null

      return {
        id: account.user.id,
        avatarUrl: account.user.avatar_url ?? undefined,
        email: account.user.email,
        emailVerified: null,
        name: account.user.name,
        createdAt: account.user.created_at,
      }
    },
    async updateUser(user) {
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          name: user.name ?? '',
          avatar_url: user.image,
          email: user.email,
        },
      })

      return {
        id: updatedUser.id,
        avatarUrl: updatedUser.avatar_url ?? undefined,
        email: updatedUser.email,
        emailVerified: null,
        name: updatedUser.name,
        createdAt: updatedUser.created_at,
      }
    },
    async linkAccount(account) {
      await prisma.account.create({
        data: {
          provider: account.provider,
          provider_account_id: account.providerAccountId,
          type: account.type,
          user_id: account.userId,
          access_token: account.access_token,
          expires_at: account.expires_at,
          id_token: account.id_token,
          refresh_token: account.refresh_token,
          scope: account.scope,
          session_state: account.session_state,
          token_type: account.token_type,
        },
      })
    },
    async deleteUser(userId) {
      await prisma.user.delete({
        where: {
          id: userId,
        },
      })
    },
    async unlinkAccount({ provider, providerAccountId }) {
      console.log({ type: 'unlinkAccount', provider })
      await prisma.account.delete({
        where: {
          provider_provider_account_id: {
            provider,
            provider_account_id: providerAccountId,
          },
        },
      })
    },
    async createSession({ expires, sessionToken, userId }) {
      await prisma.session.create({
        data: {
          expires,
          session_token: sessionToken,
          user_id: userId,
        },
      })

      return {
        userId,
        expires,
        sessionToken,
      }
    },
    async getSessionAndUser(sessionToken) {
      const session = await prisma.session.findUnique({
        where: {
          session_token: sessionToken,
        },
        include: {
          user: true,
        },
      })

      if (!session) return null

      return {
        user: {
          id: session.user.id,
          email: session.user.email,
          emailVerified: null,
          avatarUrl: session.user.avatar_url ?? undefined,
          name: session.user.name,
          createdAt: session.user.created_at,
        },
        session: {
          expires: session.expires,
          sessionToken: session.session_token,
          userId: session.user_id,
        },
      }
    },
    async updateSession({ sessionToken, expires, userId }) {
      const prismaSession = await prisma.session.update({
        where: {
          session_token: sessionToken,
        },
        data: {
          expires,
          user_id: userId,
        },
      })

      return {
        expires: prismaSession.expires,
        sessionToken: prismaSession.session_token,
        userId: prismaSession.user_id,
      }
    },
    async deleteSession(sessionToken) {
      await prisma.session.delete({
        where: {
          session_token: sessionToken,
        },
      })
    },
    async getUserByEmail(email) {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      })

      if (!user) return null

      return {
        id: user.id,
        email: user.email,
        emailVerified: null,
        avatarUrl: user.avatar_url ?? undefined,
        name: user.name,
        createdAt: user.created_at,
      }
    },
  }
}
