import { getCookie } from 'cookies-next'
import { create } from 'zustand'

interface EmpresaAreaState {
  comercioGeral: boolean
  restaurante: boolean
  hotelaria: boolean
  oficina: boolean
  setAreas: (areas: Partial<EmpresaAreaState>) => void
}

export const useEmpresaAreas = create<EmpresaAreaState>((set) => {
  // Inicializa os valores dos estados com os cookies ou com false por padrão
  const comercioGeral = getCookie('comercioGeral') === 'true' || false
  const restaurante = getCookie('restaurante') === 'true' || false
  const hotelaria = getCookie('hotelaria') === 'true' || false
  const oficina = getCookie('oficina') === 'true' || false

  return {
    comercioGeral,
    restaurante,
    hotelaria,
    oficina,
    setAreas: (areas) => set((state) => ({ ...state, ...areas })),
  }
})
