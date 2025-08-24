// import React from 'react';
import { AllChars } from '@/types/word';

export type HTMLCSSQuestionProps = {
  allChars: AllChars[];
  handleCharClick: (charObj: AllChars) => void;
}

export const HTMLCSSQuestion = ({ allChars, handleCharClick }: HTMLCSSQuestionProps) => {

  return (
    <>
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 text-center">
        <p>文字を順番に選択して</p>
        <p>HTML/CSSの用語を作ってください</p>
      </h2>

      {/* 利用可能な文字を表示（レスポンシブ対応） */}
      <div className="flex justify-center gap-1 sm:gap-2 mb-4 flex-wrap px-2">
        {allChars.map((charObj: AllChars) => (
          <div
            key={charObj.id}
            onClick={() => handleCharClick(charObj)}
            className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-lg sm:text-xl font-bold transition-colors ${
              charObj.isSelected
                ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                : 'bg-blue-100 border-blue-300 text-blue-800 cursor-pointer hover:bg-blue-200'
            }`}
          >
            {charObj.char}
          </div>
        ))}
      </div>
    </>
  )
}
