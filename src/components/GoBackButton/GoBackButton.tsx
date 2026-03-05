'use client';

import { FaArrowLeft } from 'react-icons/fa';

export default function GoBackButton() {
  const handleBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <button
      onClick={handleBack}
      className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 text-black py-4 px-8 border border-gray-300 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-gray-600/25 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
    >
      <FaArrowLeft className="group-hover:-translate-x-1 transition-transform duration-300 text-sm md:text-base lg:text-lg" />
      <span className="hidden sm:block">Go Back</span>
    </button>
  );
}
