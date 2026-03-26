'use client';
// In ProductDetails Page

import { addToast, Button, Spinner } from '@heroui/react';
import { FaCheck, FaShoppingCart } from 'react-icons/fa';
import { addToCartAsync } from '../../redux/slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/reduxStore';
import { MdError } from 'react-icons/md';
import { useSession } from 'next-auth/react';

function AddToCartBtn({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(
    (state: RootState) => state.cart.loadingById[productId]
  );
  const isError = useSelector(
    (state: RootState) => state.cart.errorById[productId]
  );
  const isSuccess = useSelector(
    (state: RootState) => state.cart.successById[productId]
  );

  const handleAddToCart = () => {
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
    dispatch(addToCartAsync(productId));
  };
  return (
    <>
      <Button
        id="add-to-cart"
        className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 bg-green-600 cursor-pointer"
        color="success"
        variant="solid"
        size="lg"
        onPress={handleAddToCart}
      >
        {isLoading ? (
          <Spinner color="white" variant="simple" size="sm" />
        ) : isError ? (
          <MdError size={17} />
        ) : isSuccess ? (
          <FaCheck size={17} />
        ) : (
          <FaShoppingCart size={17} />
        )}
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </Button>
    </>
  );
}

export default AddToCartBtn;
