import Track from './_components/Track';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Order | FreshCart',
  description:
    'Track your FreshCart order and get real-time updates on its delivery status.',
  keywords: ['FreshCart', 'Track Order'],
  openGraph: {
    title: 'Track Order | FreshCart',
    description:
      'Track your FreshCart order and get real-time updates on its delivery status.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Track Order | FreshCart',
    description:
      'Track your FreshCart order and get real-time updates on its delivery status.',
    site: '@FreshCart',
    creator: '@FreshCart',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

function TrackOrderPage() {
  return <Track />;
}

export default TrackOrderPage;
