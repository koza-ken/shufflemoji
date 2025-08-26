'use client'

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/game/Header';
import { Hint } from '@/components/game/Hint';
import { GameMode } from '@/types/word';
import { useTimer } from '@/hooks/use-timer';
import { useRouter } from 'next/navigation';
import { HTMLCSSQuestion } from '@/components/game/HTMLCSSQuestion';
import { RubyQuestion } from '@/components/game/RubyQuestion';
import { FEQuestion } from '@/components/game/FEQuestion';
import { Answer } from '@/components/game/Answer';
import ConfirmModal from '@/components/ui/ConfirmModal';
import LoadingScreen from '@/components/ui/LoadingScreen';

// Contexts
import { GameStateProvider, useGameState } from '@/contexts/GameStateContext';
import { DragDropProvider } from '@/contexts/DragDropContext';
import { CharacterProvider, useCharacter } from '@/contexts/CharacterContext';

type GamePageContentProps = {
  mode: GameMode
}

// 内部コンポーネント：ゲームロジックを管理
const GameLogic = () => {
  const router = useRouter();

  // Context hooks
  const {
    currentWord,
    questionCount,
    usedWordIds,
    totalWordsCount,
    currentRound,
    questionList,
    isAnswered,
    isCorrect,
    showIncompleteWarning,
    setIsAnswered,
    setIsCorrect,
    setShowIncompleteWarning,
    setQuestionList,
    handleNextQuestion,
    mode
  } = useGameState();

  const {
    allChars,
    currentAnswer,
    handleReset
  } = useCharacter();

  // 確認モーダル用の状態（ローカル状態として保持）
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
    }

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

  // 時間切れによる不正解判定
  useEffect(() => {
    if (time <= 0 && !isAnswered) {
      setIsCorrect(false);
      setIsAnswered(true);
    }
  }, [time, isAnswered]);

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
    if (correct && currentWord) {
      setQuestionList((prev) => [...prev, currentWord]);
    }

    pause();
  };

  // 次の問題への遷移（Context版）
  const handleNextQuestionWithTimer = () => {
    handleNextQuestion();
    resetTimer();
    resume();
  };

  // ゲーム終了処理（Context版）
  const handleGameEnd = () => {
    // currentAnswerを含めた結果を作成
    if (!currentWord) return

    const gameResult = {
      count: questionCount - 1,
      questions: questionList,
      mode,
      incorrectWord: {
        word: currentWord.original,
        userAnswer: currentAnswer,
        category: currentWord.category,
        hint: currentWord.hint
      }
    };

    sessionStorage.setItem('gameResult', JSON.stringify(gameResult));
    router.push('/result');
  };

  // 問題が読み込まれていない場合のローディング表示
  if (!currentWord) {
    return <LoadingScreen message="問題を準備中..." />;
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
            <HTMLCSSQuestion />
          ) : mode === 'ruby' ? (
            <RubyQuestion />
          ) : (
            <FEQuestion />
          )}
          {/* ヒント表示 */}
          <Hint word={currentWord} />

          <Answer />

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
              onClick={handleNextQuestionWithTimer}
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

// Context値を正しく渡すためのラッパーコンポーネント
const GameLogicWithProviders = () => {
  const { currentWord, isAnswered, showIncompleteWarning, setShowIncompleteWarning } = useGameState()

  return (
    <CharacterProvider
      currentWord={currentWord}
      isAnswered={isAnswered}
      showIncompleteWarning={showIncompleteWarning}
      setShowIncompleteWarning={setShowIncompleteWarning}
    >
      <DragDropProvider isAnswered={isAnswered}>
        <GameLogic />
      </DragDropProvider>
    </CharacterProvider>
  );
};

// メインコンポーネント：Context Providerでラップ
export const GamePageContent = ({ mode }: GamePageContentProps) => {
  return (
    <GameStateProvider mode={mode}>
      <GameLogicWithProviders />
    </GameStateProvider>
  );
};
