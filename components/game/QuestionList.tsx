import React, { useState } from 'react';
import { GameWord } from '@/types/word';

type QuestionListProps = {
  questions: GameWord[];
  incorrectWord?: { word: string; userAnswer: string; category?: string; hint?: string } | null;
}

export const QuestionList = ({ questions, incorrectWord }: QuestionListProps) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  // 総問題数を計算（正解 + 間違い）
  const totalQuestions = questions.length + (incorrectWord ? 1 : 0);

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 mt-4">
      {/* トグルボタン付きヘッダー */}
      <div className="flex items-center justify-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900 mr-4">
          解答した問題（全{totalQuestions}問）
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
          {totalQuestions > 0 ? (
            <div className="space-y-3">
              {(() => {
                // 全問題を統合した配列を作成
                const allQuestions = [
                  ...questions.map(q => ({
                    ...q,
                    isCorrect: true,
                    userAnswer: undefined
                  })),
                  ...(incorrectWord ? [{
                    id: 'incorrect',
                    original: incorrectWord.word,
                    category: incorrectWord.category,
                    hint: incorrectWord.hint,
                    isCorrect: false,
                    userAnswer: incorrectWord.userAnswer,
                    mode: questions[0]?.mode || 'html-css', // フォールバック
                    scrambled: '' // 不要だが型のため
                  }] : [])
                ];

                return allQuestions.map((question, index) => {
                  const isCorrect = question.isCorrect;
                  const borderColor = isCorrect ? 'border-gray-200' : 'border-red-300';
                  const hoverColor = isCorrect ? 'hover:bg-gray-100' : '';
                  const numberBgColor = isCorrect ? 'bg-blue-500' : 'bg-red-500';
                  const statusBadge = isCorrect
                    ? { bg: 'bg-green-100', text: 'text-green-800', label: '✓ 正解' }
                    : { bg: 'bg-red-100', text: 'text-red-800', label: '✗ 不正解' };

                  return (
                    <div
                      key={question.id}
                      className={`flex items-center justify-between p-4 bg-gray-50 rounded-lg border ${borderColor} ${hoverColor} transition-colors`}
                    >
                      <div className="flex items-center space-x-4">
                        {/* 問題番号 */}
                        <span className={`flex items-center justify-center w-8 h-8 ${numberBgColor} text-white rounded-full text-sm font-bold`}>
                          {index + 1}
                        </span>

                        {/* 問題内容 */}
                        <div className="flex flex-col">
                          <div className="flex gap-2 items-center">
                            <div className="text-lg font-semibold text-gray-900">
                              {question.original}
                            </div>
                            {question.category && (
                              <div className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                {question.category}
                              </div>
                            )}
                            {/* 正解/不正解マーク */}
                            <div className={`px-2 py-1 ${statusBadge.bg} ${statusBadge.text} rounded-full text-xs font-medium`}>
                              {statusBadge.label}
                            </div>
                            {/* ユーザー回答（不正解の場合のみ） */}
                            {!isCorrect && question.userAnswer && (
                              <span className="text-sm text-red-600">
                                あなたの回答: {question.userAnswer}
                              </span>
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
                  );
                });
                // 定義したアロー関数（）をすぐに実行している（即時実行関数）
              })()}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">解答した問題はありません。</p>
            </div>
          )}
        </div>
      )}

      {/* 閉じている時の簡易表示 */}
      {!isVisible && totalQuestions > 0 && (
        <div className="text-center py-4">
          <p className="text-gray-500">トグルボタンを押すと解答した問題の詳細が見れます</p>
        </div>
      )}
    </div>
  );
};
