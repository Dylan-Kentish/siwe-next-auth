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
  }

  interface Session {
    user: User;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}
