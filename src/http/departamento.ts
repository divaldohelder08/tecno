'use server'
import api from '@/lib/axios'
import { Departamento } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

export async function getDepartamento() {
  const { data } = await api.get<Departamento[]>('/departamentos')
  return data
}

export async function deleteDepartamento(id: number) {
  try {
    await api.delete(`/departamento/${id}`)
    revalidatePath('/human-recours/parameterization/department')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function createDepartamento(data: {
  nome_departamento: string
  Id_funcionario_chefe: number
  Id_funcionario_supervisor: number
}) {
  try {
    await api.post('/departamento', data)
    revalidatePath('/human-recours/parameterization/department')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
