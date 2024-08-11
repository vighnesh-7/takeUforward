import React from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FcGoogle } from 'react-icons/fc'
import { toast } from 'react-hot-toast'

const SigninWithGoogle = () => {
  const router = useRouter()
  const loginWithGoogle = async () => {
    const response = await signIn('google', { callbackUrl: '/' })
    if (response?.ok) {
      toast.success('Signin successful')
      router.push('/')
    }
    if (response?.error) {
      toast.error(response.error)
    }
  }

  return (
    <div className="">
      <h2 className="text-center my-2 mt-4 text-secondary-700 dark:text-gray-50 text-lg font-bold">
        or
      </h2>
      <button
        onClick={(e) => {
          e.preventDefault()
          loginWithGoogle()
        }}
        className="bg-gray-950 hover:bg-gray-800 text-white text-sm font-semibold my-2  rounded-lg w-full  "
      >
        <div
          className="flex rounded-md justify-center items-center gap-5 p-2.5 relative bg-gray-700 hover:bg-gray-700/80 font-semibold
        text-primary-50 border border-gray-600/95"
        >
          <div>
            <FcGoogle className=" h-5 w-5" />
          </div>
          Continue with Google
        </div>
      </button>
    </div>
  )
}

export default SigninWithGoogle
