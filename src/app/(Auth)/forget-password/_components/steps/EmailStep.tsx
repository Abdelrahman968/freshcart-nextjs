'use client';

import { Button, Input } from '@heroui/react';
import { useForm } from 'react-hook-form';
import { HiOutlineMail } from 'react-icons/hi';
import { forgotPasswords } from '../../../../../services/forgetPassword.service';

interface EmailFormValues {
  email: string;
}

function EmailStep({ onNext }: { onNext: (email: string) => void }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<EmailFormValues>();

  const onSubmit = async (data: EmailFormValues) => {
    const res = await forgotPasswords(data);
    if (res.status === 'success') {
      onNext(data.email);
    }
  };

  return (
    <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-2">
        <p className="text-gray-500 text-sm">
          Enter the email address linked to your account and we&apos;ll send you
          a verification code.
        </p>
      </div>

      <Input
        id="email"
        label="Email Address"
        startContent={
          <HiOutlineMail className="text-gray-400 shrink-0" size={20} />
        }
        type="email"
        placeholder="Enter your email address"
        {...register('email', {
          required: 'Email address is required.',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Please enter a valid email address.',
          },
        })}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full py-6 bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        color="primary"
        variant="solid"
      >
        Send Reset Code
      </Button>
    </form>
  );
}

export default EmailStep;
