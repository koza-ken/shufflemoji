# Next.js + Prisma + Googleログイン 移行実装メモ

## 概要
React + TypeScript + Viteアプリを Next.js + Prisma + NextAuth(Google)に移行する手順

---

## Phase 1: プロジェクトセットアップ

### 1.1 新規プロジェクト作成
```bash
npx create-next-app@latest word-scramble-nextjs --typescript --tailwind --eslint --app
cd word-scramble-nextjs
```

### 1.2 依存関係インストール
```bash
# Prisma
npm install prisma @prisma/client
npm install -D prisma

# NextAuth (Google認証)
npm install next-auth
npm install @next-auth/prisma-adapter

# その他
npm install lucide-react
```

---

## Phase 2: Google OAuth設定

### 2.1 Google Cloud Console
1. [Google Cloud Console](https://console.cloud.google.com)でプロジェクト作成
2. **APIs & Services** → **Credentials**
3. **OAuth 2.0 Client IDs** 作成
4. **承認済みリダイレクトURI**:
   - 開発: `http://localhost:3000/api/auth/callback/google`
   - 本番: `https://yourdomain.com/api/auth/callback/google`

### 2.2 環境変数設定
```bash
# .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/wordscramble"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

---

## Phase 3: Prismaスキーマ設計

### 3.1 初期化
```bash
npx prisma init
```

### 3.2 スキーマファイル作成
```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id            String    @id @default(cuid())
  name          String?   // Googleから取得
  username      String?   @unique  // オプション
  email         String    @unique  // Googleから取得
  image         String?   // Googleプロフィール画像
  emailVerified DateTime?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  gameRecords GameRecord[]
  accounts    Account[]
  sessions    Session[]
  
  @@map("users")
}

model GameRecord {
  id                String    @id @default(cuid())
  userId            String?   
  guestName         String?
  mode              GameMode
  score             Int
  questionsAnswered Json      // Word[]をJSONで保存
  totalTime         Int       // ミリ秒
  completedAt       DateTime  @default(now())
  
  user User? @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  @@map("game_records")
}

model Word {
  id       String   @id @default(cuid())
  original String
  mode     GameMode
  category String
  hint     String
  
  @@unique([original, mode])
  @@map("words")
}

enum GameMode {
  HTML_CSS
  RUBY
}

// NextAuth必須テーブル
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@map("accounts")
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("sessions")
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
  @@map("verification_tokens")
}
```

### 3.3 データベース初期化
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## Phase 4: NextAuth設定

### 4.1 Prismaクライアント設定
```typescript
// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
```

### 4.2 認証設定
```typescript
// lib/auth.ts
import { NextAuthOptions } from 'next-auth'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import GoogleProvider from 'next-auth/providers/google'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user && token?.sub) {
        session.user.id = token.sub
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    }
  },
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error'
  }
}
```

### 4.3 API Route
```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth'

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
```

---

## Phase 5: 認証UI実装

### 5.1 Session Provider
```typescript
// components/providers/SessionProvider.tsx
'use client'

import { SessionProvider as NextAuthSessionProvider } from 'next-auth/react'

export const SessionProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <NextAuthSessionProvider>
      {children}
    </NextAuthSessionProvider>
  )
}
```

```typescript
// app/layout.tsx
import './globals.css'
import { SessionProvider } from '@/components/providers/SessionProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

### 5.2 ログインページ
```typescript
// app/auth/signin/page.tsx
'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SignInPage() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      const result = await signIn('google', {
        callbackUrl: '/',
        redirect: false
      })
      
      if (result?.ok) {
        router.push('/')
      }
    } catch (error) {
      console.error('ログイン失敗:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            シャッフルもじ
          </h2>
          <p className="mt-2 text-gray-600">
            Googleアカウントでログイン
          </p>
        </div>
        
        <div className="mt-8">
          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isLoading ? (
              <span>ログイン中...</span>
            ) : (
              <>
                {/* Google Icon SVG */}
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                Googleでログイン
              </>
            )}
          </button>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => router.push('/')}
              className="text-blue-600 hover:text-blue-500 text-sm"
            >
              ゲストとしてプレイ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### 5.3 ユーザープロフィールコンポーネント
```typescript
// components/auth/UserProfile.tsx
'use client'

import { useSession, signOut } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'

export const UserProfile = () => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div className="animate-pulse bg-gray-200 rounded-full w-8 h-8"></div>
  }

  if (!session) {
    return (
      <Link
        href="/auth/signin"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        ログイン
      </Link>
    )
  }

  return (
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || ''}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-sm font-medium">
          {session.user?.name}
        </span>
      </div>
      
      <div className="flex space-x-2">
        <Link
          href="/history"
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          履歴
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-red-600 hover:text-red-800 text-sm"
        >
          ログアウト
        </button>
      </div>
    </div>
  )
}
```

---

## Phase 6: API実装

### 6.1 ゲーム記録API
```typescript
// app/api/game-records/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    const { mode, score, questionsAnswered, totalTime, guestName } = await request.json()
    
    const gameRecord = await prisma.gameRecord.create({
      data: {
        userId: session?.user?.id || null,
        guestName: !session?.user?.id ? guestName : null,
        mode: mode === 'html-css' ? 'HTML_CSS' : 'RUBY',
        score,
        questionsAnswered,
        totalTime,
      }
    })
    
    return NextResponse.json(gameRecord)
  } catch (error) {
    console.error('ゲーム記録保存エラー:', error)
    return NextResponse.json(
      { error: 'Failed to save game record' }, 
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const gameRecords = await prisma.gameRecord.findMany({
      where: { userId: session.user.id },
      orderBy: { completedAt: 'desc' },
      take: 50
    })
    
    return NextResponse.json(gameRecords)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch game records' }, 
      { status: 500 }
    )
  }
}
```

### 6.2 単語取得API
```typescript
// app/api/words/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const mode = searchParams.get('mode')
    
    const words = await prisma.word.findMany({
      where: mode ? { 
        mode: mode === 'html-css' ? 'HTML_CSS' : 'RUBY' 
      } : undefined,
    })
    
    return NextResponse.json(words)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch words' }, 
      { status: 500 }
    )
  }
}
```

---

## Phase 7: 既存コンポーネント移行

### 7.1 ディレクトリ構造
```
src/
├── app/                    # Next.js App Router
│   ├── page.tsx           # TopPage → /
│   ├── game/
│   │   └── [mode]/
│   │       └── page.tsx   # GamePage → /game/html-css, /game/ruby
│   ├── result/
│   │   └── page.tsx       # ResultPage → /result
│   ├── auth/
│   │   └── signin/
│   │       └── page.tsx   # ログインページ
│   ├── history/
│   │   └── page.tsx       # 履歴ページ
│   ├── api/               # API Routes
│   ├── layout.tsx         # ルートレイアウト
│   └── globals.css
├── components/            # 既存コンポーネント移行
│   ├── game/              # ゲームコンポーネント
│   ├── auth/              # 認証コンポーネント
│   └── providers/         # プロバイダー
├── lib/
│   ├── prisma.ts          # Prismaクライアント
│   ├── auth.ts            # NextAuth設定
│   └── utils.ts
├── hooks/                 # 既存フック
├── types/                 # 型定義
└── data/                  # DBシード用データ
```

### 7.2 TopPage更新
```typescript
// app/page.tsx
import { UserProfile } from '@/components/auth/UserProfile'
import Link from 'next/link'

export default function TopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold">シャッフルもじ</h1>
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              シャッフルもじ
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              単語の並び替えをするゲームです
            </p>
            
            <div className="space-y-4">
              <div className="mt-10">
                <p className="text-2xl font-bold">ゲーム開始</p>
                <div className="flex justify-center gap-4 mt-4">
                  <Link
                    href="/game/html-css"
                    className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    HTML/CSS
                  </Link>
                  <Link
                    href="/game/ruby"
                    className="w-40 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Ruby
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

---

## Phase 8: データ移行

### 8.1 シードファイル作成
```typescript
// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// 既存データをimport
const htmlCssTerms = [
  {
    original: 'div',
    mode: 'HTML_CSS' as const,
    category: 'HTML',
    hint: 'HTMLで最もよく使われるブロック要素。コンテンツをグループ化してレイアウトを作ったり、CSSでスタイリングするための汎用的なコンテナとして利用される。'
  },
  // ... 他のHTML/CSS用語
]

const rubyMethods = [
  {
    original: 'map',
    mode: 'RUBY' as const,
    category: 'ruby',
    hint: '配列の各要素に対してブロック内の処理を実行し、その結果を新しい配列として返すイテレータメソッド'
  },
  // ... 他のRubyメソッド
]

async function main() {
  // HTML/CSS用語を挿入
  for (const term of htmlCssTerms) {
    await prisma.word.upsert({
      where: { original_mode: { original: term.original, mode: term.mode } },
      update: {},
      create: term
    })
  }
  
  // Rubyメソッドを挿入
  for (const method of rubyMethods) {
    await prisma.word.upsert({
      where: { original_mode: { original: method.original, mode: method.mode } },
      update: {},
      create: method
    })
  }

  console.log('Seed完了')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
```

### 8.2 package.jsonにシードコマンド追加
```json
{
  "scripts": {
    "db:seed": "tsx prisma/seed.ts"
  },
  "prisma": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

### 8.3 シード実行
```bash
npm install -D tsx
npx prisma db seed
```

---

## Phase 9: 履歴ページ実装

```typescript
// app/history/page.tsx
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    redirect('/auth/signin')
  }

  const gameRecords = await prisma.gameRecord.findMany({
    where: { userId: session.user.id },
    orderBy: { completedAt: 'desc' },
    take: 50
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8">ゲーム履歴</h1>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  日時
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  モード
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  スコア
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  時間
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {gameRecords.map((record) => (
                <tr key={record.id}>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.completedAt.toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.mode === 'HTML_CSS' ? 'HTML/CSS' : 'Ruby'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {record.score}問正解
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {Math.round(record.totalTime / 1000)}秒
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
```

---

## Phase 10: デプロイ準備

### 10.1 Vercel設定
```json
// vercel.json
{
  "env": {
    "DATABASE_URL": "@database-url",
    "NEXTAUTH_SECRET": "@nextauth-secret",
    "GOOGLE_CLIENT_ID": "@google-client-id",
    "GOOGLE_CLIENT_SECRET": "@google-client-secret"
  }
}
```

### 10.2 本番環境コマンド
```bash
# データベースマイグレーション
npx prisma migrate deploy

# Prismaクライアント生成
npx prisma generate

# シードデータ投入
npx prisma db seed

# Vercelデプロイ
vercel --prod
```

---

## チェックリスト

### 環境設定
- [ ] Google Cloud Console設定
- [ ] 環境変数設定 (.env.local)
- [ ] データベース接続確認

### 認証機能  
- [ ] NextAuth設定
- [ ] Googleログイン動作確認
- [ ] セッション管理確認

### データベース
- [ ] Prismaスキーマ作成
- [ ] マイグレーション実行
- [ ] シードデータ投入

### 既存機能移行
- [ ] 既存コンポーネント移行
- [ ] ルーティング設定
- [ ] ゲームロジック動作確認

### 新機能
- [ ] ゲーム記録保存
- [ ] 履歴表示
- [ ] ユーザープロフィール

### テスト・デプロイ
- [ ] 本番環境テスト
- [ ] パフォーマンステスト
- [ ] Vercelデプロイ

---

## トラブルシューティング

### よくある問題

1. **NextAuth設定エラー**
   - NEXTAUTH_SECRET の設定確認
   - Google OAuth リダイレクトURI の確認

2. **Prisma接続エラー**
   - DATABASE_URL の形式確認
   - データベース接続権限確認

3. **型エラー**
   - `npx prisma generate` でクライアント再生成
   - next-auth の型定義確認

4. **セッション関連**
   - JWT_SECRET の設定
   - Cookie設定の確認

---

## 参考リンク

- [Next.js公式ドキュメント](https://nextjs.org/docs)
- [Prisma公式ドキュメント](https://www.prisma.io/docs)  
- [NextAuth.js公式ドキュメント](https://next-auth.js.org/)
- [Google OAuth設定ガイド](https://developers.google.com/identity/protocols/oauth2)
- [Vercelデプロイガイド](https://vercel.com/docs)