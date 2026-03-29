import { getServerSession } from 'next-auth';
import { FaBox, FaCheck, FaTimes } from 'react-icons/fa';
import { FaBagShopping } from 'react-icons/fa6';
import OrderCard from './_components/OrderCard';
import DeliveryAddress from './_components/DeliveryAddress';
import OrderItems from './_components/OrderItems';
import OrderSummary from './_components/OrderSummary';
import { Order } from '../../../types/order.type';
import { nextAuthConfig } from '../../../next-auth/nextAuth.config';
import OrderStatus from './_components/OrderStatus';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'My Orders | FreshCart',
  description:
    'Track and manage your orders at FreshCart. View order history and delivery status.',
  keywords: ['FreshCart', 'Orders', 'Order History', 'Order Tracking'],
  openGraph: {
    title: 'My Orders | FreshCart',
    description:
      'Track and manage your orders at FreshCart. View order history and delivery status.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'My Orders | FreshCart',
    description:
      'Track and manage your orders at FreshCart. View order history and delivery status.',
    site: '@FreshCart',
    creator: '@FreshCart',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ payment?: string; operation?: string }>;
}) {
  const session = await getServerSession(nextAuthConfig);

  const { payment, operation } = await searchParams;

  if (!session) {
    return (
      <p className="text-center text-2xl font-bold mt-10">
        Please login to view your orders
      </p>
    );
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/orders/user/${session?.user.id}`
  );
  const data = await res.json();
  // console.log(session?.user.id);
  // console.log(data);

  const orders: Order[] = Array.isArray(data)
    ? data
    : Array.isArray(data?.data)
      ? data.data
      : [];

  return (
    <div className="container mx-auto px-4 py-8">
      <OrderStatus payment={payment} operation={operation} />
      <div className="mb-8">
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a className="hover:text-green-600 transition" href="/">
            Home
          </a>
          <span className="text-gray-300">/</span>
          <span className="text-gray-900 font-medium">My Orders</span>
        </nav>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/25">
              <FaBox className="text-white" size={25} />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                My Orders
              </h1>
              <p className="text-gray-500 text-sm mt-0.5">
                Track and manage your {orders.length}{' '}
                {orders.length === 1 ? 'order' : 'orders'}
              </p>
            </div>
          </div>

          <a
            className="self-start sm:self-auto text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-green-100 transition-all text-sm bg-green-50 duration-300 ease-in-out"
            href="/"
          >
            <FaBagShopping />
            Continue Shopping
          </a>
        </div>
      </div>

      <div className="space-y-4">
        {orders.map(order => (
          <OrderCard key={order._id} order={order}>
            <OrderItems
              items={order.cartItems.map(item => ({
                title: item.product.title,
                imageCover: item.product.imageCover,
                price: item.price,
                count: item.count,
              }))}
            />
            <div className="px-5 sm:px-6 pb-5 sm:pb-6 grid sm:grid-cols-2 gap-4">
              <DeliveryAddress shippingAddress={order.shippingAddress} />
              <OrderSummary
                totalOrderPrice={order.totalOrderPrice}
                taxPrice={order.taxPrice}
                shippingPrice={order.shippingPrice}
              />
            </div>
          </OrderCard>
        ))}
      </div>
    </div>
  );
}
