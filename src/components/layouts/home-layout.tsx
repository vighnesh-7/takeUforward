'use client'
import Navbar from '../navbar/Navbar'
import { Suspense } from 'react'
import Loading from '@/app/(dashboard)/loading'
import { User } from '@/types/user'

export default function HomeLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode
  currentUser: User
}) {
  return (
    <div className="w-full">
      <Navbar currentUser={currentUser} />
      <div className="flex">
        <Suspense fallback={<Loading />}>
          <div className={`w-full`}>{children}</div>
        </Suspense>
      </div>
    </div>
  )
}
