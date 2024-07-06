
export interface categoriesProps {
  id: string,
  name: string,
  subCategory: {
    id: string,
    name: string,
  }[]
}

export interface Permission {
  id: number,
  slug: string,
  description: string
  perfis: number,
}


export interface Role{
  id: number,
  name: string
  description?: string
}



interface getRolesProps {
  roles: {
  id: number,
  name: string
  description?: string
  permissions: number,
  users: number
}[]
}


interface getRoleProps {
  role: Role,
  permissions: permissionProps[]
}


export interface member {
  id: number,
  name: string,
  email: string
  avatar?: string,
  status: boolean,
  createdAt: Date,
  profiles: number;
}