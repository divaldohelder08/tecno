'use server'
import { clienteData } from '@/app/(app)/comercial/entity/clients/new/form'
import api from '@/lib/axios'
import { Cliente, Role } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
interface props {
  id: number
  entidadeId: number
  tipoDesconto: 'COMERCIAL' | 'FINANCEIRO' | 'DIVERSO' | 'NENHUM'
  saldo: number
  estado: 'ACTIVO' | 'REMOVIDO'
  country: {
    code: string
    name: string
  }
  entidade: {
    name: string
    identificacao: string
    tipodeIdentificacao: string
    isFornecedor: boolean
  }
}
export async function getClientes() {
  const { data } = await api.get<props[]>('/clientes')
  return data
}

export async function getCliente(id: string) {
  const { data } = await api.get<Cliente>(`/cliente/${id}`)
  return data
}

export async function createCliente(data: clienteData) {
  try {
    await api.post('/cliente-and-entidade', data)
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
  redirect('/comercial/entity/clients/new')
}

interface up extends clienteData {
  id: string
}
export async function updateCliente({ id, ...data }: up) {
  try {
    await api.put(`/cliente/${id}`, { ...data })
    revalidatePath(`comercial/entity/clients/${id}/edit`)
  } catch (error) {
    revalidatePath(`comercial/entity/clients/${id}/edit`)
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function deleteCliente(id: number) {
  try {
    await api.delete(`/cliente/${id}`)
    revalidatePath('/entidade/cliente')
  } catch (error) {
    revalidatePath('/entidade/cliente')
    throw new Error(getErrorMessage(error))
  }
}

export async function createClienteWithEntidadeId({
  name,
  description,
}: {
  name: string
  description: string | null
}) {
  let resId: number
  try {
    const { data } = await api.post<{ role: Role }>('/role', {
      name,
      description,
    })
    resId = data.role.id
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
  redirect(`/settings/roles/${resId}`)
}

interface transformData {
  id: number
  entidadeId: number
}

export async function transformToFornecedor({ id, entidadeId }: transformData) {
  try {
    await api.post(`/cliente/${id}/transform`, { entidadeId })
    revalidatePath('/comercial/entity/clients')
  } catch (error) {
    revalidatePath('/comercial/entity/clients')
    return {
      error: getErrorMessage(error),
    }
  }
}
