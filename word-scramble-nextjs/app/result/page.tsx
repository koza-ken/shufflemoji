'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { QuestionList } from '@/components/game/QuestionList'
import { GameWord } from '@/types/word'
import { GameResultData } from '@/types/game-result'

export default function ResultPage() {
  const router = useRouter()
  const { data: session } = useSession()

  // セッションストレージから結果データを取得
  const [questionCount, setQuestionCount] = useState(0)
  const [questionList, setQuestionList] = useState<GameWord[]>([])
  const [mode, setMode] = useState<string | null>(null)
  const [incorrectWordData, setIncorrectWordData] = useState<{ word: string; userAnswer: string } | null>(null)

  // セッションストレージからデータを読み込み
  useEffect(() => {
    const gameResultData = sessionStorage.getItem('gameResult')
    if (gameResultData) {
      try {
        const result = JSON.parse(gameResultData)
        setQuestionCount(result.count)
        setQuestionList(result.questions || [])
        setMode(result.mode)
        setIncorrectWordData(result.incorrectWord)
      } catch (error) {
        console.error('Failed to parse game result:', error)
        // データが不正な場合はトップページに戻る
        router.push('/')
      }
    } else {
      // データがない場合はトップページに戻る
      router.push('/')
    }
  }, [])

  // 結果保存機能のstate
  const [guestName, setGuestName] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [showSaveOption, setShowSaveOption] = useState(false) // 未ログインユーザー用の保存選択表示
  const [wantsToSave, setWantsToSave] = useState(false) // 保存したいかどうか
  const [hasAttemptedSave, setHasAttemptedSave] = useState(false) // 保存を試行したかのフラグ

  const modeLabel =
    mode === 'html-css' ? 'HTML/CSS' : mode === 'ruby' ? 'Ruby' : '基本情報技術者';

  // ログイン済みユーザーの場合は自動で結果を保存（1回だけ）
  useEffect(() => {
    if (session?.user && !saved && !hasAttemptedSave && mode) {
      setHasAttemptedSave(true)
      saveResult()
    }
  }, [session, saved, hasAttemptedSave, mode])

  const saveResult = async () => {
    if (!mode) {
      setError('ゲームデータが読み込まれていません')
      return
    }
    
    if (!session && (!guestName || guestName.trim().length === 0)) {
      setError('名前を入力してください')
      return
    }

    setIsSaving(true)
    setError('')

    try {
      // 正解した問題を結果保存用の形式に変換
      const correctAnswers = questionList.map((question: GameWord) => ({
        word: question.original,
        timeTaken: 8000, // 仮の値（平均8秒と仮定）
        answeredAt: new Date().toISOString()
      }))

      // 間違えた問題のデータを作成
      const incorrectAnswer = incorrectWordData ? {
        word: incorrectWordData.word,
        userAnswer: incorrectWordData.userAnswer,
        timeTaken: 8000, // 仮の値
        answeredAt: new Date().toISOString()
      } : undefined

      // API用のモード形式に変換
      const apiMode = mode === 'html-css' ? 'HTML_CSS' : mode === 'ruby' ? 'RUBY' : 'FE'

      const gameResultData: GameResultData = {
        mode: apiMode,
        score: questionCount,
        correctAnswers,
        incorrectAnswer,
        gameEndReason: 'wrong_answer', // 間違えてゲーム終了
        ...((!session && guestName) && { guestName: guestName.trim() })
      }

      const response = await fetch('/api/game/save-result', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(gameResultData),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || '保存に失敗しました')
      }

      setSaved(true)
    } catch (error) {
      console.error('Save result error:', error)
      setError(error instanceof Error ? error.message : '保存エラーが発生しました')
    } finally {
      setIsSaving(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-10">
            ゲーム結果
          </h1>
          <p className="text-2xl text-gray-600 mb-4">
            {session?.user?.username
              ? `${session.user.username}さんの成績`
              : 'あなたの成績'
            }
          </p>
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
              mode === 'html-css' ? 'bg-blue-500' : mode === 'ruby' ? 'bg-red-500' : 'bg-green-500'
            }`}>
              {modeLabel}
            </div>
          </div>
          <p className="text-3xl font-bold text-gray-800 mb-8">
            {questionCount}問正解
          </p>

          {/* ゲストユーザー保存機能 */}
          {!session && !saved && (
            <div className="mb-6">
              {!showSaveOption ? (
                <div className="text-center">
                  <p className="text-gray-600 text-sm mb-4">記録をランキングに残しますか？</p>
                  <button
                    onClick={() => {
                      setShowSaveOption(true)
                      setWantsToSave(true)
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    記録を残す
                  </button>
                </div>
              ) : wantsToSave ? (
                <div>
                  <div className="mb-4">
                    <label htmlFor="guestName" className="block text-sm font-medium text-gray-700 mb-2">
                      ランキングに表示する名前
                    </label>
                    <input
                      id="guestName"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="block w-full max-w-xs mx-auto px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      placeholder="例: ゲスト123"
                      maxLength={20}
                      disabled={isSaving}
                    />
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm mb-3 text-center">
                      {error}
                    </div>
                  )}

                  <div className="text-center">
                    <button
                      onClick={saveResult}
                      disabled={isSaving}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed mr-2"
                    >
                      {isSaving ? '保存中...' : '保存'}
                    </button>
                    <button
                      onClick={() => {
                        setShowSaveOption(false)
                        setWantsToSave(false)
                      }}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <div className="flex justify-center">
            {isSaving ? (
              <button
                disabled
                className="w-40 bg-gray-400 text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                <span>保存中...</span>
              </button>
            ) : (
              <Link
                href='/'
                className="w-40 bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2"
              >
                <span>TOPにもどる</span>
              </Link>
            )}
          </div>

          {session && (
            <div className="mt-4">
              <Link
                href="/history"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                履歴を見る →
              </Link>
            </div>
          )}
        </div>
      </div>
      <QuestionList questions={questionList} />
    </div>
  )
}
