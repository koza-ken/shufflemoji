import React from 'react';
import { useCharacter } from '@/contexts/CharacterContext';
import { GameMode } from '@/types/word';

type QuestionAreaProps = {
  mode: GameMode;
};

type GameConfig = {
  title: string;
  colors: string;
  subtitle?: string;
};

const GAME_CONFIG: Record<GameMode, GameConfig> = {
  'html-css': {
    title: 'HTML/CSSの用語を作ってください',
    colors: 'bg-blue-100 border-blue-300 text-blue-800 cursor-pointer hover:bg-blue-200'
  },
  'ruby': {
    title: 'Rubyの用語を作ってください',
    colors: 'bg-red-100 border-red-300 text-red-800 cursor-pointer hover:bg-red-200'
  },
  'fe': {
    title: '基本情報技術者試験の用語を作ってください',
    subtitle: '※シラバス Ver.9.1準拠',
    colors: 'bg-green-100 border-green-300 text-green-800 cursor-pointer hover:bg-green-200'
  }
};

export const QuestionArea = ({ mode }: QuestionAreaProps) => {
  const { allChars, handleCharClick } = useCharacter();
  const config = GAME_CONFIG[mode];

  return (
    <>
      <h2 className="text-md sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-4 text-center">
        <p>文字を順番に選択して</p>
        <p>{config.title}</p>
        {config.subtitle && (
          <p className="text-xs text-gray-600 mt-2 text-right">
            {config.subtitle}
          </p>
        )}
      </h2>

      {/* 利用可能な文字を表示（固定位置） */}
      <div className="flex justify-center gap-1 sm:gap-2 mb-4 sm:px-2">
        {allChars.map(charObj => (
          <div
            key={charObj.id}
            onClick={() => handleCharClick(charObj)}
            className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-3xl font-bold transition-colors ${
              charObj.isSelected
                ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                : config.colors
            }`}
          >
            {charObj.char}
          </div>
        ))}
      </div>
    </>
  );
};