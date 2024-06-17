'use server'

import { cookies } from 'next/headers'
import { z } from 'zod'

import { signInWithPassword } from '@/http/sign-in-with-password'
import { getErrorMessage } from '@/utils/get-error-message'

const signInSchema = z.object({
  email: z
    .string().min(2, "Min 2").max(250, 'Max 255').toLowerCase().email()
    .email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  if (!result.success) {
    const errors = result.error.flatten().fieldErrors

    return { success: false, message: null, errors }
  }

  const { email, password } = result.data

  try {
    const { data: { token } } = await signInWithPassword({
      email,
      password,
    })

    cookies().set('token', token, {
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })
  } catch (error) {
    console.error(error)

    return { success: false, message: getErrorMessage(error), errors: null }
  }

  return { success: true, message: null, errors: null }
}
