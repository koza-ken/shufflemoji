'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { QuestionList } from '@/components/game/QuestionList'
import { GameWord } from '@/types/word'

export default function ResultPage() {
  const searchParams = useSearchParams()
  
  // URLパラメータから結果データを取得
  const questionCount = parseInt(searchParams.get('count') || '0')
  const questionListParam = searchParams.get('questions')
  
  let questionList: GameWord[] = []
  if (questionListParam) {
    try {
      questionList = JSON.parse(decodeURIComponent(questionListParam))
    } catch (error) {
      console.error('Failed to parse question list:', error)
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
            あなたの成績
          </p>
          <p className="text-3xl font-bold text-gray-800 mb-8">
            {questionCount}問正解
          </p>
          <button className="w-40 bg-black hover:bg-black/70 text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2 mx-auto mb-8">
            <Image src="/x-icon.svg" alt="X" width={20} height={20} className="bg-white rounded" />
            <span>投稿する</span>
          </button>
          <div className="flex justify-center gap-4">
            <Link
              href='/'
              className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded flex items-center justify-center gap-2"
            >
              <span>TOPにもどる</span>
            </Link>
          </div>
        </div>
      </div>
      <QuestionList questions={questionList} />
    </div>
  )
}