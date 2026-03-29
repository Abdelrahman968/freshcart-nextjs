import type { Metadata } from 'next';
import { Exo } from 'next/font/google';
import './globals.css';
import Navbar from '@components/Navbar/Navbar';
import ProgressBar from '@components/Nprogress/Nprogress';
import Footer from '@components/Footer/Footer';

import Providers from '../context/Providers';

const exo = Exo({
  variable: '--font-exo',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'FreshCart | Online Store',
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
  openGraph: {
    title: 'FreshCart',
    description: 'FreshCart is an e-commerce website',
    siteName: 'FreshCart',
    images: ['/og.png'],
    type: 'website',
  },
  twitter: {
    title: 'FreshCart',
    description: 'FreshCart is an e-commerce website',
    site: '@FreshCart',
    creator: '@FreshCart',
    images: ['/og.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${exo.variable} antialiased`}>
        <Providers>
          <ProgressBar />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
