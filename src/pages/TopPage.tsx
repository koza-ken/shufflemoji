import { useState } from 'react';
import { Link } from 'react-router-dom';

export const TopPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            シャッフルもじ
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            単語の並び替えをするゲームです
          </p>
          
          <div className="space-y-4">
            <button
              onClick={openModal}
              className="w-40 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded block mx-auto"
            >
              遊び方
            </button>
            
            <Link
              to="/game"
              className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto"
            >
              ゲームを開始
            </Link>
          </div>
        </div>
      </div>

      {/* ゲーム説明モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-500/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg px-8 py-4 max-w-2xl mx-4 max-h-150 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">遊び方</h2>
              <button
                onClick={closeModal}
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
                <h3 className="text-xl font-semibold text-gray-800 mb-2">⏰ ルール</h3>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>問題の制限時間は10秒です</li>
                  <li>正解すると次の問題に進めます</li>
                  <li>間違えるか時間切れになるとゲーム終了です</li>
                  <li>連続正解数がスコアになります</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">🎮 操作方法</h3>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li><strong>クリック選択:</strong> 文字をクリックして順番に選択</li>
                  <li><strong>ドラッグ&ドロップ:</strong> 選択して回答欄にある文字を並び替え</li>
                  <li><strong>リセットボタン:</strong> 選択した文字をクリア</li>
                  <li><strong>答えを確認ボタン:</strong> 回答を送信</li>
                </ul>
              </div>
{/* 
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">💡 コツ</h3>
                <ul className="text-gray-600 space-y-2 list-disc list-inside">
                  <li>ヒントを活用して単語の意味を推測しましょう</li>
                  <li>文字数を確認して効率的に並び替えましょう</li>
                </ul>
              </div> */}

              <div className="pt-4 border-t">
                <p className="text-center text-gray-500 text-sm">
                  頑張って高スコアを目指そう！
                </p>
              </div>
            </div>

            <div className="text-center mt-6">
              <button
                onClick={closeModal}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                閉じる
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};