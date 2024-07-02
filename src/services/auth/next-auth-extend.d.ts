import type { DefaultSession, User as DefaultUser } from 'next-auth'
import type { DefaultJWT } from 'next-auth/jwt'

// declare module '@auth/core/adapters' {
//   export interface AdapterUser extends AdapterUserBase {
//     companyId: string
//   }
// }
/*
declare module 'next-auth' {
  interface User extends DefaultUser {
      id: string
      email: string
      name: string
      avatar: string | null
  }

  export interface Session extends DefaultSession {
    user: User
    token: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string
  }
}
*/