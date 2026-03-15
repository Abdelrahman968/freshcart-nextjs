import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';
import { CategoriesType } from '../../types/category.type';
import AppImage from '../AppImage/AppImage';

function CategoryCard({ category }: { category: CategoriesType }) {
  return (
    <Link
      className="group bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 hover:-translate-y-1"
      href={`/categories/${category._id}`}
    >
      <div className="aspect-square rounded-xl overflow-hidden bg-gray-50 mb-4">
        <AppImage
          alt={category.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-in-out"
          src={category.image}
          width={500}
          height={500}
        />
      </div>
      <h3 className="font-bold text-gray-900 text-center group-hover:text-green-600 transition-colors duration-300 ease-in-out">
        {category.name}
      </h3>
      <div className="flex justify-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        <span className="text-xs text-green-600 flex items-center gap-1">
          View Subcategories
          <FaArrowRight />
        </span>
      </div>
    </Link>
  );
}

export default CategoryCard;
