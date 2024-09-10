'use server'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface fcn {
  id: number
  nome_funcao: string
}

export async function getFcns() {
  const { data } = await api.get<fcn[]>('/funcao')
  return data
}

export async function createFcn(data: any) {
  try {
    await api.post('/funcao', data)
    revalidatePath('/human-recours/parameterization/function')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}


export async function deleteFcn(id: number) {
  try {
    await api.delete(`/funcao/${id}`)
    revalidatePath('/human-recours/parameterization/function')
  } catch (error) {
    revalidatePath('/human-recours/parameterization/function')
    throw new Error(getErrorMessage(error))
  }
}
