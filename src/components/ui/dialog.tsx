'use client'

import { X } from '@phosphor-icons/react/dist/ssr/X'
import * as DialogRadix from '@radix-ui/react-dialog'
import { ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const DialogRoot = DialogRadix.Root
const DialogTrigger = DialogRadix.Trigger
const DialogAction = DialogRadix.Close

const styles = tv({
  slots: {
    overlay: ['fixed bottom-0 left-0 right-0 top-0', 'bg-[#000000]/60'],
    container: ['fixed bottom-0 left-0 right-0 top-0 grid place-items-center'],
    content: ['relative rounded-xl bg-gray-700'],
    close: ['absolute right-4 top-4 text-gray-400'],
  },
  variants: {
    position: {
      center: {},
      left: {},
      right: {
        container: ['fixed bottom-0 left-0 right-0 top-0 grid place-items-end'],
        content: ['relative h-screen rounded-xl bg-gray-700'],
        close: ['absolute right-4 top-4 text-gray-400'],
      },
    },
  },
  defaultVariants: {
    position: 'center',
  },
})

type DialogContentProps = DialogRadix.DialogContentProps & {
  children?: ReactNode
  className?: string
  portal?: DialogRadix.DialogPortalProps
} & VariantProps<typeof styles>

function DialogContent({
  children,
  className,
  position,
  portal,
}: DialogContentProps) {
  const { content, container, overlay, close } = styles({ position })

  return (
    <DialogRadix.Portal {...portal}>
      <DialogRadix.Overlay className={overlay()} />
      <DialogRadix.Content className={container()}>
        <div className={content({ className })}>
          <DialogRadix.Close asChild>
            <button aria-label="Close" className={close()}>
              <X size={24} />
            </button>
          </DialogRadix.Close>
          {children}
        </div>
      </DialogRadix.Content>
    </DialogRadix.Portal>
  )
}

export const Dialog = {
  Root: DialogRoot,
  Trigger: DialogTrigger,
  Action: DialogAction,
  Content: DialogContent,
}
