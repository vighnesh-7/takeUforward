'use client'
import UserProfile from './UserProfile'
import ThemeSwitch from './ThemeSwitch'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { User } from '@/types/user'
interface Props {
  currentUser: User
}

const Navbar: React.FC<Props> = ({ currentUser }: Props) => {
  const router = useRouter()
  const Back = () => {
    router.back()
  }

  return (
    <div className="shadow-md px-8 z-50 sticky top-0 backdrop-blur-3xl bg-red-600/80">
      <div className="flex-between p-4">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden md:flex">
              takeUforward
            </Link>
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <h1 className="text-sm font-medium px-3 py-1.5 rounded-lg bg-gray-300 text-gray-950 dark:bg-gray-950 dark:text-white">
            {currentUser?.role == 'ADMIN' ? (
              <Link href="/admin/dashboard">Admin Dashboard</Link>
            ) : (
              currentUser?.role
            )}
          </h1>
          <ThemeSwitch />
          <UserProfile currentUser={currentUser} />
        </div>
      </div>
    </div>
  )
}

export default Navbar
