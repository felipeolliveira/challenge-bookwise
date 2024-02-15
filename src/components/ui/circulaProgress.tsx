import { IconProps } from '@phosphor-icons/react'
import { CircleNotch } from '@phosphor-icons/react/dist/ssr/CircleNotch'
import { tv } from 'tailwind-variants'

type CircularProgressProps = IconProps

const styles = tv({
  base: 'animate-spin',
})

export function CircularProgress({
  className,
  size = 32,
  ...props
}: CircularProgressProps) {
  return (
    <CircleNotch className={styles({ className })} size={size} {...props} />
  )
}
