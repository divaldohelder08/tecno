'use server'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface unity {
  id: number
  name: string
  artigos: number
}

export async function getUnidades() {
  const { data } = await api.get<unity[]>('/unity')
  return data
}

export async function updateUnidade({
  id,
  name,
}: {
  id: number
  name: string
}) {
  try {
    await api.put(`/unity/${id}`, { name })
    revalidatePath('/human-recours/parameterization/unit')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function deleteUnidade(id: number) {
  try {
    await api.delete(`/unity/${id}`)
    revalidatePath('/human-recours/parameterization/unit')
  } catch (error) {
    revalidatePath('/human-recours/parameterization/unit')
    throw new Error(getErrorMessage(error))
  }
}

export async function createUnidade(name: string) {
  try {
    await api.post('/unity', { name })
    revalidatePath('/human-recours/parameterization/unit')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
