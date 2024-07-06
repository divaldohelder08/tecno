import { auth } from '@/services/auth'
import Axios, { AxiosInstance } from 'axios'
import { CookiesFn } from 'cookies-next/lib/types'

const api: AxiosInstance = Axios.create({
  baseURL: `${process.env.BACK_END_URL}`,
  withCredentials: true,
})

api.interceptors.request.use(async (config) => {
  const session = await auth();
  if (session?.user) {
    config.headers.Authorization = `Bearer ${session.user.token}`;
  }

  return config
})

export const apiClient: AxiosInstance = Axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  withCredentials: true,
})

api.interceptors.response.use(
  function (response) {
    return response
  },
  async function (error) {
    if (error.response?.status === 401) {
      console.log('error', error)
    }

    return Promise.reject(error)
  },
)

export default api
