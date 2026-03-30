'use client';
import {
  addToast,
  Alert,
  Button,
  Input,
  Progress,
  Spinner,
} from '@heroui/react';
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa';
import { useState } from 'react';
import { calculatePasswordStrength } from '../../../../../utils/calculatePasswordStrength';
import { useForm } from 'react-hook-form';
import { logout } from '../../../../../utils/handleLogOut';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../../../redux/slices/CartSlice';
import { clearWishlist } from '../../../../../redux/slices/WishlistSlice';
import { CiLogout } from 'react-icons/ci';
import { AppDispatch } from '../../../../../redux/reduxStore';
import { useRouter } from 'next/navigation';
import { MdError } from 'react-icons/md';

function ChangePassword() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [status, setStatus] = useState<{
    message: string;
    type: 'success' | 'danger';
  } | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    reset,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      password: '',
      rePassword: '',
    },
  });

  const handleLogout = async () => {
    const res = await logout();

    dispatch(clearCart());
    dispatch(clearWishlist());

    if (res.success) {
      addToast({
        title: 'Logged out successfully',
        icon: <CiLogout color="#16A34A" />,
        color: 'success',
        closeIcon: true,
        shouldShowTimeoutProgress: true,
      });
      router.refresh();
    } else {
      addToast({
        title: 'Something went wrong',
        icon: <MdError color="#FB2C36" />,
        color: 'danger',
        closeIcon: true,
        shouldShowTimeoutProgress: true,
      });
    }
  };

  interface ChangePasswordData {
    currentPassword: string;
    password: string;
    rePassword: string;
  }

  const onSubmit = async (data: ChangePasswordData) => {
    setIsLoading(true);
    setStatus(null);
    try {
      const res = await fetch('/api/settings/auth/changeMyPassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.message === 'success') {
        setStatus({
          message: 'Password changed successfully, logging out...',
          type: 'success',
        });
        handleLogout();
      } else {
        setStatus({
          message: result.message,
          type: 'danger',
        });
      }
    } catch (error) {
      setStatus({
        message: 'Network error',
        type: 'danger',
      });
    } finally {
      setIsLoading(false);
      setTimeout(() => {
        reset();
        setStatus(null);
      }, 3000);
    }
  };
  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center">
              <FaLock size={24} className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Change Password</h3>
              <p className="text-sm text-gray-500">
                Update your account password
              </p>
            </div>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>
                <Input
                  label="Current Password"
                  placeholder="Enter your current password"
                  type={showCurrentPassword ? 'text' : 'password'}
                  isInvalid={!!errors.currentPassword}
                  errorMessage={errors.currentPassword?.message}
                  {...register('currentPassword', {
                    required: 'Current password is required',
                    minLength: {
                      value: 8,
                      message: 'Current password must be at least 8 characters',
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        'Must contain uppercase, lowercase, number, and special character',
                    },
                  })}
                  endContent={
                    <Button
                      isIconOnly
                      variant="light"
                      size="sm"
                      type="button"
                      aria-label="Toggle password visibility"
                      onPress={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <FaEye size={18} />
                      ) : (
                        <FaEyeSlash size={18} />
                      )}
                    </Button>
                  }
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Input
                label="Password"
                placeholder="Create a strong password"
                type={showPassword ? 'text' : 'password'}
                isInvalid={!!errors.password}
                errorMessage={errors.password?.message}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters',
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      'Must contain uppercase, lowercase, number, and special character',
                  },
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                    setPasswordValue(calculatePasswordStrength(e.target.value));
                  },
                  validate: value => {
                    if (value === getValues('currentPassword')) {
                      return 'Password must be different from current password';
                    }
                    if (calculatePasswordStrength(value) < 51) {
                      return 'Password must be at least 51% strong';
                    }
                    return true;
                  },
                })}
                endContent={
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    type="button"
                    aria-label="Toggle password visibility"
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </Button>
                }
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
            <div className="flex flex-col gap-2">
              <Input
                label="Confirm Password"
                placeholder="Confirm your password"
                type={showConfirmPassword ? 'text' : 'password'}
                isInvalid={!!errors.rePassword}
                errorMessage={errors.rePassword?.message}
                {...register('rePassword', {
                  required: 'Please confirm your password',
                  validate: value =>
                    value === getValues('password') || 'Passwords do not match',
                })}
                endContent={
                  <Button
                    isIconOnly
                    variant="light"
                    size="sm"
                    type="button"
                    aria-label="Toggle password visibility"
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <FaEye size={18} />
                    ) : (
                      <FaEyeSlash size={18} />
                    )}
                  </Button>
                }
              />
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-600 text-white font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50 shadow-lg shadow-amber-600/25"
                variant="solid"
                size="md"
                radius="lg"
                isLoading={isLoading}
                isDisabled={isLoading}
                spinner={<Spinner variant="simple" size="sm" color="white" />}
              >
                <FaLock className={isLoading ? 'hidden' : 'block'} />
                Change Password
              </Button>
              {status && (
                <Alert
                  color={status.type}
                  title={status.message}
                  className="mt-4"
                />
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ChangePassword;
