import { FaTags } from 'react-icons/fa';
import PageHeader from '../../../components/PageHeader/PageHeader';
import MainTitle from '../../../components/MainTitle/MainTitle';
import { Metadata } from 'next';
import BrandCard from '../../../components/BrandCard/BrandCard';
import { getAllBrands } from '../../../services/brands.service';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Brands Page | FreshCart`,
    description: `Brands Page | FreshCart`,
    keywords: ['Brands Page'],
    authors: [{ name: 'Abdelrahman Ayman' }],
    creator: 'Abdelrahman Ayman',
    publisher: 'Abdelrahman Ayman',
  };
}

async function BrandsPage() {
  const brands = await getAllBrands();
  return (
    <>
      <PageHeader
        title="Top Brands"
        subTitle="Shop from your favorite brands"
        icon={<FaTags size={40} />}
      />
      <div className="container mx-auto px-4 py-8 flex flex-col gap-6 justify-start items-start">
        <MainTitle textOne="All" textTwo="Brands" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-5">
          {brands?.map(brand => (
            <BrandCard key={brand._id} brand={brand} />
          ))}
        </div>
      </div>
    </>
  );
}

export default BrandsPage;
