'use client';

import Link from 'next/link';
import AppImage from '../../../components/AppImage/AppImage';
import { FaTrash } from 'react-icons/fa';
import { addToast, Button } from '@heroui/react';
import { useEffect } from 'react';
import {
  getUserWishlistAsync,
  removeProductFromWishlistAsync,
} from '../../../redux/slices/WishlistSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../redux/reduxStore';
import AddToCartBtn from '../../../components/AddToCartBtn/AddToCartBtn';
import { useState } from 'react';

function WishList() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  const {
    products = [],
    count = 0,
    isWishlistLoading,
    isWishlistError,
  } = useSelector((state: RootState) => state.wishlist);

  useEffect(() => {
    dispatch(getUserWishlistAsync());
  }, [dispatch]);

  const handleRemoveFromWishlist = async (productId: string) => {
    setLoadingId(productId);
    try {
      await dispatch(removeProductFromWishlistAsync(productId)).unwrap();

      addToast({
        title: 'Product removed from wishlist',
        color: 'success',
        shouldShowTimeoutProgress: true,
      });
    } catch (error) {
      addToast({
        title: 'Error removing product from wishlist',
        description: `${error}`,
        color: 'danger',
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setLoadingId(null);
    }
  };

  if (isWishlistLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600" />
      </div>
    );
  }

  if (isWishlistError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-red-500 text-lg">Failed to load wishlist</p>
          <button
            onClick={() => dispatch(getUserWishlistAsync())}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (count === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
          <Link
            href="/products"
            className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 text-sm font-medium text-gray-500">
          <div className="col-span-6">Product</div>
          <div className="col-span-2 text-center">Price</div>
          <div className="col-span-2 text-center">Status</div>
          <div className="col-span-2 text-center">Actions</div>
        </div>

        <div className="divide-y divide-gray-100">
          {products.map(product => (
            <div
              key={product._id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 md:px-6 md:py-5 items-center hover:bg-gray-50/50 transition-colors"
            >
              <div className="md:col-span-6 flex items-center gap-4">
                <Link
                  className="w-20 h-20 rounded-xl bg-gray-50  overflow-hidden shrink-0"
                  href={`/products/${product._id}`}
                >
                  <AppImage
                    alt={product.title}
                    className="w-full h-full object-contain p-2"
                    src={product.imageCover}
                    width={100}
                    height={100}
                  />
                </Link>

                <div className="min-w-0">
                  <Link
                    className="font-medium text-gray-900 hover:text-green-600 transition-colors line-clamp-2"
                    href={`/products/${product._id}`}
                  >
                    {product.title}
                  </Link>

                  <p className="text-sm text-gray-400 mt-1">
                    {product.category?.name}
                  </p>
                </div>
              </div>

              <div className="md:col-span-2 flex md:justify-center items-center gap-2">
                <div className="text-right md:text-center">
                  {product.priceAfterDiscount ? (
                    <>
                      <div className="font-semibold text-gray-900">
                        {product.price} EGP
                      </div>
                      <div className="text-sm text-gray-400 line-through">
                        {product.priceAfterDiscount} EGP
                      </div>
                    </>
                  ) : (
                    <div className="font-semibold text-gray-900">
                      {product.price} EGP
                    </div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2 flex md:justify-center">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                    product.quantity > 0
                      ? 'bg-green-50 text-green-700'
                      : 'bg-red-50 text-red-700'
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      product.quantity > 0 ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  />
                  {product.quantity > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="md:col-span-2 flex items-center gap-2 md:justify-center">
                <AddToCartBtn
                  productId={product._id}
                  from="wishlist"
                  quantity={product.quantity}
                />

                <Button
                  isIconOnly
                  className="w-10 h-10 border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50"
                  variant="light"
                  onPress={() => handleRemoveFromWishlist(product._id)}
                  isDisabled={loadingId === product._id}
                  isLoading={loadingId === product._id}
                >
                  <FaTrash
                    size={18}
                    className={loadingId === product._id ? 'hidden' : 'block'}
                  />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <Link
          className="text-gray-500 hover:text-green-600 text-sm font-medium"
          href="/products"
        >
          ← Continue Shopping
        </Link>
      </div>
    </div>
  );
}

export default WishList;
