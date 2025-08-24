'use client'

import Link from 'next/link'
import { UserProfile } from '@/components/auth/UserProfile'
import { GuideModal } from '@/components/game/GuideModal'
import ModeButton from '@/components/ui/ModeButton'
import { useState } from 'react'

export default function TopPage() {
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold">シャッフルもじ</h1>
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              シャッフルもじ
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              バラバラになった文字の並び替えゲーム
            </p>

            <div className="space-y-8">
              <div className="mt-10">
                <p className="text-2xl font-bold">モード選択</p>
                <div className="flex justify-center gap-4 mt-4">
                  <ModeButton
                    mode="html-css"
                    title="HTML/CSS"
                    bgColor="bg-blue-500"
                    hoverColor="bg-blue-700"
                  />
                  <ModeButton
                    mode="ruby"
                    title="Ruby"
                    bgColor="bg-red-500"
                    hoverColor="bg-red-700"
                  />
                  <ModeButton
                    mode="fe"
                    title="基本情報技術者"
                    bgColor="bg-green-500"
                    hoverColor="bg-green-700"
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsGuideModalOpen(true)}
                    className="w-40 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded text-center"
                  >
                    遊び方
                  </button>
                  <Link
                    href="/ranking"
                    className="w-40 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded text-center"
                  >
                  ランキング
                  </Link>
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
  )
}
