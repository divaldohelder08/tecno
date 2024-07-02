'use server'
import api from '@/lib/axios'
import { Role, getPermissionProps, getRoleProps, getRolesProps } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'


export async function getPermissions() {
  const { data } = await api.get<getPermissionProps>('/permissions')
  return data.permissions
}



export async function getRules() {
  const { data } = await api.get<getRolesProps>('/roles')
  return data.roles
}



export async function getRole(id: string) {
  const { data } = await api.get<getRoleProps>(`/role/${id}`)
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

export async function createRole({ name, description }: { name: string, description: string | null }) {
  try {
    await api.post('/role', {
      name, description
    })
        revalidatePath('/settings/roles/new')
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}


