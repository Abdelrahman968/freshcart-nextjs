import {
  FaStar,
  FaRegStar,
  FaRegHeart,
  FaTruck,
  FaUndoAlt,
  FaShieldAlt,
} from 'react-icons/fa';
import { ProductCardProps } from '../../types/product.type';
import { getDiscountPercentage } from '../../utils/price';
import ProductQuantity from '../ProductQuantity/ProductQuantity';
import ShareBtn from '../ShareBtn/ShareBtn';
import AddToCartBtn from '../AddToCartBtn/AddToCartBtn';
import BuyNowBtn from '../BuyNowBtn/BuyNowBtn';

function ProductInfo({ product }: { product: ProductCardProps }) {
  const discount = getDiscountPercentage(
    product.price,
    product.priceAfterDiscount
  );

  return (
    <div id="product-info" className="lg:w-3/4">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex flex-wrap gap-2 mb-4">
          <a
            className="bg-green-50 text-green-700 text-xs px-3 py-1.5 rounded-full hover:bg-green-100 transition"
            href={`/categories/${product.category._id}`}
          >
            {product.category.name}
          </a>
          <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-full">
            {product.brand.name}
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-3">
          {product.title}
        </h1>
        <div className="flex items-center gap-3 mb-4">
          <div className="flex text-yellow-400">
            {Array.from({ length: 5 }, (_, i) => {
              const ratingValue = i + 1;
              if (product.ratingsAverage >= ratingValue) {
                return <FaStar key={i} />;
              } else {
                return <FaRegStar key={i} />;
              }
            })}
          </div>
          <span className="text-sm text-gray-600">
            {product.ratingsAverage} ({product.ratingsQuantity} reviews)
          </span>
        </div>
        <div className="flex items-center flex-wrap gap-3 mb-6">
          {product.priceAfterDiscount && (
            <div className="flex items-center gap-2">
              <span className="text-3xl font-bold text-gray-900">
                {product.priceAfterDiscount} EGP
              </span>
              <span className="text-xl font-semibold text-gray-400 line-through self-end">
                {product.price} EGP
              </span>
              <span className="bg-red-500 text-white text-sm px-3 py-1 rounded-full font-medium">
                Save {discount}%
              </span>
            </div>
          )}
          {!product.priceAfterDiscount && (
            <span className="text-3xl font-bold text-gray-900">
              {product.price} EGP
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 mb-6">
          {product.quantity > 0 ? (
            <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-green-50 text-green-700">
              <span className="w-2 h-2 rounded-full bg-green-500" />
              In Stock
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full bg-red-50 text-red-700">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Out of Stock
            </span>
          )}
        </div>
        <div className="border-t border-gray-100 pt-5 mb-6">
          <p className="text-gray-600 leading-relaxed">{product.description}</p>
        </div>
        <ProductQuantity quantity={product.quantity} />
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Price:</span>
            <span className="text-2xl font-bold text-green-600">
              {product.priceAfterDiscount
                ? product.priceAfterDiscount
                : product.price}{' '}
              EGP
            </span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <AddToCartBtn productId={product.id} />
          <BuyNowBtn productId={product.id} />
        </div>
        <div className="flex gap-3 mb-6">
          <button
            id="wishlist-button"
            className="flex-1 border-2 py-3 px-4 rounded-xl font-medium transition flex items-center justify-center gap-2 border-gray-200 text-gray-700 hover:border-green-300 hover:text-green-600 cursor-pointer"
          >
            <FaRegHeart />
            Add to Wishlist
          </button>
          <ShareBtn />
        </div>
        <div className="border-t border-gray-100 pt-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <FaTruck />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Free Delivery
                </h4>
                <p className="text-xs text-gray-500">Orders over $50</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <FaUndoAlt />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  30 Days Return
                </h4>
                <p className="text-xs text-gray-500">Money back</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0">
                <FaShieldAlt />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 text-sm">
                  Secure Payment
                </h4>
                <p className="text-xs text-gray-500">100% Protected</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductInfo;
