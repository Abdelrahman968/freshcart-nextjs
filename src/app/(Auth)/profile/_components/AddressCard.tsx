'use client';
import { FaCity, FaPen, FaPhone, FaTrash } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import AddAddress from './AddAddress';
import { addToast, Button, Spinner } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AddressModal from './AddressModal';

interface AddressData {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

interface Address {
  results: number;
  status: string;
  data: AddressData[];
}

function AddressCard({ addresses }: { addresses: Address }) {
  const router = useRouter();
  const [loadingByIdDelete, setLoadingByIdDelete] = useState<string | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [editAddress, setEditAddress] = useState<AddressData | null>(null);

  const handleEdit = (address: AddressData) => {
    setEditAddress(address);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setEditAddress(null);
  };

  async function deleteAddress(id: string) {
    try {
      setLoadingByIdDelete(id);
      const res = await fetch(`/api/address/remove/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete address');

      const data = await res.json();

      if (data.status === 'success') {
        addToast({
          title: 'Address deleted successfully',
          color: 'success',
          shouldShowTimeoutProgress: true,
        });
        router.refresh();
      } else {
        addToast({
          title: data.message,
          color: 'danger',
          shouldShowTimeoutProgress: true,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingByIdDelete(null);
    }
  }

  if (addresses.results === 0) {
    return (
      <div className="text-center py-10">
        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-5">
          <FaLocationDot size={40} className="text-gray-500" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          No Addresses Yet
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm mx-auto">
          Add your first delivery address to make checkout faster and easier.
        </p>
        <AddAddress top={false} />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {addresses.data.map(address => (
        <div
          className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md hover:border-green-100 transition-all duration-200 group relative"
          key={address._id}
        >
          {loadingByIdDelete === address._id && (
            <div className="absolute inset-0 bg-white/50 flex items-center justify-center">
              <div className="flex items-center gap-2 bg-red-100 px-2 py-1 rounded-lg">
                <Spinner color="danger" variant="simple" size="md" />
                <p className="text-danger">Deleting...</p>
              </div>
            </div>
          )}

          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                <FaLocationDot className="text-lg text-green-600" />
              </div>

              <div className="flex-1 min-w-0 text-start">
                <h3 className="font-bold text-gray-900 mb-1">{address.name}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {address.details}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <FaPhone className="text-xs text-green-600" />
                    {address.phone}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <FaCity className="text-xs text-green-600" />
                    {address.city}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-green-100 hover:text-green-600 flex items-center justify-center transition-colors"
                title="Edit address"
                isIconOnly
                size="sm"
                onPress={() => handleEdit(address)}
              >
                <FaPen className="text-xs" />
              </Button>

              <Button
                className="w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600 flex items-center justify-center transition-colors"
                title="Delete address"
                isIconOnly
                size="sm"
                onPress={() => deleteAddress(address._id)}
              >
                <FaTrash className="text-xs" />
              </Button>
            </div>
          </div>
        </div>
      ))}

      <AddressModal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        editAddress={editAddress}
      />
    </div>
  );
}

export default AddressCard;
