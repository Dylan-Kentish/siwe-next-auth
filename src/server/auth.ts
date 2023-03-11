import { type GetServerSidePropsContext } from "next";
import { getServerSession, type User, type NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env.mjs";
import { prisma } from "@/server/db";
import { SiweMessage } from "siwe";
import { getCsrfToken } from "next-auth/react";
import { type NextApiRequest } from "next/types";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export function getAuthOptions(req: NextApiRequest): NextAuthOptions {
  const providers = [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials): Promise<User | null> {
        try {
          const siwe = new SiweMessage(
            JSON.parse(credentials?.message || "{}") as Partial<SiweMessage>
          );

          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: env.NEXTAUTH_URL,
            nonce: await getCsrfToken({ req }),
          });

          if (result.success) {
            return {
              id: siwe.address,
              role: "USER",
            };
          }
          return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage = req.method === "GET" && req.query?.nextauth?.includes("signin");

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return {
    providers,
    session: {
      strategy: "jwt",
    },
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
        if (user) {
          token.id = user.id;
        }

        return token;
      },
    },
  };
}

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
  req: GetServerSidePropsContext["req"];
  res: GetServerSidePropsContext["res"];
}) => {
  return getServerSession(ctx.req, ctx.res, getAuthOptions(ctx.req as NextApiRequest));
};
