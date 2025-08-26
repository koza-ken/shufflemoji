'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AllChars, SelectedChars, GameWord } from '@/types/word';

interface CharacterContextType {
  // Character state
  allChars: AllChars[]
  selectedChars: SelectedChars[]
  currentAnswer: string

  // Actions
  setAllChars: (chars: AllChars[]) => void
  setSelectedChars: (chars: SelectedChars[]) => void
  setCurrentAnswer: (answer: string) => void

  // Character logic
  handleCharClick: (clickedChar: AllChars) => void
  handleRemoveChar: (charId: string) => void
  handleReset: () => void
  initializeChars: (word: GameWord) => void
  reorderCharacters: (newChars: SelectedChars[]) => void
}

const CharacterContext = createContext<CharacterContextType | null>(null)

interface CharacterProviderProps {
  children: ReactNode
  currentWord: GameWord | null
  isAnswered: boolean
  showIncompleteWarning: boolean
  setShowIncompleteWarning: (show: boolean) => void
}

export const CharacterProvider = ({
  children,
  currentWord,
  isAnswered,
  showIncompleteWarning,
  setShowIncompleteWarning
}: CharacterProviderProps) => {
  const [allChars, setAllChars] = useState<AllChars[]>([])
  const [selectedChars, setSelectedChars] = useState<SelectedChars[]>([])
  const [currentAnswer, setCurrentAnswer] = useState('')

  // 文字を初期化する関数
  const initializeChars = (word: GameWord) => {
    if (!word) return

    const chars = word.scrambled.split('').map((char, index) => ({
      char,
      id: `${word.id}-${index}`,
      isSelected: false
    }))

    setAllChars(chars)
    setSelectedChars([])
    setCurrentAnswer('')
  }

  // 文字カードクリック処理
  const handleCharClick = (clickedChar: AllChars) => {
    // 既に選択済みの文字または回答済みの場合はクリックできない
    if (clickedChar.isSelected || isAnswered) return

    // 文字を選択した時に警告を非表示
    if (showIncompleteWarning) {
      setShowIncompleteWarning(false)
    }

    // 文字の選択状態を更新
    setAllChars((prev: AllChars[]) =>
      prev.map((char: AllChars) =>
        char.id === clickedChar.id
          ? { ...char, isSelected: true }
          : char
      )
    )

    // 選択済み文字に追加
    setSelectedChars((prev: SelectedChars[]) => [...prev, { char: clickedChar.char, id: clickedChar.id }])
    // 現在の回答を更新
    setCurrentAnswer((prev: string) => prev + clickedChar.char)
  }

  // 文字削除処理（一つずつ戻す機能）
  const handleRemoveChar = (charId: string) => {
    if (isAnswered) return

    // 警告を非表示
    if (showIncompleteWarning) {
      setShowIncompleteWarning(false)
    }

    // 選択済み文字から該当文字を削除
    setSelectedChars((prev: SelectedChars[]) => prev.filter((char: SelectedChars) => char.id !== charId))

    // allCharsの選択状態をリセット
    setAllChars((prev: AllChars[]) =>
      prev.map((char: AllChars) =>
        char.id === charId ? { ...char, isSelected: false } : char
      )
    )

    // 現在の回答を更新
    setCurrentAnswer((prev: string) => {
      const chars = selectedChars.filter((char: SelectedChars) => char.id !== charId)
      return chars.map((char: SelectedChars) => char.char).join('')
    })
  }

  // ドラッグ&ドロップによる文字の並び替え
  const reorderCharacters = (newChars: SelectedChars[]) => {
    setSelectedChars(newChars)
    setCurrentAnswer(newChars.map(char => char.char).join(''))
  }

  // リセット処理
  const handleReset = () => {
    if (!currentWord) return

    // 全文字の選択状態をリセット
    setAllChars((prev: AllChars[]) =>
      prev.map((char: AllChars) => ({ ...char, isSelected: false }))
    )
    setSelectedChars([])
    setCurrentAnswer('')
  }

  // currentWordが変更された時の初期化
  useEffect(() => {
    if (currentWord) {
      initializeChars(currentWord)
    }
  }, [currentWord])

  const value: CharacterContextType = {
    // State
    allChars,
    selectedChars,
    currentAnswer,

    // Actions
    setAllChars,
    setSelectedChars,
    setCurrentAnswer,

    // Character logic
    handleCharClick,
    handleRemoveChar,
    handleReset,
    initializeChars,
    reorderCharacters
  }

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}

export const useCharacter = () => {
  const context = useContext(CharacterContext)
  if (!context) {
    throw new Error('useCharacter must be used within a CharacterProvider')
  }
  return context
}
