'use server'
import api from '@/lib/axios'
import { Armazem } from '@/types'

export async function getArmazens() {
  const { data } = await api.get<Armazem[]>('/armazems')
  return data
}
