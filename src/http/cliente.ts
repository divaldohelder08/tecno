'use server'
import api from '@/lib/axios'
import { Cliente, Role } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface props {
  id: number,
  entidadeId: number,
  tipoDesconto: 'COMERCIAL' | 'FINANCEIRO' | 'DIVERSO' | 'NENHUM',
  saldo: number,
  estado: 'ACTIVO' | 'REMOVIDO',
  country: {
    code: string,
    name: string
  },
  entidade: {
    name: string,
    identificacao: string,
    tipodeIdentificacao: string
  }
}
export async function getClientes() {
  const { data } = await api.get<{ clientes: props[] }>('/clientes')
  return data.clientes
}

export async function getCliente(id: string) {
  const { data } = await api.get<Cliente>(`/cliente/${id}`)
  return data
}
/*
export async function updateRole({ id, name, description }: Role) {
  try {
    await api.patch(`/role/${id}`, {
      name, description
    })
    revalidatePath(`/settings/roles/${id}`)
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}*/


export async function deleteCliente(id: number) {
  try {
    await api.delete(`/cliente/${id}`)
    revalidatePath('/entidade/cliente')
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}


export async function createClienteWithEntidadeId({ name, description }: { name: string, description: string | null }) {
  let resId: number
  try {
    const { data } = await api.post<{ role: Role }>('/role', {
      name, description
    })
    resId = data.role.id
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
  redirect(`/settings/roles/${resId}`)
}

interface props {
  roleId: number;
  permissionId: number;
  has: boolean;
}

export async function updateRolePermission({ roleId, ...rest }: props) {
  try {
    await api.patch(`/role/${roleId}/permission`, { ...rest })
    revalidatePath(`/settings/roles/${roleId}`)
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}
