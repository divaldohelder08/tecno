'use server'
import api from '@/lib/axios'

interface funcionario {
  id: number
  nome_completo: string
  email: string
  tipo_identificacao: string
  num_identificacao: string
  avatar: string
  telefone1: string
  id_funcao: number
  createdAt: Date
  Funcao: {
    id: number
    nome_funcao: string
  }
}

export async function getFuncionario() {
  const { data } = await api.get<funcionario[]>('/funcionarios')
  return data
}


export async function createFuncionario(data:any) {
  try {
    await api.post("/funcionarios")
  } catch (error) {
    
  }
}