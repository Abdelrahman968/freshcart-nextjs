import Link from 'next/link';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { FaChevronRight, FaUser } from 'react-icons/fa';
import { FaGear, FaLocationDot } from 'react-icons/fa6';
import Aside from './_components/Aside';
import { AddressProvider } from '../../../context/AddressContext';

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
