'use server'
import api from '@/lib/axios'
import { Country } from '@/types'

interface Props {
  id: number
  name: string
}

export interface SubAccounts {
  id: number
  numero: string
  description: string
}

export async function getCountries() {
  const { data } = await api.get<{
    countries: Country[]
  }>('/helpers/countries')
  return data.countries
}

export async function getProvincias() {
  const { data } = await api.get<Props[]>('/helpers/provincias')
  return data
}

export async function getSubAccounts() {
  const { data } = await api.get<SubAccounts[]>('/helpers/sub-accounts')
  return data
}
