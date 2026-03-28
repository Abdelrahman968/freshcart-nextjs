import { FaTruck } from 'react-icons/fa';

interface OrderSummaryProps {
  totalOrderPrice: number;
  taxPrice: number;
  shippingPrice: number;
}

export default function OrderSummary({
  totalOrderPrice,
  taxPrice,
  shippingPrice,
}: OrderSummaryProps) {
  const subtotal = totalOrderPrice - taxPrice - shippingPrice;

  return (
    <div className="p-4 rounded-xl bg-blue-100 border border-blue-200">
      <h4 className="font-semibold text-gray-900 text-sm flex items-center gap-2 mb-3">
        <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center">
          <FaTruck className="text-xs text-white" />
        </div>
        Order Summary
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span className="font-medium">{subtotal.toLocaleString()} EGP</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Shipping</span>
          <span className="font-medium">
            {shippingPrice === 0
              ? 'Free'
              : `${shippingPrice.toLocaleString()} EGP`}
          </span>
        </div>
        {taxPrice > 0 && (
          <div className="flex justify-between text-gray-600">
            <span>Tax</span>
            <span className="font-medium">{taxPrice.toLocaleString()} EGP</span>
          </div>
        )}
        <hr className="border-gray-200/50 my-2" />
        <div className="flex justify-between pt-1">
          <span className="font-semibold text-gray-900">Total</span>
          <span className="font-bold text-lg text-gray-900">
            {totalOrderPrice.toLocaleString()} EGP
          </span>
        </div>
      </div>
    </div>
  );
}
