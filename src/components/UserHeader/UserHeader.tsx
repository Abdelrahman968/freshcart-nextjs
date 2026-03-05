import Link from 'next/link';
import { FaRegUser } from 'react-icons/fa';

function UserHeader() {
  return (
    <Link
      href="/login"
      className="hidden xl:flex items-center gap-2 bg-green-600 hover:bg-green-700 transition-all duration-300 ease-in-out text-white px-5 py-2.5 rounded-full whitespace-nowrap shadow-[0_1px_2px_-1px_rgba(22,163,74,0.2),0_1px_3px_0_rgba(22,163,74,0.2)]"
    >
      <FaRegUser />
      <p>Sign In</p>
    </Link>
  );
}

export default UserHeader;
