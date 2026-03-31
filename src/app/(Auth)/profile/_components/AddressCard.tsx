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
      <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-full bg-green-50 border-2 border-dashed border-green-200 flex items-center justify-center">
            <FaLocationDot size={36} className="text-green-400" />
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-2">
          No addresses yet
        </h3>
        <p className="text-sm text-gray-400 mb-8 max-w-xs leading-relaxed">
          Save your delivery addresses to speed up checkout next time.
        </p>
        <AddAddress top={false} />
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
        {addresses.data.map((address, i) => (
          <div
            key={address._id}
            style={{ animationDelay: `${i * 60}ms` }}
            className="
              relative overflow-hidden
              bg-white rounded-2xl border border-gray-100
              p-4 sm:p-5
              shadow-sm hover:shadow-md
              hover:border-green-200
              transition-all duration-200
              animate-fadeSlideUp
              group
            "
          >
            {loadingByIdDelete === address._id && (
              <div className="absolute inset-0 z-10 bg-white/70 backdrop-blur-[2px] rounded-2xl flex items-center justify-center">
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 px-3 py-1.5 rounded-xl shadow-sm">
                  <Spinner color="danger" variant="simple" size="sm" />
                  <span className="text-sm font-medium text-red-500">
                    Deleting…
                  </span>
                </div>
              </div>
            )}

            <span className="absolute top-0 left-0 w-1 h-full bg-linear-to-b from-green-400 to-green-600 rounded-l-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />

            <div className="flex items-start gap-3 sm:gap-4 text-start">
              <div className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-green-50 group-hover:bg-green-100 transition-colors flex items-center justify-center">
                <FaLocationDot className="text-green-600 text-base sm:text-lg" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {address.name}
                  </h3>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="w-7 h-7 sm:w-8 sm:h-8 min-w-0 rounded-lg bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-600 transition-colors"
                      title="Edit"
                      onPress={() => handleEdit(address)}
                    >
                      <FaPen className="text-[10px] sm:text-xs" />
                    </Button>
                    <Button
                      isIconOnly
                      size="sm"
                      variant="flat"
                      className="w-7 h-7 sm:w-8 sm:h-8 min-w-0 rounded-lg bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-500 transition-colors"
                      title="Delete"
                      onPress={() => deleteAddress(address._id)}
                    >
                      <FaTrash className="text-[10px] sm:text-xs" />
                    </Button>
                  </div>
                </div>

                {/* Details */}
                <p className="text-xs sm:text-sm text-gray-500 mb-3 line-clamp-2 leading-relaxed">
                  {address.details}
                </p>

                {/* Meta chips */}
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 rounded-lg px-2 py-1">
                    <FaPhone className="text-[9px] text-green-500" />
                    {address.phone}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-500 bg-gray-50 rounded-lg px-2 py-1">
                    <FaCity className="text-[9px] text-green-500" />
                    {address.city}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AddressModal
        isOpen={isOpen}
        onOpenChange={handleCloseModal}
        editAddress={editAddress}
      />
    </>
  );
}

export default AddressCard;
