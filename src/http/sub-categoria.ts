'use server'
import { createCategoriaData } from '@/app/(app)/comercial/parameterization/sub-categoria/form'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

export async function getSubCategoria() {
  const { data } = await api.get<
    {
      id: number
      name: string
      categoria: {
        id: number
        name: string
      }
    }[]
  >('/sub-categorias')
  return data
}

export async function updateSubCategoria({
  id,
  name,
  categoriaId,
}: {
  id: number
  name: string
  categoriaId: number
}) {
  try {
    await api.put(`/sub-categoria/${id}`, { name, categoriaId })
    revalidatePath('/comercial/parameterization/sub-categoria')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function deleteSubCategoria(id: number) {
  try {
    await api.delete(`/sub-categoria/${id}`)
    revalidatePath('/comercial/parameterization/sub-categoria')
  } catch (error) {
    revalidatePath('/comercial/parameterization/sub-categoria')
    throw new Error(getErrorMessage(error))
  }
}

export async function createSubCategoria(data: createCategoriaData) {
  try {
    await api.post('/sub-categoria', data)
    revalidatePath('/comercial/parameterization/sub-categoria')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function getSubCategoriaById(id: number) {
  const { data } = await api.get<{
    id: number
    name: string
    categoriaId: number
  }>(`/sub-categoria/${id}`)
  return data
}
