import { CiMail } from 'react-icons/ci';
import { FaGift, FaPhoneAlt, FaTruck } from 'react-icons/fa';
import UserTopNav from '@components/UserTopNav/UserTopNav';

function TopNav() {
  return (
    <>
      <div className="w-full hidden lg:flex justify-between items-center px-2 lg:px-5 xl:px-13 3xl:px-20  py-2.5 text-sm text-gray-500 border-b border-[#F1F2F4]">
        <div className="txt flex gap-4">
          <div className="flex items-center justify-center gap-2">
            <FaTruck color="#16A34A" />
            <p className="lg:font-semibold">
              Free shipping on all orders over $50
            </p>
          </div>
          <div className="flex items-center justify-center gap-2">
            <FaGift color="#16A34A" />
            <p className="lg:font-semibold">New Arrivals Daily</p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex items-center justify-center gap-1 group">
            <FaPhoneAlt size={13} color="#16A34A" />
            <p className="lg:font-semibold">
              <a
                href="tel:+18001234567"
                className="group-hover:text-[#16A34A] transition-colors duration-300 ease-in-out"
              >
                +1 (800) 123-4567
              </a>
            </p>
          </div>
          <div className="flex items-center justify-center gap-1 group">
            <CiMail size={15} color="#16A34A" />
            <p className="lg:font-semibold">
              <a
                href="mailto:support@freshcart.com"
                className="group-hover:text-[#16A34A] transition-colors duration-300 ease-in-out"
              >
                support@freshcart.com
              </a>
            </p>
          </div>
          <div className="h-5 w-0.5 bg-gray-200" />
          <UserTopNav />
        </div>
      </div>
    </>
  );
}

export default TopNav;
