'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export const UserProfile = () => {
  const { data: session, status } = useSession()

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

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || ''}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-sm font-medium">
          {session.user?.name}
        </span>
      </div>
      
      <div className="flex space-x-2">
        <Link
          href="/history"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          履歴
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