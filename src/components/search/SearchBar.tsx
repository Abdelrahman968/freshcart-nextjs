'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useRef, useTransition } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';

interface SearchBarProps {
  defaultValue?: string;
}

export default function SearchBar({ defaultValue = '' }: SearchBarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = inputRef.current?.value.trim() ?? '';
    const params = new URLSearchParams(searchParams.toString());

    if (q) {
      params.set('q', q);
    } else {
      params.delete('q');
    }
    params.set('page', '1');

    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="relative">
        <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
        <input
          ref={inputRef}
          type="text"
          defaultValue={defaultValue}
          placeholder="Search for products..."
          className={`w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-500/20 outline-none transition-all text-lg bg-white ${
            isPending ? 'opacity-70' : ''
          }`}
        />
        {isPending && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
    </form>
  );
}
