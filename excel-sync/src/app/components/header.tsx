'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { logout } from '@/app/actions/auth'

const linkData = [
  { name: 'Edit', href: '/authen/excel-edit' },
  { name: 'Upload', href: '/authen/upload' },
  { name: 'Download', href: '/authen/download' },
]

export default function Header () {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const pathname = usePathname();
    const router = useRouter()

    useEffect(() => {
      const checkLogin = async () => {
        const res = await fetch('/api/session')
        const data = await res.json()
        setIsLoggedIn(data.isLoggedIn)
      }
      checkLogin()
    }, [])

    const isActive = (href: string) => pathname === href

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