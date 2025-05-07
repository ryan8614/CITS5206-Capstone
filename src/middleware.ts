'use server'

import { NextRequest, NextResponse } from 'next/server'
import { decrypt } from '@/lib/session'
import { cookies } from 'next/headers'
 
// 1. Specify protected and public routes
const protectedRoutes = ['/authen']
const publicRoutes = ['/', '/login', '/signup']
 
/**
 * @function middleware
 * @async
 * @description Middleware function to handle authentication and route protection.
 * It checks if the user is authenticated based on the session cookie and redirects
 * them to the appropriate page.
 *
 * @param {NextRequest} req - The Next.js request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to a Next.js response object,
 * which can be either a redirect or the next middleware in the chain.
 */
export default async function middleware(req: NextRequest) {

  // 2. Check if the current route is protected or public
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => path === route)
 
  // 3. Decrypt the session from the cookie
  const cookie = (await cookies()).get('session')?.value
  const session = await decrypt(cookie)
  
  console.log('--- Middleware Debug ---')
  console.log('Path:', path)
  console.log('Session:', session)
  console.log('Cookie:', cookie)
 
  // 4. Redirect to /login if the user is not authencated
  if (isProtectedRoute && !session?.userId) {
    return NextResponse.redirect(new URL('/signin', req.nextUrl))
  }
 
  // 5. Redirect to /authen if the user is authenticated
  if (
    isPublicRoute &&
    session?.userId &&
    !req.nextUrl.pathname.startsWith('/authen')
  ) {
    return NextResponse.redirect(new URL('/auth/excel-edit', req.nextUrl))
  }
 
  return NextResponse.next()
}
 
/**
 * @constant {object} config
 * @description Configuration object for the middleware.
 * Defines the matcher to specify the routes that the middleware should run on.
 * It excludes API routes, static files, and images.
 */
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
