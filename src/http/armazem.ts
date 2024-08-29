'use server'
import api from '@/lib/axios'
import { Armazem } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface props {
  name: string
  lojaId: number | null
  description?: string | null
  localidade?: string | null
  bloqueioEntrada: boolean
  bloqueioSaida: boolean
}
export async function getArmazens() {
  const { data } = await api.get<Armazem[]>('/armazems')
  return data
}

export async function getArmazem(id: number) {
  try {
    const { data } = await api.get<props>(`/armazem/${id}`)
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
    revalidatePath('/human-recours/parameterization/storage')
    throw new Error(getErrorMessage(error))
  }
}

export async function createArmazem(data: Armazem) {
  try {
    await api.post('/armazem', data)
    revalidatePath('/human-recours/parameterization/storage')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function deleteArmazem(id: number) {
  try {
    await api.delete(`/armazem/${id}`)
    revalidatePath('/human-recours/parameterization/storage')
  } catch (error) {
    revalidatePath('/human-recours/parameterization/storage')
    throw new Error(getErrorMessage(error))
  }
}
