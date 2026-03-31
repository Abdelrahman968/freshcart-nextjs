import Changelog from './_components/Changelog';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Changelog | FreshCart',
  description:
    'See every improvement, bug fix, and new feature shipped to FreshCart — fully documented across all releases.',
  keywords: ['FreshCart', 'Changelog', 'Release Notes', 'Updates'],
  openGraph: {
    title: 'Changelog | FreshCart',
    description:
      'See every improvement, bug fix, and new feature shipped to FreshCart — fully documented across all releases.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Changelog | FreshCart',
    description:
      'See every improvement, bug fix, and new feature shipped to FreshCart — fully documented across all releases.',
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

function ChangelogPage() {
  return <Changelog />;
}

export default ChangelogPage;
