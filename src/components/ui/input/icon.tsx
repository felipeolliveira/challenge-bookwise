import { IconProps } from '@phosphor-icons/react'
import { ComponentPropsWithoutRef, ElementType } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const styles = tv({
  base: 'h-5 w-5',
})

type StyleProps = VariantProps<typeof styles>

export type InputIconProps = ComponentPropsWithoutRef<'svg'> & {
  icon: ElementType<IconProps>
} & StyleProps

export function InputIcon({ icon: Icon, className, ...props }: InputIconProps) {
  return <Icon {...props} className={styles({ className })} weight="bold" />
}
