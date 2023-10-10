import { withAuth } from 'next-auth/middleware';

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname.startsWith('/admin')) {
        return token?.role === 'ADMIN';
      }
      // `/me` only requires the user to be logged in
      return !!token;
    },
  },
});

export const config = { matcher: ['/admin', '/me'] };
