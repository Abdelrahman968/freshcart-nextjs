import { AppUser } from './../types/next-auth.types';
import { decode, JWT } from 'next-auth/jwt';
import { mainToken } from '../lib/auth';

export async function decodeAuthUserToken() {
  const nextAuthToken = await mainToken.get();

  if (!nextAuthToken) return null;

  const decodedToken: JWT | null = await decode({
    token: nextAuthToken,
    secret: process.env.NEXTAUTH_SECRET || '',
  });

  if (!decodedToken) return null;

  const user = decodedToken as AppUser;

  return user?.routeToken ?? null;
}
