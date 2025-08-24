'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { RankingResponse, RankingEntry } from '@/types/game-result'
import LoadingScreen from '@/components/ui/LoadingScreen'

export default function RankingPage() {
  const [rankings, setRankings] = useState<RankingResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeTab, setActiveTab] = useState<'HTML_CSS' | 'RUBY' | 'FE'>('HTML_CSS')

  useEffect(() => {
    fetchRankings()
  }, [])

  const fetchRankings = async () => {
    try {
      const response = await fetch('/api/ranking')
      if (!response.ok) {
        throw new Error('ランキングの取得に失敗しました')
      }

      const data = await response.json()
      setRankings(data)
    } catch (error) {
      console.error('Failed to fetch rankings:', error)
      setError('ランキングの取得に失敗しました')
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric'
    })
  }


  if (loading) {
    return <LoadingScreen message="Now Loading..." />
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

  if (!rankings) return null

  const currentRanking = activeTab === 'HTML_CSS'
    ? rankings.htmlCssRanking
    : activeTab === 'RUBY'
    ? rankings.rubyRanking
    : rankings.feRanking

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-gray-900">
              ランキング TOP10
            </h1>
            <Link
              href="/"
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              TOPにもどる
            </Link>
          </div>

          {/* タブ */}
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setActiveTab('HTML_CSS')}
              className={`w-32 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'HTML_CSS'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              HTML/CSS
            </button>
            <button
              onClick={() => setActiveTab('RUBY')}
              className={`w-32 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'RUBY'
                  ? 'bg-red-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Ruby
            </button>
            <button
              onClick={() => setActiveTab('FE')}
              className={`w-32 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'FE'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              基本情報
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 min-h-[600px]">
            {currentRanking.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">まだランキングデータがありません</p>
                <Link
                  href="/"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  ゲームを始める
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {currentRanking.map((entry, index) => (
                  <div
                    key={entry.id}
                    className='flex items-center justify-between p-4 rounded-lg bg-white border border-gray-200'
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center min-w-[80px]">
                        <span className={`font-bold ${
                          index + 1 === 1 ? 'text-4xl text-yellow-500' :
                          index + 1 === 2 ? 'text-4xl text-gray-400' :
                          index + 1 === 3 ? 'text-4xl text-amber-700' :
                          'text-2xl text-gray-600'
                        }`}>
                          {index + 1}
                        </span>
                      </div>
                      <div>
                        <div className="font-bold text-lg text-gray-900">{entry.userName}</div>
                        <div className="text-sm text-gray-600">
                          {formatDate(entry.playedAt.toString())}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {entry.score}問正解
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 統計情報 */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              ランキングは各モードの最高スコア順で表示されます。同スコアの場合は達成日時の早い順です。
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
