import ForgotPasswordForm from './_components/Forgotpasswordform';
import ForgotPassImage from './_components/ForgotPassImage';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password | FreshCart',
  description:
    'Reset your FreshCart password and get back to easy online grocery shopping.',
  keywords: ['FreshCart', 'Forgot Password'],
  openGraph: {
    title: 'Forgot Password | FreshCart',
    description:
      'Reset your FreshCart password and get back to easy online grocery shopping.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Forgot Password | FreshCart',
    description:
      'Reset your FreshCart password and get back to easy online grocery shopping.',
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

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <section className="container py-16 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <ForgotPassImage />
          <ForgotPasswordForm />
        </div>
      </section>
    </main>
  );
}
