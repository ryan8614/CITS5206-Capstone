// src/app/api/session/route.ts
import { NextResponse } from 'next/server'
import { checkSession } from '@/lib/session'

export async function GET() {
  const isLoggedIn = await checkSession()
  return NextResponse.json({ isLoggedIn })
}