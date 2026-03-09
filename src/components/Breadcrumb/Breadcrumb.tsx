'use client';

import Link from 'next/link';
import { FaChevronRight, FaHouse } from 'react-icons/fa6';

interface BreadcrumbProps {
  homeURL?: string;
  categoryURL?: string;
  SubCategoryURL?: string;
  categoryName?: string;
  SubCategoryName?: string;
  productName?: string;
}

function Breadcrumb({
  homeURL = '/',
  categoryURL,
  SubCategoryURL,
  categoryName,
  SubCategoryName,
  productName,
}: BreadcrumbProps) {
  const items = [
    {
      id: 0,
      label: 'Home',
      url: homeURL,
      icon: <FaHouse className="text-xs" />,
    },
    { id: 1, label: categoryName, url: categoryURL },
    { id: 2, label: SubCategoryName, url: SubCategoryURL },
    { id: 3, label: productName },
  ].filter(item => item.label || item.icon);

  return (
    <nav aria-label="Breadcrumb" className="py-4">
      <div className="container mx-auto px-4">
        <ol className="flex items-center flex-wrap gap-1 text-sm">
          {items.map((item, index) => (
            <li key={item.id} className="flex items-center">
              {item.url ? (
                <Link
                  href={item.url}
                  className="text-gray-500 hover:text-green-600 transition flex items-center gap-1.5"
                >
                  {item.icon}
                  {item.label}
                </Link>
              ) : (
                <span className="text-gray-900 font-medium truncate max-w-xs">
                  {item.label}
                </span>
              )}

              {index < items.length - 1 && (
                <FaChevronRight className="text-gray-400 text-xs mx-2" />
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}

export default Breadcrumb;
