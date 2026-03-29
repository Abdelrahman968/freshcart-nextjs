import Link from 'next/link';
import { FaReceipt, FaArrowLeft } from 'react-icons/fa6';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';
import MainForm from './_components/MainForm';
import { decodeAuthUserToken } from '../../../utils/decodeAuthUserToken';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Checkout | FreshCart',
  description:
    'Complete your purchase at FreshCart. Secure checkout with multiple payment options.',
  keywords: ['FreshCart', 'Checkout', 'Online Payment'],
  openGraph: {
    title: 'Checkout | FreshCart',
    description:
      'Complete your purchase at FreshCart. Secure checkout with multiple payment options.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Checkout | FreshCart',
    description:
      'Complete your purchase at FreshCart. Secure checkout with multiple payment options.',
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

export default async function CheckoutPage() {
  let addresses = [];

  const token = await decodeAuthUserToken();

  if (token) {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/address`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        token,
      },
      cache: 'no-store',
    });

    addresses = await res.json();
  }

  return (
    <div className="bg-linear-to-b from-gray-50 to-white min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <div className="mb-6">
            <Breadcrumb
              homeURL="/"
              categoryURL="/cart"
              categoryName="Cart"
              productName="Checkout"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <span className="bg-linear-to-br from-green-600 to-green-700 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg shadow-green-600/20">
                  <FaReceipt />
                </span>
                Complete Your Order
              </h1>
              <p className="text-gray-500 mt-2">
                Review your items and complete your purchase
              </p>
            </div>
            <Link
              href="/cart"
              className="text-green-600 hover:text-green-700 font-medium flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-green-50 transition-all"
            >
              <FaArrowLeft />
              Back to Cart
            </Link>
          </div>
        </div>

        <MainForm addresses={addresses} />
      </div>
    </div>
  );
}
