'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTransition, useState } from 'react';
import { FaSliders, FaGripVertical, FaList } from 'react-icons/fa6';
import type { Category } from './search.types';
import SearchFilters from './SearchFilters';

const SORT_OPTIONS = [
  { value: '', label: 'Relevance' },
  { value: 'price', label: 'Price: Low to High' },
  { value: '-price', label: 'Price: High to Low' },
  { value: '-ratingsAverage', label: 'Rating: High to Low' },
  { value: 'title', label: 'Name: A to Z' },
  { value: '-title', label: 'Name: Z to A' },
];

interface SearchControlsProps {
  total: number;
  currentSort: string;
  currentView: 'grid' | 'list';
  categories: Category[];
  selectedCategories: string[];
  selectedBrand: string;
  priceMin: string;
  priceMax: string;
}

export default function SearchControls({
  total,
  currentSort,
  currentView,
  categories,
  selectedCategories,
  selectedBrand,
  priceMin,
  priceMax,
}: SearchControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.set('page', '1');
    startTransition(() => router.push(`${pathname}?${params.toString()}`));
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            <FaSliders className="text-sm" />
            Filters
            {(selectedCategories.length > 0 ||
              selectedBrand ||
              priceMin ||
              priceMax) && (
              <span className="w-5 h-5 rounded-full bg-green-600 text-white text-xs flex items-center justify-center">
                {selectedCategories.length +
                  (selectedBrand ? 1 : 0) +
                  (priceMin || priceMax ? 1 : 0)}
              </span>
            )}
          </button>

          <div className="flex items-center gap-1 bg-white rounded-lg border border-gray-200 p-1">
            <button
              onClick={() => updateParam('view', 'grid')}
              className={`p-2 rounded-md transition-colors ${
                currentView === 'grid'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="Grid view"
            >
              <FaGripVertical className="text-sm" />
            </button>
            <button
              onClick={() => updateParam('view', 'list')}
              className={`p-2 rounded-md transition-colors ${
                currentView === 'list'
                  ? 'bg-green-600 text-white'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="List view"
            >
              <FaList className="text-sm" />
            </button>
          </div>

          <p className="text-sm text-gray-500">
            <span className="font-semibold text-gray-800">{total}</span>{' '}
            products found
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Sort by:</span>
          <select
            value={currentSort}
            onChange={e => updateParam('sort', e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none bg-white cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-y-auto p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-gray-900">Filters</h2>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                ✕
              </button>
            </div>
            <SearchFilters
              categories={categories}
              selectedCategories={selectedCategories}
              selectedBrand={selectedBrand}
              priceMin={priceMin}
              priceMax={priceMax}
            />
          </div>
        </div>
      )}
    </>
  );
}
