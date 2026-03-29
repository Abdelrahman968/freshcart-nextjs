import { FaBoxOpen } from 'react-icons/fa';
import PageHeader from '../../../components/PageHeader/PageHeader';
import MainTitle from '../../../components/MainTitle/MainTitle';
import CategoryCard from '../../../components/CategoryCard/CategoryCard';
import { getAllCategories } from '../../../services/categories.service';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Categories | FreshCart`,
    description: `Shop from a wide range of categories at FreshCart. Discover fresh food, organic products, and daily essentials.`,
    keywords: [
      'Categories',
      'FreshCart',
      'Online Grocery',
      'Fresh Food',
      'Organic Products',
    ],
    authors: [{ name: 'Abdelrahman Ayman' }],
    creator: 'Abdelrahman Ayman',
    publisher: 'Abdelrahman Ayman',
    openGraph: {
      title: `Categories | FreshCart`,
      description: `Shop from a wide range of categories at FreshCart. Discover fresh food, organic products, and daily essentials.`,
      siteName: 'FreshCart',
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      title: `Categories | FreshCart`,
      description: `Shop from a wide range of categories at FreshCart. Discover fresh food, organic products, and daily essentials.`,
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
}

async function CategoriesPage() {
  const categories = await getAllCategories();
  return (
    <>
      <PageHeader
        title="All Categories"
        subTitle="Explore our complete categories"
        icon={<FaBoxOpen size={40} />}
      />
      <div className="container mx-auto px-4 py-8 flex flex-col gap-6 justify-start items-start">
        <MainTitle textOne="All" textTwo="Categories" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {categories?.map(category => (
            <CategoryCard key={category._id} category={category} />
          ))}
        </div>
      </div>
    </>
  );
}

export default CategoriesPage;
