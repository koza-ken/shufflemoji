import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: '認証が必要です' },
        { status: 401 }
      )
    }

    const { username } = await request.json()

    if (!username || typeof username !== 'string') {
      return NextResponse.json(
        { error: 'ユーザー名が必要です' },
        { status: 400 }
      )
    }

    const trimmedUsername = username.trim()
    
    if (trimmedUsername.length < 2 || trimmedUsername.length > 20) {
      return NextResponse.json(
        { error: 'ユーザー名は2-20文字で入力してください' },
        { status: 400 }
      )
    }

    // ユーザー名の重複チェック
    const existingUser = await prisma.user.findUnique({
      where: { username: trimmedUsername }
    })

    if (existingUser && existingUser.email !== session.user.email) {
      return NextResponse.json(
        { error: 'このユーザー名は既に使用されています' },
        { status: 409 }
      )
    }

    // ユーザーのプロフィールを更新
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: {
        username: trimmedUsername,
        isProfileCompleted: true,
      },
    })

    return NextResponse.json({
      message: 'プロフィールを設定しました',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        isProfileCompleted: updatedUser.isProfileCompleted,
      },
    })
  } catch (error) {
    console.error('Profile setup error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}