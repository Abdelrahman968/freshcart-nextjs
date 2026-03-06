import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

function ShoppingCart() {
  return (
    <Link
      href="/cart"
      className="w-10 h-10 rounded-full hover:bg-[#F0FDF4] flex items-center justify-center hover:text-[#16A34A] transition-all duration-300 ease-in-out cursor-pointer"
    >
      <FaShoppingCart size={20} strokeWidth={1.1} />
    </Link>
  );
}

export default ShoppingCart;
