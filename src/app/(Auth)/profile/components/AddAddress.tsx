'use client';
import { Button, useDisclosure } from '@heroui/react';
import { FaPlus } from 'react-icons/fa';
import AddressModal from './AddressModal';

function AddAddress({ top }: { top: boolean }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        className={` ${top ? 'mt-4' : 'mt-0'} inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition-colors shadow-lg shadow-green-600/25`}
        size="lg"
        color="success"
        onPress={onOpen}
      >
        <FaPlus />
        {top ? 'Add Address' : 'Add Your First Address'}
      </Button>

      <AddressModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
}

export default AddAddress;
