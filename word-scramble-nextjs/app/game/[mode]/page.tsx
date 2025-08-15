import Link from 'next/link'
import { GamePageContent } from '@/components/GamePageContent'
import { GameMode } from '@/types/word'

type GamePageProps = {
  params: {
    mode: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  const { mode } = params

  // モードの検証
  if (mode !== 'html-css' && mode !== 'ruby') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">無効なゲームモード</h1>
          <p className="text-gray-600 mb-4">有効なモード: html-css, ruby</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
            トップページに戻る
          </Link>
        </div>
      </div>
    )
  }

  return <GamePageContent mode={mode as GameMode} />
}