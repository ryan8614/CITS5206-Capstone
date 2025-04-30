'use client'

import React from 'react'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useActionState } from 'react'
import { signin } from '@/app/actions/auth'

export default function SigninForm() {
  const router = useRouter()
  const [state, formAction, isPending] = useActionState(signin, undefined)

  useEffect(() => {
      if (state?.message) {
        const timeout = setTimeout(() => {
          router.push('/') // Redirect to home page after 2 seconds
        }, 1000)
        return () => clearTimeout(timeout)
      }
    }, [state?.message, router])

  return (
    <div className="container mx-auto max-w-md">
      {/* Show message if success, else show form */}
      {!state?.message && (
        <>
          <h2 className="text-3xl font-bold mb-4 text-center text-blue-600">Signin</h2>
          <form action={formAction} className="space-y-5 pt-1">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block font-medium mb-1">
                Username
              </label>
              <input
                id="username"
                name="username"
                placeholder="Username"
                className="w-full border rounded px-3 py-2"
              />
              {state?.errors?.username && (
                <p className="text-red-500 text-sm mt-1">{state.errors.username}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block font-medium mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className="w-full border rounded px-3 py-2"
              />
              {state?.errors?.password && (
                <div className="text-red-500 text-sm mt-1">
                  <p className="mb-1">Password must:</p>
                  <ul className="list-disc list-inside">
                    {state.errors.password.map((err) => (
                      <li key={err}>- {err}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              {isPending ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </>
      )}
      {state?.message && (
        <h2 className="text-green-600 text-3xl font-bold mb-4 text-center">{state.message}</h2>
      )}

    </div>
  )
}
