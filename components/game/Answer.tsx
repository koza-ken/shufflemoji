import React from 'react';
import { useGameState } from '@/contexts/GameStateContext';
import { useDragDrop } from '@/contexts/DragDropContext';
import { useCharacter } from '@/contexts/CharacterContext';

export const Answer = () => {
  // Context hooks - propsなし！
  const { isAnswered } = useGameState();
  const {
    draggedIndex,
    dragOverIndex,
    dropSuccessIndex,
    swappingIndices,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop
  } = useDragDrop();
  const {
    selectedChars,
    handleRemoveChar,
    reorderCharacters
  } = useCharacter();

  return (
    <div className="mb-2">
      <h3 className="text-base sm:text-lg font-semibold text-gray-700 text-center">回答</h3>
      <p className="text-xs sm:text-sm mb-3 text-center text-gray-700">ドラッグ＆ドロップで並び替えが可能</p>
      <div
        className="flex justify-center items-center gap-0.5 sm:gap-2 min-h-[2rem] sm:min-h-[3rem] p-1 sm:p-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg flex-wrap"
      >
        {selectedChars.length === 0 ? (
          <p className="text-gray-400 self-center text-sm sm:text-base py-4">文字をクリックして回答を作成してください</p>
        ) : (
          <>
            {selectedChars.map((charObj, index) => {
              const isDragging = draggedIndex === index;
              const isDragOver = dragOverIndex === index && !isDragging;
              const isDropSuccess = dropSuccessIndex === index;
              const isSwapping = swappingIndices.includes(index);

              return (
                <div key={`char-container-${charObj.id}`} className="flex items-center relative">
                  {/* ドロップインジケーター */}
                  {isDragOver && (
                    <div className="w-1 h-8 sm:h-12 bg-blue-500 rounded-sm mr-1 sm:mr-2 shadow-lg" />
                  )}

                  {/* ドロップゾーン（文字の左側） */}
                  <div
                    className="absolute -left-3 sm:-left-4 top-0 w-6 sm:w-8 h-8 sm:h-12 z-10"
                    onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDragOver(e, index);
                    }}
                    onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleDrop(e, index, selectedChars, reorderCharacters);
                    }}
                    onDragLeave={(e: React.DragEvent<HTMLDivElement>) => handleDragLeave(e)}
                  />

                  <div className="relative">
                    <div
                      draggable={!isAnswered}
                      onDragStart={(e: React.DragEvent<HTMLDivElement>) => handleDragStart(e, index)}
                      onDragEnd={handleDragEnd}
                      className={`w-12 h-12 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center text-sm sm:text-xl font-bold text-green-800 transition-all duration-200 ${!isAnswered ? 'cursor-move hover:scale-105 hover:shadow-md' : 'cursor-default'
                        } ${isDragging ? 'opacity-50 scale-95' : 'transform-none'
                        } ${isDropSuccess ? 'drop-success' : ''
                        } ${isSwapping ? 'swap-animation' : ''
                        }`}
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        touchAction: 'none'
                      }}
                    >
                      {charObj.char}
                    </div>

                    {/* 削除ボタン（回答前のみ表示） */}
                    {!isAnswered && (
                      <button
                        onClick={() => handleRemoveChar(charObj.id)}
                        className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 bg-gray-300 hover:bg-gray-400 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold shadow-lg transition-colors"
                        style={{ userSelect: 'none' }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* 最後尾のドロップゾーン */}
            <div className="flex items-center relative ml-2">
              {dragOverIndex === selectedChars.length && (
                <div className="w-1 h-8 sm:h-12 bg-blue-500 rounded-sm shadow-lg" />
              )}
              <div
                className="w-6 sm:w-8 h-8 sm:h-12"
                onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDragOver(e, selectedChars.length);
                }}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDrop(e, selectedChars.length, selectedChars, reorderCharacters);
                }}
                onDragLeave={(e: React.DragEvent<HTMLDivElement>) => handleDragLeave(e)}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
