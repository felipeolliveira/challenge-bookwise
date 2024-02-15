import { ComponentPropsWithoutRef, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const styles = tv({
  base: [
    'flex items-center gap-2 rounded px-5 py-[.875rem]',
    'border-2 border-gray-500 text-gray-500',
    'focus-within:border-green-300 focus-within:text-green-300',
  ],
})

type StyleProps = VariantProps<typeof styles>

export type InputRootProps = ComponentPropsWithoutRef<'label'> & {
  children?: ReactNode
} & StyleProps

export function InputRoot({ children, className, ...props }: InputRootProps) {
  return (
    <label {...props} className={styles({ className })}>
      {children}
    </label>
  )
}
