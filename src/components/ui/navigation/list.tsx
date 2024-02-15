import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const styles = tv({
  base: 'flex flex-col items-start gap-4',
})

type StyleProps = VariantProps<typeof styles>

export type NavigationListProps = ComponentPropsWithoutRef<'ul'> & {
  children?: ReactNode
} & StyleProps

export function NavigationList({
  children,
  className,
  ...props
}: NavigationListProps) {
  return (
    <ul {...props} className={styles({ className })}>
      {children}
    </ul>
  )
}
