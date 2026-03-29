'use client';

import {
  FaStar,
  FaRegStar,
  FaTrash,
  FaEdit,
  FaCheck,
  FaTimes,
} from 'react-icons/fa';
import { addToast, Button, Pagination, Textarea } from '@heroui/react';
import { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Rating } from '@smastrom/react-rating';
import { useForm } from 'react-hook-form';

type ReviewUser = {
  _id: string;
  name: string;
};

type Review = {
  _id: string;
  review: string;
  rating: number;
  product: string;
  user: ReviewUser;
  createdAt: string;
  updatedAt: string;
};

type ApiResponse = {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Review[];
};

function ReviewProduct({ productId }: { productId: string }) {
  const { data: session, status } = useSession();

  const [reviews, setReviews] = useState<Review[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [rating, setRating] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editReview, setEditReview] = useState('');
  const [editRating, setEditRating] = useState(0);
  const [editLoading, setEditLoading] = useState(false);

  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setFetchLoading(true);
      try {
        const res = await fetch(`/api/reviews/${productId}/get`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const json: ApiResponse = await res.json();
        setReviews(json.data ?? []);
      } catch (error) {
        addToast({
          title: 'Error',
          description: 'Failed to load reviews. Please try again.',
          color: 'danger',
        });
      } finally {
        setFetchLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const ratingsQuantity = reviews.length;
  const ratingsAverage =
    ratingsQuantity > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / ratingsQuantity
      : 0;

  const ratingDistribution = useMemo(
    () =>
      [5, 4, 3, 2, 1].map(star => {
        const count = reviews.filter(r => Math.floor(r.rating) === star).length;
        const percent = ratingsQuantity
          ? Math.round((count / ratingsQuantity) * 100)
          : 0;
        return { star, percent };
      }),
    [reviews, ratingsQuantity]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<{ review: string }>();

  const onSubmit = async (formData: { review: string }) => {
    if (rating === 0) {
      addToast({
        title: 'Rating required',
        description: 'Please select a star rating.',
        color: 'warning',
      });
      return;
    }

    setSubmitLoading(true);
    try {
      const res = await fetch(`/api/reviews/${productId}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ review: formData.review, rating }),
      });

      const json = await res.json();

      if (!res.ok || json.message === 'fail') {
        const errMsg =
          json.errors?.msg || json.message || 'Something went wrong.';
        addToast({
          title: 'Failed to submit',
          description: errMsg,
          color: 'danger',
        });
        return;
      }

      const newReview: Review = {
        _id: json.data?._id ?? Date.now().toString(),
        review: formData.review,
        rating,
        product: productId,
        user: {
          _id: (session?.user as any)?.id ?? '',
          name: session?.user?.name ?? 'You',
        },
        createdAt: json.data?.createdAt ?? new Date().toISOString(),
        updatedAt: json.data?.updatedAt ?? new Date().toISOString(),
      };

      setReviews(prev => [newReview, ...prev]);
      reset();
      setRating(0);

      addToast({
        title: 'Review added!',
        description: 'Thank you for your feedback.',
        color: 'success',
      });
    } catch {
      addToast({
        title: 'Network error',
        description: 'Check your connection and try again.',
        color: 'danger',
      });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    setDeletingId(reviewId);
    try {
      const res = await fetch(`/api/reviews/auth/${reviewId}/delete`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
      });

      const json = res.status !== 204 ? await res.json().catch(() => ({})) : {};

      if (!res.ok || json.message === 'fail') {
        const errMsg =
          json.errors?.msg || json.message || `Server error (${res.status})`;
        addToast({
          title: 'Delete failed',
          description: errMsg,
          color: 'danger',
        });
        return;
      }

      setReviews(prev => prev.filter(r => r._id !== reviewId));

      const newTotal = reviews.length - 1;
      const maxPage = Math.ceil(newTotal / 4) || 1;
      if (currentPage > maxPage) setCurrentPage(maxPage);

      addToast({
        title: 'Deleted',
        description: 'Your review has been removed.',
        color: 'success',
      });
    } catch (err) {
      addToast({
        title: 'Network error',
        description:
          err instanceof Error
            ? err.message
            : 'Check your connection and try again.',
        color: 'danger',
      });
    } finally {
      setDeletingId(null);
    }
  };

  const startEdit = (review: Review) => {
    setEditingId(review._id);
    setEditReview(review.review);
    setEditRating(review.rating);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditReview('');
    setEditRating(0);
  };

  const handleUpdate = async (reviewId: string) => {
    if (editRating === 0) {
      addToast({
        title: 'Rating required',
        description: 'Please select a star rating.',
        color: 'warning',
      });
      return;
    }
    if (editReview.trim().length < 5) {
      addToast({
        title: 'Review too short',
        description: 'Review must be at least 5 characters.',
        color: 'warning',
      });
      return;
    }

    setEditLoading(true);
    try {
      const res = await fetch(`/api/reviews/auth/${reviewId}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ review: editReview, rating: editRating }),
      });

      const json = await res.json();

      if (!res.ok || json.message === 'fail') {
        const errMsg =
          json.errors?.msg || json.message || 'Could not update review.';
        addToast({
          title: 'Update failed',
          description: errMsg,
          color: 'danger',
        });
        return;
      }

      const updated = json.data;
      setReviews(prev =>
        prev.map(r =>
          r._id === reviewId
            ? {
                ...r,
                review: updated?.review ?? editReview,
                rating: updated?.rating ?? editRating,
              }
            : r
        )
      );
      cancelEdit();

      addToast({
        title: 'Updated!',
        description: 'Your review has been updated.',
        color: 'success',
      });
    } catch {
      addToast({
        title: 'Network error',
        description: 'Check your connection and try again.',
        color: 'danger',
      });
    } finally {
      setEditLoading(false);
    }
  };

  const isOwner = (review: Review) =>
    review.user._id === (session?.user as any)?.id;

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
              Based on {ratingsQuantity}{' '}
              {ratingsQuantity === 1 ? 'review' : 'reviews'}
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="my-6 bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
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
                  placeholder="What do you think about this product?"
                  className="w-full"
                  minRows={4}
                  variant="bordered"
                  classNames={{
                    inputWrapper:
                      'border-gray-200 hover:border-green-300 focus-within:!border-green-500',
                    label: 'text-gray-500',
                  }}
                  {...register('review', {
                    required: 'Review is required',
                    minLength: {
                      value: 5,
                      message: 'Review must be at least 5 characters long',
                    },
                  })}
                  isInvalid={!!errors.review}
                  errorMessage={errors.review?.message}
                  isDisabled={submitLoading}
                />

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-500">Your rating:</span>
                    <Rating
                      style={{ maxWidth: 110 }}
                      value={rating}
                      onChange={setRating}
                      isDisabled={submitLoading}
                    />
                    {rating > 0 && (
                      <span className="text-xs font-bold bg-green-50 text-green-700 border border-green-100 rounded-full px-2.5 py-1 flex items-center gap-1">
                        {rating.toFixed(1)} <FaStar />
                      </span>
                    )}
                  </div>

                  <Button
                    color="success"
                    className="font-medium px-6"
                    isDisabled={rating === 0 || submitLoading}
                    type="submit"
                    isLoading={submitLoading}
                  >
                    Add Review
                  </Button>
                </div>
              </div>
            </form>
          )}

          {fetchLoading ? (
            <div className="text-center py-10 text-gray-400 text-sm animate-pulse">
              Loading reviews…
            </div>
          ) : reviews.length === 0 ? (
            <div className="text-center py-8">
              <FaRegStar className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">
                No reviews yet. Be the first to share your thoughts!
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {reviews
                .slice((currentPage - 1) * 4, currentPage * 4)
                .map(review => (
                  <div
                    key={review._id}
                    className="group relative bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-300"
                  >
                    {editingId === review._id ? (
                      <div className="space-y-3">
                        <Textarea
                          value={editReview}
                          onValueChange={setEditReview}
                          minRows={3}
                          variant="bordered"
                          classNames={{
                            inputWrapper:
                              'border-gray-200 focus-within:!border-green-500',
                          }}
                          isDisabled={editLoading}
                        />
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                              Rating:
                            </span>
                            <Rating
                              style={{ maxWidth: 100 }}
                              value={editRating}
                              onChange={setEditRating}
                              isDisabled={editLoading}
                            />
                          </div>
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              color="success"
                              variant="flat"
                              startContent={<FaCheck />}
                              onPress={() => handleUpdate(review._id)}
                              isLoading={editLoading}
                            >
                              Save
                            </Button>
                            <Button
                              size="sm"
                              variant="flat"
                              startContent={<FaTimes />}
                              onPress={cancelEdit}
                              isDisabled={editLoading}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-linear-to-br from-green-400 to-emerald-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                              {review.user?.name?.charAt(0)?.toUpperCase() ??
                                '?'}
                            </div>
                            <div className="flex flex-col">
                              <span className="font-semibold text-gray-800 text-sm leading-tight">
                                {review.user?.name ?? 'Unknown'}
                              </span>
                              <Rating
                                style={{ maxWidth: 70 }}
                                value={review.rating}
                                readOnly
                              />
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold bg-green-50 text-green-700 border border-green-100 rounded-full px-2.5 py-1 flex items-center gap-1">
                              {review.rating.toFixed(1)} <FaStar />
                            </span>

                            {status === 'authenticated' && isOwner(review) && (
                              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => startEdit(review)}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-50 transition-colors"
                                  title="Edit review"
                                >
                                  <FaEdit size={13} />
                                </button>
                                <button
                                  onClick={() => handleDelete(review._id)}
                                  disabled={deletingId === review._id}
                                  className="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors disabled:opacity-40"
                                  title="Delete review"
                                >
                                  {deletingId === review._id ? (
                                    <span className="w-3 h-3 border-2 border-red-400 border-t-transparent rounded-full animate-spin inline-block" />
                                  ) : (
                                    <FaTrash size={13} />
                                  )}
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-gray-500 text-sm leading-relaxed pl-12">
                          {review.review}
                        </p>

                        <p className="text-xs text-gray-300 pl-12 mt-2">
                          {new Date(review.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            }
                          )}
                        </p>
                      </>
                    )}
                  </div>
                ))}
            </div>
          )}

          {reviews.length > 4 && (
            <div className="flex justify-center my-6">
              <Pagination
                showControls
                initialPage={1}
                page={currentPage}
                total={Math.ceil(reviews.length / 4)}
                color="success"
                onChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ReviewProduct;
