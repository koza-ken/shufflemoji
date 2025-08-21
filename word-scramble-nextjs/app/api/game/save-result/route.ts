import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const data = await request.json()

    const {
      guestName, // 未登録ユーザーの場合のみ
      mode,
      score,
      correctAnswers, // [{ word: string, timeTaken: number, answeredAt: string }]
      incorrectAnswer, // { word: string, userAnswer: string, timeTaken: number, answeredAt: string } | null
      gameEndReason // 'timeout' | 'wrong_answer' | 'completed'
    } = data

    // バリデーション
    if (!mode || !['HTML_CSS', 'RUBY'].includes(mode)) {
      return NextResponse.json(
        { error: 'モードが無効です' },
        { status: 400 }
      )
    }

    if (typeof score !== 'number' || score < 0) {
      return NextResponse.json(
        { error: 'スコアが無効です' },
        { status: 400 }
      )
    }

    if (!Array.isArray(correctAnswers)) {
      return NextResponse.json(
        { error: '正解データが無効です' },
        { status: 400 }
      )
    }

    if (!gameEndReason || !['timeout', 'wrong_answer', 'completed'].includes(gameEndReason)) {
      return NextResponse.json(
        { error: 'ゲーム終了理由が無効です' },
        { status: 400 }
      )
    }

    // 登録ユーザーと未登録ユーザーの処理分け
    let userId = null
    let finalGuestName = null

    if (session?.user) {
      // 登録ユーザー
      userId = session.user.id
    } else {
      // 未登録ユーザー
      if (!guestName || typeof guestName !== 'string' || guestName.trim().length === 0) {
        return NextResponse.json(
          { error: 'ゲストユーザー名が必要です' },
          { status: 400 }
        )
      }
      
      if (guestName.trim().length > 20) {
        return NextResponse.json(
          { error: 'ゲストユーザー名は20文字以内で入力してください' },
          { status: 400 }
        )
      }
      
      finalGuestName = guestName.trim()
    }

    // ゲーム結果を保存
    const gameRecord = await prisma.gameRecord.create({
      data: {
        userId,
        guestName: finalGuestName,
        mode,
        score,
        correctAnswers,
        incorrectAnswer,
        gameEndReason,
      },
    })

    return NextResponse.json({
      success: true,
      gameRecord: {
        id: gameRecord.id,
        score: gameRecord.score,
        mode: gameRecord.mode,
        gameEndReason: gameRecord.gameEndReason,
        playedAt: gameRecord.playedAt,
      },
    })
  } catch (error) {
    console.error('Game result save error:', error)
    return NextResponse.json(
      { error: 'ゲーム結果の保存に失敗しました' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}