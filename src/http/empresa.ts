'use server'
import { empresaData } from '@/app/(app)/(start)/company/form'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'

export async function getEmpresa() {
  try {
    const response = await api.get<empresaData>('/empresa')
    return { data: response.data, error: null }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
export async function upsertEmpresa(data: empresaData) {
  try {
    await api.post<empresaData>('/empresa', data)
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}
