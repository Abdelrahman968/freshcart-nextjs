import type { Metadata } from 'next';
import { Exo } from 'next/font/google';
import './globals.css';
import Navbar from '@components/Navbar/Navbar';
import ProgressBar from '@components/Nprogress/Nprogress';
import Footer from '@components/Footer/Footer';
import { ToastProviderHeroUI } from '../context/ToastProvider';

const exo = Exo({
  variable: '--font-exo',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FreshCart',
  description: 'FreshCart is an e-commerce website',
  keywords: ['FreshCart', 'e-commerce', 'website'],
  authors: [{ name: 'Abdelrahman Ayman' }],
  creator: 'Abdelrahman Ayman',
  publisher: 'Abdelrahman Ayman',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${exo.variable} antialiased scrollbar-custom flex flex-col min-h-screen`}
      >
        <ToastProviderHeroUI>
          <ProgressBar />
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ToastProviderHeroUI>
      </body>
    </html>
  );
}
