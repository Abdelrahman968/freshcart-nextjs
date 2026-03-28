'use client';

import EmailStep from './steps/EmailStep';
import OtpStep from './steps/OtpStep';
import NewPasswordStep from './steps/NewPasswordStep';
import SuccessStep from './steps/Success';

import { HiArrowLeft } from 'react-icons/hi';
import StepIndicator from './StepIndicator';
import { useState } from 'react';
import Link from 'next/link';

const STEP_TITLES: Record<number, { title: string; subtitle?: string }> = {
  0: {
    title: 'Forgot Password?',
    subtitle: "No worries, we'll send you a reset code.",
  },
  1: { title: 'Check Your Email', subtitle: 'Enter the OTP we just sent you.' },
  2: { title: 'New Password', subtitle: 'Almost done! Set your new password.' },
  3: { title: 'All Done!', subtitle: '' },
};

export default function ForgotPasswordForm() {
  const [step, setStep] = useState<number>(0);
  const [email, setEmail] = useState('');

  const { title, subtitle } = STEP_TITLES[step];

  return (
    <div className="w-full">
      <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl font-bold text-emerald-600">
              Fresh<span className="text-gray-800">Cart</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
        </div>

        {step < 3 && <StepIndicator current={step} />}

        <div className="mt-6">
          {step === 0 && (
            <EmailStep
              onNext={userEmail => {
                setEmail(userEmail);
                setStep(1);
              }}
            />
          )}

          {step === 1 && (
            <OtpStep
              email={email}
              onNext={() => setStep(2)}
              onBack={() => setStep(0)}
            />
          )}

          {step === 2 && (
            <NewPasswordStep email={email} onDone={() => setStep(3)} />
          )}

          {step === 3 && <SuccessStep />}
        </div>

        {step < 3 && (
          <div className="text-center mt-6">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
            >
              <HiArrowLeft className="text-xs" />
              Back to Sign In
            </Link>
          </div>
        )}

        <div className="text-center mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm">
            Remember your password?{' '}
            <a
              href="/login"
              className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
