import HeaderWishList from './_components/HeaderWishList';
import WishList from './_components/WishList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Wishlist | FreshCart',
  description:
    'Your wishlist at FreshCart. Save your favorite products and buy them later.',
  keywords: ['FreshCart', 'Wishlist', 'Favorites'],
  openGraph: {
    title: 'Wishlist | FreshCart',
    description:
      'Your wishlist at FreshCart. Save your favorite products and buy them later.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Wishlist | FreshCart',
    description:
      'Your wishlist at FreshCart. Save your favorite products and buy them later.',
    site: '@FreshCart',
    creator: '@FreshCart',
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

function WishlistPage() {
  return (
    <>
      <div>
        <HeaderWishList />
        <WishList />
      </div>
    </>
  );
}

export default WishlistPage;
