import { ComponentPropsWithoutRef } from 'react'
import { tv } from 'tailwind-variants'

type SocialSignInButtonProps = ComponentPropsWithoutRef<'button'>

const styles = tv({
  base: [
    'flex w-full items-center gap-5 rounded bg-gray-600 px-6 py-5',
    ' text-lg font-bold text-gray-200',
    'disabled:opacity-50',
    'transition-all [&:not(&:disabled)]:hover:bg-gray-700',
  ],
})

export function SocialSignInButton({
  children,
  ...props
}: SocialSignInButtonProps) {
  return (
    <button {...props} className={styles()}>
      {children}
    </button>
  )
}
