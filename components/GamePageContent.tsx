'use client'

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/game/Header';
import { Hint } from '@/components/game/Hint';
import { htmlCssTerms } from '@/data/htmlCssTerms';
import { rubyMethods } from '@/data/rubyMethods';
import { feTerms } from '@/data/feTerms';
import { AllChars, GameWord, SelectedChars, GameMode } from '@/types/word';
import { Answer } from '@/components/game/Answer';
import { useTimer } from '@/hooks/use-timer';
// import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HTMLCSSQuestion } from '@/components/game/HTMLCSSQuestion';
import { RubyQuestion } from '@/components/game/RubyQuestion';
import { FEQuestion } from '@/components/game/FEQuestion';
import ConfirmModal from '@/components/ui/ConfirmModal';

type GamePageContentProps = {
  mode: GameMode
}

export const GamePageContent = ({ mode }: GamePageContentProps) => {
  const router = useRouter();

  // ラウンドシステム用の状態
  const [usedWordIds, setUsedWordIds] = useState<Set<string>>(new Set());
  const [currentRound, setCurrentRound] = useState(1);
  const [totalWordsCount, setTotalWordsCount] = useState(0);

  // 確認モーダル用の状態
  const [showConfirm, setShowConfirm] = useState(false);


  // タイマー機能（ラウンドに応じて制限時間を変更）
  const { time, resetTimer, pause, resume } = useTimer(currentRound);
  // 戻るボタン制御（タイマー継続対策）
  useEffect(() => {
    // ブラウザ履歴にエントリを追加
    history.pushState(null, '', location.href);

    const handlePopState = () => {
      // タイマーが0になったら強制的にトップページへ
      if (time <= 0) {
        router.push('/');
        return;
      }

      // 即座に履歴エントリを再追加（アラート表示前）
      history.pushState(null, '', location.href);

      // カスタムモーダルを表示（タイマーは継続）
      setShowConfirm(true);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [router, time]);

  // 確認モーダルのハンドラー
  const handleConfirm = () => {
    setShowConfirm(false);
    router.push('/');
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // 現在の問題の単語データ
  const [currentWord, setCurrentWord] = useState<GameWord | null>(null);
  // 問題番号
  const [questionCount, setQuestionCount] = useState(1);

  // 回答機能のstate
  const [allChars, setAllChars] = useState<AllChars[]>([]);
  const [selectedChars, setSelectedChars] = useState<SelectedChars[]>([]);
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

  // 出題した問題のリスト
  const [questionList, setQuestionList] = useState<GameWord[]>([]);

  // 全問題配列を取得する関数
  const getAllWords = (mode: GameMode) => {
    if (mode === 'html-css') {
      return htmlCssTerms;
    } else if (mode === 'ruby') {
      return rubyMethods;
    } else {
      return feTerms;
    }
  };

  // 問題数を動的取得
  const getTotalWordsCount = (mode: GameMode): number => {
    return getAllWords(mode).length;
  };

  // ラウンドシステム対応の問題取得関数
  const getRandomWord = (): GameWord => {
    const allWords = getAllWords(mode);
    const availableWords = allWords.filter(word => !usedWordIds.has(word.id));

    // 全問題を出題済みの場合、次のラウンドを開始
    if (availableWords.length === 0) {
      const nextRound = currentRound + 1;
      setCurrentRound(nextRound);
      setUsedWordIds(new Set());

      // 全問題から再びランダム選択
      const randomIndex = Math.floor(Math.random() * allWords.length);
      const selectedWord = allWords[randomIndex];
      return {
        ...selectedWord,
        scrambled: selectedWord.original.split('').sort(() => Math.random() - 0.5).join('')
      };
    }

    // 未出題の問題からランダム選択
    const randomIndex = Math.floor(Math.random() * availableWords.length);
    const selectedWord = availableWords[randomIndex];
    return {
      ...selectedWord,
      scrambled: selectedWord.original.split('').sort(() => Math.random() - 0.5).join('')
    };
  };

  // ゲーム開始時に最初の問題を生成
  useEffect(() => {
    // 問題数を設定
    setTotalWordsCount(getTotalWordsCount(mode));
    // ラウンド状態をリセット
    setUsedWordIds(new Set());
    setCurrentRound(1);

    const word = getRandomWord();
    setCurrentWord(word);

    // 最初の問題をusedWordIdsに追加
    setUsedWordIds(new Set([word.id]));

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
  }, [mode]);  // modeが変わった時も再実行

  // 時間切れによる不正解判定
  useEffect(() => {
    if (time <= 0 && !isAnswered) {
      setIsCorrect(false);
      setIsAnswered(true);
    }
  }, [time, isAnswered])

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

    // 正解時のみquestionListに追加
    if (correct) {
      setQuestionList(prev => [...prev, currentWord]);
    }

    pause();
  };

  // 次の問題への遷移
  const handleNextQuestion = () => {
    const word = getRandomWord();
    setCurrentWord(word);

    // 新しい問題をusedWordIdsに追加
    setUsedWordIds(prev => new Set([...prev, word.id]));

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
    resetTimer();
    resume();
  };

  // 文字カードクリック処理
  const handleCharClick = (clickedChar: AllChars) => {
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
  const handleDragLeave = () => {
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

  // 文字削除処理（一つずつ戻す機能）
  const handleRemoveChar = (charId: string) => {
    if (isAnswered) return;

    // 警告を非表示
    if (showIncompleteWarning) {
      setShowIncompleteWarning(false);
    }

    // 選択済み文字から該当文字を削除
    setSelectedChars(prev => prev.filter(char => char.id !== charId));

    // allCharsの選択状態をリセット
    setAllChars(prev =>
      prev.map(char =>
        char.id === charId ? { ...char, isSelected: false } : char
      )
    );

    // 現在の回答を更新
    setCurrentAnswer(prev => {
      const chars = selectedChars.filter(char => char.id !== charId);
      return chars.map(char => char.char).join('');
    });
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

  // ゲーム終了処理
  const handleGameEnd = () => {
    if (!currentWord) return;
    // 結果をセッションストレージで渡す
    const gameResult = {
      count: questionCount - 1,
      questions: questionList,
      mode,
      incorrectWord: {
        word: currentWord.original,
        userAnswer: currentAnswer
      }
    };

    // セッションストレージに保存
    sessionStorage.setItem('gameResult', JSON.stringify(gameResult));

    // 結果ページに遷移
    router.push('/result');
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
    <div className="min-h-screen bg-gray-50 pt-2 sm:pt-4">
      {/* ヘッダー（問題数・タイマー・進捗・ラウンド） */}
      <Header
        count={questionCount}
        time={time}
        progress={`${usedWordIds.size}/${totalWordsCount}`}
        round={currentRound}
      />

      {/* メインゲーム画面 */}
      <div className="w-full max-w-2xl mx-auto px-2 py-2">

        {/* バラバラの文字表示エリア */}
        <div className="bg-white rounded-lg shadow-lg p-2 sm:p-6 mb-6">
          {mode === 'html-css' ? (
            <HTMLCSSQuestion allChars={allChars} handleCharClick={handleCharClick} />
          ) : mode === 'ruby' ? (
            <RubyQuestion allChars={allChars} handleCharClick={handleCharClick} />
          ) : (
            <FEQuestion allChars={allChars} handleCharClick={handleCharClick} />
          )}
          {/* ヒント表示 */}
          <Hint word={currentWord} />

          <Answer
            selectedChars={selectedChars}
            draggedIndex={draggedIndex}
            dragOverIndex={dragOverIndex}
            isAnswered={isAnswered}
            handleDragStart={handleDragStart}
            handleDragEnd={handleDragEnd}
            handleDragOver={handleDragOver}
            handleDragLeave={handleDragLeave}
            handleDrop={handleDrop}
            handleRemoveChar={handleRemoveChar}
          />

            {/* 現在の回答文字列表示 */}
            <div className="mt-2 sm:mt-3 text-center">
              <p className="text-sm text-gray-600">
                現在の回答: <span className="font-bold text-lg">{currentAnswer || '（未入力）'}</span>
              </p>
            </div>

            {/* 判定結果表示 */}
            {isAnswered && (
              <div className="mt-2 sm:mt-4 text-center">
                {isCorrect ? (
                  <div className="border border-green-400 text-green-700 px-4 py-1 sm:py-3 rounded">
                    <span className="text-2xl font-bold block py-3"> 正解！</span>
                    {/* <p className="mt-1">正解は「{currentWord.original}」でした。</p> */}
                  </div>
                ) : (
                  // <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-1 sm:py-3 rounded">
                  <div className=" border border-red-400 text-red-700 px-4 py-1 sm:py-3 rounded">
                    <span className="text-2xl font-bold">不正解！</span>
                    <p className="mt-1">残念！正解は「{currentWord.original}」でした。</p>
                  </div>
                )}
              </div>
            )}

          {/* リセットボタン */}
          {!isAnswered && (
            <div className="text-center mt-3 sm:mt-6">
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
              答えあわせ
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
              onClick={handleGameEnd}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg"
            >
              結果
            </button>
          )}
        </div>
      </div>

      {/* 戻るボタン確認モーダル */}
      <ConfirmModal
        isOpen={showConfirm}
        message="ゲームを終了してトップページに戻りますか？"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};
