import { IconProps } from '@phosphor-icons/react'
import { ComponentPropsWithoutRef, ElementType } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const style = tv({
  slots: {
    icon: [''],
    content: [
      'flex max-w-min items-center rounded p-2',
      ' text-purple-100',
      'focus-button hover:bg-gray-500',
      'transition-all duration-200',
    ],
  },
  variants: {
    size: {
      sm: {
        icon: 'w-5 w-5',
      },
      md: {
        icon: 'w-6 w-6',
      },
    },
    variant: {
      filled: {
        content: 'bg-gray-600',
      },
      text: {
        content: 'bg-transparent',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'filled',
  },
})

export type IconButtonProps = Omit<
  ComponentPropsWithoutRef<'button'>,
  'color'
> & {
  icon: ElementType<IconProps>
} & VariantProps<typeof style>

export function IconButton({
  className,
  icon: Icon,
  size,
  variant,
  ...rest
}: IconButtonProps) {
  const { content, icon } = style({ size, variant })

  return (
    <button {...rest} className={content({ className })}>
      <Icon className={icon()} weight="bold" />
    </button>
  )
}
