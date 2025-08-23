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

    const { username, avatarUrl } = await request.json()

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

    // 現在のユーザー情報を取得
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!currentUser) {
      return NextResponse.json(
        { error: 'ユーザーが見つかりません' },
        { status: 404 }
      )
    }

    // 他のユーザーが同じユーザー名を使用していないかチェック
    const existingUser = await prisma.user.findFirst({
      where: { 
        username: trimmedUsername,
        NOT: { id: currentUser.id }  // 自分以外で同じユーザー名があるかチェック
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'このユーザー名は既に使用されています' },
        { status: 409 }
      )
    }

    // ユーザーのプロフィールを更新
    const updateData: any = {
      username: trimmedUsername,
      isProfileCompleted: true,
    }

    // アバターURLが提供された場合は更新
    if (avatarUrl && typeof avatarUrl === 'string') {
      updateData.avatarUrl = avatarUrl
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
    })

    return NextResponse.json({
      message: 'プロフィールを更新しました',
      user: {
        id: updatedUser.id,
        username: updatedUser.username,
        email: updatedUser.email,
        avatarUrl: updatedUser.avatarUrl,
        isProfileCompleted: updatedUser.isProfileCompleted,
      },
    })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  } finally {
    await prisma.$disconnect()
  }
}