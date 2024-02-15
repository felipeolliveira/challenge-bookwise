'use client'

import { ArrowRight } from '@phosphor-icons/react/dist/ssr/ArrowRight'
import Image from 'next/image'
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react'
import { useState } from 'react'

import { Avatar, Button, CircularProgress } from '@/components/ui'
import { useRouterHook } from '@/hooks/useRouterHook'
import { routes } from '@/utils'

import { SocialSignInButton } from '../../app/auth/signin/socialSignInButton'

type SignInActionType = 'google' | 'github' | 'guest'

type SignInActionsProps = {
  hideOptions?: SignInActionType[]
  disableRedirect?: boolean
}

export function SignInActions({
  hideOptions,
  disableRedirect,
}: SignInActionsProps) {
  const { status, data } = useSession()
  const [signing, setSigning] = useState(false)
  const { pathnameWithSearch } = useRouterHook()
  const user = data?.user

  function handleSignIn(provider: 'google' | 'github') {
    return async () => {
      setSigning(true)
      await signIn(provider, {
        callbackUrl: disableRedirect ? pathnameWithSearch : routes.home,
      })
    }
  }

  function isHidden(option: SignInActionType): boolean {
    return !!hideOptions?.includes(option)
  }

  return (
    <div className="grid gap-2">
      {status === 'loading' && <CircularProgress />}

      {status === 'authenticated' && (
        <>
          <Link href={routes.home}>
            <Button
              className="font-bold [&_svg]:text-green-100"
              icon={ArrowRight}
              isEndIcon
            >
              {user && (
                <>
                  <Avatar size="md" title={user.name} src={user.avatarUrl} />
                  {user?.name}
                </>
              )}
            </Button>
          </Link>
        </>
      )}

      {status === 'unauthenticated' && (
        <>
          {!isHidden('google') && (
            <SocialSignInButton
              disabled={signing}
              onClick={handleSignIn('google')}
            >
              <Image
                src="/google.svg"
                alt="Logo do Google"
                width={32}
                height={32}
              />
              Entrar com Google
            </SocialSignInButton>
          )}
          {!isHidden('github') && (
            <SocialSignInButton
              disabled={signing}
              onClick={handleSignIn('github')}
            >
              <Image
                src="/github.svg"
                alt="Logo do Github"
                width={32}
                height={32}
              />
              Entrar com Github
            </SocialSignInButton>
          )}
          {!isHidden('guest') && (
            <Link href={routes.home}>
              <SocialSignInButton disabled={signing}>
                <Image src="/rocket.svg" alt="" width={32} height={32} />
                Acessar como visitante
              </SocialSignInButton>
            </Link>
          )}
        </>
      )}
    </div>
  )
}
