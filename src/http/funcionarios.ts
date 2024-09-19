'use server'
import { formData } from '@/app/(app)/human-recours/employee/new/form'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

// cSpell:disable

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

export async function createFuncionario(data: formData) {
  try {
    validateNumIdentificacao({
      value: data.num_identificacao,
      id: data.tipo_identificacao,
    })
    await api.post('/funcionario', data)
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}



export async function deleteFuncionario(id: number) {
  try {
    await api.delete(`/funcionario/${id}`)
    revalidatePath('/human-recours/parameterization/employee')
  } catch (error) {
    revalidatePath('/human-recours/parameterization/employee')
    throw new Error(getErrorMessage(error))
  }
}

const validateNumIdentificacao = ({
  value,
  id,
}: {
  value: string
  id: string
}) => {
  let regex
  switch (id) {
    case 'BI':
      regex = /^\d{9}[A-Z]{2}\d{3}$/
      break
    case 'Passaporte':
      regex = /^[A-Z]{2}\d{6}$/
      break
    default:
      regex = /.*/
      break
  }

  if (!regex.test(value))
    throw new Error('Número de identificação inválido para o tipo selecionado')
}
