import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaGlobe,
  FaMapMarkerAlt,
  FaShippingFast,
  FaTruck,
  FaUndoAlt,
} from 'react-icons/fa';
import { MdEmail, MdLocalShipping } from 'react-icons/md';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Shipping Information | FreshCart',
  description:
    'Learn about FreshCart shipping methods, delivery times, and policies.',
  keywords: ['FreshCart', 'Shipping Information'],
  openGraph: {
    title: 'Shipping Information | FreshCart',
    description:
      'Learn about FreshCart shipping methods, delivery times, and policies.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Shipping Information | FreshCart',
    description:
      'Learn about FreshCart shipping methods, delivery times, and policies.',
    site: '@FreshCart',
    creator: '@FreshCart',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
interface ShippingMethod {
  icon: React.ReactNode;
  title: string;
  duration: string;
  cost: string;
  description: string;
  badge?: string;
  badgeColor?: string;
}

interface ShippingStep {
  step: number;
  title: string;
  description: string;
}

interface ShippingZone {
  region: string;
  standard: string;
  express: string;
  overnight: string;
}

const shippingMethods: ShippingMethod[] = [
  {
    icon: <FaTruck className="text-green-600 text-2xl" />,
    title: 'Standard Shipping',
    duration: '3 – 5 Business Days',
    cost: '$4.99',
    description:
      'Our most popular option. Reliable delivery across all US states with real-time tracking included.',
    badge: 'Most Popular',
    badgeColor: 'bg-green-100 text-green-700',
  },
  {
    icon: <FaShippingFast className="text-blue-600 text-2xl" />,
    title: 'Express Shipping',
    duration: '1 – 2 Business Days',
    cost: '$12.99',
    description:
      'Need it fast? Express gets your order to you in 1–2 business days with priority handling.',
    badge: 'Fast',
    badgeColor: 'bg-blue-100 text-blue-700',
  },
  {
    icon: <FaClock className="text-purple-600 text-2xl" />,
    title: 'Overnight Shipping',
    duration: 'Next Business Day',
    cost: '$24.99',
    description:
      'Order by 11 PM and receive your items the very next business day. Available in select zones.',
    badge: 'Fastest',
    badgeColor: 'bg-purple-100 text-purple-700',
  },
  {
    icon: <FaCheckCircle className="text-emerald-600 text-2xl" />,
    title: 'Free Shipping',
    duration: '3 – 5 Business Days',
    cost: 'FREE',
    description:
      'Automatically applied on all orders over $50. Same reliable standard delivery at no extra cost.',
    badge: 'Best Value',
    badgeColor: 'bg-emerald-100 text-emerald-700',
  },
];

const orderSteps: ShippingStep[] = [
  {
    step: 1,
    title: 'Order Placed',
    description: 'Your order is confirmed and payment is processed.',
  },
  {
    step: 2,
    title: 'Processing',
    description: 'Our team picks, packs, and prepares your items.',
  },
  {
    step: 3,
    title: 'Shipped',
    description:
      'Your package is handed to the carrier. Tracking is activated.',
  },
  {
    step: 4,
    title: 'Out for Delivery',
    description: 'Your package is on its way to your doorstep.',
  },
  {
    step: 5,
    title: 'Delivered',
    description: 'Package delivered. Enjoy your FreshCart order!',
  },
];

const shippingZones: ShippingZone[] = [
  {
    region: 'Northeast (NY, NJ, CT, MA...)',
    standard: '2–3 days',
    express: '1 day',
    overnight: 'Next day',
  },
  {
    region: 'Southeast (FL, GA, NC, SC...)',
    standard: '3–4 days',
    express: '1–2 days',
    overnight: 'Next day',
  },
  {
    region: 'Midwest (IL, OH, MI, WI...)',
    standard: '3–4 days',
    express: '1–2 days',
    overnight: 'Next day',
  },
  {
    region: 'Southwest (TX, AZ, NM, NV...)',
    standard: '4–5 days',
    express: '2 days',
    overnight: 'Next day*',
  },
  {
    region: 'West Coast (CA, OR, WA...)',
    standard: '4–5 days',
    express: '2 days',
    overnight: 'Next day*',
  },
  {
    region: 'Remote / Alaska / Hawaii',
    standard: '5–7 days',
    express: '3–4 days',
    overnight: 'N/A',
  },
];

function ShippingInfoPage() {
  return (
    <>
      <PageHeader
        title="Shipping Information"
        subTitle="Everything you need to know about delivery, timelines, and policies."
        subTitle2="Shipping Info"
        icon={<MdLocalShipping size={40} />}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-green-50 rounded-2xl border border-green-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Free Shipping on $50+
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Add $50 or more to your cart and enjoy free standard
                    shipping — applied automatically at checkout.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { label: 'Shipping Methods', href: '#methods' },
                  { label: 'Delivery Timeline', href: '#timeline' },
                  { label: 'Shipping Zones', href: '#zones' },
                  { label: 'Tracking Your Order', href: '#tracking' },
                  { label: 'International Shipping', href: '#international' },
                  { label: 'Policies & Restrictions', href: '#policies' },
                ].map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors text-sm group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 group-hover:scale-125 transition-transform" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaBoxOpen className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Processing Time
                  </h3>
                  <p className="text-gray-500 text-sm">
                    All orders are processed within{' '}
                    <span className="font-medium text-gray-700">
                      1 business day
                    </span>{' '}
                    before shipping begins.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <MdEmail className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Shipping Support
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Question about your delivery?
                  </p>
                  <Link
                    href="/contact"
                    className="text-green-600 font-medium text-sm hover:underline"
                  >
                    Contact Us →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div
              id="methods"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaTruck className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Methods
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Choose the delivery speed that works best for you
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {shippingMethods.map(method => (
                  <div
                    key={method.title}
                    className="border border-gray-100 rounded-xl p-5 hover:border-green-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">
                        {method.icon}
                      </div>
                      {method.badge && (
                        <span
                          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${method.badgeColor}`}
                        >
                          {method.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {method.title}
                    </h3>
                    <p className="text-green-600 font-bold text-lg mb-1">
                      {method.cost}
                    </p>
                    <p className="text-gray-500 text-xs mb-2">
                      {method.duration}
                    </p>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="timeline"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaClock className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Delivery Timeline
                  </h2>
                  <p className="text-gray-500 text-sm">
                    From checkout to your doorstep
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-green-100" />
                <div className="space-y-6">
                  {orderSteps.map((step, index) => (
                    <div key={step.step} className="flex gap-5 relative">
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shrink-0 z-10 shadow-sm shadow-green-200">
                        <span className="text-white font-bold text-sm">
                          {step.step}
                        </span>
                      </div>
                      <div
                        className={`pb-2 ${index < orderSteps.length - 1 ? 'mb-2' : ''}`}
                      >
                        <h4 className="font-semibold text-gray-900 mb-0.5">
                          {step.title}
                        </h4>
                        <p className="text-gray-500 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="zones"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Shipping Zones
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Estimated delivery times by region
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Region
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-700">
                        Standard
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-700">
                        Express
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-700">
                        Overnight
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shippingZones.map((zone, index) => (
                      <tr
                        key={zone.region}
                        className={`border-b border-gray-50 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="px-4 py-3 text-gray-700 font-medium">
                          {zone.region}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500">
                          {zone.standard}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500">
                          {zone.express}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500">
                          {zone.overnight}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                * Overnight availability in Southwest and West Coast is subject
                to carrier capacity.
              </p>
            </div>

            <div
              id="tracking"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaShippingFast className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Tracking Your Order
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Stay updated every step of the way
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-gray-600 text-sm leading-relaxed">
                <p>
                  Once your order ships, you will receive a{' '}
                  <span className="font-medium text-gray-800">
                    shipping confirmation email
                  </span>{' '}
                  with a tracking number and a link to follow your package in
                  real time.
                </p>
                <p>
                  You can also track your order anytime from{' '}
                  <Link
                    href="/account/orders"
                    className="text-green-600 hover:underline font-medium"
                  >
                    My Orders
                  </Link>{' '}
                  in your account dashboard.
                </p>
                <p>
                  Tracking updates may take up to{' '}
                  <span className="font-medium text-gray-800">24 hours</span> to
                  appear after your order is picked up by the carrier.
                </p>
              </div>
            </div>

            <div
              id="international"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaGlobe className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    International Shipping
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Shipping outside the United States
                  </p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3">
                <FaExclamationTriangle className="text-yellow-500 text-lg shrink-0 mt-0.5" />
                <p className="text-yellow-800 text-sm leading-relaxed">
                  International shipping is{' '}
                  <span className="font-semibold">not yet available</span>. We
                  currently ship within the United States only. International
                  delivery is on our roadmap — sign up for our newsletter to be
                  the first to know when it launches.
                </p>
              </div>
            </div>

            <div
              id="policies"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaUndoAlt className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Policies & Restrictions
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Important shipping rules to know
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  'Orders placed before 11 PM EST are processed the next business day.',
                  'We do not ship to P.O. Boxes for Express or Overnight orders.',
                  'Perishable items are shipped with insulated packaging and ice packs.',
                  'FreshCart is not responsible for delays caused by weather or carrier issues.',
                  'If a package is undeliverable, it will be returned and you will be fully refunded.',
                  'Incorrect addresses may result in delivery failure — please double-check at checkout.',
                ].map((policy, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-sm text-gray-600"
                  >
                    <FaCheckCircle className="text-green-500 text-base shrink-0 mt-0.5" />
                    {policy}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <MdLocalShipping className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Still have shipping questions?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Our support team is available Mon–Fri, 8am–6pm to help with
                    any delivery concerns.
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

export default ShippingInfoPage;
