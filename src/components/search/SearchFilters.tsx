'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useState, useTransition } from 'react';
import type { Category } from './search.types';

const PRICE_PRESETS = [
  { label: 'Under 500', max: 500 },
  { label: 'Under 1K', max: 1000 },
  { label: 'Under 5K', max: 5000 },
  { label: 'Under 10K', max: 10000 },
];

const BRANDS = [
  { id: '6212b6b488f2cee15c5db3c8', name: 'Canon' },
  { id: '64089bbe24b25627a253158b', name: 'DeFacto' },
  { id: '64089b4924b25627a2531568', name: 'Dell' },
  { id: '64089b9124b25627a2531580', name: 'Lenovo' },
  { id: '64089b7c24b25627a2531577', name: 'SONY' },
  { id: '64089b6724b25627a253156e', name: 'Infinix' },
  { id: '6408985e24b25627a253154d', name: 'Realme' },
  { id: '64089b5b24b25627a2531574', name: 'HONOR' },
  { id: '64089b4224b25627a2531565', name: 'Nokia' },
  { id: '64089b3724b25627a2531562', name: 'OPPO' },
  { id: '64089b2d24b25627a253155f', name: 'Huawei' },
  { id: '64089b1b24b25627a2531559', name: 'Apple' },
  { id: '64089b0f24b25627a2531556', name: 'Xiaomi' },
  { id: '64089ae424b25627a2531550', name: 'Samsung' },
  { id: '64089ab924b25627a253154a', name: 'Jack & Jones' },
  { id: '64089aa824b25627a2531547', name: 'LC Waikiki' },
];

interface SearchFiltersProps {
  categories: Category[];
  selectedCategories: string[];
  selectedBrand: string;
  priceMin: string;
  priceMax: string;
}

export default function SearchFilters({
  categories,
  selectedCategories,
  selectedBrand,
  priceMin,
  priceMax,
}: SearchFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [localPriceMin, setLocalPriceMin] = useState(priceMin);
  const [localPriceMax, setLocalPriceMax] = useState(priceMax);

  const createQueryString = useCallback(
    (updates: Record<string, string | string[] | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set('page', '1');

      Object.entries(updates).forEach(([key, value]) => {
        if (
          value === null ||
          value === '' ||
          (Array.isArray(value) && value.length === 0)
        ) {
          params.delete(key);
        } else if (Array.isArray(value)) {
          params.delete(key);
          value.forEach(v => params.append(key, v));
        } else {
          params.set(key, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  const push = (qs: string) =>
    startTransition(() => router.push(`${pathname}?${qs}`));

  const toggleCategory = (id: string) => {
    const next = selectedCategories.includes(id)
      ? selectedCategories.filter(c => c !== id)
      : [...selectedCategories, id];
    push(createQueryString({ categories: next }));
  };

  const toggleBrand = (id: string) => {
    push(createQueryString({ brand: selectedBrand === id ? null : id }));
  };

  const applyPreset = (max: number) => {
    setLocalPriceMin('');
    setLocalPriceMax(String(max));
    push(createQueryString({ priceMin: null, priceMax: String(max) }));
  };

  const applyPrice = () => {
    push(
      createQueryString({
        priceMin: localPriceMin || null,
        priceMax: localPriceMax || null,
      })
    );
  };

  const clearAll = () => {
    setLocalPriceMin('');
    setLocalPriceMax('');
    const q = searchParams.get('q');
    startTransition(() =>
      router.push(`${pathname}${q ? `?q=${encodeURIComponent(q)}` : ''}`)
    );
  };

  const hasFilters =
    selectedCategories.length > 0 || selectedBrand || priceMin || priceMax;

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 p-6 sticky top-24 transition-opacity ${
        isPending ? 'opacity-60 pointer-events-none' : ''
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-bold text-gray-900 text-base">Filters</h2>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* ── Categories ── */}
        <section>
          <h3 className="font-semibold text-gray-800 text-sm mb-3">
            Categories
          </h3>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1 scrollbar-thin">
            {categories.map(cat => (
              <label
                key={cat._id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat._id)}
                  onChange={() => toggleCategory(cat._id)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {cat.name}
                </span>
              </label>
            ))}
          </div>
        </section>

        <hr className="border-gray-100" />

        <section>
          <h3 className="font-semibold text-gray-800 text-sm mb-3">
            Price Range
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-3">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Min (EGP)
              </label>
              <input
                type="number"
                placeholder="0"
                value={localPriceMin}
                onChange={e => setLocalPriceMin(e.target.value)}
                onBlur={applyPrice}
                onKeyDown={e => e.key === 'Enter' && applyPrice()}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">
                Max (EGP)
              </label>
              <input
                type="number"
                placeholder="No limit"
                value={localPriceMax}
                onChange={e => setLocalPriceMax(e.target.value)}
                onBlur={applyPrice}
                onKeyDown={e => e.key === 'Enter' && applyPrice()}
                className="w-full px-3 py-2 rounded-lg border border-gray-200 text-sm focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-colors"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {PRICE_PRESETS.map(preset => {
              const active =
                localPriceMax === String(preset.max) && !localPriceMin;
              return (
                <button
                  key={preset.max}
                  onClick={() => applyPreset(preset.max)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    active
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>
        </section>

        <hr className="border-gray-100" />

        <section>
          <h3 className="font-semibold text-gray-800 text-sm mb-3">Brands</h3>
          <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
            {BRANDS.map(brand => (
              <label
                key={brand.id}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={selectedBrand === brand.id}
                  onChange={() => toggleBrand(brand.id)}
                  className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900 transition-colors">
                  {brand.name}
                </span>
              </label>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
