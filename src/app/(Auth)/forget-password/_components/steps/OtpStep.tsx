'use client';

import { HiArrowLeft } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { Button, InputOtp, Spinner } from '@heroui/react';
import {
  forgotPasswords,
  verifyResetCode,
} from '../../../../../services/forgetPassword.service';
import { Controller, useForm } from 'react-hook-form';

function OtpStep({
  email,
  onNext,
  onBack,
}: {
  email: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [time, setTime] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    otp: string;
  }>();

  useEffect(() => {
    if (time > 0) {
      const timer = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [time]);

  const reSendCode = async () => {
    setResendLoading(true);
    const res = await forgotPasswords({ email });
    if (res.status === 'success') {
      setTime(60);
    }
    setResendLoading(false);
  };

  const onSubmit = async (data: { otp: string }) => {
    setLoading(true);
    const res = await verifyResetCode({ resetCode: data.otp });
    // console.log('res', res);
    if (res.status === 'Success') {
      onNext();
    }
    setError('Invalid code, try again or resend code');
    setTimeout(() => {
      setError('');
    }, 3000);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-2">
        <p className="text-gray-500 text-sm">
          We sent a 6-digit code to{' '}
          <span className="font-medium text-gray-700">{email}</span>. Enter it
          below to continue.
        </p>
      </div>

      <form
        className="flex flex-col items-center justify-center gap-4 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Controller
          control={control}
          name="otp"
          render={({ field }) => (
            <InputOtp
              {...field}
              size="lg"
              errorMessage={(errors.otp && errors.otp.message) || error}
              isInvalid={!!errors.otp || !!error}
              length={6}
              classNames={{
                errorMessage:
                  'text-sm font-bold pt-2 text-danger w-full text-center',
              }}
            />
          )}
          rules={{
            required: 'OTP is required',
            minLength: {
              value: 6,
              message: 'Please enter a valid OTP',
            },
          }}
        />
        <Button
          className="w-full py-6 bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          variant="flat"
          isLoading={loading}
        >
          Verify OTP
        </Button>
      </form>

      <div className="flex items-center justify-between text-sm">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-medium transition-colors"
        >
          <HiArrowLeft className="text-xs" />
          Change email
        </button>

        <button
          type="button"
          className="text-emerald-600 hover:text-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium cursor-pointer"
          onClick={reSendCode}
          disabled={time > 0}
        >
          {resendLoading ? (
            <Spinner size="sm" />
          ) : time > 0 ? (
            `Resend code (${time})`
          ) : (
            'Resend code'
          )}
        </button>
      </div>
    </div>
  );
}

export default OtpStep;
