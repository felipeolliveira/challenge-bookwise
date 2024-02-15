import { BookWiseLogo } from '@/components/ui'

import { SignInActions } from '../../../components/pages/signInActions'

export default function SignIn() {
  return (
    <div className="grid h-full grid-cols-2 grid-rows-[auto_1fr] p-4 lg:grid-rows-1">
      <div className="col-span-full grid place-items-center p-10 lg:hidden">
        <BookWiseLogo width={212} />
      </div>
      <div
        className="hidden place-items-center rounded-lg bg-cover bg-right bg-no-repeat lg:col-span-1 lg:grid"
        style={{
          backgroundImage: `url(/bookwise-bg.png)`,
        }}
      >
        <BookWiseLogo width={212} />
      </div>
      <div className="col-span-full flex flex-col items-center justify-center gap-10 lg:col-span-1">
        <div>
          <h1 className="text-2xl font-bold">Boas vindas</h1>
          <span className="text-gray-200">
            Faça seu login ou acesse como visitante.
          </span>
        </div>
        <SignInActions />
      </div>
    </div>
  )
}
