'use server' // Marks all exports in this file as server functions

import 'server-only' // Prevents client-side usage of this module
import { SignJWT, jwtVerify } from 'jose' // Import JWT functions for signing and verification
import { SessionPayload } from '@/lib/definitions' // Import the session payload type definition
import { cookies } from 'next/headers' // Import the cookies API from Next.js

const secretKey = process.env.SESSION_SECRET // Retrieve the session secret key from environment variables
const encodedKey = new TextEncoder().encode(secretKey) // Encode the secret key for JWT signing

/**
 * @async
 * @function encrypt
 * @description Encrypts the payload and returns a JWT.
 * @param {SessionPayload} payload - The payload to encrypt.
 * @returns {Promise<string>} The encrypted JWT.
 */
export async function encrypt(payload: SessionPayload): Promise<string> {
  return new SignJWT(payload) // Create a new JWT with the payload
    .setProtectedHeader({ alg: 'HS256' }) // Set the algorithm to HS256
    .setIssuedAt() // Set the issued at time
    .setExpirationTime('3h') // Set the expiration time to 3 hours
    .sign(encodedKey) // Sign the JWT with the encoded secret key
}

/**
 * @async
 * @function decrypt
 * @description Decrypts the JWT and returns the payload.
 * @param {string | undefined} session - The JWT to decrypt.
 * @returns {Promise<any>} The decrypted payload, or undefined if verification fails.
 */
export async function decrypt(session: string | undefined = ''): Promise<any> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, { // Verify the JWT with the encoded secret key
      algorithms: ['HS256'], // Specify the allowed algorithms
    })
    return payload // Return the payload if verification succeeds
  } catch (error) {
    console.log('Failed to verify session') // Log an error if verification fails
  }
}

/**
 * @async
 * @function createSession
 * @description Creates a new session and sets the cookie.
 * @param {string} userId - The ID of the user to create the session for.
 * @returns {Promise<void>}
 */
export async function createSession(userId: string): Promise<void> {
  const expiresAt = new Date(Date.now() + 3 * 60 * 60 * 1000) // Calculate the expiration time (3 hours from now)
  const session = await encrypt({ userId, expiresAt }) // Encrypt the user ID and expiration time into a JWT
  const cookieStore = await cookies() // Get the cookie store from Next.js

  cookieStore.set('session', session, { // Set the session cookie
    httpOnly: true, // Make the cookie only accessible via HTTP(S)
    secure: true, // Ensure the cookie is only sent over HTTPS
    expires: expiresAt, // Set the cookie expiration time
    sameSite: 'lax', // Set the SameSite attribute to Lax for better security
    path: '/', // Set the cookie path to the root of the application
  })
}

/**
 * @async
 * @function updateSession
 * @description Updates the session and sets the cookie.
 * @returns {Promise<void>}
 */
export async function updateSession(): Promise<void> {
  const session = (await cookies()).get('session')?.value // Get the session cookie value
  const payload = await decrypt(session) // Decrypt the session to get the payload

  if (!session || !payload) { // If there is no session or payload, return
    return;
  }

  const expires = new Date(Date.now() + 3 * 60 * 60 * 1000) // Calculate the new expiration time (3 hours from now)

  const cookieStore = await cookies() // Get the cookie store from Next.js
  cookieStore.set('session', session, { // Set the session cookie with the same value but updated expiration
    httpOnly: true, // Make the cookie only accessible via HTTP(S)
    secure: true, // Ensure the cookie is only sent over HTTPS
    expires: expires, // Set the cookie expiration time
    sameSite: 'lax', // Set the SameSite attribute to Lax for better security
    path: '/', // Set the cookie path to the root of the application
  })
}

/**
 * @async
 * @function deleteSession
 * @description Deletes the session and clears the cookie.
 * @returns {Promise<void>}
 */
export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies() // Get the cookie store from Next.js
  cookieStore.delete('session') // Delete the session cookie
}

/**
 * @async
 * @function checkSession
 * @description Checks signin status.
 * @returns {Promise<boolean>} True if the user is signed in, false otherwise.
 */
export async function checkSession(): Promise<boolean> {
  const cookieStore = await cookies() // Get the cookie store from Next.js
  const token = cookieStore.get('session')?.value // Get the session token from the cookie

  if (!token) return false // If there is no token, return false

  try {
    const session = await decrypt(token); // Decrypt the session token
    if (session?.userId) return true; // If the session contains a user ID, return true
    return false; // Otherwise, return false
  } catch (err) {
    return false; // If there is an error decrypting the session, return false
  }
}
