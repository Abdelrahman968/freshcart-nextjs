import FeaturedProducts from '@components/FeaturedProducts/FeaturedProducts';
import PageHeader from '@components/PageHeader/PageHeader';
import { FaBoxOpen } from 'react-icons/fa';
import MainTitle from '../../../components/MainTitle/MainTitle';
import Pagination from '../../../components/Pagination/Pagination';
import { getFeaturedProducts } from '../../../services/products.service';
import Link from 'next/link';

async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ page: number; brand: string }>;
}) {
  const { page, brand } = await searchParams;

  const featuredProducts = await getFeaturedProducts(page, brand);

  const metadata = featuredProducts?.metadata || {
    currentPage: 1,
    numberOfPages: 1,
    limit: 1,
  };

  return (
    <>
      <PageHeader
        title="All Products"
        subTitle="Explore our complete product collection"
        icon={<FaBoxOpen size={40} />}
      />
      <div className="container mx-auto px-4 py-8 flex flex-col gap-6 justify-center items-center">
        {(featuredProducts?.data?.length ?? 0) ? (
          <div>
            <div className="flex justify-between items-center">
              <MainTitle textOne="All" textTwo="Products" />
              <p className="text-gray-600 text-sm hidden md:block">
                Showing {featuredProducts?.data.length} of{' '}
                {featuredProducts?.results} products
              </p>
            </div>
            <FeaturedProducts page={page} brand={brand} />
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
              <FaBoxOpen size={40} className="text-gray-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">
              No Products Found
            </h3>
            <p className="text-gray-500 mb-6">
              No products match your current filters.
            </p>
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors cursor-pointer duration-300 ease-in-out"
              href="/products"
            >
              View All Products
            </Link>
          </div>
        )}
        <Pagination
          currentPage={metadata.currentPage}
          numberOfPages={metadata.numberOfPages}
        />
      </div>
    </>
  );
}

export default ProductsPage;
