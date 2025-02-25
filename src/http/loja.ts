'use server'
import type { updateLoja } from '@/app/(app)/comercial/parameterization/store/edit-form'
import { createLojaData } from '@/app/(app)/comercial/parameterization/store/form'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface Loja {
  id: number
  name: string
  identificacao: string
  address: string
  provinciaId: number
  telefone: string
  telefone2: string
  email: string
}

export async function getLoja() {
  const { data } = await api.get<Loja[]>('/lojas')
  return data
}

export async function getLojaById(id: number) {
  const { data } = await api.get<createLojaData>(`/loja/${id}`)
  return data
}

export async function deleteLoja(id: number) {
  try {
    await api.delete(`/loja/${id}`)
    revalidatePath('/comercial/parameterization/store')
  } catch (error) {
    revalidatePath('/comercial/parameterization/store')
    throw new Error(getErrorMessage(error))
  }
}

export async function createLoja(data: createLojaData) {
  try {
    await api.post('/loja', data)
    revalidatePath('/comercial/parameterization/store')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function updateLoja(data: updateLoja, id: number) {
  try {
    await api.put(`/loja/${id}`, data)
    revalidatePath('/comercial/parameterization/store')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
