import { IconType } from 'react-icons';
import { BiSupport } from 'react-icons/bi';
import { FaShieldAlt, FaTruck } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';

interface FooterInfoType {
  id: number;
  Icon: IconType;
  title: string;
  description: string;
}

const footerInfo: FooterInfoType[] = [
  {
    id: 1,
    Icon: FaTruck,
    title: 'Free Shipping',
    description: 'On orders over 500 EGP',
  },
  {
    id: 2,
    Icon: TbRefresh,
    title: 'Easy Returns',
    description: '14-day return policy',
  },
  {
    id: 3,
    Icon: FaShieldAlt,
    title: 'Secure Payment',
    description: '100% secure checkout',
  },
  {
    id: 4,
    Icon: BiSupport,
    title: '24/7 Support',
    description: 'Contact us anytime',
  },
];

function FooterBanner() {
  return (
    <div className="bg-green-50 border-2 border-gray-200 p-5 w-full mt-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {footerInfo.map(({ id, Icon, title, description }) => (
          <div
            key={id}
            className="flex flex-col md:flex-row items-center justify-center gap-2"
          >
            <div className="bg-green-100 w-15 h-15 rounded-xl flex items-center justify-center">
              <Icon size={24} className="text-green-600" />
            </div>
            <div className="flex flex-col items-center  md:items-start justify-center">
              <p className="font-semibold">{title}</p>
              <p className="text-gray-500 text-sm">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FooterBanner;
