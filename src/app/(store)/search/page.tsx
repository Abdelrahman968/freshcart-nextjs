import React from 'react';

async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  return <div className="py-20 flex items-center justify-center">{q}</div>;
}

export default SearchPage;
