'use client';
import { addToast, Button } from '@heroui/react';
import Link from 'next/link';
import { FaArrowLeft, FaSpinner, FaTrash } from 'react-icons/fa';
import { deleteUserCart } from '../../../../services/cart.service';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../../../redux/slices/CartSlice';

function FooterActions() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleOpen = () => {
    onOpen();
  };

  const handelClearCart = async () => {
    try {
      setIsLoading(true);
      await deleteUserCart();
      addToast({
        title: 'Success',
        description: 'Cart cleared successfully',
        color: 'success',
        shouldShowTimeoutProgress: true,
      });
      onClose();
      router.refresh();
      dispatch(clearCart());
    } catch (error) {
      addToast({
        title: 'Error',
        description: `${error}`,
        color: 'danger',
        shouldShowTimeoutProgress: true,
      });
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }
  };
  return (
    <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
      <Link
        href="/"
        className="text-green-600 hover:text-green-700 font-medium text-sm flex items-center gap-2"
      >
        <span>
          <FaArrowLeft />
        </span>{' '}
        <p className="text-sm">Continue Shopping</p>
      </Link>
      <Button
        className="group flex items-center gap-2 text-sm disabled:opacity-50"
        color="danger"
        variant="flat"
        onPress={handleOpen}
      >
        <FaTrash className="text-xs group-hover:scale-110 transition-transform" />
        <span>Clear all items</span>
      </Button>

      <>
        <Modal backdrop="opaque" isOpen={isOpen} onClose={onClose}>
          <ModalContent>
            {onClose => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Clear Cart
                </ModalHeader>
                <ModalBody>
                  Are you sure you want to clear all items from your cart?
                </ModalBody>
                <ModalFooter>
                  <Button color="success" variant="light" onPress={onClose}>
                    Cancel
                  </Button>
                  <Button
                    color="danger"
                    onPress={handelClearCart}
                    isLoading={isLoading}
                    spinner={<FaSpinner className="animate-spin" />}
                  >
                    <FaTrash className={`${isLoading ? 'hidden' : 'block'}`} />
                    Clear Cart
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </div>
  );
}

export default FooterActions;
