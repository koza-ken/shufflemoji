import { GamePageContent } from '@/components/GamePageContent'
import { GameMode } from '@/types/word'
import { Suspense } from 'react'
import LoadingScreen from '@/components/ui/LoadingScreen'

type GamePageProps = {
  params: Promise<{
    mode: string
  }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { mode } = await params

  // modeをGameModeタイプにキャスト
  const gameMode = (mode === 'ruby' ? 'ruby' : mode === 'html-css' ? 'html-css' : 'fe') as GameMode

  return (
    <Suspense fallback={<LoadingScreen message="Now Loading..." />}>
      <GamePageContent mode={gameMode} />
    </Suspense>
  )
}
