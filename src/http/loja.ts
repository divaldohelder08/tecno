'use server'
import api from '@/lib/axios'
import { Permission, Role, getRoleProps, getRolesProps, Bank } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createLojaData } from "@/app/(app)/human-recours/parameterization/store/form"
interface Loja {
  id: number;
  name: string;
  identificacao: string;
  address: string;
  provinciaId: number;
  telefone: string;
  telefone2: string;
  email: string;
  }


export async function getLoja() {
  const { data } = await api.get<Loja[]>('/lojas')
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


export async function createLoja(data: createLojaData) {
  try {
    await api.post('/loja',data)
    revalidatePath('/human-recours/parameterization/store')
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
