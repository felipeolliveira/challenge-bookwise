import { Plugs } from '@phosphor-icons/react/dist/ssr/Plugs'
import Link from 'next/link'

import { routes } from '@/utils'

import { Button } from '../ui'

export function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <Plugs size={64} className="text-gray-500" />
      <h1 className="mb-3 mt-5 text-2xl text-gray-200">
        Página não encontrada!
      </h1>
      <Link href={routes.home}>
        <Button color="purple">Voltar ao início</Button>
      </Link>
    </div>
  )
}
