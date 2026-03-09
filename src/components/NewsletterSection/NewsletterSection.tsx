'use client';
import { useState } from 'react';
import { MdEmail } from 'react-icons/md';
import { FaLeaf, FaTruck, FaTag, FaArrowRight } from 'react-icons/fa';
import { ReactNode } from 'react';
import MobileApp from '../MobileApp/MobileApp';

interface Badge {
  icon: ReactNode;
  label: string;
}

export default function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const badges: Badge[] = [
    {
      icon: <FaLeaf className="text-emerald-600 text-xs" />,
      label: 'Fresh Picks Weekly',
    },
    {
      icon: <FaTruck className="text-emerald-600 text-xs" />,
      label: 'Free Delivery Codes',
    },
    {
      icon: <FaTag className="text-emerald-600 text-xs" />,
      label: 'Members-Only Deals',
    },
  ];

  const handleSubmit = () => {
    if (email.trim()) setSubscribed(true);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="relative">
        <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 rounded-[2.5rem] border border-emerald-100/50 shadow-2xl shadow-emerald-500/10 overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-emerald-200/40 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-teal-200/30 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

          <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
            <div className="lg:col-span-3 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <MdEmail className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-emerald-600 uppercase tracking-wide">
                    Newsletter
                  </h3>
                  <p className="text-xs text-gray-500">50,000+ subscribers</p>
                </div>
              </div>

              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-snug">
                  Get the Freshest Updates{' '}
                  <span className="text-emerald-600">Delivered Free</span>
                </h2>
                <p className="text-gray-500 mt-3 text-lg">
                  Weekly recipes, seasonal offers &amp; exclusive member perks.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {badges.map(({ icon, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2.5 bg-white/80 backdrop-blur-sm border border-emerald-100 px-4 py-2.5 rounded-full shadow-sm"
                  >
                    <div className="w-7 h-7 bg-emerald-100 rounded-full flex items-center justify-center">
                      {icon}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                {subscribed ? (
                  <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 px-5 py-4 rounded-2xl text-emerald-700 font-medium">
                    You are subscribed! Check your inbox soon.
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="flex-1 pl-5 pr-5 py-4 bg-white border-2 border-gray-200 rounded-2xl text-gray-800 placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all text-base shadow-sm"
                    />
                    <button
                      onClick={handleSubmit}
                      className="group flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-semibold text-base transition-all duration-300 shadow-lg bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:scale-[1.02]"
                    >
                      <span>Subscribe</span>
                      <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-400 mt-3 pl-1">
                  Unsubscribe anytime. No spam, ever.
                </p>
              </div>
            </div>

            <MobileApp />
          </div>
        </div>
      </div>
    </div>
  );
}
