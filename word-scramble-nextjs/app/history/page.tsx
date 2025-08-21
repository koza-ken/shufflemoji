'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { GameRecord, GameStats, IncorrectAnswer } from '@/types/game-result'
import { htmlCssTerms } from '@/data/htmlCssTerms'
import { rubyMethods } from '@/data/rubyMethods'

interface PaginationInfo {
  currentPage: number
  totalPages: number
  totalRecords: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export default function HistoryPage() {
  const { data: session, status } = useSession()
  const [records, setRecords] = useState<GameRecord[]>([])
  const [stats, setStats] = useState<GameStats | null>(null)
  const [pagination, setPagination] = useState<PaginationInfo | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      setError('ログインが必要です')
      setLoading(false)
      return
    }

    if (status === 'authenticated') {
      fetchHistory()
    }
  }, [status])

  const fetchHistory = async (page = 1) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/user/history?page=${page}`)
      if (!response.ok) {
        throw new Error('履歴の取得に失敗しました')
      }

      const data = await response.json()
      setRecords(data.records)
      setStats(data.stats)
      setPagination(data.pagination)
      setCurrentPage(page)
    } catch (error) {
      console.error('Failed to fetch history:', error)
      setError('履歴の取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getModeLabel = (mode: string) => {
    return mode === 'HTML_CSS' ? 'HTML/CSS' : 'Ruby'
  }

  const getModeColor = (mode: string) => {
    return mode === 'HTML_CSS' ? 'bg-blue-500' : 'bg-red-500'
  }

  const getWordHint = (word: string, mode: string) => {
    const wordData = mode === 'HTML_CSS'
      ? htmlCssTerms.find(term => term.original === word)
      : rubyMethods.find(method => method.original === word)
    return wordData?.hint || 'ヒントが見つかりません'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-500 border-t-transparent mx-auto mb-4"></div>
            <p className="text-gray-600">履歴を読み込み中...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-6">
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">エラー</h1>
            <p className="text-red-600 mb-6">{error}</p>
            <Link
              href="/"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              TOPにもどる
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              {session?.user?.username}さんの履歴
            </h1>
            <div className="flex gap-3">
              <Link
                href="/ranking"
                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
              >
                🏆 ランキング
              </Link>
              <Link
                href="/"
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                TOPにもどる
              </Link>
            </div>
          </div>

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">
                  {stats.totalGames}
                  <span className="text-sm font-normal ml-1">回</span>
                </div>
                <div className="text-sm text-gray-600">総ゲーム数</div>
              </div>
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {stats.bestHtmlCssScore}
                  <span className="text-sm font-normal ml-1">問</span>
                </div>
                <div className="text-sm text-gray-600">HTML/CSS最高記録</div>
                <div className="text-xs text-gray-500 mt-1">{stats.htmlCssGames}回プレイ</div>
              </div>
              <div className="bg-red-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-red-600">
                  {stats.bestRubyScore}
                  <span className="text-sm font-normal ml-1">問</span>
                </div>
                <div className="text-sm text-gray-600">Ruby最高記録</div>
                <div className="text-xs text-gray-500 mt-1">{stats.rubyGames}回プレイ</div>
              </div>
            </div>
          )}

          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">最近のゲーム</h2>

            {records.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">まだゲーム履歴がありません</p>
                <Link
                  href="/"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  ゲームを始める
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {records.map((record) => (
                    <div
                      key={record.id}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`w-20 px-2 py-1 rounded-full text-white text-xs font-medium text-center ${getModeColor(record.mode)}`}>
                            {getModeLabel(record.mode)}
                          </div>
                          <div className="font-bold text-lg">{record.score}問正解</div>
                          <div className="text-sm text-gray-600">
                            {formatDate(record.playedAt.toString())}
                          </div>
                        </div>
                        {record.incorrectAnswer && (
                          <div>
                            <div className="text-sm font-medium text-red-600">
                              間違えた単語: {(record.incorrectAnswer as IncorrectAnswer).word}
                            </div>
                            <div className="text-xs text-gray-600 mt-1 leading-relaxed">
                              {getWordHint((record.incorrectAnswer as IncorrectAnswer).word, record.mode)}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {pagination && pagination.totalPages > 1 && (
                  <div className="mt-8 flex justify-center items-center gap-2">
                    <button
                      onClick={() => fetchHistory(currentPage - 1)}
                      disabled={!pagination.hasPrevPage}
                      className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                      前へ
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                        key={page}
                        onClick={() => fetchHistory(page)}
                        className={`px-3 py-2 text-sm border rounded-md ${
                          page === currentPage
                          ? 'bg-blue-500 text-white border-blue-500'
                          : 'hover:bg-gray-50'
                        }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => fetchHistory(currentPage + 1)}
                      disabled={!pagination.hasNextPage}
                      className="px-3 py-2 text-sm border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                      次へ
                    </button>
                  </div>
                )}

                {pagination && (
                  <div className="mt-4 text-center text-sm text-gray-600">
                    {pagination.totalRecords}件中 {(currentPage - 1) * 20 + 1}〜{Math.min(currentPage * 20, pagination.totalRecords)}件を表示
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
