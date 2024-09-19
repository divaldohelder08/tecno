'use server'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface Categoria {
  id: number
  name: string
  artigos: number
  subCategorias: number
}

export async function getCategoria() {
  const { data } = await api.get<Categoria[]>('/categories')
  return data
}

export async function updateCategoria({
  id,
  name,
}: {
  id: number
  name: string
}) {
  try {
    await api.put(`/category/${id}`, { name })
    revalidatePath('/comercial/parameterization/categoria')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function deleteCategoria(id: number) {
  try {
    await api.delete(`/category/${id}`)
    revalidatePath('/comercial/parameterization/categoria')
  } catch (error) {
    revalidatePath('/comercial/parameterization/categoria')
    throw new Error(getErrorMessage(error))
  }
}

export async function createCategoria(name: string) {
  try {
    await api.post('/category', { name })
    revalidatePath('/comercial/parameterization/categoria')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
