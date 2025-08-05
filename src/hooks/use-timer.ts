import { useEffect, useState } from 'react';

// タイマーフックを定義
export const useTimer = () => {
  // 状態管理（残り時間がtimeで取得できる）
  const [time, setTime] = useState(10);

  // timeが変更されるたびに実行される
  useEffect(() => {
    // 0秒以下になったら処理終了（タイマー停止）
    if (time <= 0) return;

    // 1秒ごとに減らしていくsetInterval関数id
    const id = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    // クリーンアップ関数（コンポーネントの削除と合わせてsetIntervalをストップ）
    return () => clearInterval(id);
  // 第2引数を空配列にすることで、毎回setIntervalが作成されなくなる
  }, []);

  return { time };
};