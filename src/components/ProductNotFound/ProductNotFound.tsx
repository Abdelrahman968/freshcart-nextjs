import Link from 'next/link';
import { Metadata } from 'next';
import { FaDatabase, FaTrashCan } from 'react-icons/fa6';
import { TbHomeFilled, TbShoppingCartSearch } from 'react-icons/tb';
import GoBackButton from '@components/GoBackButton/GoBackButton';

interface ProductNotFoundProps {
  productId?: string | number;
}

export const metadata: Metadata = {
  title: 'FreshCart - Product Not Found',
  description: 'The requested product could not be found',
  robots: {
    index: false,
    follow: true,
  },
};

function ProductNotFound({ productId }: ProductNotFoundProps) {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
          Product Not Found
        </h1>

        {productId && (
          <div className="inline-block bg-red-50 border border-red-200 rounded-lg px-4 py-2 mb-6">
            <p className="text-red-600 font-mono text-sm">
              Product ID: <span className="font-bold">{productId}</span>
            </p>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <p className="text-xl text-gray-700 mb-6">
            We couldn&apos;t find the product you&apos;re looking for.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 rounded-xl p-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-red-100 p-2 rounded-lg">
                  <FaTrashCan className="text-red-500 w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">Product Deleted</h3>
              </div>
              <p className="text-gray-600 text-sm">
                This product may have been removed from our catalog by the
                seller or administrator.
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 text-left">
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-yellow-100 p-2 rounded-lg">
                  <FaDatabase className="text-yellow-600 w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900">Database Error</h3>
              </div>
              <p className="text-gray-600 text-sm">
                There might be a temporary issue with our database. Please try
                again later.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              What would you like to do?
            </h3>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/products"
                className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:-translate-y-1"
              >
                <TbShoppingCartSearch className="w-5 h-5" />
                Browse Other Products
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 shadow-lg shadow-gray-600/25 hover:shadow-xl hover:-translate-y-1"
              >
                <TbHomeFilled className="w-5 h-5" />
                Go to Homepage
              </Link>

              <GoBackButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductNotFound;
