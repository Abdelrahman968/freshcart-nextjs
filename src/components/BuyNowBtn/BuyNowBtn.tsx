'use client';
import { addToast, Button } from '@heroui/react';
import { FaBolt } from 'react-icons/fa';
import { useSession } from 'next-auth/react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/reduxStore';
import { addToCartAsync } from '../../redux/slices/CartSlice';
import { useRouter } from 'next/navigation';

function BuyNowBtn({ productId }: { productId: string }) {
  const { data: session } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleBuyNow = () => {
    if (!session?.user) {
      addToast({
        title: 'You must login first',
        description: 'User is not authenticated',
        color: 'danger',
        timeout: 5000,
        shouldShowTimeoutProgress: true,
      });
      return;
    }
    dispatch(addToCartAsync(productId));
    router.replace('/cart');
  };
  return (
    <Button
      id="buy-now"
      className="flex-1 bg-gray-900 text-white py-3.5 px-6 rounded-xl font-medium hover:bg-gray-800 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
      color="primary"
      variant="solid"
      size="lg"
      onPress={handleBuyNow}
    >
      <FaBolt />
      Buy Now
    </Button>
  );
}

export default BuyNowBtn;
