'use client';
import { SessionProvider } from 'next-auth/react';

function SessionWrapperProvider({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default SessionWrapperProvider;
