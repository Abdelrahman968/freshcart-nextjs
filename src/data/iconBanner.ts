import { IconType } from 'react-icons';
import { BiSupport } from 'react-icons/bi';
import { FaShieldAlt, FaTruck } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';

export interface IconBannerType {
  id: number;
  Icon: IconType;
  title: string;
  description: string;
  color: string;
  bgc: string;
  roundedValue: string;
}

export const notFoundBannerInfo: IconBannerType[] = [
  {
    id: 1,
    Icon: FaTruck,
    title: 'Free Shipping',
    description: 'On orders over 500 EGP',
    color: 'text-green-600',
    bgc: 'bg-green-100',
    roundedValue: 'rounded-xl',
  },
  {
    id: 2,
    Icon: TbRefresh,
    title: 'Easy Returns',
    description: '14-day return policy',
    color: 'text-green-600',
    bgc: 'bg-green-100',
    roundedValue: 'rounded-xl',
  },
  {
    id: 3,
    Icon: FaShieldAlt,
    title: 'Secure Payment',
    description: '100% secure checkout',
    color: 'text-green-600',
    bgc: 'bg-green-100',
    roundedValue: 'rounded-xl',
  },
  {
    id: 4,
    Icon: BiSupport,
    title: '24/7 Support',
    description: 'Contact us anytime',
    color: 'text-green-600',
    bgc: 'bg-green-100',
    roundedValue: 'rounded-xl',
  },
];
export const homeTopBannerInfo: IconBannerType[] = [
  {
    id: 1,
    Icon: FaTruck,
    title: 'Free Shipping',
    description: 'On orders over 500 EGP',
    color: 'text-blue-500',
    bgc: 'bg-blue-50',
    roundedValue: 'rounded-full',
  },
  {
    id: 2,
    Icon: FaShieldAlt,
    title: 'Secure Payment',
    description: '100% secure transactions',
    color: 'text-emerald-500 ',
    bgc: 'bg-emerald-50 ',
    roundedValue: 'rounded-full',
  },
  {
    id: 3,
    Icon: TbRefresh,
    title: 'Easy Returns',
    description: '14-day return policy',
    color: 'text-orange-500',
    bgc: 'bg-orange-50',
    roundedValue: 'rounded-full',
  },
  {
    id: 4,
    Icon: BiSupport,
    title: '24/7 Support',
    description: 'Dedicated support team',
    color: 'text-purple-500',
    bgc: 'bg-purple-50',
    roundedValue: 'rounded-full',
  },
];
