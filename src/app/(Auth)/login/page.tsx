import {
  FaTruck,
  FaShieldHalved,
  FaClock,
  FaGoogle,
  FaFacebook,
  FaLock,
  FaUsers,
  FaStar,
} from 'react-icons/fa6';
import Link from 'next/link';

import LoginImage from '@assets/login/main-image.png';
import AppImage from '../../../components/AppImage/AppImage';
import LoginForm from '../../../components/Login/LoginForm';
import { Suspense } from 'react';

function LoginPage() {
  return (
    <div className="container py-16 mx-auto px-4" id="login-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <div className="hidden lg:block">
          <div className="text-center space-y-6">
            <AppImage
              width={500}
              height={500}
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
              alt="fresh vegetables and fruits shopping cart illustration, modern clean style, green theme"
              src={LoginImage}
            />
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h2>
              <p className="text-lg text-gray-600">
                Join thousands of happy customers who trust FreshCart for their
                daily grocery needs
              </p>
              <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <FaTruck className="text-green-600 mr-2" />
                  Free Delivery
                </div>
                <div className="flex items-center">
                  <FaShieldHalved className="text-green-600 mr-2" />
                  Secure Payment
                </div>
                <div className="flex items-center">
                  <FaClock className="text-green-600 mr-2" />
                  24/7 Support
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-green-600">
                  Fresh<span className="text-gray-800">Cart</span>
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Welcome Back!
              </h1>
              <p className="text-gray-600">
                Sign in to continue your fresh shopping experience
              </p>
            </div>
            <div className="space-y-3 flex flex-col md:flex-row gap-2 mb-6">
              <button
                type="button"
                disabled
                className="w-full h-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-200 disabled:hover:text-gray-500"
              >
                <FaGoogle className="text-red-500 text-lg" />
                <span className="font-medium text-gray-700">
                  Continue with Google
                </span>
              </button>
              <button
                type="button"
                disabled
                className="w-full h-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:border-gray-200 disabled:hover:text-gray-500"
              >
                <FaFacebook className="text-blue-600 text-lg" />
                <span className="font-medium text-gray-700">
                  Continue with Facebook
                </span>
              </button>
            </div>
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  OR CONTINUE WITH EMAIL
                </span>
              </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
              <LoginForm />
            </Suspense>
            <div className="text-center mt-8 pt-6 border-t border-gray-100">
              <p className="text-gray-600">
                New to FreshCart?
                <Link
                  className="text-green-600 hover:text-green-700 ms-2 font-semibold cursor-pointer"
                  href="/register"
                >
                  Create an account
                </Link>
              </p>
            </div>
            <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
              <div className="flex items-center">
                <FaLock className="mr-1" />
                SSL Secured
              </div>
              <div className="flex items-center">
                <FaUsers className="mr-1" />
                50K+ Users
              </div>
              <div className="flex items-center">
                <FaStar className="mr-1" />
                4.9 Rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
