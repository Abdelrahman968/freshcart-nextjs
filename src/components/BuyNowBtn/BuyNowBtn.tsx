'use client';
import { Button } from '@heroui/react';
import { FaBolt } from 'react-icons/fa';

function BuyNowBtn() {
  return (
    <Button
      id="buy-now"
      className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
      color="primary"
      variant="solid"
      size="lg"
    >
      <FaBolt />
      Buy Now
    </Button>
  );
}

export default BuyNowBtn;
