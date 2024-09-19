'use server'
import api from '@/lib/axios'
import { Country } from '@/types'

interface Props {
  id: number
  name: string
}

export interface categories extends Props {
  subCategoria: Props[]
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

export async function getRegimes() {
  const { data } = await api.get<Props[]>('/helpers/regimes')
  return data
}

export async function getProvincias() {
  const { data } = await api.get<Props[]>('/helpers/provincias')
  return data
}

export async function getSubAccounts() {
  const { data } = await api.get<SubAccounts[]>('/helpers/sub-accounts')
  return data
}

export async function getCategories() {
  const { data } = await api.get<categories[]>('/helpers/categories')
  return data
}

interface props {
  id: number
  mencaoConstarDoc: string
}

export async function getIsencoes() {
  const { data } = await api.get<props[]>('/helpers/insencoes')
  return data
}

export async function getTaxas() {
  const { data } = await api.get<
    {
      id: number
      value: number
      name: string
    }[]
  >('/helpers/taxas')
  return data
}
