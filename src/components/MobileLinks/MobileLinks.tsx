'use client';
import Link from 'next/link';
import { FaBars, FaRegHeart, FaSignOutAlt, FaTruck } from 'react-icons/fa';
import ImageLogo from '@assets/header/logo.svg';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import SearchHeader from '../SearchHeader/SearchHeader';
import BiSupport from '../BiSupport/BiSupport';
import AppImage from '../AppImage/AppImage';
import { RxAvatar } from 'react-icons/rx';
import { logout } from '../../utils/handleLogOut';
import { addToast } from '@heroui/toast';
import { CiLogout } from 'react-icons/ci';
import { MdError } from 'react-icons/md';
import { useSession } from 'next-auth/react';

interface MobileLinksProps {
  id: number;
  href: string;
  label: string;
}

const mobileLinks: MobileLinksProps[] = [
  { id: 1, href: '/', label: 'Home' },
  { id: 2, href: '/products', label: 'Shop' },
  { id: 3, href: '/categories', label: 'Categories' },
  { id: 4, href: '/brands', label: 'Brands' },
];

function MobileLinks() {
  const [showMobileLinks, setShowMobileLinks] = useState(false);
  const { data: session, status } = useSession();

  const handleLogout = async () => {
    const res = await logout();

    if (res.success) {
      addToast({
        title: 'Logged out successfully',
        icon: <CiLogout color="#16A34A" />,
        color: 'success',
        closeIcon: true,
        shouldShowTimeoutProgress: true,
      });
    } else {
      addToast({
        title: 'Something went wrong',
        icon: <MdError color="#FB2C36" />,
        color: 'danger',
        closeIcon: true,
        shouldShowTimeoutProgress: true,
      });
    }
  };

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
          <AppImage
            src={ImageLogo}
            alt="Logo"
            width={165}
            height={32}
            loading="eager"
            onClick={() => setShowMobileLinks(false)}
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
            placeholder="Search products..."
            roundValue="rounded-lg"
            width="w-full"
            height="h-10"
          />
        </div>
        <hr className="my-5 border-gray-200 w-full px-0" />

        <ul className="flex flex-col gap-2 text-base">
          {mobileLinks.map(({ id, href, label }) => (
            <li key={id}>
              <Link
                href={href}
                className="px-3 py-2 rounded-xl font-semibold text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all duration-300 ease-in-out block"
                onClick={() => setShowMobileLinks(false)}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <hr className="my-5 border-gray-200 w-full px-0" />

        <div className="flex flex-col gap-3">
          <Link
            href="/wishlist"
            className="active:scale-105 transition-all duration-300 ease-in-out"
            onClick={() => setShowMobileLinks(false)}
          >
            <div className=" flex justify-start items-center gap-2 bg-green-50 p-3 rounded-xl border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <FaRegHeart color="#FB2C36" strokeWidth={5} />
              </div>
              <p className="lg:font-semibold text-base text-black">Wishlist</p>
            </div>
          </Link>
          <Link
            href="/cart"
            className="active:scale-105 transition-all duration-300 ease-in-out"
            onClick={() => setShowMobileLinks(false)}
          >
            <div className="flex justify-start items-center gap-2 bg-green-50 p-3 rounded-xl border border-gray-200">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                <FaTruck color="#16A34A" strokeWidth={5} />
              </div>
              <p className="lg:font-semibold text-base text-black">Cart</p>
            </div>
          </Link>
        </div>
        <hr className="my-5 border-gray-200 w-full px-0" />
        <div className="flex flex-col sm:flex-row gap-3">
          {status === 'authenticated' ? (
            <div className="flex flex-col gap-3 w-full">
              <Link
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-green-100 transition-colors active:scale-105 bg-green-50"
                href="/profile"
              >
                <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center">
                  <RxAvatar size={25} color="#16A34A" />
                </div>
                <span className="font-medium text-gray-700">
                  {session.user?.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-100 transition-colors w-full text-left active:scale-105 bg-red-50 cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-red-100 flex items-center justify-center">
                  <FaSignOutAlt color="#FB2C36" strokeWidth={5} />
                </div>
                <span className="font-medium text-red-600">Sign Out</span>
              </button>
            </div>
          ) : (
            <>
              <button className="p-3 rounded-xl font-bold text-white hover:bg-green-50 active:scale-105 transition-all duration-300 ease-in-out bg-green-500 w-full">
                <Link href="/login" onClick={() => setShowMobileLinks(false)}>
                  Sign In
                </Link>
              </button>
              <button className="p-3 rounded-xl font-bold text-green-600 hover:bg-green-50 active:scale-105 transition-all duration-300 ease-in-out border border-green-500 w-full">
                <Link
                  href="/register"
                  onClick={() => setShowMobileLinks(false)}
                >
                  Sign Up
                </Link>
              </button>
            </>
          )}
        </div>
        <hr className="my-5 border-gray-200 w-full px-0" />

        <div>
          <button
            className="w-full active:scale-105 transition-all duration-300 ease-in-out"
            onClick={() => setShowMobileLinks(false)}
          >
            <BiSupport
              LinkClassName="flex justify-start items-center gap-2 bg-green-50 p-3 rounded-xl border border-gray-200"
              iconClassName="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center"
              size={20}
              color="#16A34A"
              strokeWidth={1.5}
              textDivClassName="flex flex-col justify-center items-start"
              firstText="Need Help?"
              secondText={['24/7', 'Contact Support']}
              firstTextClassName="text-sm font-semibold text-gray-700"
              secondTextClassName="text-sm text-green-600"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default MobileLinks;
