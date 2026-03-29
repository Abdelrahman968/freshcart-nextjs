'use client';
import AppImage from '../../../../components/AppImage/AppImage';
import SectionHeader from './SectionHeader';
import {
  FaCircleInfo,
  FaHouse,
  FaLocationDot,
  FaShieldHalved,
} from 'react-icons/fa6';
import {
  FaBookmark,
  FaCartPlus,
  FaCheck,
  FaCity,
  FaCreditCard,
  FaMoneyBill,
  FaPhone,
  FaPlus,
  FaSpinner,
  FaWallet,
} from 'react-icons/fa';
import OrderSummary from './OrderSummary';
import { Input, Textarea } from '@heroui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import visa from '@assets/icons8/visa.png';
import mastercard from '@assets/icons8/mastercard.png';
import amex from '@assets/icons8/amex.png';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reduxStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Address {
  results: number;
  status: string;
  data: {
    _id: string;
    name: string;
    details: string;
    phone: string;
    city: string;
  }[];
}

function MainForm({ addresses }: { addresses: Address }) {
  const router = useRouter();
  const myAddresses = addresses?.data || [];
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isLoadingById, setIsLoadingById] = useState<string | null>(null);
  const [selectedAddressData, setSelectedAddressData] = useState<any>({
    city: '',
    details: '',
    phone: '',
  });
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');

  const getAddressById = async (id: string) => {
    setIsLoadingById(id);
    const res = await fetch(`/api/address/${id}`);
    const data = await res.json();
    setIsLoadingById(null);
    setSelectedAddressData({
      city: data.data.city,
      details: data.data.details,
      phone: data.data.phone,
    });
    return data;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      city: '',
      details: '',
      phone: '',
    },
  });

  useEffect(() => {
    reset({
      city: selectedAddressData.city,
      details: selectedAddressData.details,
      phone: selectedAddressData.phone,
    });
  }, [selectedAddressData]);

  const [isLoading, setIsLoading] = useState(false);

  const { cartId } = useSelector((state: RootState) => state.cart);

  if (!cartId) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-16 text-center">
        <FaCartPlus className="text-6xl text-gray-200 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Your cart is empty
        </h2>
        <p className="text-gray-400 mb-6">
          Looks like you haven't added anything yet.
        </p>
        <Link
          className="inline-flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition-all"
          href="/"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  const cartCash = async (body: any) => {
    setIsLoading(true);
    const res = await fetch(`/api/pay/cash/${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (data.status === 'success') {
      router.push('/orders?payment=cash&operation=success');
    } else {
      router.push('/orders?payment=cash&operation=error');
    }

    setIsLoading(false);
  };

  const cartCard = async (body: any) => {
    setIsLoading(true);
    const res = await fetch(`/api/pay/card/${cartId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    // console.log(data);

    if (data.status === 'success') {
      router.push(data.session.url);
    } else {
      router.push('/orders?payment=card&operation=error');
    }

    setIsLoading(false);
  };

  const onSubmit = (data: any) => {
    const bodyDataForCash = {
      shippingAddress: {
        details: data.details,
        phone: data.phone,
        city: data.city,
        postalCode: '123456',
      },
    };

    const bodyDataForCard = {
      shippingAddress: {
        details: data.details,
        phone: data.phone,
        city: data.city,
      },
    };

    if (paymentMethod === 'cash') {
      cartCash(bodyDataForCash);
    } else {
      cartCard(bodyDataForCard);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} id="checkoutForm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <SectionHeader
                icon={<FaHouse />}
                title="Shipping Address"
                subtitle="Where should we deliver your order?"
              />

              <div className="p-5 border-b border-gray-100">
                <div className="flex items-center gap-2 mb-3">
                  <FaBookmark className="text-green-500 text-sm" />
                  <span className="font-semibold text-gray-800">
                    Saved Addresses
                  </span>
                </div>
                <div className="space-y-3">
                  <p className="text-sm font-medium text-gray-600">
                    Select a saved address or enter a new one below
                  </p>
                  {myAddresses.length > 0 ? (
                    myAddresses.map(address => (
                      <button
                        key={address._id}
                        type="button"
                        className={`relative w-full p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 ${
                          selectedAddress === address._id
                            ? 'border-green-500 bg-green-50 border-dashed'
                            : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setSelectedAddress(address._id);
                          getAddressById(address._id);
                        }}
                        disabled={isLoadingById !== null}
                      >
                        {isLoadingById === address._id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                            <FaSpinner className="animate-spin text-green-500 text-sm" />
                          </div>
                        )}
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors bg-gray-100 text-gray-500">
                            <FaLocationDot className="text-green-500 text-sm" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900">
                              {address.name}
                            </p>
                            <p className="text-sm text-gray-600 mt-0.5 line-clamp-1">
                              {address.details}
                            </p>
                            <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <FaPhone className="text-green-500 text-sm" />
                                {address.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <FaCity className="text-green-500 text-sm" />
                                {address.city}
                              </span>
                            </div>
                          </div>
                        </div>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm font-medium text-gray-600">
                      No saved addresses found. Please enter a new address below
                    </p>
                  )}

                  <button
                    type="button"
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 cursor-pointer ${
                      selectedAddress === null
                        ? 'border-green-500 bg-green-50 border-dashed'
                        : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setSelectedAddress(null)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-green-500 text-white">
                        <FaPlus />
                      </div>
                      <div>
                        <p className="font-semibold text-green-700">
                          Use a different address
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          Enter a new shipping address manually
                        </p>
                      </div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                    <FaCircleInfo className="text-blue-600 text-sm" />
                  </div>
                  <div>
                    <p className="text-sm text-blue-800 font-medium">
                      Delivery Information
                    </p>
                    <p className="text-xs text-blue-600 mt-0.5">
                      Please ensure your address is accurate for smooth delivery
                    </p>
                  </div>
                </div>

                <div>
                  <Input
                    label="City"
                    type="text"
                    placeholder="e.g. Cairo, Alexandria, Giza"
                    size="lg"
                    endContent={<FaCity className="text-gray-500 text-sm" />}
                    {...register('city', {
                      required: 'City is required',
                    })}
                    value={selectedAddressData?.city}
                    isInvalid={!!errors.city}
                    errorMessage={errors.city?.message}
                  />
                </div>

                <div>
                  <Textarea
                    label="Street Address"
                    placeholder="Street name, building number, floor, apartment..."
                    size="lg"
                    minRows={3}
                    endContent={
                      <FaLocationDot className="text-gray-500 text-sm" />
                    }
                    {...register('details', {
                      required: 'Street address is required',
                    })}
                    value={selectedAddressData?.details}
                    isInvalid={!!errors.details}
                    errorMessage={errors.details?.message}
                  />
                </div>

                <div>
                  <Input
                    label="Phone Number (Egyptian numbers only)"
                    type="tel"
                    placeholder="01xxxxxxxxx"
                    size="lg"
                    endContent={<FaPhone className="text-gray-500 text-sm" />}
                    startContent={
                      <span className="text-gray-500 text-sm">+20</span>
                    }
                    {...register('phone', {
                      required: 'Phone number is required',
                      pattern: {
                        value: /^01\d{9}$/,
                        message: 'Please enter a valid Egyptian phone number',
                      },
                    })}
                    value={selectedAddressData?.phone}
                    isInvalid={!!errors.phone}
                    errorMessage={errors.phone?.message}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <SectionHeader
                icon={<FaWallet />}
                title="Payment Method"
                subtitle="Choose how you'd like to pay"
              />

              <div className="p-4 flex flex-col gap-4">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cash')}
                  className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group cursor-pointer ${
                    paymentMethod === 'cash'
                      ? 'border-green-500 bg-linear-to-r from-green-50 to-emerald-50 shadow-sm'
                      : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                      paymentMethod === 'cash'
                        ? 'bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                    }`}
                  >
                    <FaMoneyBill className="text-xl" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-green-700">
                      Cash on Delivery
                    </h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Pay when your order arrives at your doorstep
                    </p>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      paymentMethod === 'cash'
                        ? 'bg-green-600 text-white border-2 border-green-600'
                        : 'border-2 border-gray-200'
                    }`}
                  >
                    {paymentMethod === 'cash' && (
                      <FaCheck className="text-xs" />
                    )}
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`w-full p-5 rounded-xl border-2 transition-all flex items-center gap-4 group cursor-pointer ${
                    paymentMethod === 'card'
                      ? 'border-green-500 bg-linear-to-r from-green-50 to-emerald-50 shadow-sm'
                      : 'border-gray-200 hover:border-green-200 hover:bg-gray-50'
                  }`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-linear-to-br from-green-500 to-green-600 text-white shadow-lg shadow-green-500/30'
                        : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                    }`}
                  >
                    <FaCreditCard className="text-xl" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="font-bold text-green-700">Pay Online</h3>
                    <p className="text-sm text-gray-500 mt-0.5">
                      Secure payment with Credit/Debit Card via Stripe
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <AppImage
                        src={visa}
                        alt="Visa"
                        className="h-5"
                        width={30}
                        height={18}
                      />
                      <AppImage
                        src={mastercard}
                        alt="Mastercard"
                        className="h-5"
                        width={30}
                        height={18}
                      />
                      <AppImage
                        src={amex}
                        alt="Amex"
                        className="h-5"
                        width={30}
                        height={18}
                      />
                    </div>
                  </div>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      paymentMethod === 'card'
                        ? 'bg-green-600 text-white border-2 border-green-600'
                        : 'border-2 border-gray-200'
                    }`}
                  >
                    {paymentMethod === 'card' && (
                      <FaCheck className="text-xs" />
                    )}
                  </div>
                </button>

                <div className="flex items-center gap-3 p-4 bg-linear-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 mt-4">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                    <FaShieldHalved className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Secure &amp; Encrypted
                    </p>
                    <p className="text-xs text-green-600 mt-0.5">
                      Your payment info is protected with 256-bit SSL encryption
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <OrderSummary paymentMethod={paymentMethod} isLoading={isLoading} />
        </div>
      </form>
    </>
  );
}

export default MainForm;
