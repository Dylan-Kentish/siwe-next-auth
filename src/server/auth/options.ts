import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { env } from '@/env.mjs';
import { prisma } from '../db';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialsProvider({
      name: 'Ethereum',
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
          const siwe = new SiweMessage(JSON.parse(credentials?.message || '{}'));

          const nonce = await getCsrfToken({ req: { ...req, body: undefined } });

          const result = await siwe.verify({
            signature: credentials?.signature || '',
            domain: env.VERIFIED_DOMAIN,
            nonce,
          });

          if (result.success) {
            return {
              id: siwe.address,
              role: 'USER',
            };
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
    async session({ session, token }) {
      const dbUser = await prisma.user.upsert({
        where: {
          id: token.id,
        },
        update: {},
        create: {
          id: token.id,
        },
      });
      session.user = dbUser;
      return session;
    },
    jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user) {
        token.id = user.id;
      }

      return token;
    },
  },
};
