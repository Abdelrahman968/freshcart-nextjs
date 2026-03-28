'use client';
import { Button, Input, Progress } from '@heroui/react';
import { useForm } from 'react-hook-form';
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiOutlineLockClosed,
} from 'react-icons/hi';
import { useState } from 'react';
import { resetPassword } from '../../../../../services/forgetPassword.service';
import { calculatePasswordStrength } from '../../../../../utils/calculatePasswordStrength';

interface NewPasswordFormValues {
  email?: string;
  newPassword: string;
  confirmPassword: string;
}

function NewPasswordStep({
  email,
  onDone,
}: {
  email: string;
  onDone: () => void;
}) {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormValues>();

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [passwordValue, setPasswordValue] = useState<number>(0);

  const onSubmit = async (data: NewPasswordFormValues) => {
    const finalData = {
      email: email,
      newPassword: data.newPassword,
    };

    await resetPassword(finalData);
    onDone();
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div className="text-center mb-2">
        <p className="text-gray-500 text-sm">
          Create a strong new password for your account.
        </p>
      </div>

      {/* New Password */}
      <div className="space-y-2">
        <Input
          id="password"
          label="New Password"
          size="lg"
          startContent={
            <HiOutlineLockClosed className="text-gray-400 shrink-0" size={20} />
          }
          type={showPass ? 'text' : 'password'}
          placeholder="Create a new password"
          {...register('newPassword', {
            required: 'Password is required.',
            minLength: { value: 8, message: 'At least 8 characters required.' },
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              setPasswordValue(calculatePasswordStrength(e.target.value));
            },
            validate: value =>
              calculatePasswordStrength(value) >= 51 ||
              'Password must be at least 51% strong',
          })}
          endContent={
            <Button
              isIconOnly
              variant="light"
              onPress={() => setShowPass(!showPass)}
            >
              {showPass ? (
                <HiOutlineEyeOff className="text-gray-400" size={20} />
              ) : (
                <HiOutlineEye className="text-gray-400" size={20} />
              )}
            </Button>
          }
          isInvalid={!!errors.newPassword}
          errorMessage={errors.newPassword?.message}
        />

        <Progress
          color={
            passwordValue < 25
              ? 'danger'
              : passwordValue < 50
                ? 'warning'
                : passwordValue < 75
                  ? 'primary'
                  : 'success'
          }
          label="Password strength"
          maxValue={100}
          showValueLabel
          size="sm"
          value={passwordValue}
        />
        <p className="text-gray-500 text-xs">
          Must be at least 8 characters with uppercase, number and symbol
        </p>
      </div>

      {/* Confirm Password */}
      <Input
        id="confirmPassword"
        label="Confirm Password"
        startContent={
          <HiOutlineLockClosed className="text-gray-400 shrink-0" size={20} />
        }
        size="lg"
        type={showConfirm ? 'text' : 'password'}
        placeholder="Re-enter your new password"
        {...register('confirmPassword', {
          required: 'Please confirm your password.',
          validate: val =>
            val === getValues('newPassword') || 'Passwords do not match.',
        })}
        endContent={
          <Button
            isIconOnly
            variant="light"
            onPress={() => setShowConfirm(!showConfirm)}
          >
            {showConfirm ? (
              <HiOutlineEyeOff className="text-gray-400" size={20} />
            ) : (
              <HiOutlineEye className="text-gray-400" size={20} />
            )}
          </Button>
        }
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
      />

      <Button
        type="submit"
        isLoading={isSubmitting}
        className="w-full py-6 bg-emerald-600 text-white hover:bg-emerald-700 active:scale-[0.98] transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl"
        color="primary"
        variant="solid"
      >
        Reset Password
      </Button>
    </form>
  );
}

export default NewPasswordStep;
