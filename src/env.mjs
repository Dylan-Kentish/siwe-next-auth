/* eslint-disable @typescript-eslint/naming-convention */

import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    NEXTAUTH_URL: z.preprocess(
      // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
      // Since NextAuth.js automatically uses the VERCEL_URL if present.
      str => (str ? str : `https://${process.env.VERCEL_URL}`),
      z.string().url()
    ),
  },
  client: {
    NEXT_PUBLIC_ALCHEMY_API_KEY: z.string(),
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: z.string(),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_ALCHEMY_API_KEY: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
  },
});

export { env };
