'use client';
import Link from 'next/link';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/reduxStore';
import { useEffect } from 'react';
import { getUserWishlistAsync } from '../../redux/slices/WishlistSlice';
import { useRouter } from 'next/navigation';

function Wishlist() {
  const dispatch = useDispatch<AppDispatch>();
  const { count } = useSelector((store: RootState) => store.wishlist);
  const router = useRouter();

  useEffect(() => {
    dispatch(getUserWishlistAsync());
  }, [dispatch]);
  return (
    <div className="relative">
      <Link
        href="/wishlist"
        className="w-10 h-10 rounded-full hover:bg-red-50 flex items-center justify-center hover:text-red-600 transition-all duration-300 ease-in-out cursor-pointer"
        aria-label="Wishlist"
        title="Wishlist"
      >
        {count > 0 ? (
          <FaHeart size={20} strokeWidth={1.1} color="red" />
        ) : (
          <FaRegHeart size={20} strokeWidth={1.1} />
        )}
      </Link>
      {count > 0 && (
        <span
          className="absolute top-0 right-0 w-5.5 h-5.5 rounded-full bg-red-600 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white cursor-pointer"
          onClick={() => router.push('/wishlist')}
        >
          {count > 9 ? '9+' : count}
        </span>
      )}
    </div>
  );
}

export default Wishlist;
