import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const styles = tv({
  base: ' w-full bg-transparent text-sm text-gray-200 outline-none placeholder:text-gray-400 ',
})

type StyleProps = VariantProps<typeof styles>

export type InputControlProps = ComponentPropsWithoutRef<'input'> & StyleProps

const InputControlFunction = (
  props: InputControlProps,
  ref: ForwardedRef<HTMLInputElement>,
) => {
  const { className, ...rest } = props
  return <input {...rest} className={styles({ className })} ref={ref} />
}

export const InputControl = forwardRef(InputControlFunction)
InputControl.displayName = 'InputControl'
