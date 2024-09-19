'use server'
import { formData as createProductPrice } from '@/app/(app)/comercial/general-trade/price/components/add-price-form'
import { formData as createProductData } from '@/app/(app)/comercial/products/form'
import { formData as createServiceData } from '@/app/(app)/comercial/service/form'

import api from '@/lib/axios'
import { areas } from '@/types'
import { getErrorMessage } from '@/utils/get-error-message'
import { revalidatePath } from 'next/cache'

interface article {
  id: number
  name: string
  imagem: string | null
  estado: string
  createdAt: Date
}
interface up extends createProductData {
  id: number
  familia: 'PRODUCT' | 'SERVICE'
}

export async function createProduct(data: createProductData) {
  try {
    await api.post('/artigo/product', data)
    revalidatePath('/comercial/products')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function updateProduto({ id, familia, ...rest }: up) {
  const ro = familia === 'PRODUCT' ? 'products' : 'service'
  try {
    await api.patch(`/artigo/${id}/${familia}`, { ...rest })
    revalidatePath(`/comercial/${ro}`)
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function createPrice({ id, ...rest }: createProductPrice) {
  try {
    await api.post(`/artigo/COMERCIO_GERAL/PRODUCT/${id}`, { ...rest })
    revalidatePath('/comercial/general-trade/price')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

export async function createService(data: createServiceData) {
  try {
    await api.post('/artigo/service', data)
    revalidatePath('/comercial/service')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}
interface pr {
  area: areas
  hasPrice: boolean
  familia: 'SERVICE' | 'PRODUCT'
}

export async function getFamiliaArea({ area, hasPrice, familia }: pr) {
  if (hasPrice === true) {
    const { data } = await api.get(
      `/artigo/${familia}/${area}?hasPrice=${hasPrice}`,
    )
    return data
  } else {
    const { data } = await api.get(`/artigo/${familia}/${area}`)
    return data
  }
}

export async function getArtigoById(id: number) {
  const { data } = await api.get<{
    name: string
    imagem: string | null
    categoriaId: number | null
    subCategoriaId: number | null
    unidadeId?: number | null
  }>(`/artigo/find/${id}`)
  return data
}

export async function getServices() {
  const { data } = await api.get<article[]>('/artigo/SERVICE')
  return data
}

export async function getProducts() {
  const { data } = await api.get<article[]>('/artigo/PRODUCT')
  return data
}

export async function updateCareer({
  id,
  ...rest
}: {
  id: number
  nome_carreira: string
  regime: string
}) {
  try {
    await api.put(`/carreira/${id}`, {
      ...rest,
    })
    revalidatePath('/human-recours/parameterization/career')
  } catch (error) {
    return {
      error: getErrorMessage(error),
    }
  }
}

interface deleteProps {
  id: number
  type: 'products' | 'service'
}
export async function deleteArticleService(id: number) {
  try {
    await api.delete(`/artigo/${id}`)
    revalidatePath('/comercial/service')
  } catch (error) {
    revalidatePath('/comercial/service')
    throw new Error(getErrorMessage(error))
  }
}

export async function deleteArticle({ id, type }: deleteProps) {
  try {
    await api.delete(`/artigo/${id}`)
    revalidatePath(`/comercial/${type}`)
  } catch (error) {
    revalidatePath(`/comercial/${type}`)
    throw new Error(getErrorMessage(error))
  }
}
