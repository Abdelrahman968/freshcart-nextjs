import {
  LoginFormData,
  AuthResponse,
  AuthJSAuthorizeType,
} from './../types/login.type';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { DecodedJwtPayload, jwtDecoder } from '../utils/jwtDecoder';
import { AppSession, AppUser } from '../types/next-auth.types';

export const nextAuthConfig: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(
        credentials: LoginFormData | undefined
      ): Promise<AuthJSAuthorizeType | null> {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(credentials),
            }
          );

          const data: AuthResponse = await res.json();
          const decodedToken: DecodedJwtPayload | null = jwtDecoder(data.token);

          if (!decodedToken) return null;

          const finalData: AuthJSAuthorizeType = {
            id: decodedToken.id || new Date().toISOString(),
            name: data.user.name,
            email: data.user.email,
            routeToken: data.token,
            expiresAt: decodedToken.exp,
          };

          if (res.ok) {
            return finalData;
          }

          return null;
        } catch (error) {
          console.error('authorize error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        const u = user as AppUser;
        token.id = u.id;
        token.routeToken = u.routeToken;
        token.expiresAt = u.expiresAt;
      }

      if (token.expiresAt && Date.now() >= (token.expiresAt as number) * 1000) {
        token.error = 'TokenExpired';
      }

      return token;
    },
    session({ session, token }) {
      const s = session as AppSession;

      if (token.error === 'TokenExpired') {
        s.expiresAt = undefined;
        s.routeToken = undefined;

        return session;
      }

      if (token) {
        const u = token as AppUser;

        s.user.id = u.id;
        s.expiresAt = u.expiresAt;
      }

      return session;
    },
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
  session: {
    maxAge: 60 * 60 * 24 * 7,
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: 'fresh-cart.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NEXT_PUBLIC_ENV === 'production',
      },
    },
    callbackUrl: {
      name: 'fresh-cart.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NEXT_PUBLIC_ENV === 'production',
      },
    },
  },
  pages: {
    signIn: '/login',
  },
};
