'use client';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../../redux/reduxStore';
import { getUserCartAsync } from '../../../../redux/slices/CartSlice';
import CartItemCard from './CartItemCard';
import FooterActions from './FooterActions';
import { FaSpinner } from 'react-icons/fa';

export default function CartList({
  fromCheckout = false,
}: {
  fromCheckout?: boolean;
}) {
  const dispatch = useDispatch<AppDispatch>();

  const { products, isCartLoading, isCartError } = useSelector(
    (state: RootState) => state.cart
  );

  useEffect(() => {
    dispatch(getUserCartAsync());
  }, [dispatch]);

  if (isCartLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <FaSpinner className="animate-spin text-green-600 text-3xl" />
      </div>
    );
  }

  if (isCartError) {
    dispatch(getUserCartAsync());
  }

  return (
    <>
      <div
        className={`space-y-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2 ${fromCheckout && 'max-h-full'}`}
      >
        {products.map(item => (
          <CartItemCard
            key={item._id}
            id={item._id}
            product={item.product}
            count={item.count}
            price={item.price}
            fromCheckout={fromCheckout}
          />
        ))}
      </div>
      {!fromCheckout && <FooterActions />}
    </>
  );
}
