import {
  FaBan,
  FaCheckCircle,
  FaCog,
  FaCookie,
  FaChartBar,
  FaShieldAlt,
  FaSyncAlt,
  FaToggleOn,
} from 'react-icons/fa';
import { MdEmail, MdPolicy } from 'react-icons/md';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy - FreshCart',
  description:
    'Learn how FreshCart uses cookies and how you can manage your preferences.',
  keywords: ['FreshCart', 'Cookie Policy'],
  openGraph: {
    title: 'Cookie Policy - FreshCart',
    description:
      'Learn how FreshCart uses cookies and how you can manage your preferences.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Cookie Policy - FreshCart',
    description:
      'Learn how FreshCart uses cookies and how you can manage your preferences.',
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

interface CookieType {
  name: string;
  purpose: string;
  duration: string;
  required: boolean;
}

const cookieTypes: CookieType[] = [
  {
    name: 'session_id',
    purpose: 'Maintains your login session across pages.',
    duration: 'Session',
    required: true,
  },
  {
    name: 'cart_token',
    purpose: 'Preserves your shopping cart between visits.',
    duration: '30 days',
    required: true,
  },
  {
    name: 'csrf_token',
    purpose: 'Protects against cross-site request forgery attacks.',
    duration: 'Session',
    required: true,
  },
  {
    name: '_ga',
    purpose: 'Google Analytics — tracks visits and page interactions.',
    duration: '2 years',
    required: false,
  },
  {
    name: '_fbp',
    purpose: 'Facebook Pixel — measures ad performance and conversions.',
    duration: '90 days',
    required: false,
  },
  {
    name: 'prefs_theme',
    purpose: 'Remembers your preferred UI theme (light/dark).',
    duration: '1 year',
    required: false,
  },
  {
    name: 'prefs_currency',
    purpose: 'Stores your selected currency for display.',
    duration: '1 year',
    required: false,
  },
  {
    name: 'rec_session',
    purpose: 'Powers personalized product recommendations.',
    duration: '7 days',
    required: false,
  },
];

function CookiePolicyPage() {
  return (
    <>
      <PageHeader
        title="Cookie Policy"
        subTitle="We use cookies to improve your experience. Here's everything you need to know."
        subTitle2="Cookie Policy"
        icon={<FaCookie size={40} />}
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
                    We review our cookie usage periodically as our platform
                    evolves.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Contents</h3>
              <ul className="space-y-2">
                {[
                  { label: 'What Are Cookies?', href: '#what-are-cookies' },
                  { label: 'Types of Cookies We Use', href: '#cookie-types' },
                  { label: 'Cookie Reference Table', href: '#cookie-table' },
                  { label: 'Managing Cookies', href: '#managing' },
                  { label: 'Third-Party Cookies', href: '#third-party' },
                  { label: 'Policy Updates', href: '#updates' },
                  { label: 'Contact Us', href: '#contact-cookies' },
                ].map(link => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors text-sm group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 group-hover:scale-125 transition-transform" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Cookie Legend
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                    Required
                  </span>
                  <p className="text-gray-500">
                    Essential — cannot be disabled
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold">
                    Optional
                  </span>
                  <p className="text-gray-500">Can be disabled in settings</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Related Policies
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'Privacy Policy', href: '/privacy' },
                  { label: 'Terms of Service', href: '/terms' },
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
                    Cookie Questions?
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    We&apos;re happy to explain.
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
            <div
              id="what-are-cookies"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaCookie className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    What Are Cookies?
                  </h2>
                  <p className="text-gray-500 text-sm">
                    A quick explanation of browser cookies
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>
                  Cookies are small text files stored on your device when you
                  visit a website. They allow the site to remember information
                  about your visit — such as your login status, shopping cart
                  contents, and preferences — so you don&apos;t have to re-enter
                  them every time.
                </p>
                <p>
                  Cookies are not programs and cannot carry viruses or access
                  your personal files. They simply store lightweight key-value
                  data associated with a website.
                </p>
              </div>
            </div>

            <div
              id="cookie-types"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaCog className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Types of Cookies We Use
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Four categories of cookies on our platform
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    icon: <FaShieldAlt className="text-green-600" />,
                    title: 'Essential Cookies',
                    badge: 'Required',
                    badgeClass: 'bg-green-100 text-green-700',
                    desc: 'These are required for the platform to function. They enable core features like login sessions, shopping cart persistence, and security tokens. They cannot be disabled.',
                  },
                  {
                    icon: <FaChartBar className="text-blue-600" />,
                    title: 'Analytics Cookies',
                    badge: 'Optional',
                    badgeClass: 'bg-gray-100 text-gray-600',
                    desc: 'Used to understand how visitors interact with our platform — which pages are visited, how long sessions last, and where traffic comes from. Helps us improve the experience.',
                  },
                  {
                    icon: <FaCog className="text-purple-600" />,
                    title: 'Functional Cookies',
                    badge: 'Optional',
                    badgeClass: 'bg-gray-100 text-gray-600',
                    desc: 'Remember your personal preferences such as language, currency, and theme settings to give you a more tailored experience on return visits.',
                  },
                  {
                    icon: <FaToggleOn className="text-orange-600" />,
                    title: 'Marketing Cookies',
                    badge: 'Optional',
                    badgeClass: 'bg-gray-100 text-gray-600',
                    desc: 'Set by advertising partners to build a profile of your interests and show relevant ads on other platforms. We use these only with your consent.',
                  },
                ].map(item => (
                  <div
                    key={item.title}
                    className="border border-gray-100 rounded-xl p-5 hover:border-green-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-lg">
                        {item.icon}
                      </div>
                      <span
                        className={`text-xs font-semibold px-2.5 py-1 rounded-full ${item.badgeClass}`}
                      >
                        {item.badge}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div
              id="cookie-table"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaCookie className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Cookie Reference Table
                  </h2>
                  <p className="text-gray-500 text-sm">
                    All cookies used by FreshCart
                  </p>
                </div>
              </div>
              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Cookie Name
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Purpose
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-700">
                        Duration
                      </th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-700">
                        Type
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cookieTypes.map((cookie, i) => (
                      <tr
                        key={cookie.name}
                        className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="px-4 py-3 font-mono text-xs text-gray-700 font-semibold">
                          {cookie.name}
                        </td>
                        <td className="px-4 py-3 text-gray-500 text-xs">
                          {cookie.purpose}
                        </td>
                        <td className="px-4 py-3 text-center text-gray-500 text-xs">
                          {cookie.duration}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              cookie.required
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {cookie.required ? 'Required' : 'Optional'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              id="managing"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaToggleOn className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Managing Your Cookie Preferences
                  </h2>
                  <p className="text-gray-500 text-sm">You are in control</p>
                </div>
              </div>
              <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
                <p>
                  You can manage or withdraw your cookie consent at any time.
                  Here&apos;s how:
                </p>
                <div className="space-y-3">
                  {[
                    {
                      title: 'Cookie Settings on FreshCart',
                      desc: 'Click "Cookie Preferences" in the footer to update which optional cookies you accept.',
                    },
                    {
                      title: 'Browser Settings',
                      desc: 'Most browsers allow you to block or delete cookies via their settings. Note that disabling essential cookies may break core platform features.',
                    },
                    {
                      title: 'Opt-Out Tools',
                      desc: 'For analytics opt-outs, use tools like Google Analytics Opt-out Browser Add-on or the NAI opt-out page.',
                    },
                  ].map(item => (
                    <div
                      key={item.title}
                      className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50/50"
                    >
                      <FaCheckCircle className="text-green-500 text-sm shrink-0 mt-0.5" />
                      <div>
                        <p className="font-semibold text-gray-800 text-sm">
                          {item.title}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              id="third-party"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaBan className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Third-Party Cookies
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Cookies set by external services
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>
                  Some cookies on our platform are set by trusted third-party
                  services we use to operate and improve FreshCart:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    {
                      service: 'Google Analytics',
                      purpose:
                        'Website traffic analytics and performance reporting.',
                    },
                    {
                      service: 'Facebook Pixel',
                      purpose: 'Ad conversion tracking and audience targeting.',
                    },
                    {
                      service: 'Stripe',
                      purpose:
                        'Secure payment processing and fraud prevention.',
                    },
                  ].map(item => (
                    <div
                      key={item.service}
                      className="bg-gray-50 border border-gray-100 rounded-xl p-4"
                    >
                      <p className="font-semibold text-gray-800 text-sm mb-1">
                        {item.service}
                      </p>
                      <p className="text-gray-500 text-xs">{item.purpose}</p>
                    </div>
                  ))}
                </div>
                <p>
                  Each third party has its own privacy and cookie policy. We
                  encourage you to review them directly.
                </p>
              </div>
            </div>

            <div
              id="updates"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaSyncAlt className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Policy Updates
                  </h2>
                  <p className="text-gray-500 text-sm">
                    How we communicate changes
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
                <p>
                  We may update this Cookie Policy periodically to reflect
                  changes in our practices or applicable regulations. When we
                  do, we will:
                </p>
                <ul className="space-y-2">
                  {[
                    'Update the "Last Updated" date at the top of this page.',
                    'Display a notice on our platform for significant changes.',
                    'Send an email notification if the changes materially affect your preferences.',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-500 text-xs shrink-0 mt-1" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div
              id="contact-cookies"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <MdEmail className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Contact Us
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Questions about our cookie usage
                  </p>
                </div>
              </div>
              <div className="space-y-3 text-sm text-gray-600">
                <p>
                  If you have any questions about this Cookie Policy, please
                  contact our Privacy Team:
                </p>
                <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-1">
                  <p className="font-semibold text-gray-800">
                    FreshCart Privacy Team
                  </p>
                  <p>123 Commerce Street, New York, NY 10001</p>
                  <a
                    href="mailto:privacy@freshcart.com"
                    className="text-green-600 hover:underline font-medium"
                  >
                    privacy@freshcart.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaCookie className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Want to update your cookie preferences?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    You can change your consent settings at any time from your
                    account preferences or via the cookie banner.
                  </p>
                  <Link
                    href="/account/settings"
                    className="text-green-600 font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Manage Preferences →
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

export default CookiePolicyPage;
