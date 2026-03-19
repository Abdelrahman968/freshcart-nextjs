import Link from 'next/link';
import { getAllCategories } from '@services/categories.service';
import MainTitle from '@components/MainTitle/MainTitle';
import AppImage from '../AppImage/AppImage';

async function CategoriesSection() {
  const data = await getAllCategories();

  return (
    <>
      <MainTitle
        textOne="Shop By"
        textTwo="Category"
        linkText="View All Categories"
        linkUrl="/categories"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {data?.map(cat => {
          return (
            <Link
              href={`/categories/${cat._id}`}
              key={cat._id}
              className="bg-white rounded-lg p-4 text-center shadow-sm hover:shadow-md transition group cursor-pointer"
            >
              <div className="h-20 w-20 overflow-hidden bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-green-200 transition">
                <AppImage
                  alt={`${cat.name}-Category`}
                  src={cat.image}
                  loading="lazy"
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                  style={{ color: 'transparent' }}
                />
              </div>
              <h3 className="font-medium">{cat.name}</h3>
            </Link>
          );
        })}
      </div>
    </>
  );
}

export default CategoriesSection;
