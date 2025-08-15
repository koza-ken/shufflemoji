import Link from 'next/link'

type GamePageProps = {
  params: {
    mode: string
  }
}

export default function GamePage({ params }: GamePageProps) {
  const { mode } = params

  // モードの検証
  if (mode !== 'html-css' && mode !== 'ruby') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">無効なゲームモード</h1>
          <p className="text-gray-600 mb-4">有効なモード: html-css, ruby</p>
          <Link href="/" className="text-blue-600 hover:text-blue-800 underline">
            トップページに戻る
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {mode === 'html-css' ? 'HTML/CSS' : 'Ruby'} モード
            </h1>
            <p className="text-gray-600">
              {mode === 'html-css' 
                ? 'HTML要素とCSSプロパティの並び替えゲーム' 
                : 'Rubyメソッドの並び替えゲーム'
              }
            </p>
          </div>

          {/* 仮のゲーム画面 */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-4">ゲーム画面（実装中）</h2>
              <p className="text-gray-600 mb-4">
                モード: <span className="font-semibold">{mode}</span>
              </p>
              <div className="space-y-4">
                <div className="p-4 bg-gray-100 rounded">
                  <p>ここにゲームコンポーネントが配置されます</p>
                </div>
                <Link 
                  href="/" 
                  className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  トップページに戻る
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}