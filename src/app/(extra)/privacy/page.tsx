import {
  FaDatabase,
  FaEnvelope,
  FaEye,
  FaLock,
  FaShieldAlt,
  FaSlidersH,
  FaTrash,
  FaUserShield,
} from 'react-icons/fa';
import { MdEmail, MdPolicy } from 'react-icons/md';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | FreshCart',
  description:
    'Learn how FreshCart collects, uses, and protects your personal data.',
  keywords: ['FreshCart', 'Privacy Policy'],
  openGraph: {
    title: 'Privacy Policy | FreshCart',
    description:
      'Learn how FreshCart collects, uses, and protects your personal data.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Privacy Policy | FreshCart',
    description:
      'Learn how FreshCart collects, uses, and protects your personal data.',
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

interface PolicySection {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const sections: PolicySection[] = [
  {
    id: 'information-we-collect',
    icon: <FaDatabase className="text-green-600 text-xl" />,
    title: 'Information We Collect',
    subtitle: 'What data we gather and why',
    content: (
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>We collect information you provide directly to us, including:</p>
        <ul className="space-y-2 list-none">
          {[
            'Name, email address, and password when you create an account.',
            'Billing and shipping address when placing an order.',
            'Payment information (we never store full card numbers).',
            'Profile photo and preferences if you choose to provide them.',
            'Messages you send us via contact or support forms.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
        <p>
          We also automatically collect certain technical data when you use our
          services, such as IP address, browser type, device identifiers, pages
          visited, and time spent on the platform. This helps us improve
          performance and detect fraud.
        </p>
      </div>
    ),
  },
  {
    id: 'how-we-use',
    icon: <FaEye className="text-green-600 text-xl" />,
    title: 'How We Use Your Information',
    subtitle: 'The purposes behind data processing',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>We use the information we collect to:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          {[
            {
              title: 'Process Orders',
              desc: 'Fulfill, manage, and deliver your purchases.',
            },
            {
              title: 'Account Management',
              desc: 'Create and maintain your FreshCart account.',
            },
            {
              title: 'Customer Support',
              desc: 'Respond to your questions and resolve issues.',
            },
            {
              title: 'Personalization',
              desc: 'Tailor product recommendations to your preferences.',
            },
            {
              title: 'Marketing',
              desc: 'Send you promotions and updates (opt-out anytime).',
            },
            {
              title: 'Security & Fraud',
              desc: 'Monitor for suspicious activity to protect you.',
            },
          ].map(item => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-xl p-4 border border-gray-100"
            >
              <p className="font-semibold text-gray-800 mb-1">{item.title}</p>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'data-sharing',
    icon: <FaUserShield className="text-green-600 text-xl" />,
    title: 'Data Sharing & Disclosure',
    subtitle: 'Who we share your data with',
    content: (
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>
          We do <span className="font-semibold text-gray-800">not sell</span>{' '}
          your personal information to third parties. We may share your data
          only in the following circumstances:
        </p>
        <ul className="space-y-2">
          {[
            'Service providers (e.g., payment processors, delivery carriers) who assist in operating our platform.',
            'Legal authorities when required by law or to protect our legal rights.',
            'Business transfers in the event of a merger, acquisition, or sale of assets.',
            'With your explicit consent for any other purpose.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
        <p>
          All third-party partners are contractually required to handle your
          data securely and in accordance with applicable privacy laws.
        </p>
      </div>
    ),
  },
  {
    id: 'data-security',
    icon: <FaLock className="text-green-600 text-xl" />,
    title: 'Data Security',
    subtitle: 'How we protect your information',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          We implement industry-standard security measures to protect your
          personal data, including:
        </p>
        <ul className="space-y-2">
          {[
            'SSL/TLS encryption for all data transmitted between your browser and our servers.',
            'PCI-DSS compliant payment processing — we never store full card numbers.',
            'Hashed and salted passwords — even we cannot read your password.',
            'Regular security audits and vulnerability assessments.',
            'Role-based access controls limiting employee access to your data.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
        <p>
          While we take every precaution, no method of transmission over the
          internet is 100% secure. We encourage you to use a strong, unique
          password for your account.
        </p>
      </div>
    ),
  },
  {
    id: 'your-rights',
    icon: <FaSlidersH className="text-green-600 text-xl" />,
    title: 'Your Rights & Choices',
    subtitle: 'Control over your personal data',
    content: (
      <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
        <p>Depending on your location, you may have the following rights:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              right: 'Access',
              desc: 'Request a copy of the data we hold about you.',
            },
            {
              right: 'Rectification',
              desc: 'Correct inaccurate or incomplete information.',
            },
            {
              right: 'Erasure',
              desc: 'Request deletion of your personal data.',
            },
            {
              right: 'Portability',
              desc: 'Receive your data in a machine-readable format.',
            },
            {
              right: 'Opt-Out',
              desc: 'Unsubscribe from marketing emails at any time.',
            },
            {
              right: 'Restriction',
              desc: 'Limit how we process your data in certain cases.',
            },
          ].map(item => (
            <div
              key={item.right}
              className="flex items-start gap-3 p-3 rounded-xl border border-gray-100 bg-gray-50/50"
            >
              <FaShieldAlt className="text-green-500 text-sm shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-800 text-xs">
                  {item.right}
                </p>
                <p className="text-gray-500 text-xs">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p>
          To exercise any of these rights, contact us at{' '}
          <a
            href="mailto:privacy@freshcart.com"
            className="text-green-600 hover:underline font-medium"
          >
            privacy@freshcart.com
          </a>
          . We will respond within 30 days.
        </p>
      </div>
    ),
  },
  {
    id: 'data-retention',
    icon: <FaTrash className="text-green-600 text-xl" />,
    title: 'Data Retention',
    subtitle: 'How long we keep your data',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          We retain your personal data for as long as necessary to provide our
          services and comply with legal obligations. Specifically:
        </p>
        <ul className="space-y-2">
          {[
            'Account data is kept for the duration of your account plus 2 years after closure.',
            'Order and transaction records are retained for 7 years for tax and legal compliance.',
            'Marketing preferences are kept until you opt out or delete your account.',
            'Support communications are stored for up to 3 years.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: 'contact',
    icon: <FaEnvelope className="text-green-600 text-xl" />,
    title: 'Contact Us',
    subtitle: 'Privacy questions and requests',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          If you have any questions about this Privacy Policy or how we handle
          your data, please reach out to our Privacy Team:
        </p>
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-1">
          <p className="font-semibold text-gray-800">FreshCart Privacy Team</p>
          <p>123 Commerce Street, New York, NY 10001</p>
          <a
            href="mailto:privacy@freshcart.com"
            className="text-green-600 hover:underline font-medium"
          >
            privacy@freshcart.com
          </a>
        </div>
      </div>
    ),
  },
];

function PrivacyPolicyPage() {
  return (
    <>
      <PageHeader
        title="Privacy Policy"
        subTitle="We value your privacy and are committed to protecting your personal data."
        subTitle2="Privacy Policy"
        icon={<FaShieldAlt size={40} />}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-green-50 rounded-2xl border border-green-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <MdPolicy className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Last Updated
                  </h3>
                  <p className="text-gray-600 text-sm">March 1, 2025</p>
                  <p className="text-gray-500 text-xs mt-1">
                    We may update this policy periodically. Check back for the
                    latest version.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Contents</h3>
              <ul className="space-y-2">
                {sections.map(section => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors text-sm group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 group-hover:scale-125 transition-transform" />
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Related Policies
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'Terms of Service', href: '/terms' },
                  { label: 'Cookie Policy', href: '/cookies' },
                  { label: 'Returns & Refunds', href: '/returns' },
                ].map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors text-sm group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 group-hover:scale-125 transition-transform" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <MdEmail className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Privacy Questions?
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    We&apos;re here to help.
                  </p>
                  <a
                    href="mailto:privacy@freshcart.com"
                    className="text-green-600 font-medium text-sm hover:underline"
                  >
                    privacy@freshcart.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {sections.map(section => (
              <div
                key={section.id}
                id={section.id}
                className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    {section.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {section.title}
                    </h2>
                    <p className="text-gray-500 text-sm">{section.subtitle}</p>
                  </div>
                </div>
                {section.content}
              </div>
            ))}

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaShieldAlt className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Questions about your privacy?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Our team is committed to transparency and will respond to
                    any privacy-related request within 30 days.
                  </p>
                  <Link
                    href="/contact"
                    className="text-green-600 font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Contact Support →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicyPage;
