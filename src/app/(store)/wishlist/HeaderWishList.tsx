'use client';
import React from 'react';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { FaHeart } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reduxStore';

function HeaderWishList() {
  const { count } = useSelector((store: RootState) => store.wishlist);
  return (
    <PageHeader
      title="Wishlist"
      subTitle={`You have ${count} items saved in your wishlist`}
      subTitle2="Wishlist"
      icon={<FaHeart size={40} />}
    />
  );
}

export default HeaderWishList;
