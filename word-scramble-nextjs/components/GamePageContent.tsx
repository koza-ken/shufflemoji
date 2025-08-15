'use client'

import React, { useState, useEffect } from 'react'
import { Header } from './game/Header'
import { Hint } from './game/Hint'
import { getRandomHtmlCssTerm } from '@/data/htmlCssTerms'
import { getRandomRubyMethod } from '@/data/rubyMethods'
import { AllChars, GameWord, SelectedChars, GameMode } from '@/types/word'
import { Answer } from './game/Answer'
import { useTimer } from '@/hooks/use-timer'
import { HTMLCSSQuestion } from './game/HTMLCSSQuestion'
import { RubyQuestion } from './game/RubyQuestion'
import Link from 'next/link'

type GamePageContentProps = {
  mode: GameMode
}

export const GamePageContent = ({ mode }: GamePageContentProps) => {
  // タイマー機能
  const { time, resetTimer, pause, resume } = useTimer()
  // 現在の問題の単語データ
  const [currentWord, setCurrentWord] = useState<GameWord | null>(null)
  // 問題番号
  const [questionCount, setQuestionCount] = useState(1)

  // 回答機能のstate
  const [allChars, setAllChars] = useState<AllChars[]>([])
  const [selectedChars, setSelectedChars] = useState<SelectedChars[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')

  // ドラッグ&ドロップのstate
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)

  // ゲーム進行のstate
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false)

  // 出題した問題のリスト
  const [questionList, setQuestionList] = useState<GameWord[]>([])

  // モードに応じて問題を取得する関数
  const getRandomWord = (): GameWord => {
    if (mode === 'html-css') {
      return getRandomHtmlCssTerm()
    } else {
      return getRandomRubyMethod()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* ヘッダー部分 */}
          <Header 
            time={time}
            questionCount={questionCount}
            mode={mode}
          />

          {/* メインゲーム画面 */}
          <div className="bg-white rounded-lg shadow-lg p-8 mt-4">
            {currentWord ? (
              <>
                {/* 問題表示 */}
                {mode === 'html-css' ? (
                  <HTMLCSSQuestion 
                    allChars={allChars}
                    // その他のprops
                  />
                ) : (
                  <RubyQuestion 
                    allChars={allChars}
                    // その他のprops
                  />
                )}

                {/* 回答欄 */}
                <Answer 
                  selectedChars={selectedChars}
                  draggedIndex={draggedIndex}
                  dragOverIndex={dragOverIndex}
                  isAnswered={isAnswered}
                  handleDragOver={() => {}}
                  handleDrop={() => {}}
                  handleDragLeave={() => {}}
                  handleDragStart={() => {}}
                  handleDragEnd={() => {}}
                />

                {/* ヒント */}
                <Hint hint={currentWord.hint || ''} />
              </>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg text-gray-600">ゲームを読み込み中...</p>
              </div>
            )}
          </div>

          {/* デバッグ情報（一時的） */}
          <div className="mt-4 p-4 bg-yellow-100 rounded">
            <p className="text-sm">デバッグ: モード = {mode}</p>
            <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
              トップページに戻る
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}