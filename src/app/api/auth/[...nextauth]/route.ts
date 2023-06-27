import { getAuthOptions } from '@/server/auth/options';
import NextAuth from 'next-auth';

const handler = NextAuth(getAuthOptions());

export { handler as GET, handler as POST };
