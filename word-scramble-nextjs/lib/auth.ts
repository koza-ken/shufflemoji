// NextAuth.jsの設定ファイル
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  debug: true,
  callbacks: {
    session: async ({ session, user }) => {
      // Database strategyではuserオブジェクトから情報を取得
      if (session?.user && user) {
        session.user.id = user.id
        session.user.email = user.email!
        session.user.username = user.username
        session.user.avatarUrl = user.avatarUrl
        session.user.isProfileCompleted = user.isProfileCompleted
      }
      return session
    },
    signIn: async ({ user, account, profile }) => {
      return true
    }
  },
  // PrismaAdapterを使用する場合はdatabase strategyを使用
  session: {
    strategy: 'database'
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
}
