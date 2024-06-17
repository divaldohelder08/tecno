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
  const result = await api.get<GetProfileResponse>('/settings/profile')
    console.log(result)
  return result.data
}
