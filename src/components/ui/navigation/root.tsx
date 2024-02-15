import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const styles = tv({})

type StylesProps = VariantProps<typeof styles>

export type NavigationRootProps = ComponentPropsWithoutRef<'nav'> & {
  children?: ReactNode
} & StylesProps

export function NavigationRoot({
  children,
  className,
  ...props
}: NavigationRootProps) {
  return (
    <nav {...props} className={styles({ className })}>
      {children}
    </nav>
  )
}
