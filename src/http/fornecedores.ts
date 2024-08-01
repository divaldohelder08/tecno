'use server'
import { fornecedorData } from '@/app/(app)/comercial/entity/suppliers/new/form'
import api from '@/lib/axios'
import { Cliente } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

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
    name: string
    identificacao: string
    tipodeIdentificacao: string
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
