'use server'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'
import { createLojaData } from '@/app/(app)/human-recours/parameterization/store/form'

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

export async function deleteLoja(id: number) {
  try {
    await api.delete(`/loja/${id}`)
    revalidatePath('/human-recours/parameterization/store')
  } catch (error) {
    revalidatePath('/human-recours/parameterization/store')
    throw new Error(getErrorMessage(error))
  }
}

export async function createLoja(data: createLojaData) {
  try {
    await api.post('/loja', data)
    revalidatePath('/human-recours/parameterization/store')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
