'use server'
import api from '@/lib/axios'
import { Permission, Role, getRoleProps, getRolesProps, Bank } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getBanks() {
  const { data } = await api.get<Bank[]>('/bancos')
  return data
}

export async function updateBank({ id, ...rest }: { id:number, nome_banco: string, sigla: string,  codigo: string  }) {
  try {
    await api.put(`/banco/${id}`, {
      ...rest
    })
    revalidatePath('/human-recours/parameterization/bank')
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}


export async function deleteBank(id: number) {
  try {
    await api.delete(`/banco/${id}`)
    revalidatePath('/human-recours/parameterization/bank')
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}


export async function createBanco(data: { nome_banco: string, sigla: string,  codigo: string  }) {
  try {
    await api.post('/banco',data)
    revalidatePath('/human-recours/parameterization/bank')
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
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
