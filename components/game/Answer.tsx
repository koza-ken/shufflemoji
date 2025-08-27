import React, { useMemo, useCallback } from 'react';
import { useGameState } from '@/contexts/GameStateContext';
import { useCharacterSwap } from '@/contexts/CharacterSwapContext';
import { useCharacter } from '@/contexts/CharacterContext';
import { SelectedChars } from '@/types/word';

export const Answer = () => {
  // Context hooks
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

  // ✅ 適切な最適化: ハンドラーをuseCallbackでメモ化（親の責任）
  const handleCharacterSelectOptimized = useCallback((index: number) => {
    handleCharacterSelect(index, selectedChars, reorderCharacters);
  }, [handleCharacterSelect, selectedChars, reorderCharacters]);

  const handleRemoveCharOptimized = useCallback((charId: string) => {
    handleRemoveChar(charId);
  }, [handleRemoveChar]);

  return (
    <div className="mb-2">
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
            {selectedChars.map((charObj, index) => (
              <AnswerCard
                key={`char-container-${charObj.id}`}
                charObj={charObj}
                index={index}
                isAnswered={isAnswered}
                swappingIndices={swappingIndices}
                recentlySwappedIndices={recentlySwappedIndices}
                selectedForSwapIndex={selectedForSwapIndex}
                mobileSwappingIndices={mobileSwappingIndices}
                onCharacterSelect={handleCharacterSelectOptimized}
                onRemoveChar={handleRemoveCharOptimized}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

// ✅ 適切な最適化: 必要最小限のメモ化
const AnswerCard = React.memo<{
  charObj: SelectedChars;
  index: number;
  isAnswered: boolean;
  swappingIndices: number[];
  recentlySwappedIndices: number[];
  selectedForSwapIndex: number | null;
  mobileSwappingIndices: number[];
  onCharacterSelect: (index: number) => void;
  onRemoveChar: (charId: string) => void;
}>(({
  charObj,
  index,
  isAnswered,
  swappingIndices,
  recentlySwappedIndices,
  selectedForSwapIndex,
  mobileSwappingIndices,
  onCharacterSelect,
  onRemoveChar
}) => {
  //  過剰なメモ化を削除 - 単純な計算は直接実行
  const isSwapping = swappingIndices.includes(index);
  const isRecentlySwapped = recentlySwappedIndices.includes(index);
  const isSelectedForSwap = selectedForSwapIndex === index;
  const isSwappingAnimation = mobileSwappingIndices.includes(index);

  //  単純なイベントハンドラー（メモ化不要）
  const handleCharacterClick = () => {
    if (!isAnswered) {
      onCharacterSelect(index);
    }
  };

  const handleRemoveClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRemoveChar(charObj.id);
  };

  return (
    <div className="flex items-center relative">
      <div className="relative">
        {/* 文字カード - クリック選択対応 */}
        <div
          onClick={handleCharacterClick}
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

        {/* 削除ボタン（回答前のみ表示） - 文字カードの上に配置 */}
        {!isAnswered && (
          <button
            onClick={handleRemoveClick}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-6 h-6 sm:w-7 sm:h-7 bg-gray-400 hover:bg-gray-500 text-white rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-lg transition-colors z-20"
            style={{ userSelect: 'none' }}
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
});

AnswerCard.displayName = 'AnswerCard';
