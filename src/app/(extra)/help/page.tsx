import {
  FaBook,
  FaBoxOpen,
  FaCreditCard,
  FaHeadset,
  FaQuestionCircle,
  FaSearch,
  FaShieldAlt,
  FaTruck,
  FaUndoAlt,
} from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Help Center | FreshCart',
  description:
    'Find answers to common questions or get in touch with our support team.',
  keywords: ['FreshCart', 'Help Center'],
  openGraph: {
    title: 'Help Center | FreshCart',
    description:
      'Find answers to common questions or get in touch with our support team.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Help Center | FreshCart',
    description:
      'Find answers to common questions or get in touch with our support team.',
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

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  faqs: FAQItem[];
}

const faqCategories: FAQCategory[] = [
  {
    icon: <FaBoxOpen className="text-green-600 text-lg" />,
    title: 'Orders',
    description: 'Track, manage, or cancel your orders',
    href: '#orders',
    faqs: [
      {
        question: 'How do I track my order?',
        answer:
          'After placing an order, you will receive a confirmation email with a tracking link. You can also track your order from the "My Orders" section in your account.',
      },
      {
        question: 'Can I modify my order after placing it?',
        answer:
          'Orders can be modified within 30 minutes of placement. After that, the order enters processing and cannot be changed. Contact support if you need urgent help.',
      },
      {
        question: 'How do I cancel an order?',
        answer:
          'Go to "My Orders", select the order, and click "Cancel Order". Cancellations are only possible before the order is shipped.',
      },
    ],
  },
  {
    icon: <FaTruck className="text-green-600 text-lg" />,
    title: 'Shipping',
    description: 'Delivery times, costs, and policies',
    href: '#shipping',
    faqs: [
      {
        question: 'How long does delivery take?',
        answer:
          'Standard delivery takes 3–5 business days. Express delivery (1–2 business days) is available at checkout for an additional fee.',
      },
      {
        question: 'Do you offer free shipping?',
        answer:
          'Yes! Orders over $50 qualify for free standard shipping. The discount is applied automatically at checkout.',
      },
      {
        question: 'Do you ship internationally?',
        answer:
          'Currently, we only ship within the United States. International shipping is coming soon — stay tuned!',
      },
    ],
  },
  {
    icon: <FaUndoAlt className="text-green-600 text-lg" />,
    title: 'Returns & Refunds',
    description: 'Return policies and refund process',
    href: '#returns',
    faqs: [
      {
        question: 'What is your return policy?',
        answer:
          'We accept returns within 30 days of delivery. Items must be unused, in original packaging, and accompanied by a receipt.',
      },
      {
        question: 'How long does a refund take?',
        answer:
          'Once we receive your return, refunds are processed within 3–5 business days. The amount will appear on your original payment method.',
      },
      {
        question: 'Are there items that cannot be returned?',
        answer:
          'Perishable goods, gift cards, and sale items marked "Final Sale" are not eligible for return.',
      },
    ],
  },
  {
    icon: <FaCreditCard className="text-green-600 text-lg" />,
    title: 'Payments',
    description: 'Accepted methods and billing questions',
    href: '#payments',
    faqs: [
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept Visa, Mastercard, American Express, PayPal, and Apple Pay. All transactions are secured with SSL encryption.',
      },
      {
        question: 'Is my payment information secure?',
        answer:
          'Absolutely. We never store your full card details. All payments are processed through PCI-DSS compliant gateways.',
      },
      {
        question: 'Can I use multiple payment methods?',
        answer:
          'Currently, only one payment method can be used per order. However, you can apply a gift card alongside your primary payment method.',
      },
    ],
  },
  {
    icon: <FaShieldAlt className="text-green-600 text-lg" />,
    title: 'Account & Privacy',
    description: 'Manage your account and data',
    href: '#account',
    faqs: [
      {
        question: 'How do I reset my password?',
        answer:
          'Click "Forgot Password" on the login page and enter your email. You will receive a reset link within a few minutes.',
      },
      {
        question: 'How do I delete my account?',
        answer:
          'Account deletion requests can be submitted from Settings → Privacy → Delete Account. This action is irreversible.',
      },
      {
        question: 'How is my data used?',
        answer:
          'We use your data only to process orders and improve your experience. We never sell your personal information. See our Privacy Policy for details.',
      },
    ],
  },
  {
    icon: <FaBook className="text-green-600 text-lg" />,
    title: 'Product Information',
    description: 'Freshness, sourcing, and availability',
    href: '#products',
    faqs: [
      {
        question: 'Are your products organic?',
        answer:
          'Many of our products are certified organic. Look for the "Organic" badge on product listings. Filter by "Organic" in the shop to browse all options.',
      },
      {
        question: 'How do you ensure product freshness?',
        answer:
          'We partner with local farms and suppliers to minimize transit time. Cold-chain logistics ensure temperature-sensitive items arrive fresh.',
      },
      {
        question: 'What if a product is out of stock?',
        answer:
          'You can enable restock notifications on any out-of-stock product page and we will email you the moment it is available again.',
      },
    ],
  },
];

function HelpPage() {
  return (
    <>
      <PageHeader
        title="Help Center"
        subTitle="Find answers to common questions or get in touch with our support team."
        subTitle2="Help Center"
        icon={<FaQuestionCircle size={40} />}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg pointer-events-none" />
            <input
              type="text"
              placeholder="Search for answers..."
              className="w-full pl-12 pr-6 py-4 rounded-2xl border border-gray-200 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-25 lg:self-start">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Browse by Topic
              </h3>
              <ul className="space-y-2">
                {faqCategories.map(category => (
                  <li key={category.href}>
                    <a
                      href={category.href}
                      className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors text-sm group"
                    >
                      <span className="w-7 h-7 rounded-lg bg-green-50 flex items-center justify-center shrink-0 group-hover:bg-green-100 transition-colors">
                        {category.icon}
                      </span>
                      {category.title}
                    </a>
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
                  <h3 className="font-semibold text-gray-900 mb-1">Email Us</h3>
                  <p className="text-gray-500 text-sm mb-2">
                    We&apos;ll respond within 24 hours
                  </p>
                  <a
                    href="mailto:support@freshcart.com"
                    className="text-green-600 font-medium hover:underline text-sm"
                  >
                    support@freshcart.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {faqCategories.map(category => (
              <div
                key={category.href}
                id={category.href.replace('#', '')}
                className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    {category.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {category.title}
                    </h2>
                    <p className="text-gray-500 text-sm">
                      {category.description}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {category.faqs.map((faq, index) => (
                    <details
                      key={index}
                      className="group border border-gray-100 rounded-xl overflow-hidden"
                    >
                      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                        <span className="font-medium text-gray-800 text-sm">
                          {faq.question}
                        </span>
                        <span className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0 text-green-600 font-bold text-lg leading-none group-open:rotate-45 transition-transform duration-200">
                          +
                        </span>
                      </summary>
                      <div className="px-5 pb-4 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-100">
                        {faq.answer}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}

            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaHeadset className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Didn&apos;t find what you were looking for?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Our support team is ready to help with any question you
                    have. Reach out and we&apos;ll get back to you as soon as
                    possible.
                  </p>
                  <Link
                    href="/contact"
                    className="text-green-600 font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Go to Contact Page →
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

export default HelpPage;
