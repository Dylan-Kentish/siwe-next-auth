// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

type Role = 'ADMIN' | 'USER';

declare module 'next-auth' {
  interface User {
    id: string;
    chainId: number;
    role: Role;
  }

  interface Session {
    user: User;
    iat: number;
    exp: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    chainId: number;
    role: Role;
    iat: number;
    exp: number;
  }
}
