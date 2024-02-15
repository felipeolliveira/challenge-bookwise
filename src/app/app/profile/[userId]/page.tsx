import { User } from '@phosphor-icons/react/dist/ssr/User'

import UserRatingBooks from '../userRatingBooks'
import UserStats from '../userStats'

type ProfilePageProps = {
  params: {
    userId: string
  }
}

export default function ProfilePage({ params: { userId } }: ProfilePageProps) {
  return (
    <div className="grid grid-cols-[1fr_20.25rem] gap-16 pt-14">
      <section className="bg-white py-8">
        <h1 className="flex items-center gap-3 text-2xl font-bold">
          <User size={32} className="text-green-100" />
          Início
        </h1>
        <UserRatingBooks userId={userId} />
      </section>
      <section className="py-8">
        <UserStats userId={userId} />
      </section>
    </div>
  )
}
