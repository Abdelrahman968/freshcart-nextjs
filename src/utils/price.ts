export const getDiscountPercentage = (
  price: number,
  discountedPrice: number | undefined
): number => {
  if (!price || !discountedPrice) return 0;

  return Math.round(((price - discountedPrice) / price) * 100);
};
