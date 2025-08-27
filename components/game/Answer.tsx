import React from 'react';
import { useGameState } from '@/contexts/GameStateContext';
import { useCharacterSwap } from '@/contexts/CharacterSwapContext';
import { useCharacter } from '@/contexts/CharacterContext';

export const Answer = () => {
  // Context hooks - propsなし！
  const { isAnswered } = useGameState();
  const {
    swappingIndices,
    recentlySwappedIndices,
    selectedForSwapIndex,
    mobileSwappingIndices,
    handleCharacterSelect
  } = useCharacterSwap();
  const {
    selectedChars,
    handleRemoveChar,
    reorderCharacters
  } = useCharacter();

  return (
    <div className="mb-2">
      {/* <h3 className="text-base sm:text-lg mb-1 font-semibold text-gray-700 text-center">
        回答
      </h3> */}
      <p className="text-sm sm:text-sm mt-6 mb-1 text-center text-gray-700">
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
              const isSwapping = swappingIndices.includes(index);
              const isRecentlySwapped = recentlySwappedIndices.includes(index);
              const isSelectedForSwap = selectedForSwapIndex === index;
              const isSwappingAnimation = mobileSwappingIndices.includes(index);

              return (
                <div
                  key={`char-container-${charObj.id}`}
                  className="flex items-center relative"
                >


                  <div className="relative">
                    {/* 文字カード - クリック選択対応 */}
                    <div
                      onClick={() =>
                        !isAnswered &&
                        handleCharacterSelect(index, selectedChars, reorderCharacters)
                      }
                      className={`w-12 h-12 ${
                        isSelectedForSwap
                          ? 'bg-blue-300'
                          : isRecentlySwapped
                          ? 'bg-green-300'
                          : 'bg-green-100'
                      } border-2 border-green-300 rounded-lg flex items-center justify-center text-3xl font-bold text-green-800 ${
                        !isAnswered
                          ? 'cursor-pointer hover:scale-105 hover:shadow-md'
                          : 'cursor-default'
                      } ${isSwappingAnimation ? 'mobile-swap-animation' : ''}`}
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

          </>
        )}
      </div>
    </div>
  );
}
