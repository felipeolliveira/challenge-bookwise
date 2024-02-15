import { IconProps } from '@phosphor-icons/react'
import { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

export const styles = tv({
  slots: {
    icon: ['h-6 w-6'],
    item: [
      'flex items-center gap-3 py-2',
      'text-gray-400 hover:text-gray-100',
      'relative before:absolute before:-left-4 before:top-1/2 before:-translate-x-full before:-translate-y-1/2',
      'before:h-6 before:w-1 before:rounded-full before:bg-gradient-vertical before:opacity-0',
      'transition-all before:transition-all',
    ],
  },
  variants: {
    selected: {
      true: {
        item: ['font-bold text-gray-100 before:opacity-100'],
      },
      false: {
        item: ['cursor-pointer'],
      },
    },
  },
})

type StyleProps = VariantProps<typeof styles>

export type NavigationItemProps = ComponentPropsWithoutRef<'li'> & {
  children?: ReactNode
  icon?: ElementType<IconProps>
} & StyleProps

export function NavigationItem({
  children,
  className,
  selected,
  icon: Icon,
  ...props
}: NavigationItemProps) {
  const { item, icon } = styles({
    className,
    selected,
  })
  return (
    <li {...props} className={item()}>
      {Icon && <Icon className={icon()} weight="bold" />}
      {children}
    </li>
  )
}
