import { cleanCookies } from '@/app/cookies'
import Axios, { AxiosInstance } from 'axios'
import { getCookie } from 'cookies-next'
import { CookiesFn } from 'cookies-next/lib/types'

const api: AxiosInstance = Axios.create({
  baseURL: `${process.env.BACK_END_URL}`,
  withCredentials: true,
})

api.interceptors.request.use(async (config) => {
  let cookieStore: CookiesFn | undefined

  if (typeof window === 'undefined') {
    const { cookies: serverCookies } = await import('next/headers')

    cookieStore = serverCookies
  }
  const token = getCookie('token', { cookies: cookieStore })

  if (token) {
    config.headers.set('Authorization', `Bearer ${token}`)
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

//lg:min-h-[600px] xl:min-h-[800px]
