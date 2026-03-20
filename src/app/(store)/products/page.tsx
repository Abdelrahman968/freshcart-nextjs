import FeaturedProducts from '@components/FeaturedProducts/FeaturedProducts';
import PageHeader from '@components/PageHeader/PageHeader';
import { FaBoxOpen } from 'react-icons/fa';
import MainTitle from '../../../components/MainTitle/MainTitle';
import Pagination from '../../../components/Pagination/Pagination';
import { getFeaturedProducts } from '../../../services/products.service';
import Link from 'next/link';
import Filters from '../../../components/Filters/Filters';
import AppImage from '../../../components/AppImage/AppImage';
import { getBrandById } from '../../../services/brands.service';

import defaultBrandImage from '@assets/ImagePlaceHolder/default-brand-image.png';

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

  let brandData;
  if (brand) {
    brandData = await getBrandById(brand);
  }

  return (
    <>
      <PageHeader
        title={
          brand ? `${brandData?.name || 'Unknown'} Products` : 'All Products'
        }
        subTitle={
          brand
            ? `Explore ${brandData?.name || 'Unknown'} products`
            : 'Explore our complete product collection'
        }
        icon={
          brand ? (
            <AppImage
              src={brandData?.image || defaultBrandImage}
              alt={brandData?.name || 'Brand Image'}
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
          ) : (
            <FaBoxOpen size={40} />
          )
        }
      />

      <div className="container mx-auto px-4 py-8 flex flex-col gap-6 justify-center items-center">
        {brand && (
          <Filters
            itemName={brandData?.name || 'Product'}
            fallbackURL="brands"
          />
        )}
        {(featuredProducts?.data?.length ?? 0) ? (
          <div>
            <div className="flex justify-between items-center">
              <MainTitle
                textOne="All"
                textTwo={
                  brand
                    ? `${brandData?.name || 'Unknown'} Products`
                    : 'Products'
                }
              />
              <p className="text-gray-600 text-sm hidden md:block">
                Showing {featuredProducts?.data.length} of{' '}
                {featuredProducts?.results}{' '}
                {brand
                  ? `${featuredProducts?.data[0].brand.name} Products`
                  : 'Featured Products'}
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
              {brand
                ? `${brandData?.name || 'Unknown'} Products`
                : 'No Products Found'}
            </h3>
            <p className="text-gray-500 mb-6">
              No products match your current filters.
            </p>
            <Link
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors cursor-pointer duration-300 ease-in-out"
              href={brand ? '/brands' : '/products'}
            >
              {brand ? 'View All Brands' : 'View All Products'}
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
