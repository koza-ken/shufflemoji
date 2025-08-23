import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'ログインが必要です' }, 
        { status: 401 }
      )
    }

    // URLパラメータからページ番号を取得
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = 20
    const skip = (page - 1) * limit

    // 総件数を取得
    const totalRecords = await prisma.gameRecord.count({
      where: {
        userId: session.user.id
      }
    })

    // ページネーション付きでゲーム履歴を取得
    const gameRecords = await prisma.gameRecord.findMany({
      where: {
        userId: session.user.id
      },
      orderBy: {
        playedAt: 'desc'
      },
      skip,
      take: limit
    })

    // 統計情報を全データから計算
    const allRecords = await prisma.gameRecord.findMany({
      where: {
        userId: session.user.id
      }
    })

    const htmlCssRecords = allRecords.filter(record => record.mode === 'HTML_CSS')
    const rubyRecords = allRecords.filter(record => record.mode === 'RUBY')
    const feRecords = allRecords.filter(record => record.mode === 'FE')

    const stats = {
      totalGames: allRecords.length,
      htmlCssGames: htmlCssRecords.length,
      rubyGames: rubyRecords.length,
      feGames: feRecords.length,
      bestHtmlCssScore: htmlCssRecords.length > 0 ? Math.max(...htmlCssRecords.map(r => r.score)) : 0,
      bestRubyScore: rubyRecords.length > 0 ? Math.max(...rubyRecords.map(r => r.score)) : 0,
      bestFeScore: feRecords.length > 0 ? Math.max(...feRecords.map(r => r.score)) : 0,
      averageScore: allRecords.length > 0 
        ? Math.round(allRecords.reduce((sum, record) => sum + record.score, 0) / allRecords.length * 10) / 10
        : 0
    }

    const totalPages = Math.ceil(totalRecords / limit)

    return NextResponse.json({
      records: gameRecords,
      stats,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    })
  } catch (error) {
    console.error('Failed to fetch user history:', error)
    return NextResponse.json(
      { error: '履歴の取得に失敗しました' },
      { status: 500 }
    )
  }
}