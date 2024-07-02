'use server'

import { z } from 'zod'

import { getErrorMessage } from '@/utils/get-error-message'
import { signIn } from '@/services/auth'

const signInSchema = z.object({
  email: z
    .string().min(2, "Min 2").max(250, 'Max 255').toLowerCase().email()
    .email({ message: 'Por favor, insira um email valido.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
})

export async function signInWithEmailAndPassword(data: FormData) {
  const result = signInSchema.safeParse(Object.fromEntries(data))

  const { email, password } = result.data

    await signIn('credentials', {
      email,
      password,
      redirectTo: '/',
    })
}
