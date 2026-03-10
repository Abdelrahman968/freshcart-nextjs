'use client';

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Input,
  addToast,
} from '@heroui/react';

import {
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
  FaLink,
  FaShareAlt,
  FaCheck,
} from 'react-icons/fa';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

function ShareBtn() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();

  const [url, setUrl] = useState('');
  const [copy, setCopy] = useState(false);

  const handleOpen = () => {
    const fullUrl = `${window.location.origin}${pathname}`;
    setUrl(fullUrl);
    onOpen();
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopy(true);
      setTimeout(() => {
        setCopy(false);
      }, 3000);
    } catch (err) {
      addToast({
        title: 'Failed to copy',
        description: `Error: ${err}`,
        color: 'danger',
      });
    }
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url: url,
        });
      } catch (err) {
        addToast({
          title: 'Share failed',
          description: `Error: ${err}`,
          color: 'danger',
        });
      }
    }
  };

  const socialLinks = [
    {
      name: 'Facebook',
      icon: <FaFacebook size={22} />,
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'hover:text-blue-600 hover:border-blue-300',
    },
    {
      name: 'Twitter',
      icon: <FaTwitter size={22} />,
      link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`,
      color: 'hover:text-blue-400 hover:border-blue-300',
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp size={22} />,
      link: `https://wa.me/?text=${encodeURIComponent(url)}`,
      color: 'hover:text-green-600 hover:border-green-300',
    },
  ];

  return (
    <>
      <button
        className="border-2 border-gray-200 text-gray-700 py-3 px-4 rounded-xl hover:border-green-300 hover:text-green-600 transition cursor-pointer"
        onClick={handleOpen}
        aria-label="Share"
      >
        <FaShareAlt />
      </button>

      <Modal
        size="2xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="text-lg font-semibold">
            Share this page
          </ModalHeader>

          <ModalBody className="gap-6 pb-6">
            {typeof navigator !== 'undefined' && (
              <Button
                color="success"
                startContent={<FaShareAlt />}
                onPress={nativeShare}
                className="w-full text-white font-bold"
              >
                Share via device
              </Button>
            )}

            <div className="grid grid-cols-3 gap-4">
              {socialLinks.map(item => (
                <a
                  key={item.name}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border hover:bg-gray-50 transition ${item.color}`}
                >
                  {item.icon}
                  <span className="text-xs font-medium">{item.name}</span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Input
                value={url}
                readOnly
                size="sm"
                classNames={{
                  input: 'text-sm',
                }}
              />
              <Button
                isIconOnly
                variant="flat"
                onPress={copyLink}
                aria-label="Copy link"
              >
                {copy ? <FaCheck /> : <FaLink />}
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ShareBtn;
