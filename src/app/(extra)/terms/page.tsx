import {
  FaBan,
  FaBalanceScale,
  FaCheckCircle,
  FaEdit,
  FaExclamationTriangle,
  FaFileContract,
  FaGavel,
  FaShieldAlt,
  FaUserCheck,
} from 'react-icons/fa';
import { MdEmail, MdPolicy } from 'react-icons/md';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service - FreshCart',
  description:
    "Read FreshCart's Terms of Service governing your use of our platform.",
};

interface TermsSection {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: React.ReactNode;
}

const sections: TermsSection[] = [
  {
    id: 'acceptance',
    icon: <FaCheckCircle className="text-green-600 text-xl" />,
    title: 'Acceptance of Terms',
    subtitle: 'By using FreshCart, you agree to these terms',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          By accessing or using the FreshCart platform — including our website,
          mobile applications, and any related services — you agree to be bound
          by these Terms of Service and our{' '}
          <Link
            href="/privacy"
            className="text-green-600 hover:underline font-medium"
          >
            Privacy Policy
          </Link>
          .
        </p>
        <p>
          If you do not agree to these terms, please discontinue use of our
          services immediately. We reserve the right to update these terms at
          any time, with notice provided via email or a banner on our platform.
        </p>
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <p className="text-green-800 text-sm font-medium">
            Continued use of FreshCart after any changes constitutes your
            acceptance of the revised terms.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'eligibility',
    icon: <FaUserCheck className="text-green-600 text-xl" />,
    title: 'Eligibility',
    subtitle: 'Who can use FreshCart',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>To use FreshCart, you must:</p>
        <ul className="space-y-2">
          {[
            'Be at least 18 years of age or have the consent of a parent or legal guardian.',
            'Provide accurate, current, and complete information during registration.',
            'Not be prohibited from using our services under applicable laws.',
            'Have the legal capacity to enter into a binding agreement.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <FaCheckCircle className="text-green-500 text-xs shrink-0 mt-1" />
              {item}
            </li>
          ))}
        </ul>
        <p>
          FreshCart reserves the right to refuse service or terminate accounts
          that do not meet these eligibility requirements.
        </p>
      </div>
    ),
  },
  {
    id: 'account',
    icon: <FaShieldAlt className="text-green-600 text-xl" />,
    title: 'Your Account',
    subtitle: 'Account responsibilities and security',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          You are responsible for maintaining the confidentiality of your
          account credentials and for all activity that occurs under your
          account. You agree to:
        </p>
        <ul className="space-y-2">
          {[
            'Use a strong, unique password and not share it with anyone.',
            'Notify us immediately of any unauthorized access at security@freshcart.com.',
            "Not create multiple accounts or use another person's account.",
            'Keep your account information accurate and up to date.',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0 mt-2" />
              {item}
            </li>
          ))}
        </ul>
        <p>
          FreshCart is not liable for any loss resulting from unauthorized use
          of your account.
        </p>
      </div>
    ),
  },
  {
    id: 'orders',
    icon: <FaFileContract className="text-green-600 text-xl" />,
    title: 'Orders & Purchases',
    subtitle: 'Terms governing purchases on our platform',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          When you place an order on FreshCart, you are making an offer to
          purchase the selected items. An order is confirmed only after you
          receive a confirmation email from us.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            {
              title: 'Pricing',
              desc: 'Prices are displayed in USD and may change without notice. We are not obligated to honor pricing errors.',
            },
            {
              title: 'Availability',
              desc: 'We do not guarantee product availability. Items may be removed from your order if out of stock.',
            },
            {
              title: 'Cancellations',
              desc: 'Orders can be cancelled within 30 minutes of placement, before processing begins.',
            },
            {
              title: 'Substitutions',
              desc: 'For fresh items, we may substitute with a similar product of equal or greater value.',
            },
          ].map(item => (
            <div
              key={item.title}
              className="bg-gray-50 rounded-xl p-4 border border-gray-100"
            >
              <p className="font-semibold text-gray-800 mb-1 text-xs">
                {item.title}
              </p>
              <p className="text-gray-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    id: 'prohibited',
    icon: <FaBan className="text-green-600 text-xl" />,
    title: 'Prohibited Conduct',
    subtitle: 'What you must not do on our platform',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>You agree not to engage in any of the following:</p>
        <div className="space-y-2">
          {[
            'Fraudulent purchases, chargebacks abuse, or payment manipulation.',
            'Scraping, crawling, or automated data extraction from our platform.',
            'Attempting to gain unauthorized access to our systems or other accounts.',
            'Posting false reviews, ratings, or misleading content.',
            'Using our platform for any illegal or unauthorized purpose.',
            'Interfering with the proper functioning of our services.',
          ].map((item, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl border border-red-100 bg-red-50/40"
            >
              <FaBan className="text-red-400 text-sm shrink-0 mt-0.5" />
              <p className="text-gray-700 text-xs">{item}</p>
            </div>
          ))}
        </div>
        <p>
          Violation of these terms may result in immediate account suspension
          and potential legal action.
        </p>
      </div>
    ),
  },
  {
    id: 'intellectual-property',
    icon: <FaEdit className="text-green-600 text-xl" />,
    title: 'Intellectual Property',
    subtitle: 'Ownership of content and trademarks',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          All content on the FreshCart platform — including text, images, logos,
          icons, and software — is the exclusive property of FreshCart or its
          licensors and is protected by intellectual property laws.
        </p>
        <p>
          You may not reproduce, distribute, or create derivative works from our
          content without prior written permission. Personal, non-commercial use
          of our platform is permitted.
        </p>
        <p>
          By submitting reviews, photos, or other content, you grant FreshCart a
          non-exclusive, royalty-free license to use that content on our
          platform and in marketing materials.
        </p>
      </div>
    ),
  },
  {
    id: 'disclaimer',
    icon: <FaExclamationTriangle className="text-green-600 text-xl" />,
    title: 'Disclaimers & Limitation of Liability',
    subtitle: 'The scope of our legal responsibility',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <div className="bg-yellow-50 border border-yellow-100 rounded-xl p-4">
          <p className="text-yellow-800 text-sm">
            FreshCart provides its services on an &quot;as is&quot; and &quot;as
            available&quot; basis, without warranties of any kind, either
            express or implied.
          </p>
        </div>
        <p>
          We do not guarantee uninterrupted or error-free operation of our
          platform. To the fullest extent permitted by law, FreshCart shall not
          be liable for:
        </p>
        <ul className="space-y-2">
          {[
            'Indirect, incidental, or consequential damages arising from your use of our services.',
            'Loss of data, revenue, or profits.',
            'Delays or failures caused by circumstances beyond our reasonable control.',
            'Third-party content, links, or services accessible through our platform.',
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
    id: 'governing-law',
    icon: <FaGavel className="text-green-600 text-xl" />,
    title: 'Governing Law',
    subtitle: 'Jurisdiction and dispute resolution',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          These Terms of Service are governed by and construed in accordance
          with the laws of the State of New York, United States, without regard
          to its conflict of law provisions.
        </p>
        <p>
          Any disputes arising from or relating to these terms shall be resolved
          through binding arbitration in New York, NY, except where prohibited
          by law. You waive any right to a jury trial or class-action lawsuit.
        </p>
        <p>
          If any provision of these terms is found to be unenforceable, the
          remaining provisions will continue in full force and effect.
        </p>
      </div>
    ),
  },
  {
    id: 'contact-terms',
    icon: <FaBalanceScale className="text-green-600 text-xl" />,
    title: 'Contact About These Terms',
    subtitle: 'Legal inquiries and questions',
    content: (
      <div className="space-y-3 text-sm text-gray-600 leading-relaxed">
        <p>
          For questions or concerns about these Terms of Service, please contact
          our legal team:
        </p>
        <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-1">
          <p className="font-semibold text-gray-800">FreshCart Legal Team</p>
          <p>123 Commerce Street, New York, NY 10001</p>
          <a
            href="mailto:legal@freshcart.com"
            className="text-green-600 hover:underline font-medium"
          >
            legal@freshcart.com
          </a>
        </div>
      </div>
    ),
  },
];

// ─── Page Component ───────────────────────────────────────────────────────────

function TermsOfServicePage() {
  return (
    <>
      <PageHeader
        title="Terms of Service"
        subTitle="Please read these terms carefully before using FreshCart."
        subTitle2="Terms of Service"
        icon={<FaFileContract size={36} />}
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
                    We will notify you of significant changes via email.
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
                  { label: 'Privacy Policy', href: '/privacy' },
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
                    Legal Questions?
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Contact our legal team.
                  </p>
                  <a
                    href="mailto:legal@freshcart.com"
                    className="text-green-600 font-medium text-sm hover:underline"
                  >
                    legal@freshcart.com
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
                  <FaGavel className="text-green-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Have a legal question?
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Our legal team is available to clarify any part of these
                    terms. We aim to respond within 5 business days.
                  </p>
                  <Link
                    href="/contact"
                    className="text-green-600 font-medium text-sm hover:underline inline-flex items-center gap-1"
                  >
                    Contact Us →
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

export default TermsOfServicePage;
