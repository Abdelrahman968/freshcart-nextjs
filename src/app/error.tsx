'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { addToast } from '@heroui/toast';
import { MdErrorOutline } from 'react-icons/md';
import { IoReloadOutline } from 'react-icons/io5';
import { GoHome } from 'react-icons/go';
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-10 max-w-sm w-full text-center">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-50 mx-auto mb-6">
          <MdErrorOutline className="text-green-600 text-3xl" />
        </div>

        <h1 className="text-gray-800 text-xl font-semibold mb-2">
          Something went wrong
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          An unexpected error occurred in FreshCart. Please try again or return
          to the homepage.
        </p>

        <div className="flex flex-col gap-3">
          <Button
            onPress={reset}
            className="flex items-center justify-center gap-2 w-full bg-green-600 hover:bg-green-700 active:bg-green-800 text-white text-sm font-medium rounded-xl py-2.5 transition-colors duration-150"
            color="success"
            variant="solid"
            size="md"
          >
            <IoReloadOutline className="text-base" />
            Try Again
          </Button>
          <Button
            onPress={() => router.push('/')}
            className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-50 active:bg-gray-100 text-gray-600 text-sm font-medium rounded-xl py-2.5 border border-gray-200 transition-colors duration-150"
            color="primary"
            variant="solid"
            size="md"
          >
            <GoHome className="text-base" />
            Go Home
          </Button>
        </div>

        {error.digest && (
          <p className="mt-6 text-xs text-gray-300">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
