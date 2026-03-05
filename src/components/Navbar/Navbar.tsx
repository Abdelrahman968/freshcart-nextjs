import Image from 'next/image';
import logo from '@assets/header/logo.svg';

import TopNav from '@components/TopNav/TopNav';
import SearchHeader from '@components/SearchHeader/SearchHeader';
import DesktopLinks from '@components/DesktopLinks/DesktopLinks';
import MobileLinks from '@components/MobileLinks/MobileLinks';
import UserHeader from '@components/UserHeader/UserHeader';

import Link from 'next/link';
import { BiSupport } from 'react-icons/bi';
import { FaRegHeart, FaShoppingCart } from 'react-icons/fa';

function Navbar() {
  return (
    <>
      <TopNav />
      <header className="w-full flex justify-between items-center px-5 md:px-10 xl:px-5 3xl:px-20 h-[72px] text-sm text-gray-500 border-b border-[#F1F2F4] sticky top-0 z-50 bg-white">
        <nav className="w-full h-full flex xl:justify-between justify-between items-center gap-5">
          <div className="flex items-center gap-5">
            <Link
              href="/"
              className="block w-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <Image
                src={logo}
                alt="Logo"
                width={165}
                height={32}
                loading="eager"
              />
            </Link>
            <div className="relative w-full mr-5 hidden md:block">
              <SearchHeader
                position="desktop"
                roundValue="rounded-full"
                width="2xl:w-[550px] xl:w-[400px] lg:w-[340px] w-[350px]"
                height="h-10"
                placeholder="Search products, brands and more..."
              />
            </div>
          </div>
          <DesktopLinks />
          <div className="flex items-center gap-4 ml-6.5">
            <Link
              href="/support"
              className="items-center gap-2 hover:text-[#6AA64A] transition-colors duration-300 hidden xl:flex"
            >
              <div className="w-10 h-10 rounded-full bg-[#F0FDF4] flex items-center justify-center">
                <BiSupport color="#16A34A" size={20} strokeWidth={1.1} />
              </div>
              <div className="flex flex-col">
                <p className="text-xs font-medium text-[#99A1AF]">Support</p>
                <p className="text-sm font-medium">
                  24/7 <span className="text-[#16A34A]">Help</span>
                </p>
              </div>
            </Link>
            <div className="w-[2px] h-10 bg-[#E5E7EB] hidden xl:block" />
            <div className="flex items-center gap-2">
              <Link
                href="/wishlist"
                className="w-10 h-10 rounded-full hover:bg-[#F0FDF4] flex items-center justify-center hover:text-[#16A34A] transition-all duration-300 ease-in-out cursor-pointer"
              >
                <FaRegHeart size={20} strokeWidth={1.1} />
              </Link>
              <Link
                href="/cart"
                className="w-10 h-10 rounded-full hover:bg-[#F0FDF4] flex items-center justify-center hover:text-[#16A34A] transition-all duration-300 ease-in-out cursor-pointer"
              >
                <FaShoppingCart size={20} strokeWidth={1.1} />
              </Link>
            </div>
            <UserHeader />
            <MobileLinks />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
