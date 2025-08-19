'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const UserProfile = () => {
  const { data: session, status } = useSession()
  const router = useRouter()

  // プロフィール未設定の場合は設定画面にリダイレクト
  useEffect(() => {
    if (session?.user && !session.user.isProfileCompleted) {
      router.push('/profile/setup')
    }
  }, [session, router])

  if (status === 'loading') {
    return <div className="animate-pulse bg-gray-200 rounded-full w-8 h-8"></div>
  }

  if (!session) {
    return (
      <Link
        href="/auth/signin"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        ログイン
      </Link>
    )
  }

  // プロフィール未設定の場合は何も表示しない（リダイレクト中）
  if (!session.user.isProfileCompleted) {
    return <div className="animate-pulse bg-gray-200 rounded-full w-8 h-8"></div>
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {session.user.username?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <span className="text-sm font-medium">
          {session.user.username || 'ユーザー'}
        </span>
      </div>
      
      <div className="flex space-x-2">
        <Link
          href="/history"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          履歴
        </Link>
        <Link
          href="/profile"
          className="text-gray-600 hover:text-gray-800 text-sm"
        >
          設定
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          ログアウト
        </button>
      </div>
    </div>
  )
}