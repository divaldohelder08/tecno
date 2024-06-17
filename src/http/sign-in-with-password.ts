import api from '@/lib/axios'

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

export async function signInWithPassword({
  email,
  password,
}: SignInWithPasswordRequest) {
  const result = await api.post<SignInWithPasswordResponse>('/sessions/auth', {
    email,
    password,
  })

  return result
}
