import Link from 'next/link';
import { IconType } from 'react-icons';
import { FaCarrot, FaLemon, FaSeedling } from 'react-icons/fa';
import { FaAppleWhole, FaCartShopping } from 'react-icons/fa6';
import { GiAvocado, GiBroccoli, GiGrapes, GiPlantSeed } from 'react-icons/gi';
import { TbHomeFilled } from 'react-icons/tb';
import GoBackButton from '@components/GoBackButton/GoBackButton';
import { Metadata } from 'next';

interface floatingIconsType {
  Icon: IconType;
  top: string;
  left: string;
  size: number;
  delay: string;
  dur: string;
  rot: string;
}

interface PopularDestinationType {
  id: number;
  name: string;
  href: string;
  active: boolean;
}

const floatingIcons: floatingIconsType[] = [
  {
    Icon: FaCarrot,
    top: '8%',
    left: '6%',
    size: 40,
    delay: '0ms',
    dur: '6s',
    rot: 'rotate-12',
  },
  {
    Icon: FaAppleWhole,
    top: '5%',
    left: '84%',
    size: 42,
    delay: '300ms',
    dur: '7.5s',
    rot: '-rotate-6',
  },
  {
    Icon: GiPlantSeed,
    top: '64%',
    left: '3%',
    size: 40,
    delay: '700ms',
    dur: '5.8s',
    rot: 'rotate-6',
  },
  {
    Icon: FaLemon,
    top: '70%',
    left: '87%',
    size: 42,
    delay: '500ms',
    dur: '6.8s',
    rot: '-rotate-12',
  },
  {
    Icon: FaSeedling,
    top: '2%',
    left: '47%',
    size: 42,
    delay: '1000ms',
    dur: '8s',
    rot: 'rotate-3',
  },
  {
    Icon: GiGrapes,
    top: '37%',
    left: '77%',
    size: 42,
    delay: '200ms',
    dur: '6.2s',
    rot: '-rotate-3',
  },
  {
    Icon: GiBroccoli,
    top: '40%',
    left: '11%',
    size: 42,
    delay: '800ms',
    dur: '7s',
    rot: 'rotate-6',
  },
  {
    Icon: GiAvocado,
    top: '78%',
    left: '31%',
    size: 42,
    delay: '600ms',
    dur: '6.6s',
    rot: '-rotate-6',
  },
];

const popularDestinations: PopularDestinationType[] = [
  {
    id: 1,
    name: 'All Products',
    href: '/products',
    active: true,
  },
  {
    id: 2,
    name: 'Categories',
    href: '/categories',
    active: false,
  },
  {
    id: 3,
    name: "Today's Deals",
    href: '/deals',
    active: false,
  },
  {
    id: 4,
    name: 'Contact Us',
    href: '/contact',
    active: false,
  },
];

export const metadata: Metadata = {
  title: 'FreshCart - Not Found',
  description: 'FreshCart is an e-commerce website',
  keywords: ['FreshCart', 'e-commerce', 'website'],
  authors: [{ name: 'Abdelrahman Ayman' }],
  creator: 'Abdelrahman Ayman',
  publisher: 'Abdelrahman Ayman',
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

export default function NotFound() {
  return (
    <div className="relative overflow-hidden min-h-screen pt-20 pb-10 bg-gray-50">
      {floatingIcons.map(
        ({ Icon, top, left, size, delay, dur, rot }, index) => (
          <span
            key={index}
            className={`pointer-events-none absolute text-emerald-400 drop-shadow-sm ${rot} z-1`}
            style={{
              top,
              left,
              animationName: 'floatProduce',
              animationDuration: dur,
              animationDelay: delay,
              animationTimingFunction: 'ease-in-out',
              animationIterationCount: 'infinite',
            }}
          >
            <Icon size={size} />
          </span>
        )
      )}
      <div className="z-5 flex flex-col items-center justify-center gap-5  relative">
        <div className="relative">
          <div className="bg-white py-10 px-20 rounded-xl shadow-xl">
            <FaCartShopping color="#6EE599" size={100} />
          </div>
          <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 rounded-full border-10 border-white shadow-xl">
            <div className="w-15 h-15 bg-[#1EB957] rounded-full flex items-center justify-center shadow-2xl ">
              <h1 className="font-extrabold text-white text-xl text-shadow-lg/30 ">
                404
              </h1>
            </div>
          </div>
        </div>
        <div className="flex gap-3.5 items-center justify-center">
          <div className="w-2.5 h-2.5 bg-[#4ADE80] rounded-full"></div>
          <div className="w-8 h-8 border-b-[3px] border-[#4ADE80] rounded-b-full"></div>
          <div className="w-2.5 h-2.5 bg-[#4ADE80] rounded-full"></div>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 text-center mb-10">
          <h2 className="text-5xl font-extrabold ">Oops! Nothing Here</h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-md mx-auto font-semibold">
            Looks like this page went out of stock! Don&apos;t worry,
            there&apos;s plenty more fresh content to explore.
          </p>
        </div>
        <div className="flex gap-3.5 items-center justify-center">
          <Link
            href="/"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-700/30 hover:-translate-y-1"
          >
            <TbHomeFilled className="group-hover:scale-115 transition-transform duration-300 text-sm md:text-base lg:text-lg" />
            <p className="hidden sm:block">Back to Home</p>
          </Link>
          <GoBackButton />
        </div>
        <div className="bg-white border-2 border-gray-200 rounded-2xl text-center p-5">
          <h2 className="text-gray-400 font-semibold mb-4 uppercase">
            Popular Destinations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularDestinations.map(destination => (
              <Link
                key={destination.id}
                href={destination.href}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors duration-300 ease-in-out border border-gray-200 ${destination.active ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >
                <p>{destination.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
