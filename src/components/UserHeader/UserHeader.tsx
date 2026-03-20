'use client';
import Link from 'next/link';
import {
  FaAddressBook,
  FaBoxOpen,
  FaRegHeart,
  FaRegUser,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useSession } from 'next-auth/react';
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

function UserHeader() {
  const { data: session } = useSession();

  const handleLogout = async () => {
    const res = await logout();

    if (res.success) {
      addToast({
        title: 'Logged out successfully',
        description: 'You have been logged out successfully',
        icon: <CiLogout color="#FB2C36" />,
        color: 'success',
        closeIcon: true,
        shouldShowTimeoutProgress: true,
      });
    } else {
      addToast({
        title: 'Something went wrong',
        description: 'Please try again later',
        icon: <MdError color="#FB2C36" />,
        color: 'danger',
        closeIcon: true,
        shouldShowTimeoutProgress: true,
      });
    }
  };

  return (
    <>
      {session ? (
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
            <DropdownMenu
              aria-label="Profile Actions"
              variant="faded"
              color="success"
            >
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
                <DropdownItem startContent={<FaRegUser />} key="profile">
                  My Profile
                </DropdownItem>
                <DropdownItem startContent={<FaBoxOpen />} key="orders">
                  My Orders
                </DropdownItem>
                <DropdownItem startContent={<FaRegHeart />} key="wishlist">
                  My Wishlist
                </DropdownItem>
                <DropdownItem startContent={<FaAddressBook />} key="address">
                  Address
                </DropdownItem>
                <DropdownItem startContent={<IoSettings />} key="settings">
                  Settings
                </DropdownItem>
              </DropdownSection>

              <DropdownSection aria-label="Logout Zone">
                <DropdownItem
                  startContent={<FaSignOutAlt />}
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  Log Out
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
