'use client';
import { Pagination as PaginationHeroUI } from '@heroui/react';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  numberOfPages: number;
  sectionId?: string | undefined;
}

function Pagination({
  currentPage,
  numberOfPages,
  sectionId,
}: PaginationProps) {
  const router = useRouter();
  const handlePageChange = (newPage: number) => {
    router.push(`?page=${newPage}`);

    const section = document.getElementById(sectionId!);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
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
