'use server'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface props{
  id: number
  name: string
}


interface subCategoria {
  id: number
  name: string
  artigos: number
  subCategorias: number
}

export async function getSubCategoria() {
  const { data } = await api.get<subCategoria[]>('/subcategories')
  console.log(data)
  return data
}

export async function updateSubCategoria({
  id,
  name,
}: {
  id: number
  name: string
}) {
  try {
    await api.put(`/category/${id}`, { name })
    revalidatePath('/human-recours/parameterization/category')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function deleteSubCategoria(id: number) {
  try {
    await api.delete(`/subcategory/${id}`)
    revalidatePath('/human-recours/parameterization/sub-category')
  } catch (error) {
    revalidatePath('/human-recours/parameterization/sub-category')
    throw new Error(getErrorMessage(error))
  }
}

export async function createSubCategoria(data:props) {
  try {
    await api.post('/subcategory', data)
    revalidatePath('/human-recours/parameterization/sub-category')
  } catch (error) {
    console.log(error.response.data.errors)
  
    return {
      error: getErrorMessage(error),
    }
  }
}
