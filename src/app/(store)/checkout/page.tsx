'use client';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import {
  FaReceipt,
  FaArrowLeft,
  FaHouse,
  FaWallet,
  FaBagShopping,
  FaTruck,
  FaCircleInfo,
  FaCity,
  FaLocationDot,
  FaPhone,
  FaMoneyBill,
  FaCreditCard,
  FaShieldHalved,
  FaCheck,
  FaBox,
} from 'react-icons/fa6';
import AppImage from '../../../components/AppImage/AppImage';
import Breadcrumb from '../../../components/Breadcrumb/Breadcrumb';

// ─── Types ────────────────────────────────────────────────────────────────────

interface CartItem {
  id: string;
  title: string;
  imageCover: string;
  price: number;
  count: number;
}

interface CheckoutFormData {
  city: string;
  details: string;
  phone: string;
}

interface FormErrors {
  city?: string;
  details?: string;
  phone?: string;
}

type PaymentMethod = 'cash' | 'online';

// ─── Validation ───────────────────────────────────────────────────────────────

const EGYPTIAN_PHONE_REGEX = /^01[0125][0-9]{8}$/;

function validateForm(data: CheckoutFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.city.trim()) {
    errors.city = 'City is required';
  }

  if (!data.details.trim()) {
    errors.details = 'Street address is required';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!EGYPTIAN_PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = 'Please enter a valid Egyptian phone number';
  }

  return errors;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="bg-linear-to-r from-green-600 to-green-700 px-6 py-4">
      <h2 className="text-lg font-bold text-white flex items-center gap-2">
        {icon}
        {title}
      </h2>
      <p className="text-green-100 text-sm mt-1">{subtitle}</p>
    </div>
  );
}

function CartItemRow({ item }: { item: CartItem }) {
  const total = item.price * item.count;

  return (
    <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="w-14 h-14 rounded-lg bg-white p-1 border border-gray-100 shrink-0">
        <AppImage
          src={item.imageCover}
          alt={item.title}
          className="w-full h-full object-contain"
          width={50}
          height={50}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {item.title}
        </p>
        <p className="text-xs text-gray-500 mt-0.5">
          {item.count} × {item.price.toLocaleString()} EGP
        </p>
      </div>
      <p className="text-sm font-bold text-gray-900 shrink-0">
        {total.toLocaleString()}
      </p>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

interface CheckoutPageProps {
  /** Cart items passed from context/Redux/Zustand — replace with your real source */
  cartItems?: CartItem[];
  /** Total number of individual units */
  totalCartCount?: number;
  /** Subtotal in EGP */
  totalCartPrice?: number;
  /** Called when user submits a valid cash-on-delivery order */
  onCashOrder?: (shippingAddress: CheckoutFormData) => Promise<void>;
  /** Called when user submits a valid online-payment order */
  onOnlineOrder?: (shippingAddress: CheckoutFormData) => Promise<void>;
}

// Demo data – remove when wiring to real data source
const DEMO_ITEMS: CartItem[] = [
  {
    id: '1',
    title: 'Woman Brown Long Sleeve Tunic LT.CAMEL',
    imageCover:
      'https://ecommerce.routemisr.com/Route-Academy-products/1680402295928-cover.jpeg',
    price: 499,
    count: 2,
  },
  {
    id: '2',
    title: 'Woman Shawl',
    imageCover:
      'https://ecommerce.routemisr.com/Route-Academy-products/1680403156501-cover.jpeg',
    price: 149,
    count: 15,
  },
  {
    id: '3',
    title: 'Orca Leather Boots Anthracite',
    imageCover:
      'https://ecommerce.routemisr.com/Route-Academy-products/1680400120400-cover.jpeg',
    price: 4829,
    count: 2,
  },
  {
    id: '4',
    title: 'EOS M50 Mark II Mirrorless Digital Camera With 15-45mm Lens Black',
    imageCover:
      'https://ecommerce.routemisr.com/Route-Academy-products/1678304313006-cover.jpeg',
    price: 19699,
    count: 2,
  },
  {
    id: '5',
    title: 'Victus 16-D1016Ne Laptop',
    imageCover:
      'https://ecommerce.routemisr.com/Route-Academy-products/1678301723274-cover.jpeg',
    price: 42960,
    count: 2,
  },
];

export default function CheckoutPage({
  cartItems = DEMO_ITEMS,
  totalCartCount = 21,
  totalCartPrice = 177164,
  onCashOrder,
  onOnlineOrder,
}: CheckoutPageProps) {
  // ── Form state ────────────────────────────────────────────────────────────
  const [formData, setFormData] = useState<CheckoutFormData>({
    city: '',
    details: '',
    phone: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Record<keyof CheckoutFormData, boolean>
  >({
    city: false,
    details: false,
    phone: false,
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('online');
  const [isLoading, setIsLoading] = useState(false);

  // ── Helpers ───────────────────────────────────────────────────────────────
  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);

    // Re-validate touched field on every change
    if (touched[name as keyof CheckoutFormData]) {
      setErrors(validateForm(updated));
    }
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(validateForm(formData));
  }

  function getFieldClasses(field: keyof CheckoutFormData) {
    const base =
      'w-full px-4 py-3.5 pl-14 border-2 rounded-xl focus:outline-none transition-all';
    if (touched[field] && errors[field]) {
      return `${base} border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-100`;
    }
    return `${base} border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-100`;
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Mark all fields as touched to show all errors
    setTouched({ city: true, details: true, phone: true });
    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    setIsLoading(true);
    try {
      if (paymentMethod === 'cash') {
        await onCashOrder?.(formData);
      } else {
        await onOnlineOrder?.(formData);
      }
    } finally {
      setIsLoading(false);
    }
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

        {/* ── Form ── */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* ── Left column: Address + Payment ── */}
            <div className="lg:col-span-2 space-y-6">
              {/* Shipping Address Card */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <SectionHeader
                  icon={<FaHouse />}
                  title="Shipping Address"
                  subtitle="Where should we deliver your order?"
                />

                <div className="p-6 space-y-5">
                  {/* Info banner */}
                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                      <FaCircleInfo className="text-blue-600 text-sm" />
                    </div>
                    <div>
                      <p className="text-sm text-blue-800 font-medium">
                        Delivery Information
                      </p>
                      <p className="text-xs text-blue-600 mt-0.5">
                        Please ensure your address is accurate for smooth
                        delivery
                      </p>
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      City <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center pointer-events-none">
                        <FaCity className="text-gray-500 text-sm" />
                      </div>
                      <input
                        id="city"
                        name="city"
                        type="text"
                        value={formData.city}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="e.g. Cairo, Alexandria, Giza"
                        className={getFieldClasses('city')}
                      />
                    </div>
                    {touched.city && errors.city && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.city}
                      </p>
                    )}
                  </div>

                  {/* Street Address */}
                  <div>
                    <label
                      htmlFor="details"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Street Address <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-4 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center pointer-events-none">
                        <FaLocationDot className="text-gray-500 text-sm" />
                      </div>
                      <textarea
                        id="details"
                        name="details"
                        rows={3}
                        value={formData.details}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Street name, building number, floor, apartment..."
                        className={`${getFieldClasses('details')} resize-none`}
                      />
                    </div>
                    {touched.details && errors.details && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.details}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center pointer-events-none">
                        <FaPhone className="text-gray-500 text-sm" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="01xxxxxxxxx"
                        className={getFieldClasses('phone')}
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400">
                        Egyptian numbers only
                      </span>
                    </div>
                    {touched.phone && errors.phone && (
                      <p className="text-sm text-red-600 mt-2 flex items-center gap-1">
                        <span className="inline-block w-1 h-1 rounded-full bg-red-500" />
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method Card */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <SectionHeader
                  icon={<FaWallet />}
                  title="Payment Method"
                  subtitle="Choose how you'd like to pay"
                />

                <div className="p-6 space-y-4">
                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                      paymentMethod === 'cash'
                        ? 'border-green-500 bg-linear-to-r from-green-50 to-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                        paymentMethod === 'cash'
                          ? 'bg-linear-to-br from-green-500 to-blue-600 text-white shadow-lg shadow-green-500/30'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                      }`}
                    >
                      <FaMoneyBill className="text-xl" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3
                        className={`font-bold ${
                          paymentMethod === 'cash'
                            ? 'text-green-700'
                            : 'text-gray-900'
                        }`}
                      >
                        Cash on Delivery
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Pay when your order arrives at your doorstep
                      </p>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 ${
                        paymentMethod === 'cash'
                          ? 'bg-green-600 text-white border-green-600'
                          : 'border-gray-200'
                      }`}
                    >
                      {paymentMethod === 'cash' && (
                        <FaCheck className="text-xs" />
                      )}
                    </div>
                  </button>

                  {/* Pay Online */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('online')}
                    className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group ${
                      paymentMethod === 'online'
                        ? 'border-green-500 bg-linear-to-r from-green-50 to-blue-50 shadow-sm'
                        : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                    }`}
                  >
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                        paymentMethod === 'online'
                          ? 'bg-linear-to-br from-green-500 to-blue-600 text-white shadow-lg shadow-green-500/30'
                          : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                      }`}
                    >
                      <FaCreditCard className="text-xl" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3
                        className={`font-bold ${
                          paymentMethod === 'online'
                            ? 'text-green-700'
                            : 'text-gray-900'
                        }`}
                      >
                        Pay Online
                      </h3>
                      <p className="text-sm text-gray-500 mt-0.5">
                        Secure payment with Credit/Debit Card via Stripe
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <AppImage
                          src="https://img.icons8.com/color/48/visa.png"
                          alt="Visa"
                          className="h-5"
                          width={30}
                          height={18}
                        />
                        <AppImage
                          src="https://img.icons8.com/color/48/mastercard.png"
                          alt="Mastercard"
                          className="h-5"
                          width={30}
                          height={18}
                        />
                        <AppImage
                          src="https://img.icons8.com/color/48/amex.png"
                          alt="Amex"
                          className="h-5"
                          width={30}
                          height={18}
                        />
                      </div>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-all border-2 ${
                        paymentMethod === 'online'
                          ? 'bg-green-600 text-white border-green-600'
                          : 'border-gray-200'
                      }`}
                    >
                      {paymentMethod === 'online' && (
                        <FaCheck className="text-xs" />
                      )}
                    </div>
                  </button>

                  {/* Security badge */}
                  <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <FaShieldHalved className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        Secure &amp; Encrypted
                      </p>
                      <p className="text-xs text-green-600 mt-0.5">
                        Your payment info is protected with 256-bit SSL
                        encryption
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm sticky top-20">
                <SectionHeader
                  icon={<FaBagShopping />}
                  title="Order Summary"
                  subtitle={`${totalCartCount} items`}
                />

                <div className="p-5">
                  <div className="space-y-3 max-h-40 overflow-y-auto mb-5 pr-1">
                    {cartItems.map(item => (
                      <CartItemRow key={item.id} item={item} />
                    ))}
                  </div>

                  <hr className="border-gray-100 my-4" />

                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span className="font-medium">
                        {totalCartPrice.toLocaleString()} EGP
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span className="flex items-center gap-2">
                        <FaTruck className="text-gray-400" />
                        Shipping
                      </span>
                      <span className="text-green-600 font-semibold">FREE</span>
                    </div>
                    <hr className="border-gray-100" />
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900">
                        Total
                      </span>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-green-600">
                          {totalCartPrice.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 ml-1">EGP</span>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full mt-6 bg-linear-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-green-800 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <>
                        <svg
                          className="animate-spin h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FaShieldHalved />
                        Proceed to Payment
                      </>
                    )}
                  </button>

                  {/* Trust badges */}
                  <div className="flex items-center justify-center gap-4 mt-4 py-3 border-t border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaShieldHalved className="text-green-500" />
                      <span>Secure</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaTruck className="text-blue-500" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="w-px h-4 bg-gray-200" />
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <FaBox className="text-orange-500" />
                      <span>Easy Returns</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
