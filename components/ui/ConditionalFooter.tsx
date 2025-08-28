'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export const ConditionalFooter = () => {
  const pathname = usePathname()
  
  // ゲーム画面ではフッターを表示しない
  const isGameScreen = pathname.startsWith('/game/')
  
  // 履歴・ランキング・結果ページでは通常のフッター表示（スクロール最下部）
  const isScrollableFooterPage = ['/history', '/ranking', '/result'].includes(pathname)
  
  if (isGameScreen) {
    return null
  }
  
  // スクロール最下部表示のページでは特別なクラス付与
  return (
    <div className={isScrollableFooterPage ? 'scrollable-footer' : ''}>
      <Footer />
    </div>
  )
}