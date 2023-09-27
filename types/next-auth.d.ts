// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from 'next-auth';

type Role = 'ADMIN' | 'USER';

declare module 'next-auth' {
  interface AdapterUser {
    id: string;
  }

  interface User {
    id: string;
    role: Role;
    iat: number;
    exp: number;
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    iat: number;
    exp: number;
  }
}
