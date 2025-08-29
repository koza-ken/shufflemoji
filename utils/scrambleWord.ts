/**
 * 単語をランダムにシャッフルする共通ユーティリティ関数
 * 元の単語と同じ並びになった場合は再シャッフルを行う
 */
export const scrambleWord = (word: string): string => {
  // 2文字以下の場合は元の単語をそのまま返す（シャッフルの意味がない）
  if (word.length <= 2) {
    return word;
  }

  let scrambled: string;
  let attempts = 0;
  const maxAttempts = 20; // 無限ループ防止

  do {
    const letters = word.split('');

    // Fisher-Yates shuffle algorithm
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }

    scrambled = letters.join('');
    attempts++;

    // 最大試行回数に達した場合、強制的に異なる並びを作成
    if (attempts >= maxAttempts && scrambled === word) {
      // 最初の2文字を入れ替える
      const letters = word.split('');
      [letters[0], letters[1]] = [letters[1], letters[0]];
      scrambled = letters.join('');
      break;
    }
  } while (scrambled === word && attempts < maxAttempts);

  return scrambled;
};