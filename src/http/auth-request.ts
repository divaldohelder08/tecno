'use server'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

interface SignInWithPasswordRequest {
  email: string
  password: string
}

interface SignInWithPasswordResponse {
  user: {
    id: string
    name: string
    avatar: string | null
    email: string
  }
  token: string
}

export async function ResetPasswordVerifyingEmail(email: string) {
  try {
    const result = await api.post<string>('/password/recover', {
      email,
    })
    cookies().set('reset', 'reset', {
      path: '/',
      maxAge: 60 * 5, // 5 Min
    })
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
  const token = cookies().get('reset')?.value
  if (token) {
    redirect('/auth/forgot-password/reset')
  }
}

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const result = await api.post<SignInWithPasswordResponse>('/auth', {
    email,
    password,
  })
  console.log(result)
  return result
}

export async function resetRequest({
  code,
  password,
}: {
  password: string
  code: string
}) {
  try {
    const { data } = await api.post<SignInWithPasswordResponse>('/reset', {
      code,
      password,
    })

    cookies().set('token', data.token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (error) {
    console.error(error)

    return { error: getErrorMessage(error) }
  }
}
