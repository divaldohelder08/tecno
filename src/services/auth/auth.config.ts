import NextAuth, { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import api from '@/lib/axios'

const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: 'email@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const response = await api.post('/auth', {
          email: credentials.email,
          password: credentials.password,
        })

        if (response.status === 201 && response.data) {
          const {
            token,
            user: { ...user },
          } = response.data
          return { token, ...user }
        }
        return null
      },
    }),
  ],
  trustHost: true,
  pages: {
   // signIn: '/auth/sign-in',
   // error: '/auth/sign-in',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user
      }
      return token
    },
    async session({ session, token }) {
      //@ts-ignore
      session.user = token.user
      return session
    },
  },
  /*
   callbacks: {
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
    async jwt({ token, user, session, trigger }) {
      // const data = await getUserById(token.user.user.id);
      user && (token.user = user);

      return token;
    },
  },*/
}

export default authConfig
