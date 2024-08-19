'use server'
import { formData as createProductData } from '@/app/(app)/comercial/products/new/form'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

export async function createProduct(data: createProductData) {
  try {
    await api.post('/artigo/product', data)
    revalidatePath('/comercial/products/new')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
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
