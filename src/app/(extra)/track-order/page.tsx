'use client';
import {
  FaBoxOpen,
  FaCheckCircle,
  FaHeadset,
  FaSearch,
  FaShippingFast,
  FaTruck,
} from 'react-icons/fa';
import { MdLocalShipping } from 'react-icons/md';
import { FaLocationDot } from 'react-icons/fa6';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { useState } from 'react';
import Link from 'next/link';

type TrackingStatus =
  | 'processing'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered';

interface TrackingEvent {
  date: string;
  time: string;
  location: string;
  description: string;
}

interface TrackingResult {
  orderNumber: string;
  status: TrackingStatus;
  estimatedDelivery: string;
  carrier: string;
  trackingNumber: string;
  events: TrackingEvent[];
}

const MOCK_RESULTS: Record<string, TrackingResult> = {
  'FC-123456': {
    orderNumber: 'FC-123456',
    status: 'out_for_delivery',
    estimatedDelivery: 'Today by 8:00 PM',
    carrier: 'FedEx',
    trackingNumber: '7489234823948234',
    events: [
      {
        date: 'Mar 24',
        time: '8:32 AM',
        location: 'New York, NY',
        description: 'Out for delivery',
      },
      {
        date: 'Mar 24',
        time: '5:10 AM',
        location: 'New York, NY',
        description: 'Arrived at delivery facility',
      },
      {
        date: 'Mar 23',
        time: '11:48 PM',
        location: 'Newark, NJ',
        description: 'Departed sorting center',
      },
      {
        date: 'Mar 23',
        time: '3:15 PM',
        location: 'Newark, NJ',
        description: 'Arrived at sorting center',
      },
      {
        date: 'Mar 22',
        time: '9:00 AM',
        location: 'Chicago, IL',
        description: 'Package picked up by carrier',
      },
    ],
  },
  'FC-789012': {
    orderNumber: 'FC-789012',
    status: 'delivered',
    estimatedDelivery: 'Delivered Mar 22',
    carrier: 'UPS',
    trackingNumber: '1Z9999W99999999999',
    events: [
      {
        date: 'Mar 22',
        time: '2:45 PM',
        location: 'Brooklyn, NY',
        description: 'Delivered — Left at front door',
      },
      {
        date: 'Mar 22',
        time: '9:00 AM',
        location: 'Brooklyn, NY',
        description: 'Out for delivery',
      },
      {
        date: 'Mar 21',
        time: '11:30 PM',
        location: 'New York, NY',
        description: 'Arrived at delivery facility',
      },
    ],
  },
};

const statusConfig: Record<
  TrackingStatus,
  {
    label: string;
    color: string;
    bg: string;
    icon: React.ReactNode;
    step: number;
  }
> = {
  processing: {
    label: 'Processing',
    color: 'text-yellow-700',
    bg: 'bg-yellow-50 border-yellow-100',
    icon: <FaBoxOpen className="text-yellow-500" />,
    step: 1,
  },
  shipped: {
    label: 'Shipped',
    color: 'text-blue-700',
    bg: 'bg-blue-50 border-blue-100',
    icon: <FaTruck className="text-blue-500" />,
    step: 2,
  },
  out_for_delivery: {
    label: 'Out for Delivery',
    color: 'text-orange-700',
    bg: 'bg-orange-50 border-orange-100',
    icon: <FaShippingFast className="text-orange-500" />,
    step: 3,
  },
  delivered: {
    label: 'Delivered',
    color: 'text-green-700',
    bg: 'bg-green-50 border-green-100',
    icon: <FaCheckCircle className="text-green-500" />,
    step: 4,
  },
};

const allSteps = [
  { key: 'processing', label: 'Processing', icon: <FaBoxOpen /> },
  { key: 'shipped', label: 'Shipped', icon: <FaTruck /> },
  {
    key: 'out_for_delivery',
    label: 'Out for Delivery',
    icon: <FaShippingFast />,
  },
  { key: 'delivered', label: 'Delivered', icon: <FaCheckCircle /> },
];

function ProgressBar({ status }: { status: TrackingStatus }) {
  const currentStep = statusConfig[status].step;
  return (
    <div className="flex items-center w-full mb-6">
      {allSteps.map((s, i) => {
        const stepNum = i + 1;
        const done = stepNum <= currentStep;
        const active = stepNum === currentStep;
        return (
          <div key={s.key} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-1.5">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all ${
                  done
                    ? active
                      ? 'bg-green-600 text-white ring-4 ring-green-100'
                      : 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-400'
                }`}
              >
                {s.icon}
              </div>
              <span
                className={`text-xs font-medium whitespace-nowrap hidden sm:block ${done ? 'text-green-600' : 'text-gray-400'}`}
              >
                {s.label}
              </span>
            </div>
            {i < allSteps.length - 1 && (
              <div
                className={`flex-1 h-0.5 mx-1 rounded-full transition-all ${stepNum < currentStep ? 'bg-green-500' : 'bg-gray-100'}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function TrackingCard({ result }: { result: TrackingResult }) {
  const cfg = statusConfig[result.status];
  return (
    <div className="space-y-5 mt-6">
      <div
        className={`rounded-xl border p-4 flex items-center gap-3 ${cfg.bg}`}
      >
        <div className="text-xl">{cfg.icon}</div>
        <div>
          <p className={`font-bold text-base ${cfg.color}`}>{cfg.label}</p>
          <p className="text-gray-500 text-sm">{result.estimatedDelivery}</p>
        </div>
      </div>

      <ProgressBar status={result.status} />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: 'Order Number', value: result.orderNumber },
          { label: 'Carrier', value: result.carrier },
          {
            label: 'Tracking #',
            value: result.trackingNumber.slice(0, 12) + '...',
          },
        ].map(item => (
          <div key={item.label} className="bg-gray-50 rounded-xl p-4">
            <p className="text-xs text-gray-400 mb-1">{item.label}</p>
            <p className="font-semibold text-gray-800 text-sm">{item.value}</p>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-semibold text-gray-900 mb-4 text-sm">
          Tracking History
        </h3>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-green-100" />
          <div className="space-y-4">
            {result.events.map((event, i) => (
              <div key={i} className="flex gap-4 relative">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 z-10 ${i === 0 ? 'bg-green-600 shadow-sm shadow-green-200' : 'bg-gray-200'}`}
                >
                  <FaLocationDot
                    className={`text-xs ${i === 0 ? 'text-white' : 'text-gray-400'}`}
                  />
                </div>
                <div className="pb-1">
                  <p
                    className={`font-semibold text-sm ${i === 0 ? 'text-gray-900' : 'text-gray-600'}`}
                  >
                    {event.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {event.location} · {event.date} at {event.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function TrackOrderPage() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setNotFound(false);
    setResult(null);

    await new Promise(r => setTimeout(r, 1200));

    const found = MOCK_RESULTS[query.trim().toUpperCase()];
    if (found) {
      setResult(found);
    } else {
      setNotFound(true);
    }
    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleTrack();
  };

  return (
    <>
      <PageHeader
        title="Track Your Order"
        subTitle="Enter your order number or tracking number to get real-time updates."
        subTitle2="Track Order"
        icon={<FaTruck size={36} />}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-green-50 rounded-2xl border border-green-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaSearch className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Where to find your order number?
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Check your order confirmation email or visit{' '}
                    <Link
                      href="/account/orders"
                      className="text-green-600 font-medium hover:underline"
                    >
                      My Orders
                    </Link>{' '}
                    in your account.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-3">Try a Demo</h3>
              <p className="text-gray-500 text-sm mb-3">
                Use these sample order numbers to test tracking:
              </p>
              <div className="space-y-2">
                {Object.keys(MOCK_RESULTS).map(key => (
                  <button
                    key={key}
                    onClick={() => setQuery(key)}
                    className="w-full text-left px-4 py-2.5 rounded-xl border border-dashed border-green-200 text-green-700 text-sm font-medium hover:bg-green-50 transition-colors"
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <MdLocalShipping className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Delivery Issue?
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Package late or missing?
                  </p>
                  <Link
                    href="/contact"
                    className="text-green-600 font-medium text-sm hover:underline"
                  >
                    Report a Problem →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaTruck className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Track Your Order
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Enter your FreshCart order number (e.g. FC-123456)
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <input
                  type="text"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Order number or tracking number..."
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition text-sm"
                />
                <button
                  onClick={handleTrack}
                  disabled={loading || !query.trim()}
                  className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors shadow-sm shadow-green-600/20 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Tracking...
                    </>
                  ) : (
                    <>
                      <FaSearch />
                      Track
                    </>
                  )}
                </button>
              </div>

              {result && <TrackingCard result={result} />}

              {notFound && (
                <div className="mt-6 bg-red-50 border border-red-100 rounded-xl p-5 flex gap-3">
                  <FaBoxOpen className="text-red-400 text-xl shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-red-700 text-sm mb-1">
                      Order not found
                    </p>
                    <p className="text-red-600 text-sm">
                      We couldn&apos;t find an order matching{' '}
                      <span className="font-mono font-bold">{query}</span>.
                      Double-check the number or{' '}
                      <Link href="/contact" className="underline font-medium">
                        contact support
                      </Link>
                      .
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Tracking Tips
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Make the most of your tracking
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Tracking updates may take up to 24 hours after shipment to appear.',
                  'Your order number starts with "FC-" and is in your confirmation email.',
                  "You can also track directly on the carrier's website using the tracking number.",
                  'Estimated delivery times exclude weekends and public holidays.',
                  "If your tracking hasn't updated in 3+ days, contact our support team.",
                ].map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <FaCheckCircle className="text-green-500 text-base shrink-0 mt-0.5" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaHeadset className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Package missing or late?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    If your order is significantly delayed or hasn&apos;t
                    arrived, our team will investigate and make it right.
                  </p>
                  <Link
                    href="/contact"
                    className="text-green-600 font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Contact Support →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TrackOrderPage;
