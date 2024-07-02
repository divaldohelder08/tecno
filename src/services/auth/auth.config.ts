import type { NextAuthConfig, Session, JWT } from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import api from "@/lib/axios";

interface ExtendedJWT extends JWT {
  user?: {
    id: string;
    email: string;
    name: string;
    // Adicione outros campos conforme necessário
  };
}

interface ExtendedSession extends Session {
  user?: {
    id: string;
    email: string;
    name: string;
    // Adicione outros campos conforme necessário
  };
}

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      // Nome do provider, pode ser qualquer nome
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Lógica para autorizar o usuário
        // Por exemplo, chamar a API para autenticar o usuário e retornar o usuário
        // ou retornar null se a autenticação falhar.

          const result = await api.post("/auth", {
            email: credentials?.email,
            password: credentials?.password,
          });

          if (result && result.status === 200) {
            return {
              id: result.data.user.id,
              email: result.data.user.email,
              name: result.data.user.name,
            };
          }

          return null;
        
        
      },
    }),
  ],
  pages: {
    signIn: '/auth/sign-in',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      }
      return token;
    }
  },
  authorized({ req, token }) {
    const isOnPublicPage = req.nextUrl.pathname.startsWith('/auth');
    const isLoggedIn = !!token?.user;

    if (isOnPublicPage && isLoggedIn) {
      return Response.redirect(new URL('/', req.nextUrl));
    }

    if (!isOnPublicPage && !isLoggedIn) {
      return Response.redirect(new URL('/auth/sign-in', req.nextUrl));
    }

    return true;
  }
} satisfies NextAuthConfig;
