'use client';

import { addToast } from '@heroui/toast';
import { useEffect } from 'react';
import { FaWifi } from 'react-icons/fa';
import { MdOutlineWifiOff } from 'react-icons/md';

function NetWorkStatusToast() {
  useEffect(() => {
    const handleOffline = () => {
      addToast({
        title: 'No Internet Connection',
        description: 'Please check your connection.',
        color: 'danger',
        icon: <MdOutlineWifiOff />,
      });
    };

    const handleOnline = () => {
      addToast({
        title: 'Internet Connection Restored',
        description: 'You are now connected to the internet.',
        color: 'success',
        timeout: 3000,
        icon: <FaWifi />,
      });
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  return null;
}

export default NetWorkStatusToast;
