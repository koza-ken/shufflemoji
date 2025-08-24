// import React from 'react';
import { AllChars } from '@/types/word';

export type RubyQuestionProps = {
  allChars: AllChars[];
  handleCharClick: (charObj: AllChars) => void;
}

export const RubyQuestion = ({ allChars, handleCharClick }: RubyQuestionProps) => {

  return (
    <>
      <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        <p>文字を順番に選択して</p>
        <p>Rubyの用語を作ってください</p>
      </h2>

      {/* 利用可能な文字を表示（固定位置） */}
      <div className="flex justify-center gap-2 mb-4">
        {allChars.map((charObj) => (
          <div
            key={charObj.id}
            onClick={() => handleCharClick(charObj)}
            className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-xl font-bold transition-colors ${
              charObj.isSelected
                ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                : 'bg-red-100 border-red-300 text-red-800 cursor-pointer hover:bg-red-200'
            }`}
          >
            {charObj.char}
          </div>
        ))}
      </div>
    </>
  )
}
