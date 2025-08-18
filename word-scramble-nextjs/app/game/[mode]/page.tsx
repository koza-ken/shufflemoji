import { GamePageContent } from '@/components/GamePageContent'
import { GameMode } from '@/types/word'

type GamePageProps = {
  params: Promise<{
    mode: string
  }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { mode } = await params
  
  // modeをGameModeタイプにキャスト
  const gameMode = (mode === 'ruby' ? 'ruby' : 'html-css') as GameMode

  return <GamePageContent mode={gameMode} />
}
