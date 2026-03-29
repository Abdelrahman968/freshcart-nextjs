import {
  FaBoxOpen,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
  FaHeadset,
  FaQuestionCircle,
  FaTimesCircle,
  FaUndoAlt,
} from 'react-icons/fa';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Returns & Refunds | FreshCart',
  description:
    'Learn about FreshCart return policy, refund process, and eligible items.',
  keywords: ['FreshCart', 'Returns & Refunds'],
  openGraph: {
    title: 'Returns & Refunds | FreshCart',
    description:
      'Learn about FreshCart return policy, refund process, and eligible items.',
    siteName: 'FreshCart',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Returns & Refunds | FreshCart',
    description:
      'Learn about FreshCart return policy, refund process, and eligible items.',
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

interface ReturnStep {
  step: number;
  title: string;
  description: string;
}

interface EligibilityItem {
  label: string;
  eligible: boolean;
}

interface RefundMethod {
  method: string;
  duration: string;
  note: string;
}

const returnSteps: ReturnStep[] = [
  {
    step: 1,
    title: 'Initiate Your Return',
    description:
      'Go to My Orders, select the order, and click "Return Item". Fill in the reason for return.',
  },
  {
    step: 2,
    title: 'Get Your Return Label',
    description:
      'A prepaid return shipping label will be emailed to you within 24 hours.',
  },
  {
    step: 3,
    title: 'Pack & Ship',
    description:
      'Securely pack the item in its original packaging and drop it off at any carrier location.',
  },
  {
    step: 4,
    title: 'Item Inspection',
    description:
      'Once received, our team inspects the item within 2 business days.',
  },
  {
    step: 5,
    title: 'Refund Issued',
    description:
      'Refund is processed and returned to your original payment method.',
  },
];

const eligibilityItems: EligibilityItem[] = [
  { label: 'Unused items in original packaging', eligible: true },
  { label: 'Items returned within 30 days of delivery', eligible: true },
  { label: 'Defective or damaged items', eligible: true },
  { label: 'Wrong item received', eligible: true },
  { label: 'Perishable or refrigerated goods', eligible: false },
  { label: 'Gift cards & digital products', eligible: false },
  { label: 'Items marked "Final Sale"', eligible: false },
  { label: 'Opened personal care or hygiene products', eligible: false },
];

const refundMethods: RefundMethod[] = [
  {
    method: 'Credit / Debit Card',
    duration: '3 – 5 Business Days',
    note: 'Returned to the original card used at checkout.',
  },
  {
    method: 'PayPal',
    duration: '1 – 3 Business Days',
    note: 'Refunded directly to your PayPal balance.',
  },
  {
    method: 'Apple Pay',
    duration: '3 – 5 Business Days',
    note: 'Returned to the card linked to Apple Pay.',
  },
  {
    method: 'FreshCart Store Credit',
    duration: 'Instant',
    note: 'Opt for store credit to get your refund immediately.',
  },
];

function ReturnsRefundsPage() {
  return (
    <>
      <PageHeader
        title="Returns & Refunds"
        subTitle="Hassle-free returns within 30 days. Your satisfaction is our priority."
        subTitle2="Returns & Refunds"
        icon={<FaUndoAlt size={40} />}
      />

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6 lg:sticky lg:top-24 lg:self-start">
            <div className="bg-green-50 rounded-2xl border border-green-100 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    30-Day Return Policy
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Return any eligible item within 30 days of delivery — no
                    questions asked.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {[
                  { label: 'How to Return', href: '#how-to-return' },
                  { label: 'Eligibility', href: '#eligibility' },
                  { label: 'Refund Methods', href: '#refund-methods' },
                  { label: 'Exchanges', href: '#exchanges' },
                  { label: 'Damaged Items', href: '#damaged' },
                  { label: 'FAQ', href: '#faq' },
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
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaClock className="text-green-600 text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Return Window
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Returns must be initiated within{' '}
                    <span className="font-semibold text-gray-700">30 days</span>{' '}
                    of your delivery date.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div
              id="how-to-return"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaUndoAlt className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    How to Return an Item
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Simple 5-step return process
                  </p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-green-100" />
                <div className="space-y-6">
                  {returnSteps.map((s, i) => (
                    <div key={s.step} className="flex gap-5 relative">
                      <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shrink-0 z-10 shadow-sm shadow-green-200">
                        <span className="text-white font-bold text-sm">
                          {s.step}
                        </span>
                      </div>
                      <div className={i < returnSteps.length - 1 ? 'pb-2' : ''}>
                        <h4 className="font-semibold text-gray-900 mb-0.5">
                          {s.title}
                        </h4>
                        <p className="text-gray-500 text-sm">{s.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <Link
                  href="/account/orders"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors shadow-sm shadow-green-600/20"
                >
                  <FaBoxOpen />
                  Start a Return
                </Link>
              </div>
            </div>

            <div
              id="eligibility"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaCheckCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Return Eligibility
                  </h2>
                  <p className="text-gray-500 text-sm">
                    What can and cannot be returned
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {eligibilityItems.map(item => (
                  <div
                    key={item.label}
                    className={`flex items-start gap-3 p-4 rounded-xl border text-sm ${
                      item.eligible
                        ? 'border-green-100 bg-green-50/50 text-gray-700'
                        : 'border-red-100 bg-red-50/50 text-gray-700'
                    }`}
                  >
                    {item.eligible ? (
                      <FaCheckCircle className="text-green-500 text-base shrink-0 mt-0.5" />
                    ) : (
                      <FaTimesCircle className="text-red-400 text-base shrink-0 mt-0.5" />
                    )}
                    {item.label}
                  </div>
                ))}
              </div>
            </div>

            <div
              id="refund-methods"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaClock className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Refund Methods & Timeline
                  </h2>
                  <p className="text-gray-500 text-sm">
                    How and when you will receive your money back
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border border-gray-100">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Payment Method
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Refund Time
                      </th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">
                        Note
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {refundMethods.map((r, i) => (
                      <tr
                        key={r.method}
                        className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}`}
                      >
                        <td className="px-4 py-3 font-medium text-gray-800">
                          {r.method}
                        </td>
                        <td className="px-4 py-3 text-green-600 font-semibold">
                          {r.duration}
                        </td>
                        <td className="px-4 py-3 text-gray-500">{r.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div
              id="exchanges"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaBoxOpen className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Exchanges</h2>
                  <p className="text-gray-500 text-sm">
                    Swap for a different item
                  </p>
                </div>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                We don&apos;t process direct exchanges. To get a different item,
                simply return the original and place a new order. This ensures
                the fastest possible turnaround — your refund won&apos;t be
                delayed waiting for an exchange to process.
              </p>
            </div>

            <div
              id="damaged"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaExclamationTriangle className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Damaged or Wrong Items
                  </h2>
                  <p className="text-gray-500 text-sm">
                    We&apos;ll make it right immediately
                  </p>
                </div>
              </div>
              <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4 flex gap-3 mb-4">
                <FaExclamationTriangle className="text-yellow-500 text-lg shrink-0 mt-0.5" />
                <p className="text-yellow-800 text-sm leading-relaxed">
                  Received a damaged, defective, or wrong item? Contact our
                  support team within{' '}
                  <span className="font-semibold">48 hours</span> of delivery.
                  We will send a replacement or issue a full refund immediately
                  — no return required in most cases.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 text-green-600 font-medium text-sm hover:underline"
              >
                <FaHeadset />
                Report a Problem →
              </Link>
            </div>

            <div
              id="faq"
              className="bg-white rounded-2xl border border-gray-100 p-6 lg:p-8 shadow-sm scroll-mt-24"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                  <FaQuestionCircle className="text-green-600 text-xl" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Common return questions
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                {[
                  {
                    q: 'Do I need to pay for return shipping?',
                    a: 'No. FreshCart provides a prepaid return label for all eligible returns. Shipping costs are on us.',
                  },
                  {
                    q: 'Can I return an item without the original packaging?',
                    a: 'Original packaging is preferred, but not always required. The item must be unused and in resalable condition. Contact support if you need guidance.',
                  },
                  {
                    q: "What if my refund hasn't arrived after 5 days?",
                    a: "First check with your bank, as processing times vary. If it's been more than 7 business days, contact our support team with your order number.",
                  },
                  {
                    q: 'Can I return a gift?',
                    a: "Yes! Gift returns are processed as store credit issued to your account. You'll need the order number or gift receipt.",
                  },
                ].map((faq, i) => (
                  <details
                    key={i}
                    className="group border border-gray-100 rounded-xl overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer list-none select-none hover:bg-gray-50 transition-colors">
                      <span className="font-medium text-gray-800 text-sm">
                        {faq.q}
                      </span>
                      <span className="w-6 h-6 rounded-full bg-green-50 flex items-center justify-center shrink-0 text-green-600 font-bold text-lg leading-none group-open:rotate-45 transition-transform duration-200">
                        +
                      </span>
                    </summary>
                    <div className="px-5 pb-4 pt-1 text-gray-500 text-sm leading-relaxed border-t border-gray-100">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-green-50 rounded-2xl p-6 border border-green-100">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
                  <FaHeadset className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Still have questions about your return?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Our support team is happy to help Mon–Fri, 8am–6pm.
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

export default ReturnsRefundsPage;
