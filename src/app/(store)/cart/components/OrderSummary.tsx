'use client';
import Link from 'next/link';
import { FaLock, FaTag, FaTruck } from 'react-icons/fa';
import { FaBagShopping, FaShieldHalved } from 'react-icons/fa6';
import { AddToCartResponse } from '../../../../types/cart.type';
import { addToast, Button, Input } from '@heroui/react';
import { applyPromoCode } from '../../../../services/cart.service';
import { useState } from 'react';

const PromoCodeData = [
  {
    id: 1,
    code: 'ORGANIC40',
    discount: 40,
  },
  {
    id: 2,
    code: 'FRESH25',
    discount: 25,
  },
];

function OrderSummary({ data }: { data: AddToCartResponse }) {
  const [showPromoCode, setShowPromoCode] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);
  const [error, setError] = useState('');

  const handleApplyPromoCode = async (code: string) => {
    const res = await applyPromoCode(code);
    if (res.statusMsg === 'success') {
      setIsPromoCodeApplied(true);
      addToast({
        title: 'Success',
        description: 'Promo code applied successfully',
        color: 'success',
        shouldShowTimeoutProgress: true,
      });
    } else {
      setIsPromoCodeApplied(false);
      setError(res.message);
      addToast({
        title: 'Error',
        description: 'Failed to apply promo code',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      });
      setTimeout(() => {
        setError('');
      }, 2000);
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden sticky top-20 shadow-sm">
        <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FaBagShopping />
            Order Summary
          </h2>
          <p className="text-green-100 text-sm mt-1">
            {data.numOfCartItems} items in your cart
          </p>
        </div>

        <div className="p-6 space-y-5">
          <div className="bg-linear-to-r from-green-50 to-emerald-50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <FaTruck className="text-green-600" />
            </div>
            <div>
              <p className="font-semibold text-green-700">Free Shipping!</p>
              <p className="text-sm text-green-600">
                You qualify for free delivery
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span className="font-medium text-gray-900">
                {data.data.totalCartPrice.toLocaleString()} EGP
              </span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span className="font-medium text-green-600">FREE</span>
            </div>
            <div className="border-t border-dashed border-gray-200 pt-3 mt-3">
              <div className="flex justify-between items-baseline">
                <span className="text-gray-900 font-semibold">Total</span>
                <div className="text-right">
                  <span
                    className={
                      isPromoCodeApplied
                        ? 'text-2xl font-bold text-green-900'
                        : 'text-2xl font-bold text-gray-900'
                    }
                  >
                    {data.data.totalCartPrice.toLocaleString()}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">EGP</span>
                </div>
              </div>
            </div>
          </div>

          <Button
            className="w-full flex items-center justify-center gap-2 py-3 border border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-green-400 hover:text-green-600 hover:bg-green-50/50 transition-all"
            variant="bordered"
            color="success"
            onPress={() => setShowPromoCode(!showPromoCode)}
          >
            <FaTag />
            <span className="text-sm font-medium">Apply Promo Code</span>
          </Button>

          {error && (
            <div className="space-y-3">
              <div className="text-center">
                <span className="font-medium text-red-600">{error}</span>
              </div>
            </div>
          )}

          {promoCode && (
            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Promo Code</span>
                <span className="font-medium text-green-600">{promoCode}</span>
              </div>
            </div>
          )}
          {showPromoCode && (
            <div className="space-y-3">
              {PromoCodeData.map(promoCode => (
                <div key={promoCode.id} className="flex gap-2">
                  <Input
                    type="text"
                    placeholder="Enter promo code"
                    value={promoCode.code}
                    onChange={e => setPromoCode(e.target.value)}
                  />
                  <Button
                    color="primary"
                    variant="flat"
                    onPress={() => handleApplyPromoCode(promoCode.code)}
                  >
                    Apply
                  </Button>
                </div>
              ))}
            </div>
          )}

          <Link
            href="/checkout"
            className="w-full bg-linear-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-[0.98]"
          >
            <FaLock />
            <span>Secure Checkout</span>
          </Link>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 py-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FaShieldHalved className="text-green-500" />
              <span>Secure Payment</span>
            </div>
            <div className="w-px h-4 bg-gray-200" />
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <FaTruck className="text-blue-500" />
              <span>Fast Delivery</span>
            </div>
          </div>

          {/* Continue shopping */}
          <Link
            href="/"
            className="block text-center text-green-600 hover:text-green-700 text-sm font-medium py-2"
          >
            ← Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OrderSummary;
