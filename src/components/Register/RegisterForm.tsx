'use client';
import { Button, Checkbox, Input, Progress } from '@heroui/react';
import Link from 'next/link';
import { FaUserPlus } from 'react-icons/fa6';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { calculatePasswordStrength } from '../../utils/calculatePasswordStrength';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { registerUser } from '../../services/register.service';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  terms: boolean;
};

function RegisterForm() {
  const [passwordValue, setPasswordValue] = useState<number>(0);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    getValues,
  } = useForm<RegisterFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      terms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    const result = await registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      rePassword: data.confirmPassword,
      phone: data.phone,
    });
    console.log(result);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-7" noValidate>
      <Input
        label="Name"
        placeholder="Ahmed Ali"
        type="text"
        isInvalid={!!errors.name}
        errorMessage={errors.name?.message}
        {...register('name', {
          required: 'Name is required',
          minLength: {
            value: 3,
            message: 'Name must be at least 3 characters',
          },
        })}
      />

      <Input
        label="Email"
        placeholder="example@example.com"
        type="email"
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email address',
          },
        })}
      />

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
              {showPassword ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
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

      <Input
        label="Confirm Password"
        placeholder="Confirm your password"
        type={showConfirmPassword ? 'text' : 'password'}
        isInvalid={!!errors.confirmPassword}
        errorMessage={errors.confirmPassword?.message}
        {...register('confirmPassword', {
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

      <Input
        label="Phone Number (Egyptian)"
        type="tel"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-default-400 text-small">+20</span>
          </div>
        }
        isInvalid={!!errors.phone}
        errorMessage={errors.phone?.message}
        {...register('phone', {
          required: 'Phone number is required',
          pattern: {
            value: /^(?:\+20|20|0)?1[0125][0-9]{8}$/,
            message: 'Invalid Egyptian phone number',
          },
          maxLength: {
            value: 11,
            message: 'Phone number must be at most 11 digits',
          },
        })}
        onKeyDown={e => {
          const allowed = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight'];
          if (!/^\d$/.test(e.key) && !allowed.includes(e.key)) {
            e.preventDefault();
          }
        }}
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <Controller
            name="terms"
            control={control}
            rules={{ required: 'You must accept the terms to continue' }}
            render={({ field }) => (
              <Checkbox
                color="success"
                isSelected={field.value}
                onValueChange={field.onChange}
                isInvalid={!!errors.terms}
              >
                <span className="text-sm">
                  I agree to the{' '}
                  <Link
                    className="text-green-600 hover:underline"
                    href="/terms"
                  >
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link
                    className="text-green-600 hover:underline"
                    href="/privacy-policy"
                  >
                    Privacy Policy
                  </Link>{' '}
                  *
                </span>
              </Checkbox>
            )}
          />
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="btn bg-green-600 text-white hover:bg-green-700 flex items-center justify-center cursor-pointer transition-colors duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-green-600"
        isDisabled={isSubmitting}
        isLoading={isSubmitting}
        fullWidth={true}
      >
        <FaUserPlus />
        <span>
          {isSubmitting ? 'Creating Account...' : 'Create My Account'}
        </span>
      </Button>
    </form>
  );
}

export default RegisterForm;
