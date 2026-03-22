import Link from 'next/link';
import { FaArrowRight, FaBoxOpen } from 'react-icons/fa';
import type { SubCategoryData } from '../../types/subCategories.type';

function SubCategoriesCard({ subCategory }: { subCategory: SubCategoryData }) {
  return (
    <>
      <Link
        className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-green-600 transition-all duration-300 hover:-translate-y-1"
        href={`/products?subcategory=${subCategory._id}`}
      >
        <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center mb-4 group-hover:bg-green-100 transition-colors">
          <FaBoxOpen size={24} className="text-green-600" />
        </div>
        <h3 className="font-bold text-gray-900 text-lg group-hover:text-green-600 transition-colors mb-2">
          {subCategory.name}
        </h3>
        <div className="flex items-center gap-2 text-sm text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
          <span>Browse Products</span>
          <FaArrowRight />
        </div>
      </Link>
    </>
  );
}

export default SubCategoriesCard;
