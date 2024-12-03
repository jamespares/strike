'use client'

import { useState } from 'react'
import { useUser } from '@/context/UserContext'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const { signIn, signInWithGoogle } = useUser()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    try {
      await signIn(email, password)
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-sm border border-gray-200">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 relative inline-block">
          Login
          <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-400/30 transform -rotate-1 translate-y-1"></div>
        </h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 
                       text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 bg-white rounded-lg border border-gray-200 
                       text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-3 bg-emerald-500 text-white rounded-lg text-sm font-medium
                     hover:bg-emerald-600 transform hover:scale-105 active:scale-95
                     transition duration-200 ease-in-out shadow-sm"
          >
            Login
          </button>
        </form>
        <div className="my-4 flex items-center">
          <div className="flex-1 border-t border-gray-200"></div>
          <span className="px-4 text-gray-500">or</span>
          <div className="flex-1 border-t border-gray-200"></div>
        </div>
        <button
          onClick={signInWithGoogle}
          className="w-full px-4 py-3 bg-white border border-gray-200 text-gray-600 rounded-lg 
                   text-sm font-medium hover:bg-gray-50 transform hover:scale-105 active:scale-95
                   transition duration-200 ease-in-out shadow-sm flex items-center justify-center gap-2"
        >
          <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          Sign in with Google
        </button>
      </div>
    </div>
  )
}
