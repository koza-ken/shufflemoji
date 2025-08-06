import { useState, useEffect } from 'react';
import { Header } from '../components/game/Header';
import { Hint } from '../components/game/Hint';
import { getRandomHtmlCssTerm } from '../data/htmlCssTerms';
import { GameWord } from '../types/word';

export const GamePage = () => {
  // 現在の問題の単語データ
  const [currentWord, setCurrentWord] = useState<GameWord | null>(null);
  // 問題番号
  const [questionCount, setQuestionCount] = useState(1);

  // 回答機能のstate
  const [allChars, setAllChars] = useState<{ char: string; id: string; isSelected: boolean }[]>([]);
  const [selectedChars, setSelectedChars] = useState<{ char: string; id: string }[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState('');

  // ゲーム開始時に最初の問題を生成
  useEffect(() => {
    const word = getRandomHtmlCssTerm();
    setCurrentWord(word);

    // 全文字を初期化（各文字にユニークIDと選択状態を付与）
    const chars = word.scrambled.split('').map((char, index) => ({
      char,
      id: `${word.id}-${index}`,
      isSelected: false
    }));
    setAllChars(chars);
    setSelectedChars([]);
    setCurrentAnswer('');
  }, []);  //第2引数が空配列＝初回ゲーム開始時にセット

  // 文字カードクリック処理
  const handleCharClick = (clickedChar: { char: string; id: string; isSelected: boolean }) => {
    // 既に選択済みの文字はクリックできない
    if (clickedChar.isSelected) return;

    // 文字の選択状態を更新
    setAllChars(prev =>
      prev.map(char =>
        char.id === clickedChar.id
          ? { ...char, isSelected: true }
          : char
      )
    );

    // 選択済み文字に追加
    setSelectedChars(prev => [...prev, { char: clickedChar.char, id: clickedChar.id }]);
    // 現在の回答を更新
    setCurrentAnswer(prev => prev + clickedChar.char);
  };

  // リセット処理
  const handleReset = () => {
    if (!currentWord) return;

    // 全文字の選択状態をリセット
    setAllChars(prev => 
      prev.map(char => ({ ...char, isSelected: false }))
    );
    setSelectedChars([]);
    setCurrentAnswer('');
  };

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

          {/* 利用可能な文字を表示（固定位置） */}
          <div className="flex justify-center gap-2 mb-6">
            {allChars.map((charObj) => (
              <div
                key={charObj.id}
                onClick={() => handleCharClick(charObj)}
                className={`w-12 h-12 border-2 rounded-lg flex items-center justify-center text-xl font-bold transition-colors ${
                  charObj.isSelected
                    ? 'bg-gray-200 border-gray-300 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-100 border-blue-300 text-blue-800 cursor-pointer hover:bg-blue-200'
                }`}
              >
                {charObj.char}
              </div>
            ))}
          </div>

          {/* 回答欄 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3 text-center">回答</h3>
            <div className="flex justify-center gap-2 min-h-[3rem] p-3 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
              {selectedChars.length === 0 ? (
                <p className="text-gray-400 self-center">文字をクリックして回答を作成してください</p>
              ) : (
                selectedChars.map((charObj) => (
                  <div
                    key={charObj.id}
                    className="w-12 h-12 bg-green-100 border-2 border-green-300 rounded-lg flex items-center justify-center text-xl font-bold text-green-800"
                  >
                    {charObj.char}
                  </div>
                ))
              )}
            </div>

            {/* 現在の回答文字列表示 */}
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">
                現在の回答: <span className="font-bold text-lg">{currentAnswer || '（未入力）'}</span>
              </p>
            </div>
          </div>

          {/* リセットボタン */}
          <div className="text-center mb-4">
            <button
              onClick={handleReset}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg"
            >
              リセット
            </button>
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
