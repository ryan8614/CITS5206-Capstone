'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


const linkData = [
  {
    name: 'Page1',
    href: '/page1'
  },
  {
    name: 'Page2',
    href: '/page2'
  },
  {
    name: 'Page3',
    href: '/page3'
  }
]

export default function Header () {
    const pathname = usePathname();
    return (
      <div className="abosolute w-full z-10">
          <div className="flex justify-between container mx-auto text-white p-8">
            <Link className="text-3xl font-bold" href="/">Home</Link>
            <div className="text-xl space-x-2">

              {
                linkData.map((link) => (
                  <Link key={link.name} 
                    className={pathname === link.href ? "text-purple-400" : ""}
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