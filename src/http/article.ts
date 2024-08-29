'use server'
import { formData as createProductData } from '@/app/(app)/comercial/products/new/form'
import { formData as createServiceData } from '@/app/(app)/comercial/service/form'

import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface article{
  id: number,
  name: string,
  imagem: string | null,
  estado: string,
  createdAt: Date
}

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

export async function createService(data: createServiceData) {
  try {
    await api.post('/artigo/service', data)
    revalidatePath('/comercial/service')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function getServices() {
  const { data } = await api.get<article[]>('/artigo/services')
  return data
}

export async function getProducts() {
  const { data } = await api.get<article[]>('/artigo/products')
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


interface deleteProps{
id: number
type: "products" | "service"
}
export async function deleteArticleSerice(id: number) {
  try {
    await api.delete(`/artigo/${id}`)
    revalidatePath("/comercial/service")
  } catch (error) {
    revalidatePath("/comercial/service")
    throw new Error(getErrorMessage(error))
  }
}


export async function deleteArticle({ id, type }:deleteProps) {
  try {
    await api.delete(`/artigo/${id}`)
    revalidatePath(`/comercial/${type}`)
  } catch (error) {
    revalidatePath(`/comercial/${type}`)
    throw new Error(getErrorMessage(error))
  }
}