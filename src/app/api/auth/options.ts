import 'server-only';

import { type NextAuthOptions, getServerSession as getServerSessionInternal } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';

import { env } from '@/env.mjs';
import { prisma } from '@/server/db';

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

          const nonce = await getCsrfToken({ req: { headers: req.headers } });

          const result = await siwe.verify({
            signature: credentials?.signature || '',
            domain: env.VERIFIED_DOMAIN,
            nonce,
          });

          if (result.success) {
            const dbUser = await prisma.user.upsert({
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

            return {
              id: siwe.address,
              role: dbUser.role,
              iat: Math.floor(Date.now() / 1000),
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
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
    session({ session, token }) {
      session.user = token;
      return session;
    },
    async jwt({ token, user }) {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      if (user) {
        // Persist the id and role to the token right after authentication
        token.id = user.id;
        token.role = user.role;
      } else {
        const dbUser = await prisma.user.findUniqueOrThrow({
          where: {
            id: token.id,
          },
          select: {
            role: true,
          },
        });

        token.role = dbUser.role;
      }

      return token;
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
