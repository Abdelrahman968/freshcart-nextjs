import PageHeader from '../../../components/PageHeader/PageHeader';
import { FaUser } from 'react-icons/fa';
import Aside from './_components/Aside';
import { AddressProvider } from '../../../context/AddressContext';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile | FreshCart',
  description: 'Manage your addresses and account settings',
  keywords: ['FreshCart', 'Profile'],
  openGraph: {
    title: 'Profile | FreshCart',
    description: 'Manage your addresses and account settings',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Profile | FreshCart',
    description: 'Manage your addresses and account settings',
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

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50/50">
      <PageHeader
        title="My Account"
        subTitle="Manage your addresses and account settings"
        icon={<FaUser size={40} />}
      />
      <div className="container mx-auto py-10">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 px-4">
          <Aside />

          <main className="flex-1 min-w-0">
            <AddressProvider>{children}</AddressProvider>
          </main>
        </div>
      </div>
    </div>
  );
}
