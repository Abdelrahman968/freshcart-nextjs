'use client';

import Link from 'next/link';
import {
  FaRegHeart,
  FaArrowsRotate,
  FaRegEye,
  FaStar,
  FaRegStar,
  FaPlus,
} from 'react-icons/fa6';
import { getDiscountPercentage } from '../../utils/price';
import AppImage from '../AppImage/AppImage';

type ProductCardProps = {
  title: string;
  category: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  link: string;
  priceAfterDiscount?: number;
};

function ProductCard({
  title,
  category,
  image,
  price,
  rating,
  reviews,
  link,
  priceAfterDiscount,
}: ProductCardProps) {
  const renderStars = () => {
    return [...Array(5)].map((_, i) =>
      i < Math.round(rating) ? <FaStar key={i} /> : <FaRegStar key={i} />
    );
  };

  const discount = getDiscountPercentage(price, priceAfterDiscount);

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm flex flex-col justify-between h-full hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 ease-in-out">
      <div className="relative">
        <AppImage
          className="w-full h-60 object-contain bg-white"
          src={image}
          alt={title}
          width={500}
          height={500}
          loading="eager"
        />

        {discount !== 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{discount}%
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center shadow-sm text-gray-600 hover:text-red-500">
            <FaRegHeart />
          </button>

          <button className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 shadow-sm">
            <FaArrowsRotate />
          </button>

          <Link
            href={link}
            className="bg-white h-8 w-8 rounded-full flex items-center justify-center text-gray-600 hover:text-green-600 shadow-sm"
          >
            <FaRegEye />
          </Link>
        </div>
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-1">{category}</div>

        <h3 className="font-medium mb-1 cursor-pointer">
          <Link
            className="line-clamp-2 leading-5 min-h-10"
            href={link}
            title={title}
          >
            {title}
          </Link>
        </h3>

        <div className="flex items-center mb-2">
          <div className="flex text-yellow-400 mr-2">{renderStars()}</div>

          <span className="text-xs text-gray-500">
            {rating} ({reviews})
          </span>
        </div>

        <div className="flex items-center justify-between">
          {priceAfterDiscount ? (
            <div className="flex items-center gap-3">
              <span className="text-lg font-bold text-green-800">
                {priceAfterDiscount} EGP
              </span>
              <span className="text-sm text-gray-800 line-through">
                {price} EGP
              </span>
            </div>
          ) : (
            <span className="text-lg font-bold text-gray-800">{price} EGP</span>
          )}

          <button className="h-10 w-10 rounded-full flex items-center justify-center transition bg-green-600 text-white hover:bg-green-700 cursor-pointer">
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
