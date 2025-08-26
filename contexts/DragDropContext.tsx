'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface DragDropContextType {
  // Drag state
  draggedIndex: number | null
  dragOverIndex: number | null
  dropSuccessIndex: number | null
  swappingIndices: number[]
  recentlyDroppedIndices: number[]

  // Mobile tap-to-swap state
  selectedForSwapIndex: number | null
  mobileSwappingIndices: number[]

  // Actions
  setDraggedIndex: (index: number | null) => void
  setDragOverIndex: (index: number | null) => void
  setDropSuccessIndex: (index: number | null) => void
  setSwappingIndices: (indices: number[]) => void
  setRecentlyDroppedIndices: (indices: number[]) => void
  setSelectedForSwapIndex: (index: number | null) => void
  setMobileSwappingIndices: (indices: number[]) => void

  // Event handlers
  handleDragStart: (e: React.DragEvent, index: number) => void
  handleDragEnd: () => void
  handleDragOver: (e: React.DragEvent, index?: number) => void
  handleDragLeave: (e: React.DragEvent) => void
  handleDrop: (e: React.DragEvent, dropIndex: number, selectedChars: any[], onCharactersReorder: (newChars: any[]) => void) => void

  // Mobile tap-to-swap handlers
  handleTapToSwap: (index: number, selectedChars: any[], onCharactersReorder: (newChars: any[]) => void) => void
}

const DragDropContext = createContext<DragDropContextType | null>(null)

interface DragDropProviderProps {
  children: ReactNode
  isAnswered: boolean
}

export const DragDropProvider = ({ children, isAnswered }: DragDropProviderProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [dropSuccessIndex, setDropSuccessIndex] = useState<number | null>(null)
  const [swappingIndices, setSwappingIndices] = useState<number[]>([])
  const [recentlyDroppedIndices, setRecentlyDroppedIndices] = useState<number[]>([])
  const [selectedForSwapIndex, setSelectedForSwapIndex] = useState<number | null>(null)
  const [mobileSwappingIndices, setMobileSwappingIndices] = useState<number[]>([])

  // ドラッグ開始処理
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (isAnswered) {
      e.preventDefault()
      return
    }
    setDraggedIndex(index)
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', index.toString())
  }

  // ドラッグオーバー処理
  const handleDragOver = (e: React.DragEvent, index?: number) => {
    if (isAnswered) return
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'

    if (index !== undefined && index !== draggedIndex) {
      setDragOverIndex(index)
    }
  }

  // ドラッグリーブ処理
  const handleDragLeave = (e: React.DragEvent) => {
    if (isAnswered) return
    // タイマーで遅延させてリセット
    setTimeout(() => {
      setDragOverIndex(null)
    }, 100)
  }

  // ドロップ処理
  const handleDrop = (e: React.DragEvent, dropIndex: number, selectedChars: any[], onCharactersReorder: (newChars: any[]) => void) => {
    if (isAnswered) return
    e.preventDefault()

    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'))

    if (isNaN(dragIndex)) {
      setDraggedIndex(null)
      setDragOverIndex(null)
      return
    }

    // 選択済み文字配列を並び替え
    const newSelectedChars = [...selectedChars]
    const draggedChar = newSelectedChars[dragIndex]

    // 元の位置から削除
    newSelectedChars.splice(dragIndex, 1)

    // 新しい位置に挿入
    let insertIndex = dropIndex
    if (dropIndex > dragIndex) {
      insertIndex = dropIndex - 1
    }
    if (insertIndex >= newSelectedChars.length) {
      insertIndex = newSelectedChars.length
    }

    newSelectedChars.splice(insertIndex, 0, draggedChar)

    // 親コンポーネントに新しい配列を渡す
    onCharactersReorder(newSelectedChars)

    // 入れ替わりアニメーションをトリガー - 影響を受ける全ての要素
    const affectedIndices: number[] = []

    // ドラッグされた文字の新しい位置
    affectedIndices.push(insertIndex)

    // 押し出された文字たちのインデックス
    if (dragIndex < dropIndex) {
      // 右に移動した場合、間にある文字が左にシフト
      for (let i = dragIndex + 1; i <= Math.min(dropIndex - 1, selectedChars.length - 1); i++) {
        if (i !== insertIndex) affectedIndices.push(i - 1)
      }
    } else {
      // 左に移動した場合、間にある文字が右にシフト
      for (let i = dropIndex; i < dragIndex; i++) {
        affectedIndices.push(i + 1)
      }
    }

    setSwappingIndices(affectedIndices)
    setDropSuccessIndex(insertIndex)
    setRecentlyDroppedIndices([insertIndex])

    setTimeout(() => {
      setSwappingIndices([])
      setDropSuccessIndex(null)
    }, 600)

    // 1秒間色を濃く保持してゆっくり戻る
    setTimeout(() => {
      setRecentlyDroppedIndices([])
    }, 1000)

    setDraggedIndex(null)
    setDragOverIndex(null)
  }
  // モバイル用タップ入れ替え処理
  const handleTapToSwap = (index: number, selectedChars: any[], onCharactersReorder: (newChars: any[]) => void) => {
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

      // 入れ替え成功のモバイル用アニメーション（両方の文字）
      setMobileSwappingIndices([selectedForSwapIndex, index])
      setRecentlyDroppedIndices([selectedForSwapIndex, index])

      // 0.4秒後にモバイルアニメーションを停止
      setTimeout(() => {
        setMobileSwappingIndices([])
      }, 400)

      // 0.4秒後に色を元に戻す
      setTimeout(() => {
        setRecentlyDroppedIndices([])
      }, 400)

      // 選択状態をリセット
      setSelectedForSwapIndex(null)
    }
  }

  // ドラッグ終了処理
  const handleDragEnd = () => {
    setDraggedIndex(null)
    setDragOverIndex(null)
    setDropSuccessIndex(null)
    setSwappingIndices([])
  }

  const value: DragDropContextType = {
    // State
    draggedIndex,
    dragOverIndex,
    dropSuccessIndex,
    swappingIndices,
    recentlyDroppedIndices,
    selectedForSwapIndex,
    mobileSwappingIndices,

    // Actions
    setDraggedIndex,
    setDragOverIndex,
    setDropSuccessIndex,
    setSwappingIndices,
    setRecentlyDroppedIndices,
    setSelectedForSwapIndex,
    setMobileSwappingIndices,

    // Event handlers
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleTapToSwap
  }

  return (
    <DragDropContext.Provider value={value}>
      {children}
    </DragDropContext.Provider>
  )
}

export const useDragDrop = () => {
  const context = useContext(DragDropContext)
  if (!context) {
    throw new Error('useDragDrop must be used within a DragDropProvider')
  }
  return context
}
