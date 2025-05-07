// src/app/api/session/route.ts

import { NextResponse } from 'next/server' // Import NextResponse for creating API responses
import { checkSession } from '@/lib/session' // Import checkSession to verify user session

/**
 * @function GET
 * @description Checks if a user is currently logged in.
 * @returns {Promise<NextResponse>} A promise that resolves to a NextResponse object.
 * The NextResponse contains a JSON object with a boolean 'isLoggedIn' property.
 */
export async function GET() {
  const isLoggedIn = await checkSession() // Call checkSession to determine login status
  return NextResponse.json({ isLoggedIn }) // Return JSON response with login status
}

