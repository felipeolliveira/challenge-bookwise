import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const styles = tv({
  base: [
    'rounded-full border border-purple-100 bg-transparent px-4 py-1 text-purple-100',
    'focus-button transition-all',
  ],
  variants: {
    selected: {
      true: ['border-purple-200 bg-purple-200 text-gray-100'],
      false: ['hover:border-gray-100 hover:bg-purple-200 hover:text-gray-100'],
    },
  },
  defaultVariants: {
    selected: false,
  },
})

export type TagProps = ComponentPropsWithoutRef<'button'> & {
  children?: ReactNode
} & VariantProps<typeof styles>

export function Tag({ children, className, selected, ...props }: TagProps) {
  return (
    <button
      {...props}
      className={styles({ className, selected })}
      disabled={selected}
    >
      {children}
    </button>
  )
}
