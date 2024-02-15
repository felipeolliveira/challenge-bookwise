import { ReactNode, Suspense } from 'react'

import { Sidebar } from '@/components/ui'

import { BookModal } from '../../components/pages'

type MainLayoutProps = {
  children?: ReactNode
}

export default async function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="py-5 pl-[21.75rem] pr-4">
      <aside className="fixed bottom-4 left-4 top-4 w-[14.5rem]">
        <Sidebar />
      </aside>
      {children}
      <Suspense>
        <BookModal />
      </Suspense>
    </div>
  )
}
