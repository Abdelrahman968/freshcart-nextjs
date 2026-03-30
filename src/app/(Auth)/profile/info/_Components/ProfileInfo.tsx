'use client';

import { Alert, Button, Input, Spinner } from '@heroui/react';
import { FaUser } from 'react-icons/fa';
import { FaFloppyDisk } from 'react-icons/fa6';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

function ProfileInfo() {
  const { data: session, status: sessionStatus } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
    },
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<{
    message: string;
    type: 'success' | 'danger';
  } | null>(null);

  useEffect(() => {
    if (sessionStatus === 'authenticated' && session?.user) {
      reset({
        fullName: session.user.name || '',
        email: session.user.email || '',
        phoneNumber: '',
      });
    }
  }, [sessionStatus]);

  interface UpdateUserFormData {
    fullName: string;
    email: string;
    phoneNumber: string;
  }

  const onSubmit: SubmitHandler<UpdateUserFormData> = async (
    data: UpdateUserFormData
  ) => {
    setLoading(true);

    const emailChanged =
      data.email.trim().toLowerCase() !==
      session?.user?.email?.trim().toLowerCase();

    const body = {
      name: data.fullName,
      phone: data.phoneNumber,
      ...(emailChanged && { email: data.email.trim() }),
    };

    const res = await fetch('/api/settings/auth/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    const resData = await res.json();
    if (resData.message === 'success') {
      setStatus({
        message: 'Profile updated successfully',
        type: 'success',
      });
    } else {
      setStatus({
        message: resData.errors[0].msg || 'Failed to update profile',
        type: 'danger',
      });
    }
    setLoading(false);
    setTimeout(() => {
      setStatus(null);
    }, 3000);
  };
  return (
    <>
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-green-100 flex items-center justify-center">
              <FaUser />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Profile Information</h3>
              <p className="text-sm text-gray-500">
                Update your personal details
              </p>
            </div>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Input
                label="Full Name"
                placeholder="Enter your name"
                required
                type="text"
                {...register('fullName')}
                isInvalid={!!errors.fullName}
                errorMessage={errors.fullName?.message}
              />
            </div>
            <div>
              <Input
                label="Email Address"
                placeholder="Enter your email"
                required
                type="email"
                {...register('email', {
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                })}
                isInvalid={!!errors.email}
                errorMessage={errors.email?.message}
              />
            </div>
            <div>
              <Input
                label="Phone Number (Egyptian)"
                type="tel"
                startContent={
                  <div className="pointer-events-none flex items-center">
                    <span className="text-default-400 text-small">+20</span>
                  </div>
                }
                {...register('phoneNumber', {
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
                isInvalid={!!errors.phoneNumber}
                errorMessage={errors.phoneNumber?.message}
                onKeyDown={e => {
                  const allowed = [
                    'Backspace',
                    'Delete',
                    'ArrowLeft',
                    'ArrowRight',
                  ];
                  if (!/^\d$/.test(e.key) && !allowed.includes(e.key))
                    e.preventDefault();
                }}
                isDisabled={loading}
              />
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 shadow-lg shadow-green-600/25"
                color="success"
                variant="solid"
                size="lg"
                isDisabled={loading}
                isLoading={loading}
                spinner={<Spinner variant="simple" size="sm" color="white" />}
              >
                <FaFloppyDisk className={loading ? 'hidden' : 'block'} />
                Save Changes
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
        <div className="p-6 sm:p-8 bg-gray-50">
          <h3 className="font-bold text-gray-900 mb-4">Account Information</h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-500">User ID</span>
              <span className="font-mono text-gray-700">
                {session?.user?.id || 'N/A'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-500">Role</span>
              <span className="px-3 py-1 rounded-lg bg-green-100 text-green-700 font-medium capitalize">
                {session?.user?.role || 'User'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProfileInfo;
