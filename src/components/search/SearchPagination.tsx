'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function SearchPagination({
  currentPage,
  totalPages,
}: SearchPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  const pages: (number | '...')[] = [];
  const delta = 1;
  const range: number[] = [];

  for (
    let i = Math.max(2, currentPage - delta);
    i <= Math.min(totalPages - 1, currentPage + delta);
    i++
  ) {
    range.push(i);
  }

  if (currentPage - delta > 2) pages.push(1, '...');
  else pages.push(1);

  pages.push(...range);

  if (currentPage + delta < totalPages - 1) pages.push('...', totalPages);
  else if (totalPages > 1) pages.push(totalPages);

  return (
    <div
      className={`flex items-center justify-center gap-2 mt-10 transition-opacity ${
        isPending ? 'opacity-50 pointer-events-none' : ''
      }`}
    >
      <button
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FaChevronLeft className="text-xs" />
      </button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span
            key={`dots-${i}`}
            className="w-10 h-10 flex items-center justify-center text-gray-400 text-sm"
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => goTo(page as number)}
            className={`w-10 h-10 rounded-lg flex items-center justify-center font-medium text-sm transition-colors ${
              currentPage === page
                ? 'bg-green-600 text-white'
                : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <FaChevronRight className="text-xs" />
      </button>
    </div>
  );
}
