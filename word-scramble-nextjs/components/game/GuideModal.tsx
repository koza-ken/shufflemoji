type GuideModalProps = {
  isOpen: boolean;
  onClose: () => void;
}

export const GuideModal = ({ isOpen, onClose }: GuideModalProps) => {

  return (
    <>
      {/* ゲーム説明モーダル */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-500/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-8 py-4 max-w-2xl mx-4 max-h-150 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">遊び方</h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="text-left space-y-4">
              <div>
                <p className="text-gray-600">
                  文字を並び替えて、正しい単語を作ろう！
                </p>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  ⏰ ルール
                </h3>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>正解すると次の問題に進めます</li>
                  <li>間違えるか時間切れになるとゲーム終了です</li>
                  <li>連続正解数がスコアになります</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  🎮 操作方法
                </h3>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>
                    <strong>クリック選択:</strong> 文字をクリックして順番に選択
                  </li>
                  <li>
                    <strong>ドラッグ&ドロップ:</strong>{' '}
                    選択して回答欄にある文字を並び替え
                  </li>
                  <li>
                    <strong>リセットボタン:</strong> 選択した文字をクリア
                  </li>
                  <li>
                    <strong>答えを確認ボタン:</strong> 回答を送信
                  </li>
                </ul>
              </div>

              <div className="pt-4 border-t">
                <p className="text-center text-gray-500 text-sm">
                  ログインしなくてもスコアは登録できます
                </p>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={onClose}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
