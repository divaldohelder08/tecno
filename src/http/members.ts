'use server'

import api from "@/lib/axios";
import { member } from "@/types";
import { createUserData } from "./app/(app)/access-control/users/form"
import { getErrorMessage } from '@/utils/get-error-message'
import { redirect } from 'next/navigation'


interface role{
    id: number,
    name: string,
    description: string | null,
}


export interface user{
    id: number,
    name: string,
    email: string,
    emailVerifiedAt: Date | null,
    avatar:string | null,
    active: boolean,
    isSuperAdmin: boolean,
    prazoSenha: null,
    resetSentAt: Date | false,
    createdAt: Date,
    updatedAt: Date
}












export async function getMembers() {
  const { data } = await api.get<{
    members: member[]
  }>('/users')
  return data.members
}


export async function getMember(id:string) {
  const { data } = await api.get<{ roles: role[], user: user }>(`/user/${id}`)
  return data
}



export async function createUser(data: createUserData) {
  let resId: number
 try {
    const response = await api.post('/user', data)
    console.log(response)
    resId = response.data.id
  } catch (error) {
    return {
      error: getErrorMessage(error)
    }
  }
  redirect(`/access-control/users/${resId}`)
}