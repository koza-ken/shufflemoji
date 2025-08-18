type GamePageProps = {
  params: Promise<{
    mode: string
  }>
}

export default async function GamePage({ params }: GamePageProps) {
  const { mode } = await params

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold text-center">
          ゲームページ: {mode}
        </h1>
        <p className="text-center mt-4">
          基本動作テスト
        </p>
      </div>
    </div>
  )
}
