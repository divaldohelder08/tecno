'use server'
import { fornecedorData } from '@/app/(app)/comercial/entity/suppliers/new/form'
import { formData } from '@/app/(app)/comercial/entity/suppliers/table/form'

import api from '@/lib/axios'
import { Cliente } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface transformData extends formData{
  id: number
  entidadeId: number
}

interface props {
  id: number
  entidadeId: number
  email: string | null
  estado: 'ACTIVO' | 'REMOVIDO'
  country: {
    code: string
    name: string
  }
  entidade: {
    id: number;
    name: string
    identificacao: string
    tipodeIdentificacao: string
    isCliente: boolean
  }
}

export async function getFornecedores() {
  const { data } = await api.get<props[]>('/fornecedores')
  return data
}

export async function deleteFornecedor(id: number) {
  try {
    await api.delete(`/fornecedor/${id}`)
    revalidatePath('/comercial/entity/suppliers')
  } catch (error) {
    revalidatePath('/comercial/entity/suppliers')
    throw new Error(getErrorMessage(error))
  }
}

export async function getCliente(id: string) {
  const { data } = await api.get<Cliente>(`/cliente/${id}`)
  return data
}

export async function createFornecedor(data: fornecedorData) {
  try {
    await api.post('/fornecedor-and-entidade', data)
    revalidatePath('/comercial/entity/suppliers/new')
  } catch (error) {
    revalidatePath('/comercial/entity/suppliers/new')

    return {
      error: getErrorMessage(error),
    }
  }
}


export async function transformToCliente({ id, ...data }: transformData) {
  try {
    await api.post(`/fornecedor/${id}/transform`, {...data })
    revalidatePath('/comercial/entity/suppliers')
  } catch (error) {
    revalidatePath('/comercial/entity/suppliers')
    return {
      error: getErrorMessage(error),
    }
  }
}


















