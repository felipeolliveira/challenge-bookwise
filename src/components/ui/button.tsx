import { IconProps } from '@phosphor-icons/react'
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const style = tv({
  slots: {
    icon: 'focus-button',
    content:
      'focus-button flex items-center justify-center rounded px-2 py-1 transition-all duration-200',
  },
  variants: {
    size: {
      sm: {
        content: 'gap-2 text-sm',
        icon: 'h-4 w-4',
      },
      md: {
        content: 'gap-3 text-md',
        icon: 'h-5 w-5',
      },
    },
    color: {
      white: {
        content: 'text-gray-100 hover:bg-gray-200/5',
      },
      purple: {
        content: 'text-purple-100 hover:bg-purple-100/5',
      },
    },
  },
  defaultVariants: {
    color: 'white',
    size: 'md',
  },
})

export type ButtonProps = Omit<ComponentPropsWithoutRef<'button'>, 'color'> & {
  children: ReactNode
  icon?: ElementType<IconProps>
  isEndIcon?: boolean
} & VariantProps<typeof style>

export function Button({
  children,
  className,
  icon: Icon,
  isEndIcon = false,
  color,
  size,
  ...rest
}: ButtonProps) {
  const { content, icon } = style({ color, size })

  return (
    <button {...rest} className={content({ className })}>
      {!isEndIcon && Icon && (
        <Icon className={icon({ className })} weight="bold" />
      )}
      {children}
      {isEndIcon && Icon && (
        <Icon className={icon({ className })} weight="bold" />
      )}
    </button>
  )
}
