import { GameWord } from '../../types/word';

/**
 * Hint component props
 *
 * なぜシンプルな型定義？
 * - GameWord型のみ受け取ってヒント表示
 * - 再利用可能で分かりやすい設計
 */
type HintProps = {
  word: GameWord;
};

export const Hint = ({ word }: HintProps) => {
  // ヒントが存在しない場合は表示しない
  if (!word.hint) {
    return null;
  }
  return (
    <div className="bg-white rounded-lg border border-gray-300 p-4 mb-6">
      <div className="flex items-start gap-3">
        {/* ヒントアイコン */}
        {/* <div className="flex-shrink-0 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs font-bold">💡</span>
        </div> */}

        {/* ヒント内容 */}
        <div className="flex-1">
          <h3 className="text-yellow-800 font-semibold text-sm mb-2">ヒント</h3>
          <p className="text-gray-700 text-sm leading-relaxed">{word.hint}</p>

          {/* カテゴリ表示 */}
          {/* {word.category && (
            <div className="mt-3">
              <span className="inline-block bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded-full">
                {word.category === 'HTML' ? 'HTML要素' :
                 word.category === 'CSS' ? 'CSSプロパティ' :
                 word.category}
              </span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
};
