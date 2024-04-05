import 'server-only';

import { ethers } from 'ethers';
import { type NextAuthOptions, getServerSession as getServerSessionInternal } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { SiweMessage } from 'siwe';

import { env } from '@/env.mjs';
import { prisma } from '@/server/db';

const projectId = env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 30 * 60, // 30 minutes
  },
  providers: [
    Credentials({
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
        csrfToken: {
          label: 'CSRF Token',
          type: 'text',
          placeholder: '0x0',
        },
      },
      async authorize(credentials, req) {
        try {
          if (!credentials) throw new Error('No credentials');
          if (!req.headers) throw new Error('No headers');

          const siwe = new SiweMessage(credentials.message);
          const provider = new ethers.JsonRpcProvider(
            `https://rpc.walletconnect.com/v1?chainId=eip155:${siwe.chainId}&projectId=${projectId}`
          );

          const result = await siwe.verify(
            {
              signature: credentials.signature,
              domain: req.headers.host,
              nonce: credentials.csrfToken,
            },
            {
              provider,
            }
          );

          if (result.success) {
            const dbUser = await prisma.user.upsert({
              where: {
                id: siwe.address,
              },
              update: {
                chainId: siwe.chainId,
              },
              create: {
                id: siwe.address,
                chainId: siwe.chainId,
              },
              select: {
                role: true,
              },
            });

            return {
              id: siwe.address,
              chainId: siwe.chainId,
              role: dbUser.role,
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
    jwt: async ({ token, user }) => {
      if (user) {
        // Persist the data to the token right after authentication
        token.id = user.id;
        token.chainId = user.chainId;
        token.role = user.role;
      } else {
        const dbUser = await prisma.user.findUniqueOrThrow({
          where: {
            id: token.id,
          },
          select: {
            chainId: true,
            role: true,
          },
        });

        token.chainId = dbUser.chainId;
        token.role = dbUser.role;
      }

      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.chainId = token.chainId;
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
