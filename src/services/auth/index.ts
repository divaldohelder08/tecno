import api from "@/lib/axios";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  pages: {
    signIn: "/auth",
    signOut: "/auth",
    // error: "/auth",
    verifyRequest: "/auth",
    newUser: "/dashboard",
  },
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
        filialId: { label: "filialId", type: "text" },
      },

      async authorize(credentials) {
        const user = await api.post("/authenticate", {
          email: credentials?.email,
          password: credentials?.password,
          filialId: credentials?.filialId,
        });

        if (user && user.status === 200) {
          return user.data;
        }

        return null;
      },
    }),
  ],
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
  },
});
