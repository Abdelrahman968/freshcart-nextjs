import Link from 'next/link';
import { FaRegUser, FaUserPlus } from 'react-icons/fa';

function UserTopNav() {
  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center justify-center gap-1 group">
        <FaRegUser color="#16A34A" size={15} />
        <Link
          href="/login"
          className="lg:font-semibold group-hover:text-[#16A34A] transition-colors duration-300 ease-in-out"
        >
          Sign In
        </Link>
      </div>
      <div className="flex items-center justify-center gap-1 group">
        <FaUserPlus color="#16A34A" size={15} />
        <Link
          href="/register"
          className="lg:font-semibold group-hover:text-[#16A34A] transition-colors duration-300 ease-in-out"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default UserTopNav;
