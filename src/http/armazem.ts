'use server'
import type { updateArmazem } from '@/app/(app)/comercial/parameterization/storage/edit-form'
import { createArmazemData } from '@/app/(app)/comercial/parameterization/storage/form'
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
    revalidatePath('/comercial/parameterization/storage')
    throw new Error(getErrorMessage(error))
  }
}

export async function createArmazem(data: createArmazemData) {
  try {
    await api.post('/armazem', data)
    revalidatePath('/comercial/parameterization/storage')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function updateArmazem(data: updateArmazem, id: number) {
  try {
    await api.patch(`/armazem/${id}`, data)
    revalidatePath('/comercial/parameterization/storage')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function deleteArmazem(id: number) {
  try {
    await api.delete(`/armazem/${id}`)
    revalidatePath('/comercial/parameterization/storage')
  } catch (error) {
    revalidatePath('/comercial/parameterization/storage')
    throw new Error(getErrorMessage(error))
  }
}
