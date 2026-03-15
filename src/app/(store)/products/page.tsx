import FeaturedProducts from '@components/FeaturedProducts/FeaturedProducts';
import PageHeader from '@components/PageHeader/PageHeader';
import { FaBoxOpen } from 'react-icons/fa';
import MainTitle from '../../../components/MainTitle/MainTitle';
import Pagination from '../../../components/Pagination/Pagination';
import { getFeaturedProducts } from '../../../services/products.service';

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
        <Pagination
          currentPage={metadata.currentPage}
          numberOfPages={metadata.numberOfPages}
        />
      </div>
    </>
  );
}

export default ProductsPage;
