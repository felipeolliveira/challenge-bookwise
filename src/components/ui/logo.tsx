import Image, { ImageProps } from 'next/image'

type BookWiseLogoProps = Omit<
  ImageProps,
  'src' | 'alt' | 'width' | 'height'
> & {
  /**
   * Default: 128px
   */
  width?: ImageProps['width']
}

export function BookWiseLogo({ width = 128, ...props }: BookWiseLogoProps) {
  const aspectRatio = 128 / 32
  return (
    <Image
      src="/bookwise.svg"
      alt="Logo da BookWise"
      width={width}
      height={Number(width) / aspectRatio}
      {...props}
    />
  )
}
