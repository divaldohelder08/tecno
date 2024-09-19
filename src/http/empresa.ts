'use server'
import { empresaData as pry } from '@/app/(app)/(start)/empresa/form'

import { empresaDataConfig } from '@/app/(app)/(start)/empresa/form-config'
import api from '@/lib/axios'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'
import { cookies } from 'next/headers'

type empresaData = {
  codigo: string
  name: string
  type: 'SEDE' | 'FILIAL'
  countryId: number
  provinciaId: number
  avatar?: string | null | undefined
  endereco?: string | undefined
  cidade: string | undefined
  telefone: string
  telefone1: string | undefined
  email: string | undefined //colocar aqui um transform
  nif: string
  cae: string | undefined
  alvara?: string | undefined
  regimeId: number
  indicadorFactura: string
  comercioGeral: boolean
  restaurante: boolean
  hotelaria: boolean
  oficina: boolean
  valorInicialRetencaoFonte: number
  retencaoFonteServico: boolean
  percentagemRetencaoFonte: number
}

export async function getEmpresa() {
  try {
    const response = await api.get<empresaData>('/empresa')
    return { data: response.data, error: null }
  } catch (err) {
    return {
      data: null,
      error: getErrorMessage(err),
    }
  }
}
export async function upsertEmpresa(data: pry) {
  try {
    await api.post<empresaData>('/empresa', data)
    revalidatePath('/company')
  } catch (err) {
    revalidatePath('/company')
    return {
      error: getErrorMessage(err),
    }
  }
}

export async function updateEmpresaConfig(data: empresaDataConfig) {
  try {
    const cookieOptions = {
      expires: new Date(Date.now() + 3 * 30 * 24 * 60 * 60 * 1000),
    } // Expira em 3 meses

    await api.post<empresaData>('/empresa/config', data)
    cookies().set('comercioGeral', String(data.comercioGeral), cookieOptions)
    cookies().set('hotelaria', String(data.hotelaria), cookieOptions)
    cookies().set('restaurante', String(data.restaurante), cookieOptions)
    cookies().set('oficina', String(data.oficina), cookieOptions)
  } catch (err) {
    return {
      error: getErrorMessage(err),
    }
  }
}
