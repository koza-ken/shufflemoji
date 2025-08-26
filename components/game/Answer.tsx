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
    recentlyDroppedIndices,
    selectedForSwapIndex,
    mobileSwappingIndices,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleTapToSwap
  } = useDragDrop();
  const {
    selectedChars,
    handleRemoveChar,
    reorderCharacters
  } = useCharacter();

  return (
    <div className="mb-2">
      <h3 className="text-base sm:text-lg mb-1 font-semibold text-gray-700 text-center">
        回答
      </h3>
      <p className="text-sm sm:text-sm mb-3 text-center text-gray-700">
        移動したい文字を選択して入れ替えが可能
      </p>
      <div className="flex justify-center items-end gap-0.5 sm:gap-2 min-h-[7rem] sm:min-h-[7rem] py-5 sm:p-1 sm:py-4 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
        {selectedChars.length === 0 ? (
          <p className="text-gray-400 self-center text-sm sm:text-base py-2">
            文字をクリックして回答を作成してください
          </p>
        ) : (
          <>
            {selectedChars.map((charObj, index) => {
              const isDragging = draggedIndex === index;
              const isDragOver = dragOverIndex === index && !isDragging;
              const isDropSuccess = dropSuccessIndex === index;
              const isSwapping = swappingIndices.includes(index);
              const isRecentlyDropped = recentlyDroppedIndices.includes(index);
              const isSelectedForSwap = selectedForSwapIndex === index;
              const isMobileSwapping = mobileSwappingIndices.includes(index);

              return (
                <div
                  key={`char-container-${charObj.id}`}
                  className="flex items-center relative"
                >
                  {/* ドロップインジケーター */}
                  {isDragOver && (
                    <div className="w-1 h-4 sm:h-12 bg-blue-500 rounded-sm mr-1 sm:mr-2 shadow-lg" />
                  )}

                  {/* ドロップゾーン（文字の左側） - 文字カード+×ボタンの高さ */}
                  <div
                    className="absolute -left-4 sm:-left-6 -top-2 w-6 h-12 sm:h-20 z-10"
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
                    onDragLeave={(e: React.DragEvent<HTMLDivElement>) =>
                      handleDragLeave(e)
                    }
                  />

                  <div className="relative">
                    {/* 文字カード - PC全体ドラッグ対応 */}
                    <div
                      draggable={!isAnswered}
                      onDragStart={(e: React.DragEvent<HTMLDivElement>) =>
                        handleDragStart(e, index)
                      }
                      onDragEnd={handleDragEnd}
                      onClick={() =>
                        !isAnswered &&
                        handleTapToSwap(index, selectedChars, reorderCharacters)
                      }
                      className={`w-12 h-12 ${
                        isSelectedForSwap
                          ? 'bg-blue-300'
                          : isRecentlyDropped
                          ? 'bg-green-300'
                          : 'bg-green-100'
                      } border-2 border-green-300 rounded-lg flex items-center justify-center text-3xl font-bold text-green-800 ${
                        !isAnswered
                          ? 'cursor-pointer hover:scale-105 hover:shadow-md'
                          : 'cursor-default'
                      } ${
                        isDragging ? 'opacity-50 scale-95' : 'transform-none'
                      } ${isDropSuccess ? 'drop-success' : ''} ${
                        isSwapping ? 'swap-animation' : ''
                      } ${isMobileSwapping ? 'mobile-swap-animation' : ''}`}
                      style={{
                        userSelect: 'none',
                        WebkitUserSelect: 'none',
                        touchAction: !isAnswered ? 'none' : 'auto',
                        transition:
                          'background-color 0.4s ease-out, transform 0.2s, box-shadow 0.2s, cursor 0s',
                      }}
                    >
                      {charObj.char}
                    </div>

                    {/* モバイル用タップハンドル - 縦長で間隔確保 */}
                    {/* {!isAnswered && (
                      <div
                        onClick={() => handleTapToSwap(index, selectedChars, reorderCharacters)}
                        className={`sm:hidden absolute -bottom-14 left-1/2 transform -translate-x-1/2 w-10 h-12 ${isSelectedForSwap ? 'bg-blue-500' : isDragging ? 'bg-gray-600' : 'bg-gray-400 hover:bg-gray-500'} rounded-lg cursor-pointer flex items-center justify-center transition-colors active:bg-gray-600 shadow-md`}
                        style={{
                          userSelect: 'none',
                          WebkitUserSelect: 'none',
                          touchAction: 'manipulation'
                        }}
                      >
                        <div className="flex items-center gap-1">
                          <div className="flex items-center gap-0.5">
                            <div className="w-1.5 h-1.5 bg-white rounded"></div>
                            <div className="w-1.5 h-1.5 bg-white rounded"></div>
                          </div>
                          <div className="text-white text-xs font-bold">⇄</div>
                          <div className="flex items-center gap-0.5">
                            <div className="w-1.5 h-1.5 bg-white rounded"></div>
                            <div className="w-1.5 h-1.5 bg-white rounded"></div>
                          </div>
                        </div>
                      </div>
                    )} */}

                    {/* 削除ボタン（回答前のみ表示） - 文字カードの上に配置 */}
                    {!isAnswered && (
                      <button
                        onClick={e => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemoveChar(charObj.id);
                        }}
                        className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-gray-400 hover:bg-gray-500 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-lg transition-colors z-20"
                        style={{ userSelect: 'none' }}
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* 最後尾のドロップゾーン - 文字カード+×ボタンの高さ */}
            <div className="flex items-center relative ml-2">
              {dragOverIndex === selectedChars.length && (
                <div className="w-1 h-8 sm:h-12 bg-blue-500 rounded-sm shadow-lg" />
              )}
              <div
                className="w-1px sm:w-1 h-8 sm:h-12"
                onDragOver={(e: React.DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDragOver(e, selectedChars.length);
                }}
                onDrop={(e: React.DragEvent<HTMLDivElement>) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDrop(
                    e,
                    selectedChars.length,
                    selectedChars,
                    reorderCharacters
                  );
                }}
                onDragLeave={(e: React.DragEvent<HTMLDivElement>) =>
                  handleDragLeave(e)
                }
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
