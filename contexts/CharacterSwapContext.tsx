'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface CharacterSwapContextType {
  // 選択・入れ替え状態
  swappingIndices: number[]
  recentlySwappedIndices: number[]
  selectedForSwapIndex: number | null
  mobileSwappingIndices: number[]
  
  // Actions
  setSwappingIndices: (indices: number[]) => void
  setRecentlySwappedIndices: (indices: number[]) => void
  setSelectedForSwapIndex: (index: number | null) => void
  setMobileSwappingIndices: (indices: number[]) => void
  
  // Event handlers（クリック選択専用に名前変更）
  handleCharacterSelect: (index: number, selectedChars: any[], onCharactersReorder: (newChars: any[]) => void) => void
}

const CharacterSwapContext = createContext<CharacterSwapContextType | null>(null)

interface CharacterSwapProviderProps {
  children: ReactNode
  isAnswered: boolean
}

export const CharacterSwapProvider = ({ children, isAnswered }: CharacterSwapProviderProps) => {
  // 選択・入れ替え状態の管理
  const [swappingIndices, setSwappingIndices] = useState<number[]>([])
  const [recentlySwappedIndices, setRecentlySwappedIndices] = useState<number[]>([])
  const [selectedForSwapIndex, setSelectedForSwapIndex] = useState<number | null>(null)
  const [mobileSwappingIndices, setMobileSwappingIndices] = useState<number[]>([])

  // クリック選択・入れ替え処理（元のhandleTapToSwapを改名）
  const handleCharacterSelect = (index: number, selectedChars: any[], onCharactersReorder: (newChars: any[]) => void) => {
    if (isAnswered) return

    if (selectedForSwapIndex === null) {
      // 最初の文字を選択
      setSelectedForSwapIndex(index)
    } else if (selectedForSwapIndex === index) {
      // 同じ文字をタップした場合は選択解除
      setSelectedForSwapIndex(null)
    } else {
      // 2つ目の文字をタップした場合は入れ替え
      const newSelectedChars = [...selectedChars]
      const char1 = newSelectedChars[selectedForSwapIndex]
      const char2 = newSelectedChars[index]
      
      // 位置を入れ替え
      newSelectedChars[selectedForSwapIndex] = char2
      newSelectedChars[index] = char1
      
      // 親コンポーネントに新しい配列を渡す
      onCharactersReorder(newSelectedChars)
      
      // 入れ替え成功アニメーション（両方の文字）
      setMobileSwappingIndices([selectedForSwapIndex, index])
      setRecentlySwappedIndices([selectedForSwapIndex, index])
      
      // 0.4秒後にアニメーションを停止
      setTimeout(() => {
        setMobileSwappingIndices([])
      }, 400)
      
      // 0.4秒後に色を元に戻す
      setTimeout(() => {
        setRecentlySwappedIndices([])
      }, 400)
      
      // 選択状態をリセット
      setSelectedForSwapIndex(null)
    }
  }

  const value: CharacterSwapContextType = {
    // State
    swappingIndices,
    recentlySwappedIndices,
    selectedForSwapIndex,
    mobileSwappingIndices,
    
    // Actions
    setSwappingIndices,
    setRecentlySwappedIndices,
    setSelectedForSwapIndex,
    setMobileSwappingIndices,
    
    // Event handlers
    handleCharacterSelect
  }

  return (
    <CharacterSwapContext.Provider value={value}>
      {children}
    </CharacterSwapContext.Provider>
  )
}

export const useCharacterSwap = () => {
  const context = useContext(CharacterSwapContext)
  if (!context) {
    throw new Error('useCharacterSwap must be used within a CharacterSwapProvider')
  }
  return context
}