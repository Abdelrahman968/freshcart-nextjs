'use client';
import Link from 'next/link';
import {
  FaAddressBook,
  FaBoxOpen,
  FaRegHeart,
  FaRegUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import {
  addToast,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@heroui/react';

import AvatarImg from '@assets/login/avatar.png';
import { IoSettings } from 'react-icons/io5';
import { logout } from '../../utils/handleLogOut';
import { MdError } from 'react-icons/md';
import { CiLogout } from 'react-icons/ci';
import { useSession } from 'next-auth/react';

function UserHeader() {
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
      {status === 'authenticated' ? (
        <div className="hidden xl:flex items-center gap-4">
          <Dropdown placement="bottom-end" showArrow shouldBlockScroll={false}>
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform cursor-pointer"
                src={AvatarImg.src}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" color="success">
              <DropdownSection aria-label="Info" showDivider>
                <DropdownItem
                  key="info Zone"
                  className="h-14 gap-2 cursor-default"
                >
                  <p className="font-semibold text-xs text-gray-500">
                    Signed in as
                  </p>
                  <p className="font-semibold">{session.user?.name}</p>
                  <p className="font-semibold text-xs text-gray-500">
                    {session.user?.email}
                  </p>
                </DropdownItem>
              </DropdownSection>
              <DropdownSection aria-label="Profile Zone" showDivider>
                <DropdownItem
                  className="group"
                  startContent={
                    <FaRegUser className="group-hover:text-white transition-colors duration-300 ease-in-out" />
                  }
                  key="profile"
                >
                  <Link
                    className="w-full h-full block font-semibold group-hover:text-white transition-colors duration-300 ease-in-out"
                    href="/profile"
                  >
                    My Profile
                  </Link>
                </DropdownItem>
                <DropdownItem
                  className="group"
                  startContent={
                    <FaBoxOpen className="group-hover:text-white transition-colors duration-300 ease-in-out" />
                  }
                  key="orders"
                >
                  <Link
                    className="w-full h-full block font-semibold group-hover:text-white transition-colors duration-300 ease-in-out"
                    href="/orders"
                  >
                    My Orders
                  </Link>
                </DropdownItem>
                <DropdownItem
                  className="group"
                  startContent={
                    <FaRegHeart className="group-hover:text-white transition-colors duration-300 ease-in-out" />
                  }
                  key="wishlist"
                >
                  <Link
                    className="w-full h-full block font-semibold group-hover:text-white transition-colors duration-300 ease-in-out"
                    href="/wishlist"
                  >
                    My Wishlist
                  </Link>
                </DropdownItem>
                <DropdownItem
                  className="group"
                  startContent={
                    <FaAddressBook className="group-hover:text-white transition-colors duration-300 ease-in-out" />
                  }
                  key="address"
                >
                  <Link
                    className="w-full h-full block font-semibold group-hover:text-white transition-colors duration-300 ease-in-out"
                    href="/address"
                  >
                    My Address
                  </Link>
                </DropdownItem>
                <DropdownItem
                  className="group"
                  startContent={
                    <IoSettings className="group-hover:text-white transition-colors duration-300 ease-in-out" />
                  }
                  key="settings"
                >
                  <Link
                    className="w-full h-full block font-semibold group-hover:text-white transition-colors duration-300 ease-in-out"
                    href="/settings"
                  >
                    My Settings
                  </Link>
                </DropdownItem>
              </DropdownSection>

              <DropdownSection aria-label="Logout Zone">
                <DropdownItem
                  className="group"
                  startContent={
                    <FaSignOutAlt className="group-hover:text-white transition-colors duration-300 ease-in-out" />
                  }
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  <p className="w-full h-full block font-semibold group-hover:text-white transition-colors duration-300 ease-in-out">
                    Log Out
                  </p>
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      ) : (
        <Link
          href="/login"
          className="hidden xl:flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out text-white px-5 py-2.5 rounded-full whitespace-nowrap shadow-[0_1px_2px_-1px_rgba(22,163,74,0.2),0_1px_3px_0_rgba(22,163,74,0.2)]"
        >
          <FaRegUser strokeWidth={1.5} />
          <p>Sign In</p>
        </Link>
      )}
    </>
  );
}

export default UserHeader;
