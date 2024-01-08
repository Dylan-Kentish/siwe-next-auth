import 'server-only';

import { PrismaClient } from '@prisma/client';

import { env } from '@/env.mjs';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: env.NODE_ENV === 'development' ? ['error', 'warn'] : ['error'],
  });
};

const globalForPrisma = globalThis as unknown as {
  prisma?: ReturnType<typeof prismaClientSingleton>;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

if (env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export { prisma };
