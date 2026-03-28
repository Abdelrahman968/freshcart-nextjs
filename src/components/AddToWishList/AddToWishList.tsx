'use client';
import { addToast, Button, Spinner } from '@heroui/react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/reduxStore';
import {
  addToWishlistAsync,
  removeProductFromWishlistAsync,
} from '../../redux/slices/WishlistSlice';
import { MdError } from 'react-icons/md';

function AddToWishList({ productId }: { productId: string }) {
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
      id="wishlist-button"
      className="flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600 cursor-pointer"
      variant="bordered"
      size="lg"
      onPress={toggleWishlist}
      isDisabled={isLoading}
    >
      {isLoading ? (
        <Spinner color="danger" variant="simple" size="sm" />
      ) : isError ? (
        <MdError className="text-red-500" size={17} />
      ) : productInWishlist ? (
        <FaHeart className="text-red-600" />
      ) : (
        <FaRegHeart />
      )}
      {productInWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </Button>
  );
}

export default AddToWishList;
