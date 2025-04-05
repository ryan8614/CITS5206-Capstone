'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const linkData = [
  {
    name: 'Edit',
    href: '/excel-edit'
  },
  {
    name: 'Upload',
    href: '/upload'
  },
  {
    name: 'About',
    href: 'about'
  }
]

export default function Header () {
    const pathname = usePathname();
    return (
      <div className="absolute w-full z-10 bg-white">
          <div className="flex justify-between container mx-auto text-black p-8">
            <Link className="text-3xl font-bold" href="/">Home</Link>
            <div className="text-xl space-x-5">
              {
                linkData.map((link) => (
                  <Link key={link.name} 
                    className={pathname === link.href ? "text-blue-400" : ""} 
                    href={link.href}
                  >
                    {link.name}
                  
                  </Link>
                ))
              }
            </div>
          </div>
      </div>
    );
  }