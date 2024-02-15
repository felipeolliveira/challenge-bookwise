'use client'

import { Binoculars } from '@phosphor-icons/react/dist/ssr/Binoculars'
import { ChartLineUp } from '@phosphor-icons/react/dist/ssr/ChartLineUp'
import { SignIn } from '@phosphor-icons/react/dist/ssr/SignIn'
import { SignOut } from '@phosphor-icons/react/dist/ssr/SignOut'
import { User } from '@phosphor-icons/react/dist/ssr/User'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

import { SignInActions } from '@/components/pages'
import { routes } from '@/utils'

import { Avatar, BookWiseLogo, Button, Dialog, IconButton, Navigation } from '.'

export function Sidebar() {
  const pathname = usePathname()
  const { status, data } = useSession()

  const user = data?.user
  const firstName = user?.name.split(' ')[0] ?? ''

  function isSelectedPathname(route: keyof typeof routes, extend?: string) {
    if (extend) {
      return pathname.includes(`${route}${extend}`)
    }
    return pathname.includes(route)
  }

  async function handleSignOut() {
    await signOut({ callbackUrl: routes.signin })
  }

  return (
    <div
      className="flex h-full flex-col items-center rounded-xl bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(/sidebar-bg.jpg)`,
      }}
    >
      <div className="px-4 py-10">
        <BookWiseLogo />
      </div>
      <div className="w-full flex-1 py-6 pl-[4.25rem] pr-4">
        <Navigation.Root>
          <Navigation.List>
            <Link href={routes.home}>
              <Navigation.Item
                selected={isSelectedPathname('home')}
                icon={ChartLineUp}
              >
                Início
              </Navigation.Item>
            </Link>
            <Link href={routes.explore}>
              <Navigation.Item
                selected={isSelectedPathname('explore')}
                icon={Binoculars}
              >
                Explorar
              </Navigation.Item>
            </Link>
            {status === 'authenticated' && (
              <Link href={`${routes.profile}/${data.user.id}`}>
                <Navigation.Item
                  selected={isSelectedPathname('profile', `/${data.user.id}`)}
                  icon={User}
                >
                  Perfil
                </Navigation.Item>
              </Link>
            )}
          </Navigation.List>
        </Navigation.Root>
      </div>

      <footer className="px-4 py-6">
        {status === 'authenticated' && user && (
          <span className="flex items-center gap-3 font-bold [&_svg]:text-red-500">
            <Avatar size="sm" title={user.name} src={user.avatarUrl} />
            <span>{firstName}</span>
            <IconButton
              size="sm"
              variant="text"
              icon={SignOut}
              onClick={handleSignOut}
            />
          </span>
        )}

        {status === 'unauthenticated' && (
          <Dialog.Root>
            <Dialog.Trigger asChild>
              <Button
                className="font-bold [&_svg]:text-green-100"
                icon={SignIn}
                isEndIcon
              >
                Fazer Login
              </Button>
            </Dialog.Trigger>
            <Dialog.Content className="flex flex-col gap-10 px-[4.5rem] py-14 sm:min-w-[32rem]">
              <strong className="text-center">
                Faça login para deixar sua avaliação
              </strong>
              <SignInActions hideOptions={['guest']} />
            </Dialog.Content>
          </Dialog.Root>
        )}
      </footer>
    </div>
  )
}
