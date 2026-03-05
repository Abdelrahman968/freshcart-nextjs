'use client';
import Link from 'next/link';
import { FaBars, FaGift, FaHome, FaRegHeart, FaTruck } from 'react-icons/fa';
import Image from 'next/image';
import logo from '@assets/header/logo.svg';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import SearchHeader from '../SearchHeader/SearchHeader';

function MobileLinks() {
  const [showMobileLinks, setShowMobileLinks] = useState(false);
  return (
    <>
      <button
        onClick={() => setShowMobileLinks(prev => !prev)}
        className="xl:hidden bg-[#16A34A] w-10 h-10 rounded-full text-white flex items-center justify-center cursor-pointer"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <FaBars
            size={17}
            className={`absolute transition-all duration-300 ${
              showMobileLinks ? 'opacity-0 scale-75' : 'opacity-100 scale-100'
            }`}
          />
          <IoClose
            size={20}
            className={`absolute transition-all duration-300 ${
              showMobileLinks ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
            }`}
          />
        </div>
      </button>
      <div
        onClick={() => setShowMobileLinks(false)}
        className={`fixed inset-0 bg-black opacity-50 z-1 ${showMobileLinks ? 'block' : 'hidden'}`}
      />
      <div
        onClick={e => e.stopPropagation()}
        className={`bg-white fixed top-0 right-0 h-full w-80 max-w-[85vw] shadow-2xl transition-transform duration-300 overflow-y-auto p-5 ${showMobileLinks ? 'translate-x-0 z-50' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-2 pb-5">
          <Image
            src={logo}
            alt="Logo"
            width={165}
            height={32}
            loading="eager"
          />
          <button
            onClick={() => setShowMobileLinks(false)}
            className="cursor-pointer bg-[#F3F4F6] w-10 h-10 rounded-full flex items-center justify-center"
          >
            <IoClose size={20} strokeWidth={5} />
          </button>
        </div>
        <hr className="my-5 border-gray-200 w-full px-0" />
        <div className="my-5">
          <SearchHeader
            position="mobile"
            placeholder="Search products..."
            roundValue="rounded-lg"
            width="w-full"
            height="h-10"
          />
        </div>
        <hr className="my-5 border-gray-200 w-full px-0" />

        <ul className="flex flex-col gap-6 text-base">
          <li>
            <Link
              href="/"
              className="p-3 rounded-xl font-semibold text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300 ease-in-out"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/products"
              className="p-3 rounded-xl font-semibold text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300 ease-in-out"
            >
              Shop
            </Link>
          </li>
          <li>
            <Link
              href="/categories"
              className="p-3 rounded-xl font-semibold text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300 ease-in-out"
            >
              Categories
            </Link>
          </li>
          <li>
            <Link
              href="/brands"
              className="p-3 rounded-xl font-semibold text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300 ease-in-out"
            >
              Brands
            </Link>
          </li>
        </ul>
        <hr className="my-5 border-gray-200 w-full px-0" />

        <div className="flex flex-col gap-3">
          <Link
            href="/wishlist"
            className="active:scale-105 transition-all duration-300 ease-in-out"
          >
            <div className="flex justify-start items-center gap-2 bg-green-50 p-3 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <FaRegHeart color="#FB2C36" strokeWidth={5} />
              </div>
              <p className="lg:font-semibold text-base text-black">Wishlist</p>
            </div>
          </Link>
          <Link
            href="/cart"
            className="active:scale-105 transition-all duration-300 ease-in-out"
          >
            <div className="flex justify-start items-center gap-2 bg-green-50 p-3 rounded-xl">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FaTruck color="#16A34A" strokeWidth={5} />
              </div>
              <p className="lg:font-semibold text-base text-black">Cart</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

export default MobileLinks;
