import React, { useState, useEffect } from 'react';
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
  
  // ドラッグ&ドロップのstate
  // どの文字がドラッグされているか
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  // ドロップ予定の位置を視覚的に表示
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  
  // ゲーム進行のstate
  const [isAnswered, setIsAnswered] = useState(false);  // 回答済みかどうか
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);  // 正解・不正解・未判定
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);  // 未選択警告表示

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
    setIsAnswered(false);
    setIsCorrect(null);
    setShowIncompleteWarning(false);
    setDraggedIndex(null);
    setDragOverIndex(null);
  }, []);  //第2引数が空配列＝初回ゲーム開始時にセット

  // 正誤判定処理
  const handleCheckAnswer = () => {
    if (!currentWord || currentAnswer === '') return;
    
    // 全ての文字が選択されているかチェック
    const allSelected = allChars.every(char => char.isSelected);
    if (!allSelected) {
      setShowIncompleteWarning(true);
      return;
    }
    
    // 警告を非表示にして判定実行
    setShowIncompleteWarning(false);
    const correct = currentAnswer === currentWord.original;
    setIsCorrect(correct);
    setIsAnswered(true);
  };
  
  // 次の問題への遷移
  const handleNextQuestion = () => {
    const word = getRandomHtmlCssTerm();
    setCurrentWord(word);
    
    // 新しい問題の文字を初期化
    const chars = word.scrambled.split('').map((char, index) => ({
      char,
      id: `${word.id}-${index}`,
      isSelected: false
    }));
    setAllChars(chars);
    setSelectedChars([]);
    setCurrentAnswer('');
    setIsAnswered(false);
    setIsCorrect(null);
    setShowIncompleteWarning(false);
    setDraggedIndex(null);
    setDragOverIndex(null);
    setQuestionCount(prev => prev + 1);
  };

  // 文字カードクリック処理
  const handleCharClick = (clickedChar: { char: string; id: string; isSelected: boolean }) => {
    // 既に選択済みの文字または回答済みの場合はクリックできない
    if (clickedChar.isSelected || isAnswered) return;
    
    // 文字を選択した時に警告を非表示
    if (showIncompleteWarning) {
      setShowIncompleteWarning(false);
    }

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

  // ドラッグ開始処理
  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (isAnswered) {
      e.preventDefault();
      return;
    }
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  // ドラッグオーバー処理
  const handleDragOver = (e: React.DragEvent, index?: number) => {
    if (isAnswered) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (index !== undefined && index !== draggedIndex) {
      setDragOverIndex(index);
    }
  };

  // ドラッグリーブ処理
  const handleDragLeave = (e: React.DragEvent) => {
    if (isAnswered) return;
    // タイマーで遅延させてリセット
    setTimeout(() => {
      setDragOverIndex(null);
    }, 100);
  };

  // ドロップ処理
  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    if (isAnswered) return;
    e.preventDefault();
    
    const dragIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (isNaN(dragIndex)) {
      setDraggedIndex(null);
      setDragOverIndex(null);
      return;
    }

    // 選択済み文字配列を並び替え
    const newSelectedChars = [...selectedChars];
    const draggedChar = newSelectedChars[dragIndex];
    
    // 元の位置から削除
    newSelectedChars.splice(dragIndex, 1);
    
    // 新しい位置に挿入
    let insertIndex = dropIndex;
    if (dropIndex > dragIndex) {
      insertIndex = dropIndex - 1;
    }
    if (insertIndex >= newSelectedChars.length) {
      insertIndex = newSelectedChars.length;
    }
    
    newSelectedChars.splice(insertIndex, 0, draggedChar);
    
    setSelectedChars(newSelectedChars);
    
    // 現在の回答文字列を更新
    setCurrentAnswer(newSelectedChars.map(char => char.char).join(''));
    
    setDraggedIndex(null);
    setDragOverIndex(null);
  };


  // ドラッグ終了処理
  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
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
    setIsAnswered(false);
    setIsCorrect(null);
    setShowIncompleteWarning(false);
    setDraggedIndex(null);
    setDragOverIndex(null);
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
      <div className="max-w-2xl mx-auto px-4 py-4">
        {/* ヒント表示 */}
        <Hint word={currentWord} />

        {/* バラバラの文字表示エリア */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            <p>文字を並び替えて</p>
            <p>正しい単語を作ってください</p>
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

            {/* 現在の回答文字列表示 */}
            <div className="mt-3 text-center">
              <p className="text-sm text-gray-600">
                現在の回答: <span className="font-bold text-lg">{currentAnswer || '（未入力）'}</span>
              </p>
            </div>
            
            
            {/* 判定結果表示 */}
            {isAnswered && (
              <div className="mt-4 text-center">
                {isCorrect ? (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                    <span className="text-2xl font-bold">🎉 正解！</span>
                    <p className="mt-1">素晴らしいです！正解は「{currentWord.original}」でした。</p>
                  </div>
                ) : (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <span className="text-2xl font-bold">❌ 不正解</span>
                    <p className="mt-1">残念！正解は「{currentWord.original}」でした。</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* リセットボタン */}
          {!isAnswered && (
            <div className="text-center mb-4">
              <button
                onClick={handleReset}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                リセット
              </button>
            </div>
          )}
        </div>

        {/* 操作ボタン */}
        <div className="text-center">
          {/* 未完了警告表示（ボタンの直前） */}
          {showIncompleteWarning && (
            <div className="mb-3">
              <p className="text-red-600 text-sm font-medium">文字をすべて選択してください</p>
            </div>
          )}
          
          {!isAnswered ? (
            <button 
              onClick={handleCheckAnswer}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg"
            >
              答えを確認
            </button>
          ) : isCorrect ? (
            <button 
              onClick={handleNextQuestion}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg"
            >
              次の問題
            </button>
          ) : (
            <button 
              onClick={handleReset}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg"
            >
              もう一度挑戦
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
