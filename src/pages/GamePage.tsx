import { useState, useEffect } from 'react';
import { Header } from '../components/game/Header';
import { Hint } from '../components/game/Hint';
import { getRandomHtmlCssTerm } from '../data/htmlCssTerms';
import { GameWord } from '../types/word';

export const GamePage = () => {
  const [currentWord, setCurrentWord] = useState<GameWord | null>(null);
  const [questionCount, setQuestionCount] = useState(1);

  // ゲーム開始時に最初の問題を生成
  useEffect(() => {
    const word = getRandomHtmlCssTerm();
    setCurrentWord(word);
  }, []);  //第2引数が空配列＝初回ゲーム開始時にセット

  // 問題が読み込まれていない場合のローディング表示
  if (!currentWord) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">問題を読み込み中...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ヘッダー（問題数・タイマー） */}
      <Header count={questionCount} />

      {/* メインゲーム画面 */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* ヒント表示 */}
        <Hint word={currentWord} />

        {/* バラバラの文字表示エリア */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            文字を並び替えて正しい単語を作ってください
          </h2>

          {/* シャッフルされた文字を表示 */}
          <div className="flex justify-center gap-2 mb-6">
            {currentWord.scrambled.split('').map((char, index) => (
              <div
                key={index}
                className="w-12 h-12 bg-blue-100 border-2 border-blue-300 rounded-lg flex items-center justify-center text-xl font-bold text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors"
              >
                {char}
              </div>
            ))}
          </div>

          {/* 解答入力エリア（将来実装） */}
          <div className="text-center">
            <p className="text-gray-500 text-sm">
              正解: {currentWord.original} (開発中のため表示)
            </p>
          </div>
        </div>

        {/* 操作ボタン（将来実装） */}
        <div className="text-center">
          <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg mr-4">
            答えを確認
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg">
            次の問題
          </button>
        </div>
      </div>
    </div>
  );
};
