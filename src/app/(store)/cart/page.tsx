import Link from 'next/link';
import { FaCartShopping } from 'react-icons/fa6';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import CartList from './components/CartList';
import OrderSummary from './components/OrderSummary';
import { decodeAuthUserToken } from '../../../utils/decodeAuthUserToken';
import { CartApiResponse } from '../../../types/cart.type';

export default async function CartPage() {
  async function getUserCart() {
    const token = await decodeAuthUserToken();
    if (!token) return null;

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL_V2}/cart`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          token,
        },
        cache: 'no-store',
      });

      if (!res.ok) return null;

      return (await res.json()) as CartApiResponse;
    } catch {
      return null;
    }
  }

  const data = await getUserCart();
  const isEmpty = !data || data.numOfCartItems === 0;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="mb-4">
            <Breadcrumb categoryName="Shopping Cart" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-r from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center">
                  <FaCartShopping />
                </span>
                Shopping Cart
              </h1>
              <p className="text-gray-500 mt-2">
                You have{' '}
                <span className="font-semibold text-green-600">
                  {data?.numOfCartItems ?? 0} items
                </span>{' '}
                in your cart
              </p>
            </div>
          </div>
        </div>

        {isEmpty ? (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
            <FaCartShopping className="text-6xl text-gray-200 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-6">
              Looks like you haven&apos;t added anything yet.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <CartList />
            </div>

            <OrderSummary />
          </div>
        )}
      </div>
    </div>
  );
}
