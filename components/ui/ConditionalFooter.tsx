'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export const ConditionalFooter = () => {
  const pathname = usePathname()
  
  // ゲーム画面（/game/[mode]）ではフッターを表示しない
  const isGameScreen = pathname.startsWith('/game/')
  
  if (isGameScreen) {
    return null
  }
  
  return <Footer />
}