'use client';

import React from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

function ProductQuantity({ quantity }: { quantity: number }) {
  const [count, setCount] = React.useState(1);

  const decrease = () => {
    setCount(prev => Math.max(1, prev - 1));
  };

  const increase = () => {
    setCount(prev => Math.min(quantity, prev + 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value);

    if (value < 1) value = 1;
    if (value > quantity) value = quantity;

    setCount(value);
  };

  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Quantity
      </label>

      {quantity === 0 ? (
        <p className="text-red-500 font-medium">
          Sorry, this product is out of stock
        </p>
      ) : (
        <div className="flex items-center gap-4">
          <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
            <button
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-green-600 transition disabled:opacity-50 cursor-pointer disabled:hover:bg-transparent disabled:hover:text-gray-600"
              disabled={count <= 1}
              onClick={decrease}
            >
              <FaMinus />
            </button>

            <input
              min={1}
              max={quantity}
              type="number"
              value={count}
              onChange={handleChange}
              className="w-16 text-center border-0 focus:ring-0 focus:outline-none text-lg font-medium"
            />

            <button
              className="px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-green-600 transition disabled:opacity-50 cursor-pointer disabled:hover:bg-transparent disabled:hover:text-gray-600"
              disabled={count >= quantity}
              onClick={increase}
            >
              <FaPlus />
            </button>
          </div>

          <span className="text-sm text-gray-500">{quantity} available</span>
        </div>
      )}
    </div>
  );
}

export default ProductQuantity;
