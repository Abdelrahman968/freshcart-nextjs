'use client';

import { Button, Spinner } from '@heroui/react';
import { FaCheck, FaPlus } from 'react-icons/fa';
import { addToCartAsync } from '../../redux/slices/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/reduxStore';
import { MdError } from 'react-icons/md';

function AddToCart({ productId }: { productId: string }) {
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
    dispatch(addToCartAsync(productId));
  };

  return (
    <Button
      isIconOnly
      className="h-10 w-10 rounded-full flex items-center justify-center bg-green-600 text-white hover:bg-green-700"
      aria-label="Add to cart"
      onPress={handleAddToCart}
      isDisabled={isLoading}
    >
      {isLoading ? (
        <Spinner color="white" variant="simple" size="sm" />
      ) : isError ? (
        <MdError size={17} />
      ) : isSuccess ? (
        <FaCheck size={17} />
      ) : (
        <FaPlus size={17} />
      )}
    </Button>
  );
}

export default AddToCart;
