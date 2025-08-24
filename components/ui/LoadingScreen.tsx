import ShamojiSpinner from './ShamojiSpinner'

interface LoadingScreenProps {
  message?: string
  fullScreen?: boolean
}

export default function LoadingScreen({
  message = 'Now Loading...',
  fullScreen = true
}: LoadingScreenProps) {
  const containerClasses = fullScreen
    ? 'min-h-screen bg-gray-50 px-4 py-6 flex items-center justify-center'
    : 'py-8'

  return (
    <div className={containerClasses}>
      <div className="w-full max-w-4xl mx-auto">
        <div className="text-center">
          {/* 流れるローディングアニメーション */}
          <div className="overflow-hidden w-full max-w-2xl mx-auto relative h-20">
            <div className="animate-slide-continuous flex items-center gap-24 whitespace-nowrap absolute">

              {/* セットを6個作成して継続的に流れるように */}
              {Array.from({ length: 6 }, (_, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="flex items-center gap-12">
                    <ShamojiSpinner size="lg" className="" />
                    <ShamojiSpinner size="lg" className="" />
                    <ShamojiSpinner size="lg" className="" />
                  </div>
                  <span className="text-md font-medium text-gray-700 whitespace-nowrap" style={{letterSpacing: '0.8em'}}>
                    {message}
                  </span>
                </div>
              ))}

            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
