'use client'
import UserProfile from './UserProfile'
import ThemeSwitch from './ThemeSwitch'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { HiMiniHome } from 'react-icons/hi2'
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
    <div className="shadow-md px-8 z-50 sticky top-0 backdrop-blur-3xl dark:bg-red-600/80 bg-red-700/95">
      <div className="flex-between p-4">
        <div className="flex items-center gap-3 text-xl font-semibold relative">
          <div className="flex items-center gap-3 ">
            <Link href="/" className="hidden md:flex">
              takeUforward
            </Link>
            <Link href="/" className=" md:hidden absolute -top-4 -left-10">
              <HiMiniHome className="dark:text-black h-7 w-7" />
            </Link>
          </div>
        </div>
        <div className="flex gap-8 items-center">
          <h1
            className={`text-sm max-sm:text-xs font-medium px-3 py-1.5 rounded-lg bg-gray-200 text-gray-950 dark:bg-gray-950 ${
              currentUser?.role === 'ADMIN' &&
              ' hover:bg-gray-300 hover:dark:bg-gray-800'
            } dark:text-white`}
          >
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
