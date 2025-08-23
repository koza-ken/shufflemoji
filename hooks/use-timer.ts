import { useEffect, useState } from 'react';

export const useTimer = (currentRound = 1) => {
  const getInitialTime = (round: number) => {
    switch (round) {
      case 1: return 15;  // 1回目: 15秒
      case 2: return 10;  // 2回目: 10秒
      case 3: return 7;   // 3回目: 7秒
      case 4: return 5;   // 4回目: 5秒
      default: return 5;  // 5回目以降: 5秒
    }
  };
  
  const [time, setTime] = useState(() => getInitialTime(currentRound));
  const [isRunning, setIsRunning] = useState(true);

  // ラウンドが変わった時に制限時間を更新
  useEffect(() => {
    const newTime = getInitialTime(currentRound);
    setTime(newTime);
  }, [currentRound]);

  // タイマーリセット
  const resetTimer = () => {
    setIsRunning(false);
    setTime(getInitialTime(currentRound));
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