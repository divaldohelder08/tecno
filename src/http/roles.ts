'use server'
import api from '@/lib/axios'
import { Permission, Role, getRoleProps, getRolesProps } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

export async function getPermissions() {
  const { data } = await api.get<{
    permissions: Permission[]
  }>('/permissions')
  return data.permissions
}

export async function getRoles() {
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
      name,
      description,
    })
    revalidatePath(`/access-control/roles/${id}`)
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function deleteRole(id: number) {
  try {
    await api.delete(`/role/${id}`)
    revalidatePath('/access-control/roles')
  } catch (error) {
    revalidatePath('/access-control/roles')
    throw new Error(getErrorMessage(error))
  }
}

export async function createRole({
  name,
  description,
}: {
  name: string
  description: string | null
}) {
  try {
    await api.post<{ role: Role }>('/role', {
      name,
      description,
    })
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
  revalidatePath('/access-control/roles')
}

interface props {
  roleId: number
  permissionId: number
  has: boolean
}

export async function updateRolePermission({ roleId, ...rest }: props) {
  try {
    await api.patch(`/role/${roleId}/permission`, { ...rest })
    revalidatePath(`/access-control/roles${roleId}`)
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
