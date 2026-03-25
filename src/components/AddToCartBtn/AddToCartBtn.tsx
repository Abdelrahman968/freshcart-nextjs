'use client';
// In ProductDetails Page

import { FaShoppingCart } from 'react-icons/fa';
import { addToCart } from '../../services/cart.service';
import { useState } from 'react';

function AddToCartBtn({ productId }: { productId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const addToCartBtn = async (id: string) => {
    setIsLoading(true);
    await addToCart(id);
    setIsLoading(false);
    console.log('Done');
  };
  return (
    <>
      <button
        id="add-to-cart"
        className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 bg-green-600 cursor-pointer"
        onClick={() => {
          addToCartBtn(productId);
        }}
      >
        <FaShoppingCart />
        {isLoading ? 'Adding...' : 'Add to Cart'}
      </button>
    </>
  );
}

export default AddToCartBtn;
