'use server'
import api from '@/lib/axios'
import { Bank } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

export async function getBanks() {
  const { data } = await api.get<Bank[]>('/bancos')
  return data
}

export async function updateBank({
  id,
  ...rest
}: {
  id: number
  nome_banco: string
  sigla: string
  codigo: string
}) {
  try {
    await api.put(`/banco/${id}`, {
      ...rest,
    })
    revalidatePath('/human-recours/parameterization/bank')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function deleteBank(id: number) {
  try {
    await api.delete(`/banco/${id}`)
    revalidatePath('/human-recours/parameterization/bank')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function createBank(data: {
  nome_banco: string
  sigla: string
  codigo: string
}) {
  try {
    await api.post('/banco', data)
    revalidatePath('/human-recours/parameterization/bank')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
