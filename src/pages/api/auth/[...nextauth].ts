import NextAuth from 'next-auth';
import { getAuthOptions } from '@/server/auth/options';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  return NextAuth(req, res, getAuthOptions(req));
}
