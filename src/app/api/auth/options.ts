import 'server-only';

import { type NextAuthOptions, getServerSession as getServerSessionInternal } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';

import { prisma } from '@/server/db';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      id: 'siwe',
      name: 'SIWE',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) throw new Error('No credentials');
          if (!req.headers) throw new Error('No headers');

          const siwe = new SiweMessage(JSON.parse(credentials.message));
          const nonce = await getCsrfToken({ req: { headers: req.headers } });

          const result = await siwe.verify({
            signature: credentials.signature,
            domain: req.headers.host,
            nonce,
          });

          if (result.success) {
            const user = await prisma.user.upsert({
              where: {
                id: siwe.address,
              },
              update: {},
              create: {
                id: siwe.address,
              },
              select: {
                id: true,
                role: true,
              },
            });

            return user;
          } else {
            return null;
          }
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Persist the data to the token right after authentication
        token.id = user.id;
        token.role = user.role;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.iat = token.iat;
      session.exp = token.exp;
      return session;
    },
  },
  pages: {
    signIn: '/siwe',
  },
};

export async function getServerSession() {
  const session = await getServerSessionInternal(authOptions);

  return session;
}
