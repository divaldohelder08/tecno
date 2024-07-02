
export interface categoriesProps {
  id: string,
  name: string,
  subCategory: {
    id: string,
    name: string,
  }[]
}

export interface permissionProps {
  id: number,
  slug: string,
  description: string
}


export interface Role{
  id: number,
  name: string
  description?: string
}



interface getPermissionProps {
  permissions: permissionProps
}

interface getRolesProps {
  roles: Role[]
}


interface getRoleProps {
  role: Role,
  permissions: permissionProps[]
}
