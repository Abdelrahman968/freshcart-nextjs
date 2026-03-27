'use client';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/reduxStore';
import { useEffect } from 'react';
import { getUserCartAsync } from '../../redux/slices/CartSlice';
import { useRouter } from 'next/navigation';

function ShoppingCart() {
  const dispatch = useDispatch<AppDispatch>();
  const { numOfCartItems } = useSelector((store: RootState) => store.cart);
  const router = useRouter();

  useEffect(() => {
    dispatch(getUserCartAsync());
  }, [dispatch]);
  return (
    <div className="relative" title="Shopping cart">
      <Link
        href="/cart"
        className="w-10 h-10 rounded-full hover:bg-[#F0FDF4] flex items-center justify-center hover:text-[#16A34A] transition-all duration-300 ease-in-out cursor-pointer relative"
        aria-label="Shopping cart"
      >
        <FaShoppingCart size={20} strokeWidth={1.1} />
      </Link>
      {numOfCartItems > 0 && (
        <span
          className="absolute top-0 right-0 w-5.5 h-5.5 rounded-full bg-green-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white cursor-pointer"
          onClick={() => router.push('/cart')}
        >
          {numOfCartItems > 9 ? '9+' : numOfCartItems}
        </span>
      )}
    </div>
  );
}

export default ShoppingCart;
