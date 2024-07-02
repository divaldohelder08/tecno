'use server'
import { getProfile } from '@/http/get-profile'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function isAuthenticated() {
  return !!cookies().get('token')?.value
}

export async function isResting() {
  return !!cookies().get('reset')?.value
}

export async function auth() {
  const token = cookies().get('token')?.value

  if (!token) {
    redirect('/auth/sign-in')
  }
  try {
    const res = await getProfile()
    return res
  } catch { }

  //redirect('/api/auth/sign-out')
}
