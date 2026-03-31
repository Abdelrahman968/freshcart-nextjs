'use client';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getUserCartAsync } from '../../redux/slices/CartSlice';
import { AppDispatch } from '../../redux/reduxStore';
import { getUserWishlistAsync } from '../../redux/slices/WishlistSlice';

export function SessionDataLoader() {
  const { status } = useSession();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (status === 'authenticated') {
      dispatch(getUserCartAsync());
      dispatch(getUserWishlistAsync());
    }
  }, [status]);

  return null;
}
