'use client';

import { FaStar, FaRegStar } from 'react-icons/fa';
import { ProductCardProps } from '../../types/product.type';
import { Button, Pagination, Textarea } from '@heroui/react';
import { useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Rating } from '@smastrom/react-rating';

function ReviewProduct({ product }: { product: ProductCardProps }) {
  const { ratingsAverage, ratingsQuantity, reviews } = product;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data: session, status } = useSession();
  const [rating, setRating] = useState(0);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const ratingDistribution = useMemo(() => {
    return [5, 4, 3, 2, 1].map(star => {
      const count = reviews.filter(r => Math.floor(r.rating) === star).length;
      const percent = ratingsQuantity
        ? Math.round((count / ratingsQuantity) * 100)
        : 0;
      return { star, percent };
    });
  }, [reviews, ratingsQuantity]);

  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="text-center w-full md:w-fit">
            <div className="text-5xl font-bold text-gray-900 mb-2">
              {ratingsAverage.toFixed(1)}
            </div>

            <div className="flex justify-center text-yellow-400 text-lg">
              <Rating
                style={{ maxWidth: 100 }}
                value={ratingsAverage}
                readOnly
              />
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
          {status === 'authenticated' && (
            <form>
              <div className="my-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className="w-9 h-9 rounded-full bg-linear-to-br from-green-400 to-emerald-600 
                    flex items-center justify-center text-white font-semibold text-sm shadow-sm"
                  >
                    {session?.user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-gray-400">Writing a review</p>
                  </div>
                </div>

                <Textarea
                  label="Your Review"
                  placeholder={`What do you think about this product?`}
                  className="w-full"
                  minRows={4}
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      'border-gray-200 hover:border-green-300 focus-within:!border-green-500',
                    label: 'text-gray-500',
                  }}
                />

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Your rating:</span>
                    <Rating
                      style={{ maxWidth: 110 }}
                      value={rating}
                      onChange={setRating}
                    />
                    {rating > 0 && (
                      <span
                        className="text-xs font-bold bg-green-50 text-green-700 
                         border border-green-100 rounded-full px-2.5 py-1 flex items-center gap-1"
                      >
                        {rating.toFixed(1)} <FaStar />
                      </span>
                    )}
                  </div>

                  <Button
                    color="success"
                    className="font-medium px-6"
                    isDisabled={rating === 0}
                  >
                    Add Review
                  </Button>
                </div>
              </div>
            </form>
          )}

          {reviews.length === 0 ? (
            <div className="text-center py-8">
              <FaRegStar className="text-4xl text-gray-300 mx-auto mb-3" />

              <p className="text-gray-500">
                Customer reviews will be displayed here.
              </p>

              <button className="mt-4 text-green-600 hover:text-green-700 transition-colors duration-300 ease-in-out font-medium">
                Write a Review
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {reviews
                .slice((currentPage - 1) * 4, currentPage * 4)
                .map(review => (
                  <div
                    key={review._id}
                    className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-300 ease-in-out"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                          {review.user.name.charAt(0).toUpperCase()}
                        </div>

                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-800 text-sm leading-tight">
                            {review.user.name}
                          </span>
                          <Rating
                            style={{ maxWidth: 70 }}
                            value={review.rating}
                            readOnly
                          />
                        </div>
                      </div>

                      <span className="text-xs font-bold bg-green-50 text-green-700 border border-green-100 rounded-full px-2.5 py-1 flex items-center gap-1">
                        {review.rating.toFixed(1)} <FaStar />
                      </span>
                    </div>

                    <p className="text-gray-500 text-sm leading-relaxed pl-12">
                      {review.review}
                    </p>
                  </div>
                ))}
            </div>
          )}

          {reviews.length > 1 && (
            <div className="flex justify-center my-6">
              <Pagination
                showControls
                initialPage={1}
                total={Math.ceil(reviews.length / 4)}
                color="success"
                onChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewProduct;
