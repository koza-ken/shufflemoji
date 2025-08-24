'use client'

import Link from 'next/link'
import { UserProfile } from '@/components/auth/UserProfile'
import { GuideModal } from '@/components/game/GuideModal'
import ModeButton from '@/components/ui/ModeButton'
import ShamojiSpinner from '@/components/ui/ShamojiSpinner'
import LoadingScreen from '@/components/ui/LoadingScreen'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function TopPage() {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false)
  const [rankingLoading, setRankingLoading] = useState(false)
  const router = useRouter()

  const handleRankingClick = () => {
    setRankingLoading(true)
    router.push('/ranking')
  }

  if (rankingLoading) {
    return <LoadingScreen message="Now Loading..." />
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end py-1 sm:py-2">
            {/* <h1 className="text-xl font-bold">シャッフルもじ</h1> */}
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-2">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              <img src="/shamoji_top_light.png" alt="シャッフルもじ" className="block dark:hidden" />
              <img src="/shamoji_top_dark.png" alt="シャッフルもじ" className="hidden dark:block" />
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              バラバラになった文字の並び替えゲーム
            </p>

            <div className="space-y-8">
              <div className="mt-10">
                <p className="text-2xl">モード選択</p>
                <div className="flex justify-center gap-4 mt-4">
                  <ModeButton
                    mode="html-css"
                    title="HTML/CSS"
                    bgColor="bg-blue-400"
                    hoverColor="hover:bg-blue-500"
                  />
                  <ModeButton
                    mode="ruby"
                    title="Ruby"
                    bgColor="bg-rose-400"
                    hoverColor="hover:bg-rose-500"
                  />
                  <ModeButton
                    mode="fe"
                    title="基本情報"
                    bgColor="bg-emerald-400"
                    hoverColor="hover:bg-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsGuideModalOpen(true)}
                    className="w-40 bg-indigo-400 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded text-center"
                  >
                    遊び方
                  </button>
                  <button
                    onClick={handleRankingClick}
                    disabled={rankingLoading}
                    className={`w-40 bg-amber-400 ${!rankingLoading && 'hover:bg-amber-500'} text-white font-bold py-2 px-6 rounded transition-colors flex items-center justify-center ${rankingLoading ? 'cursor-not-allowed' : ''}`}
                  >
                    {rankingLoading ? (
                      <ShamojiSpinner size="sm" className="text-white" />
                    ) : (
                      'ランキング'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ゲーム説明モーダル */}
      <GuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
      />
    </div>
  );
}
