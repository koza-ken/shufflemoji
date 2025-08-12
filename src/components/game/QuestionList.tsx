import React, { useState } from 'react';
import { GameWord } from '../../types/word';

type QuestionListProps = {
  questions: GameWord[];
}

export const QuestionList = ({ questions }: QuestionListProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-4">
      {/* トグルボタン付きヘッダー */}
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 mr-4">
          解答した問題（全{questions.length}問）
        </h2>
        <button
          onClick={toggleVisibility}
          className="flex items-center space-x-2 px-2 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
        >

          <svg
            className={`w-4 h-4 transform transition-transform duration-200 ${isVisible ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {/* トグル表示されるコンテンツ */}
      {isVisible && (
        <div className="animate-fadeIn">
          {questions.length > 0 ? (
            <div className="space-y-3">
              {questions.map((question, index) => (
                <div
                  key={question.id} 
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    {/* 問題番号 */}
                    <span className="flex items-center justify-center w-8 h-8 bg-blue-500 text-white rounded-full text-sm font-bold">
                      {index + 1}
                    </span>

                    {/* 問題内容 */}
                    <div className="flex flex-col">
                      <div className="flex gap-2 items-center">
                        <div className="text-lg font-semibold text-gray-800">
                          {question.original}
                        </div>
                        {question.category && (
                          <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                            {question.category}
                          </div>
                        )}
                      </div>
                      {question.hint && (
                        <span className="text-sm text-gray-600 mt-1">
                          💡 {question.hint}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">解答した問題はありません。</p>
            </div>
          )}
        </div>
      )}

      {/* 閉じている時の簡易表示 */}
      {!isVisible && questions.length > 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">トグルボタンを押すと解答した問題の詳細が見れます</p>
        </div>
      )}
    </div>
  );
};