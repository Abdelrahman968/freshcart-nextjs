'use client';
import { FaCheck, FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import Link from 'next/link';
import AppImage from '../../../../components/AppImage/AppImage';
import { Button } from '@heroui/react';

interface ProductInCart {
  subcategory: {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }[];
  _id: string;
  title: string;
  slug: string;
  quantity: number;
  imageCover: string;
  category: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  brand: {
    _id: string;
    name: string;
    slug: string;
    image: string;
  };
  ratingsAverage: number;
  id: string;
}

interface CartItemCardProps {
  count: number;
  product: ProductInCart;
  price: number;
  id: string;
}

function CartItemCard({ count, product, price, id }: CartItemCardProps) {
  const sku = product._id.slice(-6).toUpperCase();
  const total = price * count;

  return (
    <div
      className="relative bg-white rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
      id={id}
    >
      <div className="p-4 sm:p-5">
        <div className="flex gap-4 sm:gap-6">
          {/* Product Image */}
          <Link
            href={`/products/${product.slug}`}
            className="relative shrink-0 group"
          >
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-linear-to-br from-gray-50 via-white to-gray-100 p-3 border border-gray-100 overflow-hidden relative">
              <AppImage
                src={product.imageCover}
                alt={product.title}
                fill
                className="object-contain transition-transform duration-300 group-hover:scale-110 p-3"
              />
            </div>
            {/* In Stock badge */}
            <div className="absolute -bottom-1 -right-1 bg-green-500 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <FaCheck className="text-[8px]" />
              In Stock
            </div>
          </Link>

          {/* Product Info */}
          <div className="flex-1 min-w-0 flex flex-col">
            {/* Title + Category */}
            <div className="mb-3">
              <Link href={`/products/${product._id}`} className="group/title">
                <h3 className="font-semibold text-gray-900 group-hover/title:text-green-600 transition-colors leading-relaxed text-base sm:text-lg">
                  {product.title}
                </h3>
              </Link>
              <div className="flex items-center gap-2 mt-2">
                <span className="inline-block px-2.5 py-1 bg-linear-to-r from-green-50 to-emerald-50 text-green-700 text-xs font-medium rounded-full">
                  {product.category.name}
                </span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-500">SKU: {sku}</span>
              </div>
            </div>

            {/* Unit Price */}
            <div className="mb-4">
              <div className="flex items-baseline gap-2">
                <span className="text-green-600 font-bold text-lg">
                  {price.toLocaleString()} EGP
                </span>
                <span className="text-xs text-gray-400">per unit</span>
              </div>
            </div>

            {/* Controls */}
            <div className="mt-auto flex flex-wrap items-center justify-between gap-4">
              {/* Quantity stepper */}
              <div className="flex items-center">
                <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-200">
                  <Button
                    isIconOnly
                    aria-label="Decrease quantity"
                    className="h-8 w-8 rounded-lg bg-white shadow-sm flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none transition-all"
                    color="primary"
                    variant="flat"
                  >
                    <FaMinus className="text-xs" />
                  </Button>
                  <span className="w-12 text-center font-bold text-gray-900">
                    {count}
                  </span>
                  <Button
                    isIconOnly
                    aria-label="Increase quantity"
                    className="h-8 w-8 rounded-lg bg-green-600 shadow-sm shadow-green-600/30 flex items-center justify-center text-white hover:bg-green-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    color="primary"
                    variant="flat"
                  >
                    <FaPlus className="text-xs" />
                  </Button>
                </div>
              </div>

              {/* Total + Remove */}
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-0.5">Total</p>
                  <p className="text-xl font-bold text-gray-900">
                    {total.toLocaleString()}{' '}
                    <span className="text-sm font-medium text-gray-400">
                      EGP
                    </span>
                  </p>
                </div>
                <Button
                  isIconOnly
                  title="Remove item"
                  aria-label="Remove from cart"
                  className="h-10 w-10 rounded-xl border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 flex items-center justify-center disabled:opacity-40 transition-all duration-200"
                  color="danger"
                  variant="flat"
                >
                  <FaTrash className="text-sm" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItemCard;
