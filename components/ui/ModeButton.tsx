'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ShamojiSpinner from './ShamojiSpinner'

interface ModeButtonProps {
  mode: 'html-css' | 'ruby' | 'fe'
  title: string
  bgColor: string
  hoverColor: string
}

export default function ModeButton({ mode, title, bgColor, hoverColor }: ModeButtonProps) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleClick = () => {
    setLoading(true)
    router.push(`/game/${mode}`)
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`w-40 ${bgColor} ${!loading && hoverColor} text-white font-bold py-2 px-4 rounded transition-colors flex items-center justify-center min-h-[40px] ${loading ? 'cursor-not-allowed' : ''}`}
    >
      {loading ? (
        <ShamojiSpinner size="sm" className="text-white" />
      ) : (
        title
      )}
    </button>
  )
}
