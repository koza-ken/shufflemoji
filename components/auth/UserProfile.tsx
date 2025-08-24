'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useRef } from 'react'
import LoadingScreen from '@/components/ui/LoadingScreen'

export const UserProfile = () => {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [historyLoading, setHistoryLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // プロフィール未設定の場合は設定画面にリダイレクト
  useEffect(() => {
    if (session?.user && !session.user.isProfileCompleted) {
      router.push('/profile/setup')
    }
  }, [session, router])

  // 履歴ページへの遷移
  const handleHistoryClick = () => {
    setHistoryLoading(true)
    setIsDropdownOpen(false)
    router.push('/history')
  }

  // ドロップダウン外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  if (historyLoading) {
    return <LoadingScreen message="Now Loading..." />
  }

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
    <div className="relative" ref={dropdownRef}>
      {/* ユーザー情報表示（クリック可能） */}
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center space-x-2 hover:bg-gray-100 rounded-lg px-3 py-2 transition-colors duration-200 focus:outline-none"
      >
        <div className={`w-8 h-8 ${session.user.avatarUrl || 'bg-blue-500'} rounded-full flex items-center justify-center text-white text-sm font-bold`}>
          {session.user.username?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <span className="text-sm font-medium">
          {session.user.username || 'ユーザー'}
        </span>
        {/* ドロップダウン矢印 */}
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            isDropdownOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ドロップダウンメニュー */}
      {isDropdownOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
          <button
            onClick={handleHistoryClick}
            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            履歴
          </button>
          <Link
            href="/profile"
            onClick={() => setIsDropdownOpen(false)}
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            設定
          </Link>
          <hr className="my-1 border-gray-200" />
          <button
            onClick={() => {
              setIsDropdownOpen(false)
              signOut({ callbackUrl: '/' })
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            ログアウト
          </button>
        </div>
      )}
    </div>
  )
}