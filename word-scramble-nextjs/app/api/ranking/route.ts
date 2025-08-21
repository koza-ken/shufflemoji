import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { RankingResponse } from '@/types/game-result'

export async function GET() {
  try {
    // HTML/CSSモードのトップ10を取得
    const htmlCssRecords = await prisma.gameRecord.findMany({
      where: {
        mode: 'HTML_CSS'
      },
      orderBy: [
        { score: 'desc' },
        { playedAt: 'asc' } // 同スコアの場合は早い者勝ち
      ],
      take: 10,
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    })

    // Rubyモードのトップ10を取得
    const rubyRecords = await prisma.gameRecord.findMany({
      where: {
        mode: 'RUBY'
      },
      orderBy: [
        { score: 'desc' },
        { playedAt: 'asc' }
      ],
      take: 10,
      include: {
        user: {
          select: {
            username: true
          }
        }
      }
    })

    // レスポンス用にデータを整形
    const htmlCssRanking = htmlCssRecords.map(record => ({
      id: record.id,
      userName: record.user?.username || record.guestName || 'ゲスト',
      score: record.score,
      playedAt: record.playedAt,
      mode: record.mode as 'HTML_CSS' | 'RUBY'
    }))

    const rubyRanking = rubyRecords.map(record => ({
      id: record.id,
      userName: record.user?.username || record.guestName || 'ゲスト',
      score: record.score,
      playedAt: record.playedAt,
      mode: record.mode as 'HTML_CSS' | 'RUBY'
    }))

    const response: RankingResponse = {
      htmlCssRanking,
      rubyRanking
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Failed to fetch ranking:', error)
    return NextResponse.json(
      { error: 'ランキングの取得に失敗しました' },
      { status: 500 }
    )
  }
}