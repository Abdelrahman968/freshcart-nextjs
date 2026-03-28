'use client';
import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@heroui/react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

interface AddressData {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface AddressModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  editAddress?: AddressData | null;
}

function AddressModal({
  isOpen,
  onOpenChange,
  editAddress = null,
}: AddressModalProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isEditMode = !!editAddress;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      addressName: '',
      fullAddress: '',
      phoneNumber: '',
      city: '',
    },
  });

  useEffect(() => {
    if (isOpen && editAddress) {
      reset({
        addressName: editAddress.name,
        fullAddress: editAddress.details,
        phoneNumber: editAddress.phone,
        city: editAddress.city,
      });
    }

    if (!isOpen) {
      reset({ addressName: '', fullAddress: '', phoneNumber: '', city: '' });
    }
  }, [isOpen, editAddress]);

  const onSubmit = async (data: any) => {
    setLoading(true);

    const body = {
      name: data.addressName,
      details: data.fullAddress,
      phone: data.phoneNumber,
      city: data.city,
    };

    const url = isEditMode
      ? `/api/address/${editAddress!._id}`
      : '/api/address/add';
    const method = isEditMode ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const responseData = await res.json();

      if (!res.ok || responseData.status !== 'success') {
        addToast({
          title: isEditMode
            ? 'Failed to update address'
            : 'Failed to add address',
          description: responseData.message || 'Something went wrong',
          color: 'danger',
          shouldShowTimeoutProgress: true,
        });
        return;
      }

      addToast({
        title: 'Success',
        description: isEditMode
          ? 'Address updated successfully'
          : 'Address added successfully',
        color: 'success',
        shouldShowTimeoutProgress: true,
      });

      router.refresh();
      onOpenChange();
    } catch (error) {
      console.error(`[${method} ${url}]`, error);
      addToast({
        title: 'Error',
        description: 'Network error, please try again',
        color: 'danger',
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="top-center"
      onOpenChange={onOpenChange}
      size="2xl"
    >
      <ModalContent>
        {onClose => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {isEditMode ? 'Edit Address' : 'Add New Address'}
            </ModalHeader>

            <ModalBody>
              <form
                id="address-form"
                className="flex flex-col gap-4"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Input
                  label="Address Name"
                  placeholder="Enter your address name"
                  variant="bordered"
                  size="lg"
                  {...register('addressName', {
                    required: 'Address name is required',
                  })}
                  isInvalid={!!errors.addressName}
                  errorMessage={errors.addressName?.message}
                  isDisabled={loading}
                />
                <Textarea
                  label="Full Address"
                  placeholder="Enter your full address"
                  variant="bordered"
                  size="lg"
                  minRows={5}
                  isClearable
                  {...register('fullAddress', {
                    required: 'Full address is required',
                  })}
                  isInvalid={!!errors.fullAddress}
                  errorMessage={errors.fullAddress?.message}
                  isDisabled={loading}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone Number (Egyptian)"
                    variant="bordered"
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
                  <Input
                    label="City"
                    placeholder="Enter your city"
                    variant="bordered"
                    type="text"
                    {...register('city', { required: 'City is required' })}
                    isInvalid={!!errors.city}
                    errorMessage={errors.city?.message}
                    isDisabled={loading}
                  />
                </div>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={onClose}
                isDisabled={loading}
                className="bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-600/25"
              >
                Close
              </Button>
              <Button
                color="success"
                type="submit"
                form="address-form"
                isDisabled={loading}
                isLoading={loading}
                className="bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25"
              >
                {isEditMode ? 'Update Address' : 'Add Address'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

export default AddressModal;
