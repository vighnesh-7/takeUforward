import getCurrentUser from '@/actions/getCurrentUser'
import AdminDashboard from '@/components/AdminDashboard'
import { User } from '@/types/user'

async function page() {
  const currentUser = await getCurrentUser()

  return (
    <div>
      <AdminDashboard currentUser={currentUser as User} />
    </div>
  )
}

export default page
