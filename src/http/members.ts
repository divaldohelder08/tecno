'use server'
import { editUserData } from '@/app/(app)/controle-acesso/users/components/edit-user'
import api from '@/lib/axios'
import { member } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface role {
  id: number
  name: string
  description: string | null
}

export interface user {
  id: number
  name: string
  email: string
  emailVerifiedAt: Date | null
  avatar: string | null
  active: boolean
  isSuperAdmin: boolean
  prazoSenha: null
  resetSentAt: Date | false
  createdAt: Date
  updatedAt: Date
}

export async function getMembers() {
  const { data } = await api.get<{ members: member[] }>('/users')
  return data.members
}

export async function getMember(id: string) {
  try {
    const { data } = await api.get<{ roles: role[]; user: user }>(`/user/${id}`)
    return data
  } catch (error) {
    console.error(getErrorMessage(error))
    return null
  }
}

export async function getUserMember(id: string) {
  try {
    const { data } = await api.get<role[]>(`/user/${id}`)
    return data
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

interface props {
  roleId: number
  userId: number
  value: boolean
}

export async function updateUserRole({ userId, value, roleId: id }: props) {
  try {
    await api.patch(`/user/${userId}`, { value, id })
    revalidatePath(`/controle-acesso/users/${userId}/roles`)
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function createUser(data: {
  name: string
  email: string
  password: string
}) {
  try {
    await api.post('/user', data)
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
  revalidatePath(`/controle-acesso/users`)
}

export async function editUser({ id, ...rest }: editUserData) {
  try {
    await api.patch(`/user/${id}/edit`, { ...rest })
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
  revalidatePath(`/controle-acesso/users`)
}

export async function deleteUser(id: number) {
  try {
    await api.delete(`/user/${id}`)
    revalidatePath('/controle-acesso/users')
  } catch (error) {
    revalidatePath('/controle-acesso/users')
    throw new Error(getErrorMessage(error))
  }
}

export async function updateUserStatus({
  id,
  value,
}: {
  id: number
  value: boolean
}) {
  try {
    await api.patch(`/user/${id}/status`, {
      value,
    })
    revalidatePath('/controle-acesso/users')
  } catch (error) {
    revalidatePath('/controle-acesso/users')
    throw new Error(getErrorMessage(error))
  }
}
