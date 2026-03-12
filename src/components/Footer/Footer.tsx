import {
  FaPhone,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaCreditCard,
} from 'react-icons/fa';

import { MdLocationOn } from 'react-icons/md';

import Image from 'next/image';
import Link from 'next/link';

import ImageLogo from '@assets/header/logo.svg';
import IconBanner from '../IconBanner/IconBanner';
import { notFoundBannerInfo } from '../../data/iconBanner';

function Footer() {
  return (
    <>
      <div className="bg-green-50 p-5 w-full mt-4">
        <IconBanner data={notFoundBannerInfo} />
      </div>
      <footer className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4">
              <Link className="inline-block mb-6" href="/">
                <div className="bg-white rounded-lg px-4 py-2 inline-block">
                  <Image
                    src={ImageLogo}
                    alt="FreshCart Logo"
                    loading="lazy"
                    width={160}
                    height={31}
                    className="h-8 w-auto"
                    style={{ color: 'transparent' }}
                  />
                </div>
              </Link>
              <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                FreshCart is your one-stop destination for quality products.
                From fashion to electronics, we bring you the best brands at
                competitive prices with a seamless shopping experience.
              </p>
              <div className="space-y-3 mb-6">
                <a
                  href="tel:+18001234567"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  <FaPhone className="text-green-500" />
                  <span>+1 (800) 123-4567</span>
                </a>

                <a
                  href="mailto:support@freshcart.com"
                  className="flex items-center gap-3 text-gray-400 hover:text-green-400 transition-colors text-sm"
                >
                  <FaEnvelope className="text-green-500" />
                  <span>support@freshcart.com</span>
                </a>

                <div className="flex items-start gap-3 text-gray-400 text-sm">
                  <MdLocationOn className="text-green-500 mt-0.5" />
                  <span>123 Commerce Street, New York, NY 10001</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <a className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors cursor-pointer">
                  <FaFacebookF />
                </a>

                <a className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors cursor-pointer">
                  <FaTwitter />
                </a>

                <a className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors cursor-pointer">
                  <FaInstagram />
                </a>

                <a className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-green-600 hover:text-white transition-colors cursor-pointer">
                  <FaYoutube />
                </a>
              </div>
            </div>
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5">Shop</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/products"
                  >
                    All Products
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/categories"
                  >
                    Categories
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/brands"
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/products?category=6439d58a0049ad0b52b9003f"
                  >
                    Electronics
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/products?category=6439d2d167d9aa4ca970649f"
                  >
                    Men&apos;s Fashion
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/products?category=6439d5b90049ad0b52b90048"
                  >
                    Women&apos;s Fashion
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5">Account</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/profile"
                  >
                    My Account
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/profile/orders"
                  >
                    Order History
                  </Link>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/wishlist"
                  >
                    Wishlist
                  </a>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/cart"
                  >
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <a
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/login"
                  >
                    Sign In
                  </a>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/register"
                  >
                    Create Account
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5">Support</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/contact"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/help"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/shipping"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/returns"
                  >
                    Returns &amp; Refunds
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/track-order"
                  >
                    Track Order
                  </Link>
                </li>
              </ul>
            </div>
            <div className="lg:col-span-2">
              <h3 className="font-semibold text-lg mb-5">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/terms"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-gray-400 hover:text-green-400 transition-colors text-sm"
                    href="/cookies"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm text-center md:text-left">
                © {new Date().getFullYear()} FreshCart. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaCreditCard />
                  <span>Visa</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaCreditCard />
                  <span>Mastercard</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                  <FaCreditCard />
                  <span>PayPal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
