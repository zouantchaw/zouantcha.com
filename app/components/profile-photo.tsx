import Image from 'next/image'

type ProfilePhotoProps = {
  size?: number
  className?: string
  priority?: boolean
  shape?: 'circle' | 'square'
}

export function ProfilePhoto({
  size = 72,
  className = '',
  priority = false,
  shape = 'circle',
}: ProfilePhotoProps) {
  const frame =
    shape === 'square'
      ? 'aspect-square w-full object-cover object-[center_20%]'
      : 'rounded-full object-cover ring-1 ring-black/10'

  return (
    <Image
      src="/images/wiel.jpg"
      alt="Wiel Zouantcha"
      width={size}
      height={size}
      priority={priority}
      className={`${frame} ${className}`}
    />
  )
}
