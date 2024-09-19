export interface categoriesProps {
  id: string
  name: string
  subCategory: {
    id: string
    name: string
  }[]
}

export interface Permission {
  id: number
  slug: string
  description: string
  perfis?: number
}

export interface Bank {
  id: number
  nome_banco: string
  codigo: string
  sigla: string
  createdAt: date
  updatedAt: date
}

export interface Departamento {
  id: number
  nome_departamento: string
  funcionario_chefe: {
    id: number
    nome_completo: string
    avatar: string
    createdAt: date

    Funcao: {
      nome_funcao: string
    }
  }
  funcionario_supervisor: {
    id: number
    nome_completo: string
    avatar: string
    createdAt: date

    Funcao: {
      nome_funcao: string
    }
  }
  createdAt: date
  updatedAt: date
}

export interface Role {
  id: number
  name: string
  description?: string
}

interface getRolesProps {
  roles: {
    id: number
    name: string
    description: string | null
    permissions: number
    users: number
  }[]
}

interface getRoleProps {
  role: Role
  permissions: Permission[]
}

export interface member {
  id: number
  name: string
  email: string
  avatar?: string
  status: boolean
  isSuperAdmin: boolean
  resetSentAt: boolean
  createdAt: Date
  profiles: number
}

export interface Cliente {
  id: number
  entidadeId: number
  countryId: number
  telefone: string
  telefone2: string | null
  whatsapp: string | null
  endereco: string | null
  email: string | null
  subAccountId: number
  tipoDesconto: 'COMERCIAL' | 'FINANCEIRO' | 'DIVERSO' | 'NENHUM'
  valorDesconto: number | null
  percentagemDesconto: number | null
  efectuaRetencao: boolean
  saldo: number
  limiteSaldo: number
  limiteCredito: number
  estado: 'ACTIVO' | 'REMOVIDO'
}

interface provincia {
  id: number
  name: string
}
export interface Country {
  id: number
  name: string
  code: string
  provincias: provincia[]
}

export interface maper {
  value: number;
  label: string;
}

export interface Armazem {
  id?: number
  name: string
  loja: {
    id: number
    name: string
  } | null
  description: string | null
  localidade: string | null
  bloqueioEntrada: boolean
  bloqueioSaida: boolean
}

export interface unity {
  id: number
  name: string
  artigos: number
}

export type Typer<T extends (...args: any) => any> = T extends (
  ...args: any
) => Promise<infer U>
  ? U
  : never

export type areas = 'COMERCIO_GERAL' | 'RESTAURANTE' | 'HOTELARIA' | 'OFICINA'
