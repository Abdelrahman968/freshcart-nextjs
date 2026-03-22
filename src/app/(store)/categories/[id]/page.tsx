import { Metadata } from 'next';
import PageHeader from '../../../../components/PageHeader/PageHeader';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa';
import { getAllSubCategoriesOnCategory } from '../../../../services/subCategories.service';
import MainTitle from '../../../../components/MainTitle/MainTitle';
import { getSpecificCategory } from '../../../../services/categories.service';
import AppImage from '../../../../components/AppImage/AppImage';
import Link from 'next/link';
import SubCategoriesCard from '../../../../components/SubCategoriesCard/SubCategoriesCard';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const category = await getSpecificCategory(id);

  return {
    title: `${category.name} Sub Categories | FreshCart`,
    description: `${category.name} | FreshCart`,
    keywords: [category.name, 'sub categories', 'fresh cart'],
    authors: [{ name: 'Abdelrahman Ayman' }],
    creator: 'Abdelrahman Ayman',
    publisher: 'Abdelrahman Ayman',
  };
}

async function SubCategoriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const subCategories = await getAllSubCategoriesOnCategory(id);
  const category = await getSpecificCategory(id);

  return (
    <>
      <PageHeader
        title={`All ${category.name} Sub Categories`}
        subTitle={`Choose a ${category.name} subcategory to browse products`}
        subTitle2="Categories"
        subTitle2Link="/categories"
        icon={
          (category.image && (
            <AppImage
              src={category.image}
              alt={category.name}
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
          )) || <FaBoxOpen size={40} />
        }
      />
      <div className="container mx-auto px-4 py-8 flex flex-col gap-6 justify-start items-start">
        <Link
          className="inline-flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors duration-300 ease-in-out"
          href="/categories"
        >
          <FaArrowLeft />
          <span>Back to Categories</span>
        </Link>
        <div className="flex items-center justify-between w-full">
          <MainTitle
            textOne={`${subCategories.results} Subcategories in`}
            textTwo={category.name}
          />
          <p className="text-gray-600 text-sm hidden md:block">
            Showing {subCategories.data.length} of {subCategories.results} -
            page {subCategories.metadata.currentPage} of{' '}
            {subCategories.metadata.numberOfPages}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {subCategories.data.map(subCategory => (
            <SubCategoriesCard
              key={subCategory._id}
              subCategory={subCategory}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default SubCategoriesPage;
