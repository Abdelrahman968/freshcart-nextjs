'use client';
import Link from 'next/link';
import { FaChevronRight, FaKey, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { usePathname } from 'next/navigation';
import { logout } from '../../../../utils/handleLogOut';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../redux/reduxStore';
import { clearCart } from '../../../../redux/slices/CartSlice';
import { clearWishlist } from '../../../../redux/slices/WishlistSlice';
import { addToast } from '@heroui/toast';
import { CiLogout } from 'react-icons/ci';
import { MdError } from 'react-icons/md';
import { useRouter } from 'next/navigation';

function Aside() {
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = async () => {
    const res = await logout();

    dispatch(clearCart());
    dispatch(clearWishlist());

    if (res.success) {
      addToast({
        title: 'Logged out successfully',
        icon: <CiLogout color="#16A34A" />,
        color: 'success',
        closeIcon: true,
        shouldShowTimeoutProgress: true,
      });
      router.refresh();
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
    <aside className="w-full lg:w-72 shrink-0 lg:sticky lg:top-22 h-fit">
      <nav className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">My Account</h2>
        </div>
        <ul className="p-2">
          <li>
            <Link
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                pathname === '/profile/address'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              href="/profile/address"
            >
              <div
                className={
                  pathname === '/profile/address'
                    ? 'w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-green-500 text-white'
                    : 'w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                }
              >
                <FaLocationDot size={20} />
              </div>
              <span className="font-medium flex-1">My Addresses</span>
              <FaChevronRight size={20} />
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                pathname === '/profile/info'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              href="/profile/info"
            >
              <div
                className={
                  pathname === '/profile/info'
                    ? 'w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-green-500 text-white'
                    : 'w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                }
              >
                <FaUser size={20} />
              </div>
              <span className="font-medium flex-1">Profile Information</span>
              <FaChevronRight size={20} />
            </Link>
          </li>
          <li>
            <Link
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                pathname === '/profile/reset-password'
                  ? 'bg-green-50 text-green-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              href="/profile/reset"
            >
              <div
                className={
                  pathname === '/profile/reset'
                    ? 'w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-green-500 text-white'
                    : 'w-9 h-9 rounded-lg flex items-center justify-center transition-colors bg-gray-100 text-gray-500 group-hover:bg-gray-200'
                }
              >
                <FaKey size={20} />
              </div>
              <span className="font-medium flex-1">Reset Password</span>
              <FaChevronRight size={20} />
            </Link>
          </li>
        </ul>
        <div className="p-4 border-t border-gray-100 text-start flex items-start justify-start">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-start gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-colors text-start cursor-pointer"
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-red-50">
              <FaSignOutAlt size={20} />
            </div>
            <span className="font-medium flex-1">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default Aside;
