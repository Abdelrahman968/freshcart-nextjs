'use client';
import { Pagination as PaginationHeroUI } from '@heroui/react';
import { useRouter } from 'next/navigation';

function Pagination({
  currentPage,
  numberOfPages,
}: {
  currentPage: number;
  numberOfPages: number;
}) {
  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <PaginationHeroUI
      showControls
      initialPage={currentPage}
      total={numberOfPages}
      color="success"
      onChange={handlePageChange}
    />
  );
}

export default Pagination;
