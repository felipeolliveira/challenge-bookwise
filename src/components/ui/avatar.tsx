import Image from 'next/image'

type AvatarProps = {
  src?: string
  title: string
  size?: 'md' | 'sm' | 'lg' | 'xl'
}

export function Avatar({ size, src, title }: AvatarProps) {
  const stroke = 1
  const sizes = {
    xl: 72,
    lg: 54,
    md: 40,
    sm: 32,
  }[size || 'md']

  function getInitials() {
    const words = title.split(' ')
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase()
    } else {
      return (words[0][0] + words[1][0]).toUpperCase()
    }
  }

  return (
    <span
      style={{
        width: sizes,
        height: sizes,
      }}
      className="grid place-items-center rounded-full bg-gradient-vertical"
    >
      {!src && (
        <span
          style={{
            width: sizes - stroke * 2,
            height: sizes - stroke * 2,
          }}
          className="grid place-items-center rounded-full bg-purple-200/80"
        >
          {getInitials()}
        </span>
      )}
      {src && (
        <Image
          src={src}
          alt={title}
          width={sizes - stroke * 2}
          height={sizes - stroke * 2}
          className="aspect-square rounded-full bg-gray-300 object-cover object-center"
        />
      )}
    </span>
  )
}
