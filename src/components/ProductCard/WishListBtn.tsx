'use client';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/reduxStore';
import {
  addToWishlistAsync,
  removeProductFromWishlistAsync,
} from '../../redux/slices/WishlistSlice';
import { addToast, Button, Spinner } from '@heroui/react';
import { MdError } from 'react-icons/md';
import { useSession } from 'next-auth/react';

function WishListBtn({ productId }: { productId: string }) {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();

  const productInWishlist = useSelector((state: RootState) =>
    state.wishlist.products.some(p => p.id === productId)
  );

  const isLoading = useSelector(
    (state: RootState) => state.wishlist.loadingById[productId]
  );
  const isError = useSelector(
    (state: RootState) => state.wishlist.errorById[productId]
  );

  const toggleWishlist = () => {
    if (!session?.user) {
      addToast({
        title: 'You must login first',
        description: 'User is not authenticated',
        color: 'danger',
        timeout: 5000,
        shouldShowTimeoutProgress: true,
      });
      return;
    }
    if (productInWishlist) {
      dispatch(removeProductFromWishlistAsync(productId));
    } else {
      dispatch(addToWishlistAsync(productId));
    }
  };

  return (
    <Button
      className="bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-sm"
      title="Add to wishlist"
      isIconOnly
      size="sm"
      onPress={toggleWishlist}
      isDisabled={isLoading}
    >
      {isLoading ? (
        <Spinner color="danger" variant="simple" size="sm" />
      ) : isError ? (
        <MdError className="text-red-500" size={17} />
      ) : productInWishlist ? (
        <FaHeart className="text-red-500" size={17} />
      ) : (
        <FaRegHeart className="text-gray-500" size={17} />
      )}
    </Button>
  );
}

export default WishListBtn;
