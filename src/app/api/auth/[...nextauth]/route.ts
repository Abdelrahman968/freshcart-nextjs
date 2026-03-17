import NextAuth from 'next-auth';
import { nextAuthConfig } from '../../../../next-auth/nextAuth.config';

const handler = NextAuth(nextAuthConfig);

export { handler as GET, handler as POST };
