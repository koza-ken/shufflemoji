import { useEffect, useState } from 'react';

export const useTimer = () => {
  const [time, setTime] = useState(15);
  const [isRunning, setIsRunning] = useState(true);

  // タイマーリセット
  const resetTimer = () => {
    setIsRunning(false);
    setTime(15);
    // setTimeout(() => setIsRunning(true), 0);
  };

  // タイマー停止
  const pause = () => setIsRunning(false);

  // タイマー再開
  const resume = () => setIsRunning(true);

  // メインのタイマーロジック
  useEffect(() => {
    if (!isRunning || time <= 0) return;

    const id = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [isRunning, time]);

  return { time, resetTimer, pause, resume };
};