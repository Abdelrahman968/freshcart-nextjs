'use client';
import Link from 'next/link';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface CategoryList {
  id: string;
  name: string;
  link: string;
}

const categories: CategoryList[] = [
  {
    id: '0',
    name: 'All Categories',
    link: '/categories',
  },
  {
    id: '6439d61c0049ad0b52b90051',
    name: 'Music',
    link: '/categories/6439d61c0049ad0b52b90051',
  },
  {
    id: '6439d58a0049ad0b52b9003f',
    name: "Women's Fashion",
    link: '/categories/6439d58a0049ad0b52b9003f',
  },
  {
    id: '6439d5b90049ad0b52b90048',
    name: "Men's Fashion",
    link: '/categories/6439d5b90049ad0b52b90048',
  },
  {
    id: '6439d30b67d9aa4ca97064b1',
    name: 'Beauty & Health',
    link: '/categories/6439d30b67d9aa4ca97064b1',
  },
];

function DesktopLinks() {
  const [showCategories, setShowCategories] = useState(false);
  return (
    <>
      <div
        onClick={() => setShowCategories(false)}
        className={`bg-transparent fixed inset-0 z-10 ${showCategories ? 'block' : 'hidden'}`}
      />
      <div className="font-medium text-base text-[#364153] hidden xl:block">
        <ul className="flex gap-5">
          <li className="hover:text-[#6AA64A] transition-colors duration-300">
            <Link href="/">Home</Link>
          </li>
          <li className="hover:text-[#6AA64A] transition-colors duration-300">
            <Link href="/products">Shop</Link>
          </li>
          <li className="relative">
            <button
              onClick={() => setShowCategories(prev => !prev)}
              className="cursor-pointer hover:text-[#6AA64A] transition-colors duration-300 flex items-center gap-1"
            >
              <p>Categories</p>
              <div className="icon">
                <IoIosArrowDown
                  className={`transition-transform duration-300 ${
                    showCategories ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </div>
            </button>
            <ul
              className={`absolute top-10 right-0 bg-white shadow-md rounded-md p-2 z-50 w-[170px] border border-gray-200 ${showCategories ? 'block' : 'hidden'}`}
            >
              {categories.map(category => (
                <li
                  key={category.id}
                  className="p-2 hover:bg-[#F0FDF4] hover:text-[#6AA64A]"
                  onClick={() => setShowCategories(false)}
                >
                  <Link
                    href={
                      category.name === 'All Categories'
                        ? '/categories'
                        : category.link
                    }
                    className="block"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="hover:text-[#6AA64A] transition-colors duration-300">
            <Link href="/brands">Brands</Link>
          </li>
        </ul>
      </div>
    </>
  );
}

export default DesktopLinks;
