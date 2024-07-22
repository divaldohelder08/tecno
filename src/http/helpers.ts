'use server'
import api from '@/lib/axios'
import { Country } from '@/types'

interface provinces{
  id: number,
  name: string
}

export async function getCountries() {
  const { data } = await api.get<{
    countries: Country[]
  }>('/helpers/countries')
  return data.countries
}


export async function getProvincias() {
  const { data } = await api.get<provinces[]>('/helpers/provincias')
  return data
}


