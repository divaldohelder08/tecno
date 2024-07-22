'use server'
import api from '@/lib/axios'
import { Permission, Role, getRoleProps, getRolesProps, Bank } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function getUnits() {
  const { data } = await api.get<{ name:string }[]>('/bancos')
  return data
}

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
}


export async function deleteRole(id: number) {
  try {
    await api.delete(`/role/${id}`)
    revalidatePath('/settings/roles')
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
