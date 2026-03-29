import Link from 'next/link';
import { FaRegStar } from 'react-icons/fa6';
import ProductCard from '@components/ProductCard/ProductCard';
import type {
  ProductsResponse,
  CategoriesResponse,
  SearchParams,
} from '../../../components/search/search.types';
import SearchBar from '../../../components/search/SearchBar';
import SearchFilters from '../../../components/search/SearchFilters';
import SearchControls from '../../../components/search/SearchControls';
import SearchPagination from '../../../components/search/SearchPagination';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Search Results | FreshCart',
  description:
    'Search results for your query. Find the best products at FreshCart.',
  keywords: ['FreshCart', 'Search', 'Products'],
  openGraph: {
    title: 'Search Results | FreshCart',
    description:
      'Search results for your query. Find the best products at FreshCart.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Search Results | FreshCart',
    description:
      'Search results for your query. Find the best products at FreshCart.',
    site: '@FreshCart',
    creator: '@FreshCart',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const API = process.env.NEXT_PUBLIC_API_URL;

async function fetchCategories(): Promise<CategoriesResponse> {
  const res = await fetch(`${API}/categories?limit=40`, {
    next: { revalidate: 3600 },
  });
  if (!res.ok) throw new Error('Failed to fetch categories');
  return res.json();
}

async function fetchProducts(params: SearchParams): Promise<ProductsResponse> {
  const qs = new URLSearchParams();

  if (params.q) qs.set('keyword', params.q);
  if (params.sort) qs.set('sort', params.sort);
  if (params.priceMin) qs.set('price[gte]', params.priceMin);
  if (params.priceMax) qs.set('price[lte]', params.priceMax);
  if (params.brand) qs.set('brand', params.brand);
  if (params.page) qs.set('page', params.page);
  qs.set('limit', '12');

  const cats = Array.isArray(params.categories)
    ? params.categories
    : params.categories
      ? [params.categories]
      : [];
  cats.forEach(id => qs.append('category[in][]', id));

  const res = await fetch(`${API}/products?${qs.toString()}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Failed to fetch products');
  return res.json();
}

function EmptyState({ query }: { query: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <FaRegStar className="text-3xl text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">
        No products found
      </h3>
      <p className="text-gray-500 text-sm max-w-xs">
        {query
          ? `We couldn't find anything for "${query}". Try different keywords or remove filters.`
          : 'Try adjusting your filters to find what you are looking for.'}
      </p>
    </div>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const params = await searchParams;

  const q = (params.q as string) ?? '';
  const sort = (params.sort as string) ?? '';
  const page = (params.page as string) ?? '1';
  const view = ((params.view as string) ?? 'grid') as 'grid' | 'list';
  const priceMin = (params.priceMin as string) ?? '';
  const priceMax = (params.priceMax as string) ?? '';
  const brand = (params.brand as string) ?? '';
  const categories =
    typeof params.categories === 'string'
      ? [params.categories]
      : ((params.categories as string[]) ?? []);

  const [categoriesRes, productsRes] = await Promise.all([
    fetchCategories(),
    fetchProducts({ q, sort, page, priceMin, priceMax, brand, categories }),
  ]);

  const { data: allCategories } = categoriesRes;
  const { data: products, metadata, results } = productsRes;

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <span className="text-gray-300">/</span>
            <span className="text-gray-900 font-medium">Search Results</span>
            {q && (
              <>
                <span className="text-gray-300">/</span>
                <span className="text-green-600 font-medium">"{q}"</span>
              </>
            )}
          </nav>
          <SearchBar defaultValue={q} />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 shrink-0">
            <SearchFilters
              categories={allCategories}
              selectedCategories={categories}
              selectedBrand={brand}
              priceMin={priceMin}
              priceMax={priceMax}
            />
          </aside>

          <main className="flex-1 min-w-0">
            <SearchControls
              total={results}
              currentSort={sort}
              currentView={view}
              categories={allCategories}
              selectedCategories={categories}
              selectedBrand={brand}
              priceMin={priceMin}
              priceMax={priceMax}
            />

            {products.length === 0 ? (
              <EmptyState query={q} />
            ) : (
              <>
                <div
                  className={
                    view === 'grid'
                      ? 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4'
                      : 'flex flex-col gap-3'
                  }
                >
                  {products.map(product => (
                    <ProductCard
                      key={product._id}
                      id={product._id}
                      title={product.title}
                      category={product.category.name}
                      image={product.imageCover}
                      price={product.price}
                      priceAfterDiscount={product.priceAfterDiscount}
                      rating={product.ratingsAverage}
                      reviews={product.ratingsQuantity}
                      link={`/products/${product._id}`}
                      quantity={product.quantity}
                    />
                  ))}
                </div>

                <SearchPagination
                  currentPage={metadata.currentPage}
                  totalPages={metadata.numberOfPages}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
