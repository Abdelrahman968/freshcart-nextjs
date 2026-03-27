'use client';

import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

type FeatureCardProps = {
  badgeIcon: string;
  badgeText: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  buttonText: string;
  buttonLink: string;
  gradientFrom: string;
  gradientTo: string;
  buttonColor: string;
};

function FeatureCard({
  badgeIcon,
  badgeText,
  title,
  description,
  discount,
  code,
  buttonText,
  buttonLink,
  gradientFrom,
  gradientTo,
  buttonColor,
}: FeatureCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-linear-to-br ${gradientFrom} ${gradientTo} p-8 text-white`}
    >
      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="relative z-10">
        <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-sm mb-4">
          <span>{badgeIcon}</span>
          <span>{badgeText}</span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold mb-2">{title}</h3>

        <p className="text-white/80 mb-4">{description}</p>

        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="text-3xl font-bold">{discount}</div>

          <div className="text-sm text-white/70">
            Use code: <span className="font-bold text-white">{code}</span>
            <span
              className="cursor-pointer text-white/70 hover:text-white transition-colors bg-white/20 px-2 py-1 rounded-lg mx-2"
              title="Copy code"
              onClick={handleCopy}
            >
              {copied ? 'Copied!' : 'Copy'}
            </span>
          </div>
        </div>

        <a
          className={`inline-flex items-center gap-2 bg-white ${buttonColor} px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors`}
          href={buttonLink}
        >
          {buttonText}
          <FaArrowRight />
        </a>
      </div>
    </div>
  );
}

export default FeatureCard;
