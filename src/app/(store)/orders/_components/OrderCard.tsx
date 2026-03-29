'use client';

import { useState } from 'react';
import {
  FaBox,
  FaChevronDown,
  FaCreditCard,
  FaHashtag,
  FaTruck,
} from 'react-icons/fa';
import { FaCalendarDays, FaLocationDot } from 'react-icons/fa6';
import { Order } from '../../../../types/order.type';

interface StatusConfig {
  label: string;
  bg: string;
  text: string;
  icon: React.ReactNode;
}

const STATUS_MAP: Record<'delivered' | 'onTheWay' | 'pending', StatusConfig> = {
  delivered: {
    label: 'Delivered',
    bg: 'bg-green-100',
    text: 'text-green-600',
    icon: <FaBox className="text-xs text-green-600" />,
  },
  onTheWay: {
    label: 'On the way',
    bg: 'bg-blue-100',
    text: 'text-blue-600',
    icon: <FaTruck className="text-xs text-blue-600" />,
  },
  pending: {
    label: 'Pending',
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
    icon: <FaTruck className="text-xs text-yellow-600" />,
  },
};

interface OrderCardProps {
  order: Order;
  children: React.ReactNode;
}

export default function OrderCard({ order, children }: OrderCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  const status: StatusConfig = order.isDelivered
    ? STATUS_MAP.delivered
    : order.isPaid
      ? STATUS_MAP.onTheWay
      : STATUS_MAP.pending;

  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen
          ? 'border-green-200 shadow-lg shadow-green-100/50'
          : 'border-gray-200 shadow-sm hover:border-green-200 hover:shadow-md'
      }`}
    >
      <div className="p-5 sm:p-6">
        <div className="flex gap-5">
          <div className="relative shrink-0">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-linear-to-br from-gray-50 to-white border border-gray-100 p-2.5 overflow-hidden">
              <img
                className="w-full h-full object-contain"
                src={order.cartItems[0]?.product?.imageCover}
                alt="order product"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 ${status.bg} rounded-lg mb-2`}
                >
                  {status.icon}
                  <span className={`text-xs font-semibold ${status.text}`}>
                    {status.label}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                  <FaHashtag className="text-xs text-gray-400" />
                  {order.id}
                </h3>
              </div>
              <div
                className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                  order.paymentMethodType === 'card'
                    ? 'bg-purple-100'
                    : 'bg-orange-100'
                }`}
              >
                <FaCreditCard
                  className={
                    order.paymentMethodType === 'card'
                      ? 'text-purple-600'
                      : 'text-orange-500'
                  }
                />
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
              <span className="flex items-center gap-1.5">
                <FaCalendarDays className="text-xs text-gray-400" />
                {formattedDate}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
                <FaBox className="text-xs text-gray-400" />
                {order.cartItems.length}{' '}
                {order.cartItems.length === 1 ? 'item' : 'items'}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
                <FaLocationDot className="text-xs text-gray-400" />
                {order.shippingAddress?.city}
              </span>
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  {order.totalOrderPrice?.toLocaleString()}
                </span>
                <span className="text-sm font-medium text-gray-400 ml-1">
                  EGP
                </span>
              </div>
              <button
                onClick={() => setIsOpen(prev => !prev)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all bg-green-600 text-white shadow-lg shadow-green-600/25 hover:bg-green-700 active:scale-95"
              >
                {isOpen ? 'Hide' : 'Show'}
                <FaChevronDown
                  className={`text-xs text-white transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="border-t border-gray-100 bg-gray-50/50">{children}</div>
      </div>
    </div>
  );
}
