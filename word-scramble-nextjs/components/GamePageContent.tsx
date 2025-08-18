'use client'

import { GameMode } from '@/types/word'

type GamePageContentProps = {
  mode: GameMode
}

export const GamePageContent = ({ mode }: GamePageContentProps) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold mb-4">
              {mode === 'html-css' ? 'HTML/CSS' : 'Ruby'} ゲーム
            </h1>
            <p>基本表示テスト - モード: {mode}</p>
          </div>
        </div>
      </div>
    </div>
  )
}