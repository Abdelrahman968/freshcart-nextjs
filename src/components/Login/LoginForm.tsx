'use client';
import { addToast, Button, Checkbox, Input } from '@heroui/react';
import Link from 'next/link';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LoginFormData } from '../../types/login.type';
import { signIn, SignInResponse } from 'next-auth/react';
import { CiLogin } from 'react-icons/ci';
import { useSearchParams } from 'next/navigation';
import { isSafeUrl } from '../../utils/url';
import { getUserCartAsync } from '../../redux/slices/CartSlice';
import { getUserWishlistAsync } from '../../redux/slices/WishlistSlice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/reduxStore';

function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const safeCallback =
    callbackUrl && isSafeUrl(callbackUrl) ? callbackUrl : '/';

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const res: SignInResponse | undefined = await signIn('credentials', {
        ...data,
        redirect: true,
        callbackUrl: safeCallback,
      });

      if (!res || res.error) {
        addToast({
          title: 'Error',
          description: 'Invalid email or password',
          color: 'danger',
        });
        return;
      }

      addToast({
        title: 'Logged in successfully',
        icon: <CiLogin color="#16A34A" />,
        color: 'success',
        closeIcon: true,
        shouldShowTimeoutProgress: true,
      });

      dispatch(getUserCartAsync());
      dispatch(getUserWishlistAsync());
    } catch (err) {
      console.error(err);

      addToast({
        title: 'Error',
        description: 'Something went wrong',
        color: 'danger',
      });
    }

    reset();
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          label="Email"
          placeholder="Enter your email"
          type="email"
          endContent={
            <div className="text-gray-500">
              <MdEmail />
            </div>
          }
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Invalid email address',
            },
          })}
          isInvalid={!!errors.email}
          errorMessage={errors.email?.message}
        />
      </div>
      <Input
        label="Password"
        placeholder="Enter your password"
        type={showPassword ? 'text' : 'password'}
        endContent={
          <Button
            type="button"
            isIconOnly
            variant="light"
            size="sm"
            aria-label="Toggle password visibility"
            onPress={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
          </Button>
        }
        {...register('password', {
          required: 'Password is required',
        })}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <Controller
          control={control}
          name="rememberMe"
          render={({ field }) => (
            <Checkbox
              color="success"
              isSelected={field.value}
              onValueChange={field.onChange}
              isInvalid={!!errors.rememberMe}
            >
              <span className="text-sm text-gray-700">Keep me signed in</span>
            </Checkbox>
          )}
        />
        <Link
          className="text-sm text-green-600 hover:text-green-700 cursor-pointer font-medium self-end"
          href="/forget-password"
        >
          Forgot Password?
        </Link>
      </div>
      <Button
        type="submit"
        className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
        isLoading={isSubmitting}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <span className="flex gap-2">
            <p>Signing In</p>
            <div className="flex gap-1">
              <span className="animate-bounce font-bold">.</span>
              <span className="animate-bounce delay-200 font-bold">.</span>
              <span className="animate-bounce delay-400 font-bold">.</span>
            </div>
          </span>
        ) : (
          'Sign In'
        )}
      </Button>
    </form>
  );
}

export default LoginForm;
