'use server'

import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { SessionPayload } from '@/lib/definitions'
import { cookies } from 'next/headers'
 
const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

// Encrypts the payload and returns a JWT
export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('3h')
    .sign(encodedKey)
}

// Decrypts the JWT and returns the payload
export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    })
    return payload
  } catch (error) {
    console.log('Failed to verify session')
  }
}

// Creates a new session and sets the cookie
export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000)
  const session = await encrypt({ userId, expiresAt })
  const cookieStore = await cookies()
 
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  })
}

// Updates the session and sets the cookie
export async function updateSession() {
  const session = (await cookies()).get('session')?.value
  const payload = await decrypt(session)
 
  if (!session || !payload) {
    return null
  }
 
  const expires = new Date(Date.now() + 3 * 60 * 60 * 1000)
 
  const cookieStore = await cookies()
  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: 'lax',
    path: '/',
  })
}

// Deletes the session and clears the cookie
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete('session')
}

// Check signin status
export async function checkSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get('session')?.value

  if (!token) return false;

  try {
    const session = await decrypt(token);
    if (session?.userId) return true; 
    return false;
  } catch (err) {
    return false; 
  }

}