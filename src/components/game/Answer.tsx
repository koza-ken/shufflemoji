import React from 'react';
import { SelectedChars } from '../../types/word';

type AnswerProps = {
  selectedChars: SelectedChars[];
  draggedIndex: number | null;
  dragOverIndex: number | null;
  isAnswered: boolean;
  handleDragOver: (e: React.DragEvent, index?: number) => void;
  handleDrop: (e: React.DragEvent, dropIndex: number) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDragStart: (e: React.DragEvent, index: number) => void;
  handleDragEnd: () => void;
}

export const Answer = ({
    selectedChars,
    draggedIndex,
    dragOverIndex,
    isAnswered,
    handleDragStart,
    handleDragEnd,
    handleDragOver,
    handleDragLeave,
    handleDrop
  }: AnswerProps) => {

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 text-center">回答</h3>
      <p className="text-sm mb-3 text-center text-gray-700">文字をすべて選択すると、ドラッグ＆ドロップで並び替えが可能</p>
      <div
        className="flex justify-center items-center gap-2 min-h-[3rem] p-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg"
      >
        {selectedChars.length === 0 ? (
          <p className="text-gray-400 self-center">文字をクリックして回答を作成してください</p>
        ) : (
          <>
            {selectedChars.map((charObj, index) => {
              const isDragging = draggedIndex === index;
              const isDragOver = dragOverIndex === index && !isDragging;

              return (
                <div key={`char-container-${charObj.id}`} className="flex items-center relative">
                  {/* ドロップインジケーター */}
                  {isDragOver && (
                    <div className="w-1 h-12 bg-blue-400 rounded-sm mr-2 animate-pulse" />
                  )}

                  {/* ドロップゾーン（文字の左側） */}
                  <div
                    className="absolute -left-3 top-0 w-6 h-12 z-10"
                    onDragOver={(e) => {
                      e.stopPropagation();
                      handleDragOver(e, index);
                    }}
                    onDrop={(e) => {
                      e.stopPropagation();
                      handleDrop(e, index);
                    }}
                    onDragLeave={handleDragLeave}
                  />

                  <div
                    draggable={!isAnswered}
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragEnd={handleDragEnd}
                    className={`w-12 h-12 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center text-xl font-bold text-green-800 transition-opacity duration-150 ${
                      !isAnswered ? 'cursor-move hover:scale-105' : 'cursor-default'
                    } ${
                      isDragging ? 'opacity-50' : ''
                    }`}
                    style={{
                      userSelect: 'none',
                      WebkitUserSelect: 'none'
                    }}
                  >
                    {charObj.char}
                  </div>
                </div>
              );
            })}

            {/* 最後尾のドロップゾーン */}
            <div className="flex items-center relative ml-2">
              {dragOverIndex === selectedChars.length && (
                <div className="w-1 h-12 bg-blue-400 rounded-sm animate-pulse" />
              )}
              <div
                className="w-6 h-12"
                onDragOver={(e) => {
                  e.stopPropagation();
                  handleDragOver(e, selectedChars.length);
                }}
                onDrop={(e) => {
                  e.stopPropagation();
                  handleDrop(e, selectedChars.length);
                }}
                onDragLeave={handleDragLeave}
              />
            </div>
          </>
        )}
      </div>
    </div>
  )
}