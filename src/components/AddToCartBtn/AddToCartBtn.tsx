'use client';

import { FaShoppingCart } from 'react-icons/fa';

function AddToCartBtn() {
  return (
    <>
      <button
        id="add-to-cart"
        className="flex-1 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-green-700 active:scale-[0.98] transition-all duration-300 ease-in-out flex items-center justify-center gap-2 shadow-lg shadow-green-600/25 bg-green-600 cursor-pointer"
        onClick={() => {
          alert('Done');
        }}
      >
        <FaShoppingCart />
        Add to Cart
      </button>
    </>
  );
}

export default AddToCartBtn;
