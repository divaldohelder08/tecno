'use server'
import api from '@/lib/axios'

interface GetProfileResponse {
  user: {
    id: string
    name: string | null
    email: string
    avatar: string | null
  }
}

export async function getProfile() {
  const result = await api.get<GetProfileResponse>('/profile')
  return result.data
}
