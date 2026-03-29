import { Suspense, useState } from 'react';
import { FaBagShopping, FaShieldHalved } from 'react-icons/fa6';
import SectionHeader from './SectionHeader';
import { FaBox, FaSpinner, FaTruck } from 'react-icons/fa';

import CartList from '../../cart/_components/CartList';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { Spinner } from '@heroui/react';

function OrderSummary({
  paymentMethod,
  isLoading,
}: {
  paymentMethod: string;
  isLoading: boolean;
}) {
  const { totalCartPrice, totalAfterDiscount } = useSelector(
    (state: RootState) => state.cart
  );

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-20 h-fit">
        <SectionHeader
          icon={<FaBagShopping />}
          title="Order Summary"
          subtitle={`PlaceHolder items`}
        />

        <div className="p-5">
          <div className="space-y-3 max-h-40 overflow-y-auto mb-5 pr-1">
            <Suspense
              fallback={
                <FaSpinner className="animate-spin text-green-600 text-3xl" />
              }
            >
              <CartList fromCheckout={true} />
            </Suspense>
          </div>

          <hr className="border-gray-100 my-4" />

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium">{totalCartPrice} EGP</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span className="flex items-center gap-2">
                <FaTruck className="text-gray-400" />
                Shipping
              </span>
              <span className="text-green-600 font-semibold">FREE</span>
            </div>
            <hr className="border-gray-100" />

            {totalAfterDiscount && (
              <>
                <div className="flex justify-between text-gray-600">
                  <span>Discount</span>
                  <span className="font-medium">
                    {totalCartPrice - totalAfterDiscount} EGP
                  </span>
                </div>
                <hr className="border-gray-100" />
              </>
            )}

            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-gray-900">Total</span>
              <div className="text-right">
                <span className="text-2xl font-bold text-green-600">
                  {totalAfterDiscount ? totalAfterDiscount : totalCartPrice}
                </span>
                <span className="text-sm text-gray-500 ml-1">EGP</span>
              </div>
            </div>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-6 bg-linear-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98] cursor-pointer"
            form="checkoutForm"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" variant="simple" />
                Processing...
              </>
            ) : (
              <>
                <FaShieldHalved />
                {paymentMethod === 'cash'
                  ? 'Confirm Order'
                  : 'Proceed to Payment'}
              </>
            )}
          </button>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FaShieldHalved className="text-green-500" />
              <span className="sm:hidden">Secure</span>
              <span className="hidden sm:block">Secure</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FaTruck className="text-blue-500" />
              <span className="sm:hidden">Fast</span>
              <span className="hidden sm:block">Fast Delivery</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FaBox className="text-orange-500" />
              <span className="sm:hidden">Easy</span>
              <span className="hidden sm:block">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
