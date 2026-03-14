'use client';

import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';
import { ProductCardProps } from '../../types/product.type';
import { Pagination } from '@heroui/react';

function ReviewProduct({ product }: { product: ProductCardProps }) {
  const { ratingsAverage, ratingsQuantity, reviews } = product;

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }
    return stars;
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => Math.floor(r.rating) === star).length;
    const percent = ratingsQuantity
      ? Math.round((count / ratingsQuantity) * 100)
      : 0;
    return { star, percent };
  });

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {ratingsAverage}
            </div>

            <div className="flex justify-center text-yellow-400 text-lg">
              {renderStars(ratingsAverage)}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Based on {ratingsQuantity} reviews
            </p>
          </div>

          <div className="flex-1 w-full">
            {ratingDistribution.map(item => (
              <div key={item.star} className="flex items-center gap-3 mb-2">
                <span className="text-sm text-gray-600 w-12">
                  {item.star} star
                </span>

                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all duration-300"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>

                <span className="text-sm text-gray-500 w-10">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6" id="reviews">
          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <FaRegStar className="text-4xl text-gray-300 mx-auto mb-3" />

              <p className="text-gray-500">
                Customer reviews will be displayed here.
              </p>

              <button className="mt-4 text-primary-600 hover:text-primary-700 font-medium">
                Write a Review
              </button>
            </div>
          ) : (
            <div className="space-y-4 ">
              {reviews.map(review => (
                <div
                  key={review._id}
                  className="border rounded-lg p-4 bg-gray-50"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">
                      {review.user.name}
                    </span>
                    <div className="flex text-yellow-400 text-sm">
                      {renderStars(review.rating)}
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm">{review.review}</p>
                </div>
              ))}

              {reviews.length > 1 && (
                <div className="flex justify-center">
                  <Pagination
                    showControls
                    initialPage={1}
                    total={reviews.length}
                    color="success"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewProduct;
