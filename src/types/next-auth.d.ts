import { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user'];

    routeToken?: string;
    expiresAt?: number;
  }

  interface User extends DefaultUser {
    id: string;
    role: string;
    routeToken: string;
    expiresAt: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
    routeToken: string;
    expiresAt: number;
    error?: string;
  }
}
