'use server'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface Career {
  id: number
  nome_carreira: string
  regime: 'geral' | 'especial'
  createdAt: Date
  updatedAt: Date
}

export async function getCareer() {
  const { data } = await api.get<Career[]>('/carreiras')
  return data
}

export async function updateCareer({
  id,
  ...rest
}: {
  id: number
  nome_carreira: string
  regime: string
}) {
  try {
    await api.put(`/carreira/${id}`, {
      ...rest,
    })
    revalidatePath('/human-recours/parameterization/career')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function deleteCareer(id: number) {
  try {
    await api.delete(`/carreira/${id}`)
    revalidatePath('/human-recours/parameterization/career')
  } catch (error) {
    revalidatePath('/human-recours/parameterization/career')
    throw new Error(getErrorMessage(error))
  }
}

export async function createCareer(data: {
  nome_carreira: string
  regime: string
}) {
  try {
    await api.post('/carreira', data)
    revalidatePath('/human-recours/parameterization/career')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
