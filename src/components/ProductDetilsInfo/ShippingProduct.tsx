'use client';
import { FaTruck, FaCheck } from 'react-icons/fa';
import { FaShield } from 'react-icons/fa6';
import { FiRotateCw } from 'react-icons/fi';

function ShippingProduct() {
  return (
    <div className="p-6">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
                <FaTruck className="text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900">
                Shipping Information
              </h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheck className="text-green-600 mt-0.5" />
                <span>Free shipping on orders over $50</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheck className="text-green-600 mt-0.5" />
                <span>Standard delivery: 3-5 business days</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheck className="text-green-600 mt-0.5" />
                <span>Express delivery available (1-2 business days)</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheck className="text-green-600 mt-0.5" />
                <span>Track your order in real-time</span>
              </li>
            </ul>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 bg-green-600 text-white rounded-full flex items-center justify-center">
                <FiRotateCw className="text-xl" />
              </div>
              <h4 className="font-semibold text-gray-900">
                Returns &amp; Refunds
              </h4>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheck className="text-green-600 mt-0.5" />
                <span>30-day hassle-free returns</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheck className="text-green-600 mt-0.5" />
                <span>Full refund or exchange available</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheck className="text-green-600 mt-0.5" />
                <span>Free return shipping on defective items</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-700">
                <FaCheck className="text-green-600 mt-0.5" />
                <span>Easy online return process</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 flex items-center gap-4">
          <div className="h-14 w-14 bg-gray-200 text-gray-600 rounded-full flex items-center justify-center shrink-0">
            <FaShield className="text-2xl" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">
              Buyer Protection Guarantee
            </h4>
            <p className="text-sm text-gray-600">
              Get a full refund if your order doesn&apos;t arrive or isn&apos;t
              as described. We ensure your shopping experience is safe and
              secure.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShippingProduct;
