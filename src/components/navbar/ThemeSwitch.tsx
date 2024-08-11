import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }

  return (
    <>
      <button
        onClick={() => setTheme(resolvedTheme === 'light' ? 'dark' : 'light')}
      >
        <div
          className={`rounded-full cursor-pointer ${
            resolvedTheme === 'light'
              ? 'hover:bg-neutral-300 bg-neutral-200'
              : 'hover:bg-secondary-800 bg-black'
          } p-2`}
        >
          {resolvedTheme === 'light' ? (
            <MdOutlineDarkMode className="text-xl" />
          ) : (
            <MdOutlineLightMode className="text-xl" />
          )}
        </div>
      </button>
    </>
  )
}
