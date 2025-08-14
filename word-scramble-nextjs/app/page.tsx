import Link from 'next/link'

export default function TopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              シャッフルもじ
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              プログラミング用語の並び替えゲームです
            </p>
            
            <div className="space-y-4">
              <div className="mt-10">
                <p className="text-2xl font-bold">ゲーム開始</p>
                <div className="flex justify-center gap-4 mt-4">
                  <Link
                    href="/game/html-css"
                    className="w-40 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    HTML/CSS
                  </Link>
                  <Link
                    href="/game/ruby"
                    className="w-40 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Ruby
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
