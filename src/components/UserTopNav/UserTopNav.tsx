'use client';
import Link from 'next/link';
import { FaRegUser, FaUserPlus } from 'react-icons/fa';
import { CiLogout } from 'react-icons/ci';
import { logout } from '../../utils/handleLogOut';
import { addToast } from '@heroui/toast';
import { MdError } from 'react-icons/md';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function UserTopNav() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
    <div className="flex items-center gap-5">
      <div className="flex items-center justify-center gap-1 group">
        {status === 'authenticated' ? (
          <>
            <FaRegUser color="#16A34A" size={15} />
            <Link
              href="/profile"
              className="lg:font-semibold group-hover:text-[#16A34A] transition-colors duration-300 ease-in-out"
            >
              {session.user?.name}
            </Link>
          </>
        ) : (
          <>
            <FaRegUser strokeWidth={1.5} />
            <Link
              href="/login"
              className="lg:font-semibold group-hover:text-[#16A34A] transition-colors duration-300 ease-in-out"
            >
              Sign In
            </Link>
          </>
        )}
      </div>
      <div className="flex items-center justify-center gap-1 group">
        {session ? (
          <div className="flex items-center gap-1 cursor-pointer transition-colors duration-300 ease-in-out group-hover:text-red-500">
            <CiLogout strokeWidth={1.5} />
            <button
              onClick={handleLogout}
              className="lg:font-semibold bg-transparent shadow-none cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <FaUserPlus color="#16A34A" size={15} />
            <Link
              href="/register"
              className="lg:font-semibold group-hover:text-[#16A34A] transition-colors duration-300 ease-in-out"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default UserTopNav;
