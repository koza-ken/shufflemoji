'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react'
import { GameWord, GameMode } from '@/types/word'
import { getRandomHtmlCssTerm, htmlCssTerms } from '@/data/htmlCssTerms'
import { getRandomRubyMethod, rubyMethods } from '@/data/rubyMethods'
import { getRandomFeTerm, feTerms } from '@/data/feTerms'
import { scrambleWord } from '@/utils/scrambleWord'

interface GameStateContextType {
  // Game state
  mode: GameMode
  currentWord: GameWord | null
  questionCount: number
  usedWordIds: Set<string>
  currentRound: number
  totalWordsCount: number
  questionList: GameWord[]

  // Game status
  isAnswered: boolean
  isCorrect: boolean | null
  showIncompleteWarning: boolean

  // Actions
  setCurrentWord: React.Dispatch<React.SetStateAction<GameWord | null>>
  setQuestionCount: React.Dispatch<React.SetStateAction<number>>
  setUsedWordIds: React.Dispatch<React.SetStateAction<Set<string>>>
  setCurrentRound: React.Dispatch<React.SetStateAction<number>>
  setTotalWordsCount: React.Dispatch<React.SetStateAction<number>>
  setQuestionList: React.Dispatch<React.SetStateAction<GameWord[]>>
  setIsAnswered: React.Dispatch<React.SetStateAction<boolean>>
  setIsCorrect: React.Dispatch<React.SetStateAction<boolean | null>>
  setShowIncompleteWarning: React.Dispatch<React.SetStateAction<boolean>>

  // Game logic
  getRandomWord: () => GameWord
  handleNextQuestion: () => void
  handleGameEnd: () => void
}

const GameStateContext = createContext<GameStateContextType | null>(null)

interface GameStateProviderProps {
  children: ReactNode
  mode: GameMode
}

export const GameStateProvider = ({ children, mode }: GameStateProviderProps) => {
  // Game state
  const [currentWord, setCurrentWord] = useState<GameWord | null>(null)
  const [questionCount, setQuestionCount] = useState(1)
  const [usedWordIds, setUsedWordIds] = useState<Set<string>>(new Set())
  const [currentRound, setCurrentRound] = useState(1)
  const [totalWordsCount, setTotalWordsCount] = useState(0)
  const [questionList, setQuestionList] = useState<GameWord[]>([])

  // Game status
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false)

  // Helper functions
  const getAllWords = (gameMode: GameMode) => {
    if (gameMode === 'html-css') {
      return htmlCssTerms
    } else if (gameMode === 'ruby') {
      return rubyMethods
    } else {
      return feTerms
    }
  }

  const getTotalWordsCount = (gameMode: GameMode): number => {
    return getAllWords(gameMode).length
  }

  const getRandomWord = (): GameWord => {
    // 全問題と未出題問題を取得
    const allWords = getAllWords(mode);
    const availableWords = allWords.filter(word => !usedWordIds.has(word.id));

    // 全問題出題済みの場合、2周目に進む
    if (availableWords.length === 0) {
      const nextRound = currentRound + 1;
      setCurrentRound(nextRound);
      setUsedWordIds(new Set());
      
      // 全問題から再びランダム選択（2周目開始）
      const randomIndex = Math.floor(Math.random() * allWords.length);
      const selectedWord = allWords[randomIndex];
      return {
        ...selectedWord,
        scrambled: scrambleWord(selectedWord.original)
      };
    }

    // 未出題問題からランダム選択
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex];
    return {
      ...selectedWord,
      scrambled: scrambleWord(selectedWord.original)
    };
  }

  const handleNextQuestion = () => {
    const word = getRandomWord()
    setCurrentWord(word)

    // 新しい問題をusedWordIdsに追加
    setUsedWordIds(prev => new Set([...prev, word.id]))

    setIsAnswered(false)
    setIsCorrect(null)
    setShowIncompleteWarning(false)
    setQuestionCount(prev => prev + 1)
  }

  const handleGameEnd = () => {
    if (!currentWord) return
    // 結果をセッションストレージで渡す
    const gameResult = {
      count: questionCount - 1,
      questions: questionList,
      mode,
      incorrectWord: {
        word: currentWord.original,
        userAnswer: '' // CharacterContextから取得する必要があるため空文字
      }
    }

    sessionStorage.setItem('gameResult', JSON.stringify(gameResult))
    // ルーター処理は親コンポーネントで処理
  }

  // 初期化
  useEffect(() => {
    setTotalWordsCount(getTotalWordsCount(mode))
    setUsedWordIds(new Set())
    setCurrentRound(1)

    const word = getRandomWord()
    setCurrentWord(word)
    setUsedWordIds(new Set([word.id]))

    setIsAnswered(false)
    setIsCorrect(null)
    setShowIncompleteWarning(false)
  }, [mode])

  const value: GameStateContextType = useMemo(() => ({
    // State
    mode,
    currentWord,
    questionCount,
    usedWordIds,
    currentRound,
    totalWordsCount,
    questionList,
    isAnswered,
    isCorrect,
    showIncompleteWarning,

    // Actions
    setCurrentWord,
    setQuestionCount,
    setUsedWordIds,
    setCurrentRound,
    setTotalWordsCount,
    setQuestionList,
    setIsAnswered,
    setIsCorrect,
    setShowIncompleteWarning,

    // Game logic
    getRandomWord,
    handleNextQuestion,
    handleGameEnd
  }), [
    mode,
    currentWord,
    questionCount,
    usedWordIds,
    currentRound,
    totalWordsCount,
    questionList,
    isAnswered,
    isCorrect,
    showIncompleteWarning,
    getRandomWord,
    handleNextQuestion,
    handleGameEnd
  ])

  return (
    <GameStateContext.Provider value={value}>
      {children}
    </GameStateContext.Provider>
  )
}

export const useGameState = () => {
  const context = useContext(GameStateContext)
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider')
  }
  return context
}
