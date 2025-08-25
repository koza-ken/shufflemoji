'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function ProfilePage() {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [showAvatarOptions, setShowAvatarOptions] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  // デフォルトアバター色の選択肢
  const avatarColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-red-500',
    'bg-purple-500',
    'bg-yellow-500',
    'bg-pink-500',
    'bg-indigo-500',
    'bg-gray-500'
  ]

  // 未ログインの場合はリダイレクト
  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }

    // 既存のユーザー名とアバターを設定
    if (session.user.username) {
      setUsername(session.user.username)
    }

    // 既存のアバター色を設定（なければデフォルト）
    setSelectedAvatar(session.user.avatarUrl || 'bg-blue-500')
  }, [session, router])

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-pulse bg-white rounded-lg shadow p-8">
          <div className="h-4 bg-gray-300 rounded mb-4"></div>
          <div className="h-4 bg-gray-300 rounded"></div>
        </div>
      </div>
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setError('ユーザー名を入力してください')
      return
    }

    if (username.trim().length < 2) {
      setError('ユーザー名は2文字以上で入力してください')
      return
    }

    setIsSubmitting(true)
    setError('')
    setSuccessMessage('')

    try {
      const response = await fetch('/api/auth/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username.trim(),
          avatarUrl: selectedAvatar,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'プロフィールの更新に失敗しました')
      }

      // セッションを更新
      await update()

      setSuccessMessage('プロフィールを更新しました')
    } catch (error) {
      console.error('Profile update error:', error)
      setError(error instanceof Error ? error.message : 'エラーが発生しました')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h1 className="text-lg leading-6 font-medium text-gray-900 mb-6">
              プロフィール設定
            </h1>

            {/* 現在の情報 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 ${selectedAvatar || 'bg-blue-500'} rounded-full flex items-center justify-center text-white text-lg font-bold`}>
                  {session.user.username?.charAt(0)?.toUpperCase() || 'U'}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {session.user.username || 'ユーザー名未設定'}
                  </p>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                  ユーザー名
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="例: gamer123"
                  maxLength={20}
                  disabled={isSubmitting}
                />
                <p className="mt-1 text-xs text-gray-500">
                  2-20文字で入力してください
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="block text-sm font-medium text-gray-700">
                    アバター色
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAvatarOptions(!showAvatarOptions)}
                    className="text-sm text-blue-600 hover:text-blue-800 focus:outline-none"
                    disabled={isSubmitting}
                  >
                    {showAvatarOptions ? '閉じる' : '変更する'}
                  </button>
                </div>

                {/* 現在のアバター表示 */}
                {/* <div className="mb-3">
                  <div className={`inline-flex w-12 h-12 ${selectedAvatar} rounded-full items-center justify-center text-white text-lg font-bold`}>
                    {username?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                </div> */}

                {/* アバター色選択オプション */}
                {showAvatarOptions && (
                  <div className="mb-3">
                    <div className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-md">
                      {avatarColors.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => {
                            setSelectedAvatar(color)
                            // 変更しても閉じないように
                            // setShowAvatarOptions(false)
                          }}
                          className={`w-12 h-12 ${color} rounded-full flex items-center justify-center text-white font-bold border-2 transition-all ${
                            selectedAvatar === color
                              ? 'border-gray-300 ring ring-offset-2 ring-gray-900'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          disabled={isSubmitting}
                        >
                          {username?.charAt(0)?.toUpperCase() || 'U'}
                        </button>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      お好みの色を選択してください
                    </p>
                  </div>
                )}
              </div>

              {error && (
                <div className="text-red-600 text-sm">
                  {error}
                </div>
              )}

              {successMessage && (
                <div className="text-green-600 text-sm">
                  {successMessage}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? '更新中...' : '更新'}
                </button>

                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="flex-1 flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  戻る
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
