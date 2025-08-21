import Link from 'next/link'
import { UserProfile } from '@/components/auth/UserProfile'

export default function TopPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-xl font-bold">シャッフルもじ</h1>
            <UserProfile />
          </div>
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="w-full max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              シャッフルもじ
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              プログラミング用語の並び替えゲームです
            </p>
            
            <div className="space-y-8">
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

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-center gap-4">
                  <Link
                    href="/ranking"
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded"
                  >
                    🏆 ランキング
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
