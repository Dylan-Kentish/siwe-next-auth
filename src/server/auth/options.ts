import { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { env } from '@/env.mjs';
import type { NextApiRequest } from 'next';
import { prisma } from '../db';
import { cookies, headers } from 'next/headers';
import { getToken } from 'next-auth/jwt';

function getAuthOptions() {
  const options: NextAuthOptions = {
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
            const nextAuthUrl = new URL(env.VERIFIED_DOMAIN);

            const nonce = await getCsrfToken({ req: { ...req, body: undefined } });

            const result = await siwe.verify({
              signature: credentials?.signature || '',
              domain: nextAuthUrl.host,
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

  return options;
}

const getServerActionToken = async () => {
  const req = { cookies: cookies(), headers: headers() } as unknown as NextApiRequest;

  const token = await getToken({ req });

  return token;
};

export { getAuthOptions, getServerActionToken };
