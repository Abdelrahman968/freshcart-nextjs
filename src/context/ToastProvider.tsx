'use client';

import { HeroUIProvider } from '@heroui/react';
import { ToastProvider } from '@heroui/toast';
import NetWorkStatusToast from '@components/NetWorkStatusToast/NetWorkStatusToast';

export function ToastProviderHeroUI({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <HeroUIProvider>
      <ToastProvider placement="bottom-left" />
      <NetWorkStatusToast />
      {children}
    </HeroUIProvider>
  );
}
