'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { logout } from '@/app/actions/auth'

/**
 * @constant {Array<Object>} linkData - Array of navigation links.
 * @property {string} name - The display name of the link.
 * @property {string} href - The URL the link points to.
 */
const linkData = [
  { name: 'Edit', href: '/authen/excel-edit' },
  { name: 'Upload', href: '/authen/upload' },
  { name: 'Download', href: '/authen/download' },
]

/**
 * @function Header - Functional component for the main header of the application.
 * @returns {JSX.Element} - Returns the JSX for the header.
 */
export default function Header () {
    /**
     * @state {boolean} isLoggedIn - State to track if the user is logged in.
     * @function setIsLoggedIn - Function to update the login state.
     */
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    /**
     * @constant {string} pathname - Current path of the route.
     */
    const pathname = usePathname();
    /**
     * @constant {NextRouter} router - Router instance from next/navigation.
     */
    const router = useRouter()

    /**
     * @useEffect - useEffect hook to check login status on component mount.
     */
    useEffect(() => {
      /**
       * @async @function checkLogin - Checks if the user is logged in by calling the /api/session endpoint.
       * @returns {Promise<void>}
       */
      const checkLogin = async () => {
        const res = await fetch('/api/session')
        const data = await res.json()
        setIsLoggedIn(data.isLoggedIn)
      }
      checkLogin()
    }, [])

    /**
     * @function isActive - Checks if the current path matches the link's href.
     * @param {string} href - The href of the link.
     * @returns {boolean} - Returns true if the path matches, false otherwise.
     */
    const isActive = (href: string) => pathname === href

    /**
     * @async @function handleLogout - Logs out the user and redirects to the home page.
     * @returns {Promise<void>}
     */
    const handleLogout = async () => {
      await logout()
      router.push('/')
    }

    return (
      <div className="absolute w-full z-10 bg-white">
          <div className="flex justify-between container mx-auto text-black p-8">
            <Link className="text-3xl font-bold" href="/">Home</Link>
            <div className="flex items-center space-x-5 text-xl">
              {linkData.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-xl hover:underline transition ${isActive(link.href) ? 'text-blue-500 font-semibold' : 'text-gray-700'}`}
                >
                  {link.name}
                </Link>
              ))}
              {isLoggedIn && (
                <button
                  onClick={handleLogout}
                  className="text-xl hover:underline transition text-red-500"
                >
                  Sign out
                </button>
              )}
            </div>
          </div>
      </div>
    );
  }
