import Image from 'next/image'

interface ShamojiSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function ShamojiSpinner({ size = 'md', className = '' }: ShamojiSpinnerProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8', 
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizeClasses[size]} ${className} animate-spin`}>
      <Image
        src="/shamoji.png"
        alt="Loading..."
        width={size === 'lg' ? 48 : size === 'md' ? 32 : 24}
        height={size === 'lg' ? 48 : size === 'md' ? 32 : 24}
        className="w-full h-full"
      />
    </div>
  )
}