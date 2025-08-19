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
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub

        // データベースからユーザー情報を取得してプロフィール完了状態を確認
        if (session.user.email) {
          const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email },
            select: {
              id: true,
              username: true,
              isProfileCompleted: true
            }
          })

          if (dbUser) {
            session.user.username = dbUser.username
            session.user.isProfileCompleted = dbUser.isProfileCompleted
          }
        }
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
    signIn: async ({ user, account, profile }) => {
      // 初回ログイン時にプロフィール未完了チェック用の処理
      // PrismaAdapterが自動的にユーザーを作成するため、ここでは追加処理は不要
      return true
    }
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
}
