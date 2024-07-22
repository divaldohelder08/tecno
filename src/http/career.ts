'use server'
import api from '@/lib/axios'
import { Permission, Role, getRoleProps, getRolesProps, Bank } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

interface Carrer {
    id: number,
    nome_carreira: string,
    regime: "geral" | "especial",
    createdAt: Date,
    updatedAt: Date
  }


export async function getCareer() {
  const { data } = await api.get<Carrer[]>('/carreiras')
  console.log(data)
  return data
}


export async function updateCareer({ id, ...rest }: { id:number, nome_carreira: string, regime: string  }) {
  try {
    await api.put(`/carreira/${id}`, {
      ...rest
    })
    revalidatePath('/human-recours/parameterization/career')
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}


export async function deleteCareer(id: number) {
  try {
    await api.delete(`/carreira/${id}`)
    revalidatePath('/human-recours/parameterization/career')
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
}


export async function createCareer(data: { nome_carreira: string, regime: string }) {
  try {
    await api.post('/carreira',data)
    revalidatePath('/human-recours/parameterization/career')
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
