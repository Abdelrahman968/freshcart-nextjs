'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addToast } from '@heroui/toast';
import { Button } from '@heroui/react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: ErrorPageProps) {
  const router = useRouter();

  useEffect(() => {
    addToast({
      title: 'Something went wrong',
      description: error.message || 'Something went wrong, please try again',
      color: 'danger',
      timeout: 5000,
      shouldShowTimeoutProgress: true,
    });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-3">
      <p className="text-default-400 text-sm">
        Something went wrong in the FreshCart
      </p>
      <div className="flex gap-2">
        <Button color="primary" size="sm" onPress={reset}>
          Try Again!
        </Button>
        <Button variant="bordered" size="sm" onPress={() => router.push('/')}>
          Home
        </Button>
      </div>
    </div>
  );
}
