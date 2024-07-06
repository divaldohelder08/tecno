import api from '@/lib/axios';
import CredentialsProvider from 'next-auth/providers/credentials';

export const credentialsProvider = CredentialsProvider({
  name: "credentials",
  credentials: {
    email: {
      label: 'E-mail',
      type: 'email',
      placeholder: 'use john@acme.com',
      value: 'john@acme.com',
    },
    password: {
      label: 'Password',
      type: 'password',
      value: 'admin',
      placeholder: 'use 123456',
    },
  },
  async authorize(credentials) {
    const user = await api.post("/auth", {
      email: credentials?.email,
      password: credentials?.password,
    });

    if (user && user.status === 200) {
      return user.data;
    }

    return null;

  }
})
