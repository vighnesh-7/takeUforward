'use client'
import { signIn } from 'next-auth/react'
import { toast } from 'react-hot-toast'
import { FieldValues, useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import SigninWithGoogle from './SigninWithGoogle'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()
  const [showPassword, setShowPassword] = useState('password')

  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: FieldValues) => {
    setLoading(true)
    try {
      toast.loading('Signing in...')
      const response = await signIn('credentials', {
        username: data.username.toLowerCase(),
        password: data.password,
        callbackUrl: '/',
        redirect: false,
      })
      toast.dismiss()
      if (response?.error) {
        toast.error('Invalid username or password')
      } else {
        toast.success('Redirecting to dashboard...')
        setShowPassword('password')
        router.push('/')
      }
    } catch (error: any) {
      toast.error('An error occurred. Please try again later')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-3 mt-2"
      >
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Username"
            className="border bg-gray-500 border-secondary-300 text-sm font-medium p-2.5 outline-none rounded-lg w-full mb-3 focus:border-secondary-200 focus:border-2"
            {...register('username', { required: true })}
          />
        </div>
        {errors.username && (
          <p className="text-sm font-medium text-red-600">
            * Username is required
          </p>
        )}
        <div className="flex items-center relative">
          <input
            type={showPassword}
            placeholder="Password"
            className="border bg-gray-500 border-secondary-300 text-sm font-medium p-2.5 outline-none rounded-lg w-full mb-3 focus:border-secondary-200 focus:border-2"
            {...register('password', { required: true, minLength: 8 })}
          />
          {showPassword === 'password' ? (
            <FaRegEyeSlash
              className="absolute top-5 right-4 transform -translate-y-1/2 text-zinc-700 w-5 h-5 dark:text-white cursor-pointer"
              onClick={() => setShowPassword('text')}
            />
          ) : (
            <FaRegEye
              className="absolute top-5 right-4 transform -translate-y-1/2 text-zinc-700 w-5 h-5 dark:text-white cursor-pointer"
              onClick={() => setShowPassword('password')}
            />
          )}
        </div>
        {errors.password && (
          <p className="text-sm font-medium text-red-600">
            * Password must have more than 8 characters
          </p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 font-semibold text-secondary-100 p-2 text-sm rounded-lg "
        >
          {loading ? 'Sigining in ...' : 'Sign in'}
        </button>
      </form>
      <SigninWithGoogle />
    </div>
  )
}

export default SignIn
