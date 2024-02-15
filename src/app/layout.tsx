import './globals.css'

import { Nunito } from 'next/font/google'

import { Providers } from '@/components/providers'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-nunito',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt_BR">
      <body className={nunito.variable}>
        <Providers>
          <main className="h-dvh">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
